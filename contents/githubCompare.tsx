import { LinearIssuesContainer } from '@repo/github'
import { useCompareCodes } from '@repo/linear'

import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'

export { getStyle } from '@repo/utils'

export const config: PlasmoCSConfig = {
  matches: ['https://github.com/*/compare/*?expand=*'],
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: document.querySelector('#pull_request_title'),
  insertPosition: 'afterend',
})

// Use this to optimize unmount lookups
export const getShadowHostId = () => 'lage-compare-header'

const PlasmoInline = () => {
  const codes = useCompareCodes()

  return <LinearIssuesContainer className="mt-2" codes={codes} />
}

export default PlasmoInline
