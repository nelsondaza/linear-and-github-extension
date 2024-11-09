import { useEffect, useMemo, useState } from 'react'

export const useTitleCodes = () => {
  const title = document.querySelector('#partial-discussion-header h1[class*="title"]')?.textContent || ''
  return title.match(/([A-Z]{2,}-\d+)/gm) || []
}

export const useCommentCodes = () => {
  const [codes, setCodes] = useState<string[]>([])

  useEffect(() => {
    const contentNode = document.querySelector('.TimelineItem')

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(() => {
      const content = contentNode?.textContent || ''
      setCodes(content.match(/([A-Z]{2,}-\d+)/gm) || [])
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

  return useMemo(
    () =>
      [...titleCodes, ...commentCodes]
        .toSorted((a, b) => {
          if (a.length === b.length) {
            return a.localeCompare(b)
          }
          return a.length - b.length
        })
        .filter((code, index, array) => array.lastIndexOf(code) === index),
    [titleCodes.toString(), commentCodes.toString()],
  )
}
