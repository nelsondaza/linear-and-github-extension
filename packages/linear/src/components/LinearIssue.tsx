import { Tooltip } from '@repo/ui'
import { cn } from '@repo/utils'
import { useQuery } from 'react-query'

import { AvatarInitials } from '@repo/linear/src/components/AvatarInitials'
import { StatusCanceled } from '@repo/linear/src/components/icons/StatusCanceled'
import { PriorityPopover } from '@repo/linear/src/components/PriorityPopover'

import { linearClient } from '../client'

import { Avatar } from './Avatar'
import {
  Assignee,
  EstimateIcon,
  LinearIcon,
  StatusBacklog,
  StatusDoing,
  StatusDone,
  StatusReview,
  StatusTodo,
} from './icons'

export const LinearIssue = ({ code }: { code: string }) => {
  const fetchIssue = useQuery({
    queryFn: async () => linearClient.searchIssues(code),
    queryKey: ['linear', 'issues', code],
  })

  const issue = fetchIssue.data?.nodes?.at(0)

  const fetchIssueStatus = useQuery({
    enabled: !!issue,
    queryFn: async () => issue.state,
    queryKey: ['linear', 'issues', code, 'state'],
  })

  const status = fetchIssueStatus.data

  const fetchAssignee = useQuery({
    enabled: !!issue,
    queryFn: async () => issue.assignee,
    queryKey: ['linear', 'issues', code, 'assignee'],
  })

  const assignee = fetchAssignee.data

  return (
    <div className="flex flex-wrap gap-1.5 items-center justify-between border-b border-gray-300 last:border-0 px-4 py-2">
      <div className="flex gap-1.5 items-center">
        <PriorityPopover issue={issue} priority={issue?.priority} />
        <div className="text-sm text-gray-500 min-w-14">{code}</div>
        {status ? (
          <>
            {status.type === 'backlog' && <StatusBacklog />}
            {status.type === 'unstarted' && status.name === 'Blocked' && <StatusTodo className="text-red-500" />}
            {status.type === 'unstarted' && status.name !== 'Blocked' && <StatusTodo className="text-gray-400" />}
            {status.type === 'started' && status.name === 'In Review' && <StatusReview className="text-green-600" />}
            {status.type === 'started' && status.name !== 'In Review' && <StatusDoing className="text-yellow-400" />}
            {status.type === 'completed' && <StatusDone />}
            {status.type === 'canceled' && <StatusCanceled className="text-gray-400" />}
            {status.type === 'triage' && <StatusBacklog />}
          </>
        ) : (
          <LinearIcon
            className={cn(
              fetchIssue.isFetching && 'text-orange-500',
              fetchIssue.isFetched && 'text-indigo-500',
              fetchIssue.isFetched && fetchIssue.data.totalCount < 1 && 'text-gray-600',
            )}
          />
        )}
        {issue ? (
          <div className="text-sm ">
            <a className="hover:text-black hover:underline underline-offset-3" href={issue.url} target={code}>
              {issue.title || ''}
            </a>
          </div>
        ) : (
          <div className="text-sm ">...</div>
        )}
      </div>
      <div className="flex gap-1.5 items-center">
        {issue ? (
          <div className="flex items-center text-sm whitespace-nowrap text-gray-500">
            {issue.estimate === undefined ? (
              ''
            ) : (
              <span>
                <EstimateIcon /> {issue.estimate}
              </span>
            )}
          </div>
        ) : (
          <div className="text-sm ">...</div>
        )}
        <div className="flex items-center">
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
    </div>
  )
}
