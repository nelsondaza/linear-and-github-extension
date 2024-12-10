import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { cn } from '@repo/utils'
import { forwardRef, useState } from 'react'

import type { DialogProps } from '@headlessui/react'
import { Button, Tooltip } from '@repo/ui'

import type { AccentColor } from '../contants'
import type { ReactNode } from 'react'

export interface ModalProps extends Omit<DialogProps, 'onClose'> {
  children: ReactNode

  accent?: AccentColor
  cancelText?: string
  className?: string
  contentClassName?: string
  footer?: ReactNode
  footerActions?: ReactNode
  header?: ReactNode
  headerComment?: ReactNode
  initialOpen?: boolean
  onOpenChange?: (open: boolean) => void
  open?: boolean
  panelClassName?: string
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      accent = 'default',
      cancelText = 'Cancelar',
      children,
      className,
      contentClassName,
      footer,
      footerActions,
      header,
      headerComment,
      initialOpen = false,
      onOpenChange: setControlledOpen,
      open: controlledOpen,
      panelClassName,
      ...props
    },
    ref,
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen)
    const open = controlledOpen ?? uncontrolledOpen
    const setOpen = setControlledOpen ?? setUncontrolledOpen

    const onClose = () => {
      setOpen(false)
    }

    return (
      <Dialog {...props} className={cn('Modal relative z-modals', className)} onClose={onClose} open={open} ref={ref}>
        <DialogBackdrop
          className={cn(
            'fixed inset-0',
            'bg-greyDarkBlue opacity-85',
            'transition-opacity duration-200',
            'data-[closed]:opacity-0',
            'data-[enter]:duration-300 data-[enter]:ease-out',
            'data-[leave]:duration-200 data-[leave]:ease-in',
            'hcm:opacity-100 hcm:bg-white',
          )}
          transition
        />
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
        <div
          className={cn(
            'fixed inset-0 flex justify-center items-end sm:items-center overflow-hidden',
            'p-4 sm:p-8 md:p-10 lg:p-20 xl:p-24 2xl:p-32',
          )}
          onClick={onClose}
        >
          <DialogPanel
            className={cn(
              'flex flex-col relative overflow-hidden rounded-lg bg-white text-left shadow-xl',
              'max-h-full max-w-full sm:w-fit',
              'transition duration-200',
              'data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95',
              'data-[enter]:duration-300 data-[enter]:ease-out',
              'data-[leave]:duration-200 data-[leave]:ease-in',
              'hcm:opacity-100 hcm:border hcm:border-black',
              panelClassName,
            )}
            transition
          >
            {header || headerComment ? (
              <div className="shrink flex flex-col gap-1 border-b px-3 py-2 shadow-sm">
                {header ? <div className="px-6 sm:pl-0 text-lg font-bold">{header}</div> : null}
                {headerComment ? <div className="text-sm">{headerComment}</div> : null}
              </div>
            ) : null}
            <div className="grow overflow-y-auto">
              <div className={cn('px-2 py-3 sm:px-4', contentClassName)}>{children}</div>
            </div>
            {footer || footerActions ? (
              <div className="shrink flex flex-col gap-2 border-t px-3 py-2 shadow-sm bg-greyLightest hcm:bg-white">
                {footer ? <div>{footer}</div> : null}
                {footerActions ? (
                  <div className="flex flex-col justify-start gap-2 p-0 sm:flex-row-reverse sm:items-center sm:px-2">
                    {footerActions}
                  </div>
                ) : null}
              </div>
            ) : null}
            <div className="absolute right-3 top-2 flex">
              <Tooltip content={cancelText} position="left">
                <Button asIcon onClick={onClose}>
                  <XMarkIcon aria-label={cancelText} className="size-4" />
                </Button>
              </Tooltip>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    )
  },
)

Modal.displayName = 'Modal'
