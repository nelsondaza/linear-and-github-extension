import { Branch, Merge, PR, PRClosed, PRDraft } from '@repo/github'
import { Tooltip } from '@repo/ui'
import { cn, queryClient } from '@repo/utils'
import { useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'

import type { IssueSearchPayload, IssueSearchResult, WorkflowState } from '@linear/sdk'

import { getLinearClient } from '../client'

import {
  CheckIcon,
  StateBacklog,
  StateCanceled,
  StateCompleted,
  StateStarted,
  StateTriage,
  StateUnstarted,
} from './icons'

interface PRPopoverProps {
  issue: IssueSearchResult

  className?: string
}

const usePRsFromDescription = (issue: IssueSearchResult) => {
  const texts = issue?.description?.match(/\[.+]\(https:\/\/github\.com\/.+\/pull\/\d+.*\)/gim)

  return useMemo(() => {
    const map = new Map<string, { number: string; texts: Set<string> }>()
    texts?.forEach((text) => {
      const [_t, _p, url, number] = text.match(/(\()(https:\/\/github\.com\/.+\/pull\/(\d+))/i) || []
      if (url) {
        const item = map.get(url) || { number, texts: new Set<string>() }
        item.texts.add(text)
        map.set(url, item)
      }
    })

    return map
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texts?.toString()])
}

function StateIcon({ state, states = [] }: { state: WorkflowState; states?: WorkflowState[] }) {
  const siblings = states.filter((s) => s.type === state.type)
  const index = siblings.findIndex((s) => s.id === state.id)
  const filledPercent = index === -1 ? 0.5 : (index + 1) / (siblings.length + 1)

  return (
    <>
      {state.type === 'backlog' && <StateBacklog fill={state.color} />}
      {state.type === 'unstarted' && <StateUnstarted fill={state.color} />}
      {state.type === 'started' && <StateStarted fill={state.color} percentage={filledPercent} />}
      {state.type === 'completed' && <StateCompleted fill={state.color} />}
      {state.type === 'canceled' && <StateCanceled fill={state.color} />}
      {state.type === 'triage' && <StateTriage fill={state.color} />}
    </>
  )
}

const getPRLinkByURL = () => {
  const [URL, , number] = document.location.href.match(/(.*\/pull\/)(\d+)/)

  if (number) {
    return `[GitHub Pull Request #${number}](${URL})`
  }
  return ''
}

export const PRPopover = ({ className, issue }: PRPopoverProps) => {
  const prs = usePRsFromDescription(issue)

  const linkToCurrentPR = getPRLinkByURL()

  const queryKey = ['linear', 'issues', issue?.identifier, 'issue']

  const updateDescription = useMutation({
    mutationFn: async () => {
      await getLinearClient().updateIssue(issue.id, {
        description: [issue.description?.trim() || '', linkToCurrentPR].filter(Boolean).join('\n\n'),
      })
    },
    onError: (_error, _, context: { previousIssueFetch: IssueSearchPayload }) => {
      queryClient.setQueryData(queryKey, context.previousIssueFetch)
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey })
      const previousIssueFetch = queryClient.getQueryData<IssueSearchPayload>(queryKey)
      queryClient.setQueryData(queryKey, {
        ...previousIssueFetch,
        nodes: [
          {
            ...previousIssueFetch.nodes[0],
            description: [issue.description?.trim() || '', linkToCurrentPR].filter(Boolean).join('\n\n'),
          },
        ],
      })
      return { previousIssueFetch }
    },
    onSettled: async () => queryClient.invalidateQueries({ queryKey }),
  })

  const changeDescription = async () => {
    await updateDescription.mutateAsync()
  }

  // const icon = updateStatus.isLoading ? <StateBacklog className="animate-spin text-gray-500" /> : <CheckIcon />

  return (
    <div className={cn('PRPopover', className)}>
      {/* <Branch className="text-orange-600" /> */}
      {/* <Merge className="text-violet-700" /> */}
      {/* <PR className="text-green-700" /> */}
      {/* <PRClosed className="text-red-600" /> */}
      {/* <PRDraft className="text-gray-400" /> */}
      {prs.size <= 0 ? (
        <Tooltip
          content={
            <div>
              <div>There are no PRs in the issues.</div>
              <div>Click to add the current PR.</div>
            </div>
          }
          on={['hover', 'focus']}
        >
          <button onClick={changeDescription} type="button">
            <PRDraft className="text-gray-400" />
          </button>
        </Tooltip>
      ) : (
        <Tooltip
          content={
            <div>
              {prs
                .entries()
                .toArray()
                .map(([key, pr], index, list) => (
                  <div key={key} className="flex items-center gap-1">
                    <PR className="text-green-700" />
                    {list.length > 1 && <div className="text-sm text-gray-500 min-w-16">{index + 1}</div>}
                  </div>
                ))}
            </div>
          }
        >
          <div className="flex items-center gap-1">
            <PR className="text-green-700" />
            {prs.size > 1 && <div className="text-sm text-gray-500 min-w-16">{prs.size}</div>}
          </div>
        </Tooltip>
      )}
    </div>
  )
}
