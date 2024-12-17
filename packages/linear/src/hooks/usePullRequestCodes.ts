import { useEffect, useMemo, useState } from 'react'

import { getLinearCodes } from '@repo/linear'

const useTitleCodes = () =>
  getLinearCodes(document.querySelector('#partial-discussion-header h1[class*="title"]')?.textContent)

const useMetaCodes = () =>
  getLinearCodes(document.querySelector('#partial-discussion-header > div[class*="gh-header-meta"]')?.textContent)

const useCommentCodes = () => {
  const [codes, setCodes] = useState<string[]>([])

  useEffect(() => {
    const contentNode = document.querySelector('.TimelineItem')

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(() => {
      const content = contentNode?.textContent || ''
      setCodes(getLinearCodes(content))
    })

    // Start observing the target node for configured mutations
    observer.observe(contentNode, { childList: true, subtree: true })

    // Later, you can stop observing
    return () => {
      observer.disconnect()
    }
  }, [])

  return codes
}

export const usePullRequestCodes = () => {
  const titleCodes = useTitleCodes()
  const commentCodes = useCommentCodes()
  const metaCodes = useMetaCodes()

  return useMemo(
    () =>
      [...titleCodes, ...commentCodes, ...metaCodes]
        .toSorted((a, b) => {
          if (a.length === b.length) {
            return a.localeCompare(b)
          }
          return a.length - b.length
        })
        .filter((code, index, array) => array.lastIndexOf(code) === index),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [titleCodes.toString(), commentCodes.toString(), metaCodes.toString()],
  )
}
