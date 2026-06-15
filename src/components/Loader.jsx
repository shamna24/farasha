import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Loader({ onComplete }) {
  const loaderRef = useRef(null)
  const brandRef = useRef(null)
  const lineRef = useRef(null)
  const taglineRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
          onComplete
        })
      }
    })

    tl.to(brandRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out'
    })
    .to(lineRef.current, {
      width: 120,
      duration: 1,
      ease: 'power2.inOut'
    }, '-=0.3')
    .to(taglineRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.4')
    .to({}, { duration: 0.5 })

    return () => tl.kill()
  }, [onComplete])

  return (
    <div ref={loaderRef} className="loader">
      <div ref={brandRef} className="loader-brand">Farasha</div>
      <div ref={lineRef} className="loader-line"></div>
      <div ref={taglineRef} className="loader-tagline">Design Studio</div>
    </div>
  )
}
