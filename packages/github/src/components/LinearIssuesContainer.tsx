import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { getLinearClient, LinearIssue } from '@repo/linear'
import { setTooltipRoot, Tooltip } from '@repo/ui'
import { cn, QueryClientProvider } from '@repo/utils'
// eslint-disable-next-line import/no-unresolved
import iconImage from 'data-base64:~assets/icon.svg'

import type { FC } from 'react'

export interface LinearIssuesContainerProps {
  className?: string
  codes: string[]
}

export const LinearIssuesContainer: FC<LinearIssuesContainerProps> = ({ className, codes }) => (
  <QueryClientProvider>
    <div className={cn('w-full', className)} ref={setTooltipRoot}>
      <div className="border border-[--borderColor-default] rounded-md w-full">
        {codes.length === 0 && (
          <div className="flex gap-1.5 items-center px-2 py-1.5">
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
        {codes.map((code) =>
          getLinearClient(code) ? (
            <LinearIssue key={code} code={code} />
          ) : (
            <div
              key={code}
              className="flex items-center gap-1.5 border-b border-[--borderColor-default] last:border-0 px-4 py-2"
            >
              <img alt="LAGE Icon" className="size-6" src={iconImage} />
              <div>
                Linear not connected for team
                <q className="font-bold text-sm">{code.split('-').at(0)}</q> for issue{' '}
                <q className="font-bold text-sm">{code}</q>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  </QueryClientProvider>
)
