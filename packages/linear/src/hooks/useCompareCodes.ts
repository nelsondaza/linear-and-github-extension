import { useEffect, useMemo, useState } from 'react'

import { getLinearCodes } from '@repo/linear'

import type { ChangeEventHandler } from 'react'

const useRefCodes = () => getLinearCodes(document.querySelector('#head-ref-selector')?.textContent)

const useMetaCodes = () =>
  getLinearCodes(document.querySelector('#partial-discussion-header > div[class*="gh-header-meta"]')?.textContent)

const useTitleCodes = () => {
  const [codes, setCodes] = useState<string[]>([])

  useEffect(() => {
    const contentNode: HTMLInputElement = document.querySelector('#pull_request_title')
    let timeout: NodeJS.Timeout = null

    const onInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
      const content = target?.value || ''
      clearTimeout(timeout)
      timeout = setTimeout(() => setCodes(getLinearCodes(content)), 1000)
    }

    // @ts-ignore
    contentNode.addEventListener('input', onInputChange)

    // @ts-ignore
    onInputChange({ target: contentNode })

    return () => {
      // @ts-ignore
      contentNode.removeEventListener('input', onInputChange)
      clearTimeout(timeout)
    }
  }, [])

  return codes
}

const useDescriptionCodes = () => {
  const [codes, setCodes] = useState<string[]>([])

  useEffect(() => {
    const contentNode: HTMLTextAreaElement = document.querySelector('#pull_request_body')
    let timeout: NodeJS.Timeout = null

    const onInputChange: ChangeEventHandler<HTMLTextAreaElement> = ({ target }) => {
      const content = target?.value || ''
      clearTimeout(timeout)
      timeout = setTimeout(() => setCodes(getLinearCodes(content)), 1000)
    }

    // @ts-ignore
    contentNode.addEventListener('input', onInputChange)

    // @ts-ignore
    onInputChange({ target: contentNode })

    return () => {
      // @ts-ignore
      contentNode.removeEventListener('input', onInputChange)
      clearTimeout(timeout)
    }
  }, [])

  return codes
}

export const useCompareCodes = () => {
  const refCodes = useRefCodes()
  const titleCodes = useTitleCodes()
  const descriptionCodes = useDescriptionCodes()
  const metaCodes = useMetaCodes()

  return useMemo(
    () =>
      [...refCodes, ...titleCodes, ...descriptionCodes, ...metaCodes]
        .toSorted((a, b) => {
          if (a.length === b.length) {
            return a.localeCompare(b)
          }
          return a.length - b.length
        })
        .filter((code, index, array) => array.lastIndexOf(code) === index),
    [refCodes.toString(), titleCodes.toString(), descriptionCodes.toString(), metaCodes.toString()],
  )
}
