import { LinearIssuesContainer } from '@repo/github'
import { usePullRequestCodes } from '@repo/linear'

import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'

export { getStyle } from '@repo/utils'

export const config: PlasmoCSConfig = {
  matches: ['https://github.com/*/pull/*'],
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: document.querySelector('#partial-discussion-header'),
  insertPosition: 'beforeend',
})

// Use this to optimize unmount lookups
export const getShadowHostId = () => 'lage-pull-request-header'

const PlasmoInline = () => {
  const codes = usePullRequestCodes()

  return <LinearIssuesContainer codes={codes} />
}

export default PlasmoInline
