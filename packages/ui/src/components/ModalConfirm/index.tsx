import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { cn } from '@repo/utils'
import { useState } from 'react'

import type { FC, ReactNode } from 'react'

export interface ModalConfirmProps {
  children: ReactNode
  onConfirm: () => void

  accent?: 'blue' | 'default' | 'green' | 'orange' | 'red' | 'teal'
  cancelText?: string
  className?: string
  confirmText?: string
  initialOpen?: boolean
  onCancel?: () => void
  onOpenChange?: (open: boolean) => void
  open?: boolean
  title?: ReactNode
}

export const ModalConfirm: FC<ModalConfirmProps> = ({
  accent = 'default',
  cancelText,
  children,
  className,
  confirmText,
  initialOpen = false,
  onCancel: setControlledCancel,
  onConfirm: setControlledConfirm,
  onOpenChange: setControlledOpen,
  open: controlledOpen,
  title,
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen)
  const open = controlledOpen ?? uncontrolledOpen
  const setOpen = setControlledOpen ?? setUncontrolledOpen

  const onCancel = () => {
    setOpen(false)
    setControlledCancel?.()
  }

  const onConfirm = () => {
    setOpen(false)
    setControlledConfirm()
  }

  return (
    <Dialog className={cn('ModalConfirm relative z-[200]', className)} onClose={onCancel} open={open}>
      <DialogBackdrop
        className="fixed inset-0 bg-gray-500 opacity-85 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        transition
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            className="relative overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-fit sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            transition
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div
                  className={cn(
                    'mx-auto flex size-12 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:size-10',
                    accent === 'blue' && 'bg-blueLightest border border-blueLight',
                    accent === 'default' && 'bg-greyLightest border border-greyDark',
                    accent === 'green' && 'bg-greenLightest border border-greenLight',
                    accent === 'orange' && 'bg-orangeLightest border border-orangeLight',
                    accent === 'red' && 'bg-redLightest border border-redLight',
                    accent === 'teal' && 'bg-transparent border border-tealLight',
                  )}
                >
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className={cn(
                      'size-6',
                      accent === 'blue' && 'text-blue',
                      accent === 'default' && 'text-greyDark',
                      accent === 'green' && 'text-green',
                      accent === 'orange' && 'text-orange',
                      accent === 'red' && 'text-red',
                      accent === 'teal' && 'text-teal',
                    )}
                  />
                </div>
                <div className="mt-3 text-center sm:ml-3 sm:mt-0 sm:text-left">
                  {title && (
                    <DialogTitle as="div" className="text-lg font-bold leading-6">
                      {title}
                    </DialogTitle>
                  )}
                  <div className="text-sm">{children}</div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                className={cn(
                  'inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-bold text-white shadow-sm hover:opacity-85 sm:ml-3 sm:w-auto',
                  accent === 'blue' && 'bg-blue',
                  accent === 'default' && 'bg-greyDark',
                  accent === 'green' && 'bg-green',
                  accent === 'orange' && 'bg-orange',
                  accent === 'red' && 'bg-red',
                  accent === 'teal' && 'bg-teal',
                )}
                onClick={onConfirm}
                type="button"
              >
                {confirmText || 'Confirmar'}
              </button>
              <button
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-bold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                data-autofocus
                onClick={onCancel}
                type="button"
              >
                {cancelText || 'Cancelar'}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export type ModalConfirmHookProps = Omit<
  ModalConfirmProps,
  'initialOpen' | 'onCancel' | 'onConfirm' | 'onOpenChange' | 'open'
>

export const useModalConfirm = () => {
  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null)

  const confirm = () =>
    new Promise<boolean>((resolve) => {
      setPromise({ resolve })
    })

  const onClose = () => {
    setPromise(null)
  }

  const onConfirm = () => {
    promise?.resolve(true)
    onClose()
  }

  const onCancel = () => {
    promise?.resolve(false)
    onClose()
  }

  const Confirm: FC<ModalConfirmHookProps> = (props) => (
    <ModalConfirm {...props} onCancel={onCancel} onConfirm={onConfirm} open={promise !== null}>
      {props.children}
    </ModalConfirm>
  )

  return [Confirm, confirm] as const
}
