import { useEffect, useRef, useState } from 'react'

type UseIntersectionObserverOptions = {
  threshold?: number
  rootMargin?: string
  enabled?: boolean
}

export function useIntersectionObserver<T extends HTMLElement>({
  threshold = 0,
  rootMargin = '0px',
  enabled = true,
}: UseIntersectionObserverOptions = {}) {
  const ref = useRef<T>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || !enabled) {
      setIsIntersecting(false)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, enabled])

  return { ref, isIntersecting }
}
