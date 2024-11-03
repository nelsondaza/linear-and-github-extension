import { cn } from '@repo/utils'
import { useQuery } from 'react-query'

import { AvatarInitials } from '@repo/linear/src/components/AvatarInitials'
import { StatusCanceled } from '@repo/linear/src/components/icons/StatusCanceled'

import { linearClient } from '../client'

import { Avatar } from './Avatar'
import {
  Assignee,
  LinearIcon,
  PriorityHigh,
  PriorityLow,
  PriorityMedium,
  PriorityNone,
  PriorityUrgent,
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

  // eslint-disable-next-line no-console
  console.log({ assignee, issue, status })

  return (
    <div className="flex flex-wrap gap-1.5 items-center justify-between border-b border-gray-300 last:border-0 px-4 py-2">
      <div className="flex gap-1.5 items-center">
        {!issue?.priority && <PriorityNone />}
        {issue?.priority === 1 && <PriorityUrgent className="text-orange-400" />}
        {issue?.priority === 2 && <PriorityHigh />}
        {issue?.priority === 3 && <PriorityMedium />}
        {issue?.priority === 4 && <PriorityLow />}
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
              <svg
                fill="currentColor"
                height="1em"
                role="img"
                viewBox="0 0 16 16"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7.39947 4.1511C8.00569 3.81649 8.758 4.05623 9.0798 4.68658L12.3549 11.1019C12.4502 11.2885 12.5 11.4966 12.5 11.7078C12.5 12.4215 11.9436 13 11.2573 13H4.74297C4.54172 13 4.34349 12.9492 4.1653 12.8519C3.55763 12.5202 3.32364 11.739 3.64268 11.1071L6.88186 4.69178C6.99813 4.46149 7.17853 4.27305 7.39947 4.1511ZM7.97623 4.96939C7.92894 4.97029 7.88112 4.98247 7.83648 5.00711C7.78125 5.0376 7.73614 5.08471 7.70708 5.14228L4.4679 11.5576C4.38814 11.7156 4.44663 11.9109 4.59855 11.9938C4.6431 12.0182 4.69266 12.0309 4.74297 12.0309L7.97564 12.0303L7.97623 4.96939Z" />
              </svg>
            )}
            {issue.estimate || ''}
          </div>
        ) : (
          <div className="text-sm ">...</div>
        )}
        <div className="flex items-center">
          {assignee ? (
            assignee.avatarUrl ? (
              <Avatar name={assignee.name} src={assignee.avatarUrl} />
            ) : (
              <AvatarInitials
                backgroundColor={assignee.avatarBackgroundColor}
                initials={assignee.initials}
                name={assignee.name}
              />
            )
          ) : (
            <Assignee className="text-gray-500" />
          )}
        </div>
      </div>
    </div>
  )
}
