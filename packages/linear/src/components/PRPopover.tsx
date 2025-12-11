import { TrashIcon } from '@heroicons/react/24/outline'
import { PRDraft, PRIcon, PROpen } from '@repo/github'
import { Button, Tooltip } from '@repo/ui'
import { cn, queryClient } from '@repo/utils'
import { useMutation, useQuery } from 'react-query'

import type { Attachment, AttachmentConnection, Issue } from '@linear/sdk'

import { getLinearClient } from '../client'

interface PRPopoverProps {
  issue: Issue

  className?: string
}

const isPullRequest = (attachement: Attachment) =>
  attachement.source?.type === 'github' && !!attachement.source?.pullRequestId

// Returns the map of PRs in from of (number => pr metadata)
const usePRs = (issue: Issue): Record<string, Attachment> => {
  const fetchIssueAttachements = useQuery({
    enabled: !!issue,
    queryFn: async () => issue.attachments(),
    queryKey: ['linear', 'issues', issue.identifier, 'attachements'],
  })

  const attachements = fetchIssueAttachements.data?.nodes ?? []

  return Object.fromEntries(
    attachements.filter(isPullRequest).map((attachement) => [attachement.metadata.number.toString(), attachement]),
  )
}

const getCurrentPR = () => {
  const [url, , number] = document.location?.href?.match(/(.*\/pull\/)(\d+)/) || []

  if (number) {
    return {
      number,
      title: document.querySelector('#partial-discussion-header h1[class*="title"] bdi')?.textContent,
      url,
    }
  }
  return { number: '', url: '' }
}

export const PRPopover = ({ className, issue }: PRPopoverProps) => {
  const prs = usePRs(issue)

  const currentPR = getCurrentPR()

  const isCurrentPRInIssue = !!prs[currentPR.number]

  const queryKey = ['linear', 'issues', issue.identifier, 'attachements']

  const addCurrentPRMutation = useMutation({
    mutationFn: async () => {
      await getLinearClient(issue.identifier).attachmentLinkGitHubPR(issue.id, currentPR.url)
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey })
      const previousAttachments = queryClient.getQueryData<AttachmentConnection>(queryKey)
      queryClient.setQueryData(queryKey, {
        ...previousAttachments,
        nodes: [
          ...previousAttachments.nodes,
          {
            id: 'new',
            metadata: { number: currentPR.number, status: 'open', title: currentPR.title, url: currentPR.url },
            source: { pullRequestId: 'current', type: 'github' },
          },
        ],
      })
    },
    onSettled: () => queryClient.invalidateQueries(queryKey),
  })

  const removePRReferenceMutation = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await getLinearClient(issue.identifier).deleteAttachment(id)
    },
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries(queryKey)
      const previousAttachments = queryClient.getQueryData<AttachmentConnection>(queryKey)
      queryClient.setQueryData(queryKey, {
        ...previousAttachments,
        nodes: previousAttachments.nodes.filter((node) => node.id !== id),
      })
    },
    onSettled: () => queryClient.invalidateQueries(queryKey),
  })

  const addCurrentPR = async () => {
    await addCurrentPRMutation.mutateAsync()
  }

  const removePR = (pr: Attachment) => async () => {
    await removePRReferenceMutation.mutateAsync({ id: pr.id })
  }

  const prEntries = Object.entries(prs)

  if (prEntries.length <= 0 && !currentPR.url) {
    return null
  }

  return (
    <div className={cn('PRPopover', className)}>
      {prEntries.length <= 0 ? (
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
            <PROpen className="text-[--fgColor-muted]" />
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
                {prEntries.map(([prNum, pr], index, list) => (
                  <div
                    key={pr.metadata.url}
                    className="flex items-center gap-2 p-1 rounded hover:bg-[--bgColor-accent-emphasis]"
                  >
                    {<PRIcon className="skrink" status={pr.metadata.status} />}
                    <div className="grow text-[--fgColor-default]">
                      <a href={pr.metadata.url} target={`_lage-pr${prNum}`}>
                        {pr.metadata.title} <span className="text-[--fgColor-muted]">#{prNum}</span>
                      </a>
                    </div>
                    <Tooltip content="Remove this reference">
                      <Button asIcon onClick={removePR(pr)}>
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
            <PROpen className="text-[--fgColor-muted]" />
            {prEntries.length > 1 && <div className="text-gray-500">{prEntries.length}</div>}
          </button>
        </Tooltip>
      )}
    </div>
  )
}
