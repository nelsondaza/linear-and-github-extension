import { LinearClient } from '@linear/sdk'
// eslint-disable-next-line import/no-unresolved
import cssText from 'data-text:~style.css'
import { useEffect, useState } from 'react'

import type { IssueSearchPayload } from '@linear/sdk'

import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'

const LINEAR_PERSONAL_API_KEY = process.env.PLASMO_PUBLIC_LINEAR_PERSONAL_API_KEY

// Api key authentication
const linearClient = new LinearClient({
  apiKey: LINEAR_PERSONAL_API_KEY,
})

export const getStyle = () => {
  const style = document.createElement('style')
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  matches: ['https://github.com/*'],
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: document.querySelector('#partial-discussion-header > div:last-child'),
  insertPosition: 'afterend',
})

// Use this to optimize unmount lookups
export const getShadowHostId = () => 'plasmo-inline-example-unique-id'

const useTitleCodes = () => {
  const title = document.querySelector('#partial-discussion-header h1[class*="title"]')?.textContent || ''
  return title.match(/([A-Z]{2,}-\d+)/gm) || []
}

const useCommentCodes = () => {
  const title = document.querySelector('task-lists > div[class*="comment-body"]')?.textContent || ''
  return title.match(/([A-Z]{2,}-\d+)/gm) || []
}

const LinearIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    height="1em"
    viewBox="0 0 16 16"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2.147 9.383c-.027-.114.109-.186.192-.103L6.72 13.66c.083.083.011.219-.103.192a6.015 6.015 0 0 1-4.47-4.47ZM2 7.627a.119.119 0 0 0 .035.091l6.247 6.247a.119.119 0 0 0 .091.035c.285-.018.564-.055.836-.111a.117.117 0 0 0 .057-.198L2.31 6.734a.117.117 0 0 0-.198.057 6.007 6.007 0 0 0-.11.836ZM2.505 5.565a.119.119 0 0 0 .025.132l7.773 7.773a.118.118 0 0 0 .132.025c.215-.096.422-.203.623-.322a.118.118 0 0 0 .022-.185L3.012 4.92a.118.118 0 0 0-.185.022c-.119.2-.226.408-.322.623ZM3.519 4.169a.118.118 0 0 1-.005-.163 6.006 6.006 0 1 1 8.48 8.48.118.118 0 0 1-.163-.005L3.52 4.169Z" />
  </svg>
)

const DotsIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    height="1em"
    viewBox="0 0 16 16"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect height="1.5" opacity="0.9" rx="0.5" width="3" x="1.5" y="7.25" />
    <rect height="1.5" opacity="0.9" rx="0.5" width="3" x="6.5" y="7.25" />
    <rect height="1.5" opacity="0.9" rx="0.5" width="3" x="11.5" y="7.25" />
  </svg>
)

function LinearIssue({ code }: { code: string }) {
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
        <div className="text-sm text-gray-500 min-w-12">{code}</div>
        <LinearIcon
          className={`${issue === undefined && loading ? 'text-orange-400' : ''} ${issue && !loading ? 'text-violet-900' : ''} ${issue === null && !loading ? 'text-gray-600' : ''}`}
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

const PlasmoInline = () => {
  const titleCodes = useTitleCodes()
  const commentCodes = useCommentCodes()
  const codes = [...titleCodes, ...commentCodes].toSorted((a, b) => {
    if (a.length === b.length) {
      return a.localeCompare(b)
    }
    return a.length - b.length
  })

  return (
    <div className="border border-gray-300 rounded-md w-full text-base">
      {codes.map((code) => (
        <LinearIssue key={code} code={code} />
      ))}
    </div>
  )
}

export default PlasmoInline
