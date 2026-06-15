import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './CustomCursor.css'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const particlesContainerRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const particlesContainer = particlesContainerRef.current
    
    // Check for touch device
    if ('ontouchstart' in window) {
      if (cursor) cursor.style.display = 'none'
      if (particlesContainer) particlesContainer.style.display = 'none'
      return
    }

    let lastParticleTime = 0

    const createParticle = (x, y) => {
      const particle = document.createElement('div')
      particle.className = 'glitter-particle'
      particlesContainer.appendChild(particle)

      // Randomize initial position slightly around the cursor
      const offsetX = (Math.random() - 0.5) * 15
      const offsetY = (Math.random() - 0.5) * 15
      
      gsap.set(particle, {
        x: x + offsetX,
        y: y + offsetY,
        scale: Math.random() * 0.5 + 0.3,
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.5 + 0.5
      })

      gsap.to(particle, {
        y: `+=${Math.random() * 40 + 20}`, // float down
        x: `+=${(Math.random() - 0.5) * 20}`, // drift slightly
        opacity: 0,
        scale: 0,
        rotation: `+=${(Math.random() - 0.5) * 180}`,
        duration: 0.8 + Math.random() * 0.6,
        ease: 'power1.out',
        onComplete: () => {
          particle.remove()
        }
      })
    }

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out'
      })

      const now = Date.now()
      if (now - lastParticleTime > 40) { // Limit spawn rate
        createParticle(e.clientX, e.clientY)
        lastParticleTime = now
      }
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
    <>
      <div ref={particlesContainerRef} className="glitter-container"></div>
      <div ref={cursorRef} className="custom-cursor">
        <div className="sparkle-wrapper">
          <div className="sparkle-icon"></div>
        </div>
      </div>
    </>
  )
}

