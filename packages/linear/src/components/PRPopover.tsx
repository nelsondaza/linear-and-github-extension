import { TrashIcon } from '@heroicons/react/24/outline'
import { PR, PRDraft } from '@repo/github'
import { Button, Tooltip } from '@repo/ui'
import { cn, queryClient } from '@repo/utils'
import { useMemo } from 'react'
import { useMutation } from 'react-query'

import type { Issue } from '@linear/sdk'

import { getLinearClient } from '../client'

interface PRPopoverProps {
  issue: Issue

  className?: string
}

const PR_REFERENCE_REPLACE_KEY = '<!-- __PR_REFERENCE__ -->'

const usePRsFromDescription = (issue: Issue) => {
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

const getPRLinkByURL = () => {
  const [URL, , number] = document.location?.href?.match(/(.*\/pull\/)(\d+)/) || []

  if (number) {
    return { link: `[GitHub Pull Request #${number}](${URL})`, number }
  }
  return { link: '', number: '' }
}

export const PRPopover = ({ className, issue }: PRPopoverProps) => {
  const prs = usePRsFromDescription(issue)

  const currentPR = getPRLinkByURL()

  const isCurrentPRInIssue = prs.values().some((pr) => pr.number === currentPR.number)

  const queryKey = ['linear', 'issues', issue?.identifier, 'issue']

  const addCurrentPRToDescription = useMutation({
    mutationFn: async () => {
      await getLinearClient(issue.identifier).updateIssue(issue.id, {
        description: [issue.description?.trim() || '', currentPR.link].filter(Boolean).join('\n\n'),
      })
    },
    onError: (_error, _, context: { previousIssueFetch: Issue }) => {
      queryClient.setQueryData(queryKey, context.previousIssueFetch)
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey })
      const previousIssueFetch = queryClient.getQueryData<Issue>(queryKey)
      queryClient.setQueryData(queryKey, {
        ...previousIssueFetch,
        description: [issue.description?.trim() || '', currentPR.link].filter(Boolean).join('\n\n'),
      })
      return { previousIssueFetch }
    },
    onSettled: async () => queryClient.invalidateQueries({ queryKey }),
  })

  const removePRReferenceFromDescription = (url: string, description = '') => {
    const linesToRemove = prs.get(url)?.texts.values().toArray() || []
    let newDescription = description
    linesToRemove.forEach((line) => {
      newDescription = newDescription.replace(line, PR_REFERENCE_REPLACE_KEY)
    })

    return (
      newDescription
        .split(PR_REFERENCE_REPLACE_KEY)
        .map((line) => line.trim())
        .filter(Boolean)
        .join('\n')
        .trim() || '\n'
    )
  }

  const removePRFromDescription = useMutation({
    mutationFn: async (url: string) => {
      const newDescription = removePRReferenceFromDescription(url, issue.description)

      if (newDescription !== issue.description) {
        await getLinearClient(issue.identifier).updateIssue(issue.id, {
          description: newDescription,
        })
      }
    },
    onError: (_error, _, context: { previousIssueFetch: Issue }) => {
      queryClient.setQueryData(queryKey, context.previousIssueFetch)
    },
    onMutate: async (url) => {
      await queryClient.cancelQueries({ queryKey })
      const previousIssueFetch = queryClient.getQueryData<Issue>(queryKey)
      queryClient.setQueryData(queryKey, {
        ...previousIssueFetch,
        description: removePRReferenceFromDescription(url, previousIssueFetch.description),
      })
      return { previousIssueFetch }
    },
    onSettled: async () => queryClient.invalidateQueries({ queryKey }),
  })

  const addCurrentPR = async () => {
    await addCurrentPRToDescription.mutateAsync()
  }

  const removePRReference = (url: string) => async () => {
    await removePRFromDescription.mutateAsync(url)
  }

  if (prs.size <= 0 && !currentPR.link) {
    return null
  }

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
            <div className="text-center">
              <div>There are no PRs in the issue</div>
              <div className="p-1 font-bold pt-2">
                Click the icon to add
                <br />
                this PR to Linear
              </div>
            </div>
          }
          on={['hover', 'focus']}
        >
          <button onClick={addCurrentPR} type="button">
            <PRDraft className="text-gray-400" />
          </button>
        </Tooltip>
      ) : (
        <Tooltip
          content={
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1 pt-1 text-xl overflow-y-auto">
                {isCurrentPRInIssue ? null : (
                  <Tooltip content="Add a reference to this PR">
                    <button
                      className="flex items-center gap-2 p-1 rounded border hover:bg-gray-50"
                      onClick={addCurrentPR}
                      type="button"
                    >
                      <PRDraft className="text-gray-400" />
                      <div className="grow text-gray-500">Add this PR to Linear</div>
                    </button>
                  </Tooltip>
                )}
                {prs
                  .entries()
                  .toArray()
                  .map(([url, pr], index, list) => (
                    <div key={url} className="flex items-center gap-2 p-1 rounded border hover:bg-gray-50">
                      <PR className="shrink text-green-700" />
                      <div className="grow text-gray-500">
                        <a href={url} target={`_lage-pr${pr.number}`}>
                          {list.length > 1 && `${index + 1}. `} PR #{pr.number}
                        </a>
                      </div>
                      <Tooltip content="Remove this reference">
                        <Button asIcon onClick={removePRReference(url)}>
                          <TrashIcon className="size-4 text-red-700" />
                        </Button>
                      </Tooltip>
                    </div>
                  ))}
              </div>
              <div className="text-center font-bold pt-2 p-1">Click the icon to keep open</div>
            </div>
          }
        >
          <button className="flex items-center gap-1" type="button">
            <PR className="text-green-700" />
            {prs.size > 1 && <div className="text-gray-500">{prs.size}</div>}
          </button>
        </Tooltip>
      )}
    </div>
  )
}
