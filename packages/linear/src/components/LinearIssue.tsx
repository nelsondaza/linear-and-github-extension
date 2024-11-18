import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { Tooltip } from '@repo/ui'
import { cn } from '@repo/utils'
import { useQuery } from 'react-query'

import { AvatarInitials } from '@repo/linear/src/components/AvatarInitials'
import { PriorityPopover } from '@repo/linear/src/components/PriorityPopover'
import { StatusPopover } from '@repo/linear/src/components/StatusPopover'

import { getLinearClient } from '../client'

import { Avatar } from './Avatar'
import { Assignee, EstimateIcon, LinearIcon } from './icons'
import { PRPopover } from './PRPopover'

export const LinearIssue = ({ code }: { code: string }) => {
  const fetchIssue = useQuery({
    queryFn: async () => getLinearClient().searchIssues(code),
    queryKey: ['linear', 'issues', code, 'issue'],
  })

  const issue = fetchIssue.data?.nodes?.at(0)

  const fetchIssueState = useQuery({
    enabled: !!issue,
    queryFn: async () => issue.state,
    queryKey: ['linear', 'issues', code, 'state'],
  })

  const state = fetchIssueState.data

  const fetchAssignee = useQuery({
    enabled: !!issue,
    queryFn: async () => issue.assignee,
    queryKey: ['linear', 'issues', code, 'assignee'],
  })

  const assignee = fetchAssignee.data

  return (
    <div className="flex items-center justify-between gap-1.5 border-b border-gray-300 last:border-0 px-4 py-2">
      <div className="flex gap-1.5 items-center">
        <Tooltip content="Manage priority" on={['hover', 'focus']}>
          <PriorityPopover issue={issue} />
        </Tooltip>
        <div className="text-sm text-gray-500 min-w-16">{code}</div>
        {state ? (
          <Tooltip content="Manage state" on={['hover', 'focus']}>
            <StatusPopover issue={issue} status={state} />
          </Tooltip>
        ) : (
          <LinearIcon
            className={cn(
              fetchIssue.isFetching && 'text-orange-500',
              fetchIssue.isFetched && 'text-indigo-500',
              fetchIssue.isFetched && fetchIssue.data?.totalCount < 1 && 'text-gray-600',
              fetchIssue.isError && 'text-red-600',
            )}
          />
        )}
        {issue ? (
          <div className="text-sm">
            <a
              className="hover:text-black hover:underline underline-offset-3 line-clamp-2"
              href={issue.url}
              target={code}
              title={issue.title || ''}
            >
              {issue.title || ''}
            </a>
          </div>
        ) : (
          <div className="text-sm">
            {fetchIssue.isError ? (
              <Tooltip content="Check extension's options for the correct API_KEY.">
                <span className="text-red-500">
                  Linear connection error <InformationCircleIcon className="size-4 align-top" />
                </span>
              </Tooltip>
            ) : (
              <span className="text-gray-400">{fetchIssue.isFetched ? 'Linear issue not found' : '...'}</span>
            )}
          </div>
        )}
      </div>
      <div className="flex gap-1.5 items-center justify-end">
        <PRPopover issue={issue} />
        {issue ? (
          <Tooltip
            content={
              <div className="flex items-center gap-1">
                <EstimateIcon />
                <span>{issue.estimate || '~'}</span>
                <span>{issue.estimate === undefined ? 'No estimate' : 'Points'}</span>
              </div>
            }
          >
            <div className="flex items-center text-sm whitespace-nowrap text-gray-500">
              <EstimateIcon /> {issue.estimate || '~'}
            </div>
          </Tooltip>
        ) : null}
        {assignee ? (
          assignee.avatarUrl ? (
            <Tooltip content={assignee.name}>
              <Avatar name={assignee.name} src={assignee.avatarUrl} />
            </Tooltip>
          ) : (
            <Tooltip content={assignee.name}>
              <AvatarInitials
                backgroundColor={assignee.avatarBackgroundColor}
                initials={assignee.initials}
                name={assignee.name}
              />
            </Tooltip>
          )
        ) : (
          <Tooltip content="Unassigned">
            <Assignee className="text-gray-500" />
          </Tooltip>
        )}
      </div>
    </div>
  )
}
