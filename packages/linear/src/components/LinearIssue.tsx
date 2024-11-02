import { cn } from '@repo/utils'
import { useEffect, useState } from 'react'

import type { IssueSearchPayload } from '@linear/sdk'

import { linearClient } from '../client'

import { DotsIcon } from './DotsIcon'
import { LinearIcon } from './LinearIcon'

export const LinearIssue = ({ code }: { code: string }) => {
  const [loading, setLoading] = useState(true)
  const [issue, setIssue] = useState<IssueSearchPayload | null | undefined>(undefined)

  useEffect(() => {
    linearClient
      .searchIssues(code)
      .then(setIssue)
      .catch(() => {
        setIssue(null)
      })
      .finally(() => setLoading(false))
  }, [code])

  useEffect(() => {
    // eslint-disable-next-line no-console
    linearClient.projectStatuses().then(console.log)
  }, [])

  return (
    <div className="flex flex-wrap gap-1.5 items-center justify-between border-b border-gray-300 last:border-0 px-4 py-2">
      <div className="flex gap-1.5 items-center">
        <DotsIcon />
        <div className="text-sm text-gray-500 min-w-14">{code}</div>
        <LinearIcon
          className={cn(
            issue === undefined && loading && 'text-orange-400',
            issue && !loading && 'text-violet-900',
            issue === null && !loading && 'text-gray-600',
          )}
        />
        {issue ? (
          <div className="text-sm ">
            <a href={issue.nodes.at(0)?.url} target={code}>
              {issue.nodes.at(0)?.title || ''}
            </a>
          </div>
        ) : (
          <div className="text-sm ">...</div>
        )}
      </div>
      <div className="flex gap-1.5 items-center">
        {issue ? (
          <div className="flex items-center text-sm whitespace-nowrap text-gray-500">
            {issue.nodes.at(0)?.estimate === undefined ? (
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
            {issue.nodes.at(0)?.estimate || ''}
          </div>
        ) : (
          <div className="text-sm ">...</div>
        )}
      </div>
    </div>
  )
}
