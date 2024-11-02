// eslint-disable-next-line import/no-unresolved
import cssText from 'data-text:~style.css'

import { LinearIssue, useDocumentCodes } from '@repo/linear'

import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'

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

const PlasmoInline = () => {
  const codes = useDocumentCodes()

  return (
    <div className="border border-gray-300 rounded-md w-full text-base">
      {codes.map((code) => (
        <LinearIssue key={code} code={code} />
      ))}
    </div>
  )
}

export default PlasmoInline
