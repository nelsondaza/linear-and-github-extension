import { Tooltip } from '@repo/ui'
import { queryClient } from '@repo/utils'
import { useMutation } from 'react-query'

import type { IssueSearchPayload, IssueSearchResult } from '@linear/sdk'
import { getLinearClient, StateBacklog } from '@repo/linear'

import { CheckIcon, PriorityHigh, PriorityLow, PriorityMedium, PriorityNone, PriorityUrgent } from './icons'

interface PriorityPopoverProps {
  issue: IssueSearchResult
}

export const PriorityPopover = ({ issue }: PriorityPopoverProps) => {
  const queryKey = ['linear', 'issues', issue?.identifier, 'issue']

  const updateIssue = useMutation({
    mutationFn: async (_priority: number) => {
      await getLinearClient().updateIssue(issue.id, { priority: _priority })
    },
    onError: (_error, _priority, context: { previousIssueFetch: IssueSearchPayload }) => {
      queryClient.setQueryData(queryKey, context.previousIssueFetch)
    },
    onMutate: async (_priority) => {
      await queryClient.cancelQueries({ queryKey })
      const previousIssueFetch = queryClient.getQueryData<IssueSearchPayload>(queryKey)
      queryClient.setQueryData(queryKey, {
        ...previousIssueFetch,
        nodes: [{ ...previousIssueFetch.nodes[0], priority: _priority }],
      })
      return { previousIssueFetch }
    },
    onSettled: async () => queryClient.invalidateQueries({ queryKey }),
  })

  const changePriority = (newPriority: number) => async () => {
    await updateIssue.mutateAsync(newPriority)
  }

  const icon = updateIssue.isLoading ? <StateBacklog className="animate-spin text-gray-500" /> : <CheckIcon />
  const priority = issue?.priority || 0

  return (
    <Tooltip
      className="p-1 min-w-48"
      content={
        <div className="whitespace-nowrap *:flex *:gap-2 *:items-center *:w-full *:px-2.5 *:py-1.5 *:rounded-md *:cursor-pointer hover:*:bg-gray-100">
          <button onClick={changePriority(0)} type="button">
            <PriorityNone />
            <div>No priority</div>
            <div className="grow" />
            {!priority && icon}
            <div className="text-xs">0</div>
          </button>
          <button onClick={changePriority(1)} type="button">
            <PriorityUrgent />
            <div>Urgent</div>
            <div className="grow" />
            {priority === 1 && icon}
            <div className="text-xs">1</div>
          </button>
          <button onClick={changePriority(2)} type="button">
            <PriorityHigh />
            <div>High</div>
            <div className="grow" />
            {priority === 2 && icon}
            <div className="text-xs">2</div>
          </button>
          <button onClick={changePriority(3)} type="button">
            <PriorityMedium />
            <div>Medium</div>
            <div className="grow" />
            {priority === 3 && icon}
            <div className="text-xs">3</div>
          </button>
          <button onClick={changePriority(4)} type="button">
            <PriorityLow />
            <div>Low</div>
            <div className="grow" />
            {priority === 4 && icon}
            <div className="text-xs">4</div>
          </button>
        </div>
      }
      on="click"
      position="bottom-start"
    >
      <button className="cursor-pointer" type="button">
        {!priority && <PriorityNone />}
        {priority === 1 && <PriorityUrgent className="text-orange-400" />}
        {priority === 2 && <PriorityHigh />}
        {priority === 3 && <PriorityMedium />}
        {priority === 4 && <PriorityLow />}
      </button>
    </Tooltip>
  )
}
