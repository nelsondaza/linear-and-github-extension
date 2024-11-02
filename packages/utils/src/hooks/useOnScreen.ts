import { useEffect, useState } from 'react'

import type { MutableRefObject } from 'react'

// Ref for the element that we want to detect whether on screen
// const ref: any = useRef<HTMLDivElement>();

// Call the hook passing in ref and root margin
// In this case it would only be considered onScreen if more ...
// ... than 300px of element is visible.

// const onScreen: boolean = useOnScreen<HTMLDivElement>(ref, "-300px");

const useOnScreen = <T extends Element>(ref: MutableRefObject<T>, rootMargin = '0px'): boolean => {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        if (entry) {
          setIntersecting(entry.isIntersecting)
        }
      },
      {
        rootMargin,
      },
    )
    const { current } = ref
    if (current) {
      observer.observe(current)
    }
    return () => {
      if (current) {
        observer.unobserve(current)
      }
    }
    // only run on mount and unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return isIntersecting
}

export default useOnScreen
