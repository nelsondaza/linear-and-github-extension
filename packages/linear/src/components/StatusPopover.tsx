import { Tooltip } from '@repo/ui'
import { queryClient } from '@repo/utils'
import { useMemo } from 'react'
import { useMutation, useQuery } from 'react-query'

import type { Issue, WorkflowState } from '@linear/sdk'

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

interface StatusPopoverProps {
  issue: Issue
  status: WorkflowState
}

const useTeamStates = (issue: Issue) => {
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

export const StatusPopover = ({ issue, status }: StatusPopoverProps) => {
  const statuses = useTeamStates(issue)

  const queryKey = ['linear', 'issues', issue.identifier, 'state']

  const updateStatus = useMutation({
    mutationFn: async (_stateId: string) => {
      await getLinearClient(issue.id).updateIssue(issue.id, { stateId: _stateId })
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
  })

  const changeStatus = (newStatus: string) => async () => {
    await updateStatus.mutateAsync(newStatus)
  }

  const icon = updateStatus.isLoading ? <StateBacklog className="animate-spin text-gray-500" /> : <CheckIcon />

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
