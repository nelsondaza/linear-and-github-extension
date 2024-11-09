import { InformationCircleIcon } from '@heroicons/react/24/outline'
// eslint-disable-next-line import/no-unresolved
import iconImage from 'data-base64:~assets/icon.svg'
// eslint-disable-next-line import/no-unresolved
import cssText from 'data-text:~style.css'

import { LinearIssue, useCompareCodes, useLinearClient } from '@repo/linear'
import { setTooltipRoot, Tooltip } from '@repo/ui'
import { QueryClientProvider } from '@repo/utils'

import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from 'plasmo'

export const getStyle = () => {
  const style = document.createElement('style')
  style.textContent = cssText
  return style
}

export const config: PlasmoCSConfig = {
  matches: ['https://github.com/*/compare/*?expand=*'],
}

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => ({
  element: document.querySelector('#pull_request_title'),
  insertPosition: 'afterend',
})

// Use this to optimize unmount lookups
export const getShadowHostId = () => 'plasmo-inline-example-unique-id'

const PlasmoInline = () => {
  const codes = useCompareCodes()
  const linearClient = useLinearClient()

  return (
    <QueryClientProvider>
      <div className="w-full mt-2" ref={setTooltipRoot}>
        {linearClient ? (
          <div className="border border-gray-300 rounded-md w-full">
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
          </div>
        ) : null}
      </div>
    </QueryClientProvider>
  )
}

export default PlasmoInline
