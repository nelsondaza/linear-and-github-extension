import { Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { cn } from '@repo/utils'
import { forwardRef, useState } from 'react'

import { Tooltip } from '../Tooltip'

import type { ReactNode } from 'react'

export interface DrawerProps {
  children: ReactNode

  className?: string
  footer?: ReactNode
  header?: ReactNode
  initialOpen?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
}

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      children,
      className,
      footer,
      header,
      initialOpen = false,
      onOpenChange: setControlledOpen,
      open: controlledOpen,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen)
    const open = controlledOpen ?? uncontrolledOpen
    const setOpen = setControlledOpen ?? setUncontrolledOpen

    return (
      <Dialog {...props} className={cn('Drawer relative z-20', className)} onClose={setOpen} open={open} ref={ref}>
        <DialogBackdrop
          className="fixed inset-0 bg-greyDarkestBlue opacity-30 hcm:opacity-100 hcm:bg-white transition-opacity duration-300 ease-in-out data-[closed]:opacity-0"
          transition
        />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-90/100">
              <DialogPanel
                className="pointer-events-auto relative transition duration-300 ease-in-out my-px data-[closed]:translate-x-full"
                transition
              >
                <TransitionChild>
                  <div className="absolute right-3 top-2 flex duration-300 ease-in-out data-[closed]:opacity-0">
                    <Tooltip content="Cancelar" position="left">
                      <button
                        className={cn(
                          'flex items-center justify-center relative p-0.5',
                          'cursor-pointer rounded-full text-inherit shadow-xl leading-4 bg-white',

                          'ring-1 ring-inset ring-greyDark',
                          'hover:ring-blue focus:ring-blue',
                          'active:ring-blue hcm:active:ring-black',

                          'text-text',
                          'hover:text-black focus:text-black focus-visible:text-black',

                          'outline-none outline-offset-2',
                          'focus:outline-2 focus:outline-grey',
                          'hcm:focus:outline-2 hcm:focus:outline-black',
                          'active:outline-2 active:outline-blue',
                          'hcm:active:outline-2 hcm:active:outline-black',
                          // 'bg-white text-grey ring-1 ring-inset ring-grey hover:bg-grey',
                        )}
                        onClick={() => setOpen(false)}
                        type="button"
                      >
                        <XMarkIcon aria-label="Cerrar" className="size-4" />
                      </button>
                    </Tooltip>
                  </div>
                </TransitionChild>
                <div className="flex flex-col h-full bg-white border-l border-y border-grey hcm:border-black shadow-lg rounded-l-md">
                  {header && <div className="shrink border-b pl-3 pr-10 py-2 shadow-sm font-bold">{header}</div>}
                  <div className="grow overflow-y-auto">
                    <div className={cn('DrawerContent', className)}>{children}</div>
                  </div>
                  {footer && (
                    <div className="flex flex-wrap items-center justify-end gap-2 shrink border-t px-2 py-1.5">
                      {footer}
                    </div>
                  )}
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    )
  },
)

Drawer.displayName = 'Drawer'
