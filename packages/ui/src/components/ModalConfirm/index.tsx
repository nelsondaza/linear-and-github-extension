import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { cn } from '@repo/utils'
import { cloneElement, useState } from 'react'

import type { ModalProps } from '@repo/ui'
import { Button, Modal } from '@repo/ui'

import type { AccentColor } from '../contants'
import type { FC, ReactElement } from 'react'

export interface ModalConfirmProps extends Omit<ModalProps, 'onOpenChange'> {
  onConfirm: () => void

  accent?: AccentColor
  confirmText?: string
  form?: string
  icon?: ReactElement
  onCancel?: () => void
}

export const ModalConfirm: FC<ModalConfirmProps> = ({
  accent = 'default',
  cancelText = 'Cancelar',
  className,
  confirmText = 'Confirmar',
  contentClassName,
  footerActions,
  form,
  header,
  headerComment,
  icon,
  onCancel,
  onConfirm,
  ...props
}) => {
  const Icon = icon || <ExclamationTriangleIcon />

  return (
    <Modal
      {...props}
      accent={accent}
      cancelText={cancelText}
      className={cn('ModalConfirm', className)}
      contentClassName={cn('text-center', contentClassName)}
      footerActions={
        <>
          <Button
            accent={accent}
            className="w-full sm:w-auto"
            form={form}
            onClick={onConfirm}
            type={form ? 'submit' : 'button'}
          >
            {confirmText}
          </Button>
          <Button className="w-full sm:w-auto" onClick={onCancel}>
            {cancelText}
          </Button>
          {footerActions}
        </>
      }
      header={
        <div className="flex flex-col gap-2 items-center sm:flex-row">
          <div
            className={cn(
              'mx-auto flex size-10 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:size-8',
              accent === 'blue' && 'bg-blueLightest border border-blueLight',
              accent === 'default' && 'bg-white border border-greyLight',
              accent === 'gray' && 'bg-greyLightest border border-greyDark',
              accent === 'green' && 'bg-greenLightest border border-greenLight',
              accent === 'orange' && 'bg-orangeLightest border border-orangeLight',
              accent === 'red' && 'bg-redLightest border border-redLight',
              accent === 'teal' && 'bg-transparent border border-tealLight',
            )}
          >
            {cloneElement(Icon, {
              'aria-hidden': 'true',
              className: cn(
                'size-5',
                accent === 'blue' && 'text-blue',
                accent === 'default' && 'text-text',
                accent === 'gray' && 'text-grey',
                accent === 'green' && 'text-green',
                accent === 'orange' && 'text-orange',
                accent === 'red' && 'text-red',
                accent === 'teal' && 'text-teal',
              ),
            })}
          </div>
          <div>
            {header}
            {headerComment && <div className="text-xs font-normal">{headerComment}</div>}
          </div>
        </div>
      }
      onOpenChange={onCancel}
    />
  )
}

export type ModalConfirmHookProps = Omit<ModalConfirmProps, 'initialOpen' | 'onCancel' | 'onConfirm' | 'open'>

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
