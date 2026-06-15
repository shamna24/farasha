import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './CustomCursor.css'

export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    
    // Check for touch device
    if ('ontouchstart' in window) {
      if (cursor) cursor.style.display = 'none'
      return
    }

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out'
      })
    }

    const handleHover = () => {
      cursor.classList.add('hovering')
    }

    const handleUnhover = () => {
      cursor.classList.remove('hovering')
    }

    document.addEventListener('mousemove', moveCursor)

    const hoverElements = document.querySelectorAll('a, button, .hover-target, input, textarea, select')
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', handleHover)
      el.addEventListener('mouseleave', handleUnhover)
    })

    return () => {
      document.removeEventListener('mousemove', moveCursor)
      hoverElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHover)
        el.removeEventListener('mouseleave', handleUnhover)
      })
    }
  }, [])

  return (
    <div ref={cursorRef} className="custom-cursor">
      <div className="sparkle-wrapper">
        <div className="sparkle-icon"></div>
      </div>
    </div>
  )
}
