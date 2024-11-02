import { useMemo } from 'react'

export const useTitleCodes = () => {
  const title = document.querySelector('#partial-discussion-header h1[class*="title"]')?.textContent || ''
  return title.match(/([A-Z]{2,}-\d+)/gm) || []
}

export const useCommentCodes = () => {
  const comment = document.querySelector('task-lists > div[class*="comment-body"]')?.textContent || ''
  return comment.match(/([A-Z]{2,}-\d+)/gm) || []
}

export const useDocumentCodes = () => {
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
    [],
  )
}
