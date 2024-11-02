/* eslint-disable no-console */
import { useEffect, useRef } from 'react'

const useWhyDidYouUpdate = <T extends Record<string, unknown>>(
  name: string,
  props: T,
  compareFunction: (a: unknown, b: unknown) => unknown = (a, b) => a === b,
) => {
  const countRef = useRef(0)
  const prevPropsRef = useRef<T>()
  useEffect(() => {
    const prevProps = prevPropsRef.current
    if (prevProps && process.env.NODE_ENV === 'development') {
      const changes: { [key in keyof T]?: { from: unknown; to: unknown } } = {}
      Object.keys({ ...prevProps, ...props })
        .filter((key) => !compareFunction(prevProps[key], props[key]))
        .forEach((key) => {
          changes[key] = {
            from: prevProps[key],
            to: props[key],
          }
        })

      if (Object.keys(changes).length) {
        console.groupCollapsed(
          '[WHY-DID-YOU-UPDATE]',
          name,
          `[${countRef.current}]`,
          '>',
          Object.keys(changes).join(' & '),
        )
        console.table(changes)
        console.groupEnd()
      }
    }
    // Finally, update prevProps with current props for next hook call
    prevPropsRef.current = props
    countRef.current += 1
  })

  useEffect(() => {
    console.groupCollapsed('[WHY-DID-YOU-UPDATE]', name, 'mounted')
    console.table(props)
    console.groupEnd()
    return () => {
      console.groupCollapsed('[WHY-DID-YOU-UPDATE]', name, 'unmounted')
      console.table(props)
      console.groupEnd()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useWhyDidYouUpdate
