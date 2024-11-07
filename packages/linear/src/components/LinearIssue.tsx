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
    <div className="flex flex-wrap gap-1.5 items-center justify-between border-b border-gray-300 last:border-0 px-4 py-2">
      <div className="flex gap-1.5 items-center">
        <PriorityPopover issue={issue} />
        <div className="text-sm text-gray-500 min-w-16">{code}</div>
        {state ? (
          <StatusPopover issue={issue} status={state} />
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
            <a className="hover:text-black hover:underline underline-offset-3" href={issue.url} target={code}>
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
              '...'
            )}
          </div>
        )}
      </div>
      <div className="flex gap-1.5 items-center">
        {issue ? (
          <div className="flex items-center text-sm whitespace-nowrap text-gray-500">
            {issue.estimate === undefined ? (
              ''
            ) : (
              <>
                <EstimateIcon /> {issue.estimate}
              </>
            )}
          </div>
        ) : (
          <div className="text-sm ">...</div>
        )}
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
