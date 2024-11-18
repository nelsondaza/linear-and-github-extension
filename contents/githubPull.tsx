import { InformationCircleIcon } from '@heroicons/react/24/outline'
// eslint-disable-next-line import/no-unresolved
import iconImage from 'data-base64:~assets/icon.svg'
// eslint-disable-next-line import/no-unresolved
import cssText from 'data-text:~style.css'

import { LinearIssue, useLinearClient, usePullRequestCodes } from '@repo/linear'
import { setTooltipRoot, Tooltip } from '@repo/ui'
import { QueryClientProvider } from '@repo/utils'

import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'

export const getStyle = () => {
  const style = document.createElement('style')
  style.textContent = cssText
  return style
}

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
  const linearClient = useLinearClient()

  return (
    <QueryClientProvider>
      <div className="w-full" ref={setTooltipRoot}>
        <div className="border border-gray-300 rounded-md w-full">
          {linearClient ? (
            <>
              {codes.length === 0 && (
                <div className="flex gap-1.5 items-center px-4 py-2 text-sm">
                  <img alt="LAGE Icon" className="size-8" src={iconImage} />
                  <Tooltip
                    content={
                      <div>
                        Add your Linear issue code(s) in the <br />
                        Summary or the Title to see them here.
                      </div>
                    }
                  >
                    <div className="flex gap-1.5 items-center">
                      <div>No Linear issue codes found</div>
                      <InformationCircleIcon className="size-4 align-top text-blue-600" />
                    </div>
                  </Tooltip>
                </div>
              )}
              {codes.map((code) => (
                <LinearIssue key={code} code={code} />
              ))}
            </>
          ) : (
            <div className="flex gap-1.5 items-center px-4 py-2 text-sm">
              <img alt="LAGE Icon" className="size-8" src={iconImage} /> Linear not connected
            </div>
          )}
        </div>
      </div>
    </QueryClientProvider>
  )
}

export default PlasmoInline
