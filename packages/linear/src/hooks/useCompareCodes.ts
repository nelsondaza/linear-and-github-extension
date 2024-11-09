import { useEffect, useMemo, useState } from 'react'

import type { ChangeEventHandler } from 'react'

const useRefCodes = () => {
  const title = document.querySelector('#head-ref-selector')?.textContent || ''
  return title.toLocaleUpperCase().match(/([A-Z]{2,}-\d+)/gm) || []
}

const useTitleCodes = () => {
  const [codes, setCodes] = useState<string[]>([])

  useEffect(() => {
    const contentNode: HTMLInputElement = document.querySelector('#pull_request_title')
    let timeout: NodeJS.Timeout = null

    const onInputChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
      const content = target?.value || ''
      clearTimeout(timeout)
      timeout = setTimeout(() => setCodes(content.match(/([A-Z]{2,}-\d+)/gm) || []), 1000)
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
      timeout = setTimeout(() => setCodes(content.match(/([A-Z]{2,}-\d+)/gm) || []), 1000)
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
  const titieCodes = useTitleCodes()
  const descriptionCodes = useDescriptionCodes()

  return useMemo(
    () =>
      [...refCodes, ...titieCodes, ...descriptionCodes]
        .toSorted((a, b) => {
          if (a.length === b.length) {
            return a.localeCompare(b)
          }
          return a.length - b.length
        })
        .filter((code, index, array) => array.lastIndexOf(code) === index),
    [refCodes.toString(), titieCodes.toString(), descriptionCodes.toString()],
  )
}
