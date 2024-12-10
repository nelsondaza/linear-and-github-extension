import { cn } from '@repo/utils'
import { forwardRef } from 'react'

import type { HTMLAttributes, ReactNode } from 'react'

interface HeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode
}

export const Head = forwardRef<HTMLTableSectionElement, HeadProps>((props, ref) => (
  <thead {...props} ref={ref}>
    {props.children}
  </thead>
))

Head.displayName = 'Head'

interface FootProps extends HTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode
}

export const Foot = forwardRef<HTMLTableSectionElement, FootProps>((props, ref) => (
  <tfoot {...props} ref={ref}>
    {props.children}
  </tfoot>
))

Foot.displayName = 'Foot'

interface BodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  children?: ReactNode

  className?: string
}

export const Body = forwardRef<HTMLTableSectionElement, BodyProps>(({ className, ...props }, ref) => (
  <tbody {...props} className={cn('divide-y divide-greyLight hcm:divide-text', className)} ref={ref}>
    {props.children}
  </tbody>
))

Body.displayName = 'Body'

interface RowProps extends HTMLAttributes<HTMLTableRowElement> {
  children?: ReactNode

  className?: string
}

export const Row = forwardRef<HTMLTableRowElement, RowProps>(({ className, ...props }, ref) => (
  <tr
    {...props}
    className={cn(
      'Row *:py-1.5 *:px-2 divide-x divide-greyLight',
      '*:align-text-top [&:nth-child(3n)]:bg-greyLightest',
      'hcm:divide-text hcm:[&:nth-child(3n)]:bg-white',
      'hover:bg-blueLightest',
      'print:pointer-events-none',
      className,
    )}
    ref={ref}
  >
    {props.children}
  </tr>
))

Row.displayName = 'Row'

interface RowHeadProps extends HTMLAttributes<HTMLTableRowElement> {
  children?: ReactNode

  className?: string
}

export const RowHead = forwardRef<HTMLTableRowElement, RowHeadProps>(({ className, ...props }, ref) => (
  <tr
    {...props}
    className={cn(
      'RowHead *:py-1.5 *:px-2 bg-greyLightest divide-x divide-greyLight',
      'hcm:divide-text hcm:bg-white',
      className,
    )}
    ref={ref}
  >
    {props.children}
  </tr>
))

RowHead.displayName = 'RowHead'

interface CellProps extends HTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode
}

export const Cell = forwardRef<HTMLTableCellElement, CellProps>((props, ref) => (
  <td {...props} ref={ref}>
    {props.children}
  </td>
))

Cell.displayName = 'Cell'

interface CellHeadProps extends HTMLAttributes<HTMLTableCellElement> {
  children?: ReactNode
}

export const CellHead = forwardRef<HTMLTableCellElement, CellHeadProps>((props, ref) => (
  <th {...props} ref={ref}>
    {props.children}
  </th>
))

CellHead.displayName = 'CellHead'

interface TableProps extends HTMLAttributes<HTMLTableElement> {
  children?: ReactNode

  className?: string
  classNameContainer?: string
  classNameTable?: string
}

export const TableBase = forwardRef<HTMLTableElement, TableProps>(
  ({ className, classNameContainer, classNameTable, ...props }, ref) => (
    <div className={cn('Table w-full overflow-x-auto max-w-screen-1280', className)}>
      <div
        className={cn(
          'overflow-hidden border rounded hcm:border-text print:!max-w-full min-w-full inline-block',
          classNameContainer,
        )}
      >
        <table
          {...props}
          className={cn(
            'min-w-full table-fixed border-collapse divide-y divide-greyLight hcm:divide-text',
            classNameTable,
          )}
          ref={ref}
        >
          {props.children}
        </table>
      </div>
    </div>
  ),
)

TableBase.displayName = 'Table'

export const Table = Object.assign(TableBase, {
  Body,
  Cell,
  CellHead,
  Foot,
  Head,
  Row,
  RowHead,
})
