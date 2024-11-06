import { Tooltip } from '@repo/ui'
import { queryClient } from '@repo/utils'
import { useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'

import type { IssueSearchResult, WorkflowState } from '@linear/sdk'
import { linearClient, StatusBacklog, StatusDone, StatusReview, StatusTodo } from '@repo/linear'
import { StatusCanceled } from '@repo/linear/src/components/icons/StatusCanceled'

import { CheckIcon } from './icons'

interface StatusPopoverProps {
  issue: IssueSearchResult
  status: WorkflowState
}

const useTeamStates = (issue: IssueSearchResult) => {
  const teamFetch = useQuery({
    enabled: !!issue,
    queryFn: async () => issue.team,
    queryKey: ['linear', 'issues', issue?.identifier, 'team'],
  })

  const team = teamFetch.data

  const statesFetch = useQuery({
    enabled: !!team,
    queryFn: async () => team.states(),
    queryKey: ['linear', 'teams', team?.id, 'states'],
  })

  return useMemo(() => {
    const orderedTypes = ['backlog', 'unstarted', 'started', 'completed', 'canceled', 'triage']
    return (
      statesFetch.data?.nodes.sort((a, b) => {
        if (a.type !== b.type) {
          for (const type of orderedTypes) {
            if (a.type === type) {
              return -1
            }
            if (b.type === type) {
              return 1
            }
          }
        }

        return a.position - b.position
      }) || []
    )
  }, [statesFetch.data])
}

function StateIcon({ state, states = [] }: { state: WorkflowState; states?: WorkflowState[] }) {
  const siblings = states.filter((s) => s.type === state.type)
  const index = siblings.findIndex((s) => s.id === state.id)
  const filledPercent = index === -1 ? 0.5 : (index + 1) / (siblings.length + 2)

  return (
    <>
      {state.type === 'backlog' && <StatusBacklog fill={state.color} />}
      {state.type === 'unstarted' && <StatusTodo fill={state.color} />}
      {state.type === 'started' && <StatusReview fill={state.color} percentage={filledPercent} />}
      {state.type === 'completed' && <StatusDone fill={state.color} />}
      {state.type === 'canceled' && <StatusCanceled fill={state.color} />}
      {state.type === 'triage' && <StatusBacklog fill={state.color} />}
    </>
  )
}

export const StatusPopover = ({ issue, status }: StatusPopoverProps) => {
  const statuses = useTeamStates(issue)

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
              <StateIcon state={_status} states={statuses} />
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
        <StateIcon state={status} states={statuses} />
      </button>
    </Tooltip>
  )
}
