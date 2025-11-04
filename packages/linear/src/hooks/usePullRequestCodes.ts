import { useEffect, useMemo, useState } from 'react'

import { getLinearCodes } from '@repo/linear'

const useTitleCodes = () =>
  getLinearCodes(document.querySelector('#partial-discussion-header h1[class*="title"]')?.textContent)

const useMetaCodes = () =>
  getLinearCodes(document.querySelector('#partial-discussion-header > div[class*="gh-header-meta"]')?.textContent)

const useCommentCodes = () => {
  const [codes, setCodes] = useState<string[]>([])

  useEffect(() => {
    const cleanups = []

    function onCommentChange(comment: Element) {
      const content = comment.textContent || ''
      setCodes(getLinearCodes(content))
    }

    function observeComment() {
      const commentNode = document.querySelector('.TimelineItem')
      if (!commentNode) {
        return false
      }

      // Check comment content in case it already contains the text
      onCommentChange(commentNode)

      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(() => {
        onCommentChange(commentNode)
      })

      // Start observing the target node for configured mutations
      observer.observe(commentNode, { childList: true, subtree: true })
      cleanups.push(() => observer.disconnect())
      return true
    }

    // If the comment element is not found, observe the body to wait for it
    if (!observeComment()) {
      const observer = new MutationObserver(() => {
        if (observeComment()) {
          observer.disconnect()
        }
      })
      // Create an observer instance linked to the callback function
      observer.observe(document.body, { childList: true, subtree: true })
      cleanups.push(() => observer.disconnect())
    }

    // Later, you can stop observing
    return () => {
      cleanups.forEach((clean) => clean())
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
