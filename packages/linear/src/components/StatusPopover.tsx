import { Tooltip } from '@repo/ui'
import { queryClient } from '@repo/utils'
import { useMutation, useQuery } from 'react-query'

import type { IssueSearchResult, WorkflowState } from '@linear/sdk'
import { linearClient, StatusBacklog, StatusDoing, StatusDone, StatusReview, StatusTodo } from '@repo/linear'
import { StatusCanceled } from '@repo/linear/src/components/icons/StatusCanceled'

import { CheckIcon } from './icons'

interface StatusPopoverProps {
  issue: IssueSearchResult
  status: WorkflowState
}

export const StatusPopover = ({ issue, status }: StatusPopoverProps) => {
  const statusesFetch = useQuery({
    queryFn: async () => {
      const team = await issue.team
      return team.states()
    },
    queryKey: ['linear', 'statuses'],
  })

  const statuses = statusesFetch.data?.nodes.sort((a, b) => a.position - b.position) || []

  const queryKey = ['linear', 'issues', issue.identifier, 'state']

  const updateStatus = useMutation({
    mutationFn: async (_stateId: string) => {
      await linearClient.updateIssue(issue.id, { stateId: _stateId })
    },
    onError: (_error, _priority, context: { previousStatusFetch: WorkflowState }) => {
      queryClient.setQueryData(queryKey, context.previousStatusFetch)
    },
    onMutate: async (_stateId) => {
      await queryClient.cancelQueries({ queryKey })
      const previousStatusFetch = queryClient.getQueryData<WorkflowState>(queryKey)
      queryClient.setQueryData(queryKey, statuses.find((s) => s.id === _stateId)!)
      return { previousStatusFetch }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['linear', 'issues', issue.identifier] })
    },
  })

  const changeStatus = (newStatus: string) => async () => {
    await updateStatus.mutateAsync(newStatus)
  }

  const icon = updateStatus.isLoading ? <StatusBacklog className="animate-spin text-gray-500" /> : <CheckIcon />

  return (
    <Tooltip
      className="p-1 min-w-48"
      content={
        <div className="whitespace-nowrap *:flex *:gap-2 *:items-center *:w-full *:px-2.5 *:py-1.5 *:rounded-md *:cursor-pointer hover:*:bg-gray-100">
          {statuses.map((_status, index) => (
            <button key={_status.id} onClick={changeStatus(_status.id)} type="button">
              {_status.type === 'backlog' && <StatusBacklog />}
              {_status.type === 'unstarted' && _status.name !== 'Blocked' && <StatusTodo className="text-gray-400" />}
              {_status.type === 'unstarted' && _status.name === 'Blocked' && <StatusTodo className="text-red-500" />}
              {_status.type === 'started' && _status.name !== 'In Review' && (
                <StatusDoing className="text-yellow-400" />
              )}
              {_status.type === 'completed' && <StatusDone />}
              {_status.type === 'canceled' && <StatusCanceled className="text-gray-400" />}
              {_status.type === 'started' && _status.name === 'In Review' && (
                <StatusReview className="text-green-600" />
              )}
              {_status.type === 'triage' && <StatusBacklog />}
              <div>{_status.name}</div>
              <div className="grow" />
              {status.id === _status.id && icon}
              <div className="text-xs">{index + 1}</div>
            </button>
          ))}
        </div>
      }
      on="click"
      position="bottom-start"
    >
      <button className="cursor-pointer" type="button">
        {status.type === 'backlog' && <StatusBacklog />}
        {status.type === 'unstarted' && status.name === 'Blocked' && <StatusTodo className="text-red-500" />}
        {status.type === 'unstarted' && status.name !== 'Blocked' && <StatusTodo className="text-gray-400" />}
        {status.type === 'started' && status.name === 'In Review' && <StatusReview className="text-green-600" />}
        {status.type === 'started' && status.name !== 'In Review' && <StatusDoing className="text-yellow-400" />}
        {status.type === 'completed' && <StatusDone />}
        {status.type === 'canceled' && <StatusCanceled className="text-gray-400" />}
        {status.type === 'triage' && <StatusBacklog />}
      </button>
    </Tooltip>
  )
}
