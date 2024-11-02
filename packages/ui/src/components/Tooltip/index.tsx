import {
  arrow,
  autoUpdate,
  flip,
  FloatingArrow,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
} from '@floating-ui/react'
import { cn } from '@repo/utils'
import { cloneElement, forwardRef, isValidElement, useRef, useState } from 'react'

import type { Placement } from '@floating-ui/react'

import type { ReactElement, ReactNode } from 'react'

const ARROW_SIZE_PX = 6
const OFFSET_PX = 2

export interface TooltipProps {
  children: ReactElement
  content: ReactNode

  className?: string
  initialOpen?: boolean
  on?: 'click' | 'focus' | 'hover' | ('click' | 'focus' | 'hover')[]
  onOpenChange?: (open: boolean) => void
  open?: boolean
  position?: Placement
}

export const Tooltip = forwardRef<HTMLElement, TooltipProps>(
  (
    {
      children,
      className,
      content,
      initialOpen = false,
      on = ['click', 'focus', 'hover'],
      onOpenChange: setControlledOpen,
      open: controlledOpen,
      position = 'top',
    },
    ref,
  ) => {
    const arrowRef = useRef(null)
    const [uncontrolledOpen, setUncontrolledOpen] = useState(initialOpen)
    const open = controlledOpen ?? uncontrolledOpen
    const setOpen = setControlledOpen ?? setUncontrolledOpen

    const floating = useFloating({
      middleware: [
        offset(OFFSET_PX + ARROW_SIZE_PX),
        flip({
          crossAxis: position.includes('-'),
          fallbackAxisSideDirection: 'start',
          padding: OFFSET_PX,
        }),
        shift({ padding: OFFSET_PX }),
        arrow({
          element: arrowRef,
          padding: OFFSET_PX * 2,
        }),
      ],
      onOpenChange: setOpen,
      open,
      placement: position,
      whileElementsMounted: autoUpdate,
    })

    const activeActions = Array.isArray(on) ? on : [on]
    const hover = useHover(floating.context, { enabled: activeActions.includes('hover') && !controlledOpen })
    const focus = useFocus(floating.context, { enabled: activeActions.includes('focus') && !controlledOpen })
    const click = useClick(floating.context, { enabled: activeActions.includes('click') && !controlledOpen })
    const dismiss = useDismiss(floating.context)
    const role = useRole(floating.context, { role: 'tooltip' })

    const interactions = useInteractions([click, focus, hover, dismiss, role])

    // @todo This is a workaround for the issue where the Tooltip component is Semantic UI's component
    const requireWrap = typeof children?.type === 'function' || !isValidElement(children)

    const childRef = useMergeRefs([
      floating.context.refs.setReference,
      // @ts-ignore
      children?.ref,
      // @ts-ignore
      children?.innerRef,
      children?.props?.ref,
      children?.props?.innerRef,
      ref,
    ])

    const trigger = requireWrap
      ? cloneElement(
          <span />,
          interactions.getReferenceProps({
            // @ts-ignore
            'data-tooltip-state': floating.context.open ? 'open' : 'closed',
            ref: childRef,
          }),
          children,
        )
      : cloneElement(
          children,
          interactions.getReferenceProps({
            ...(children?.props || undefined),
            // @ts-ignore
            'data-tooltip-state': floating.context.open ? 'open' : 'closed',
            ref: childRef,
          }),
        )

    return (
      <>
        {trigger}
        {floating.context.open ? (
          <FloatingPortal>
            <div
              {...interactions.getFloatingProps({
                className: cn(
                  'Tooltip z-[1900] bg-white border border-greyDark stroke-greyDark rounded-md shadow-md text-xs px-2 py-1',
                  className,
                ),
                ref: floating.context.refs.setFloating,
                style: floating.context.floatingStyles,
              })}
            >
              {content}
              <FloatingArrow
                className="size-4 fill-white *:border-none *:stroke-inherit [&>path:first-of-type]:stroke-2 [&>path:last-of-type]:stroke-none [&>path:last-of-type]:stroke-0"
                context={floating.context}
                ref={arrowRef}
                strokeWidth={1}
              />
            </div>
          </FloatingPortal>
        ) : null}
      </>
    )
  },
)

Tooltip.displayName = 'Tooltip'
