import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Services.css'

gsap.registerPlugin(ScrollTrigger)

// Services list removed per user request

const process = [
  { step: '01', image: '/images/process-1.png' },
  { step: '02', image: '/images/process-2.png' },
  { step: '03', image: '/images/process-3.png' },
]

export default function Services() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Hero
      gsap.from('.services-hero__title-line', {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.3,
      })

      gsap.from('.services-hero__desc', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8,
      })

      // Removed service-card GSAP animations

      // Process - 3D Fan Out Animation
      const processCards = gsap.utils.toArray('.process-step');
      
      // Initial stack state
      gsap.set(processCards, {
        position: 'absolute',
        top: '40%', // Shifted up as requested
        left: '50%',
        xPercent: -50,
        yPercent: -50,
        z: (i) => -i * 50, // Slight depth stacking
        opacity: 0,
        transformOrigin: 'center center'
      });

      const processTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.services-process',
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Fade in the stack first
      processTl.to(processCards, { opacity: 1, duration: 0.2, stagger: 0.05 });

      // Fan out cards exactly like reference video (3 cards)
      processTl.to(processCards[0], { xPercent: -170, rotationY: -25, z: -100, ease: 'power2.inOut', duration: 1 }, 0.5)
               .to(processCards[1], { xPercent: -50, rotationY: 0, z: 50, ease: 'power2.inOut', duration: 1 }, 0.5) // Center comes forward
               .to(processCards[2], { xPercent: 70, rotationY: 25, z: -100, ease: 'power2.inOut', duration: 1 }, 0.5);

    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="services-hero section" id="services-hero">
        <div className="container">
          <span className="section-label">Our Services</span>
          <h1 className="services-hero__title">
            <span className="services-hero__title-line">Design</span>
            <span className="services-hero__title-line services-hero__title-line--accent">Excellence</span>
          </h1>
          <p className="services-hero__desc">
            From initial concept to final realization, we offer a comprehensive suite 
            of exterior architecture and design services that transform visions into 
            extraordinary built environments.
          </p>
        </div>
      </section>

      {/* Services list removed */}

      {/* Process */}
      <section className="services-process section" id="services-process">
        <div className="container">
          <div className="services-process__header">
            <span className="section-label">Our Process</span>
            <h2>How We Work</h2>
          </div>
          <div className="services-process__grid">
            {process.map((p) => (
              <div key={p.step} className="process-step" style={{ backgroundImage: `url(${p.image})` }}>
                <div className="process-step__overlay"></div>
                <div className="process-step__content">
                  <span className="process-step__num">{p.step}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="services-cta section" id="services-cta">
        <div className="container services-cta__content">
          <span className="section-label">Ready?</span>
          <h2>Let's Create<br />Something Extraordinary</h2>
          <p>Every great project begins with a conversation. Tell us about your vision.</p>
          <Link to="/contact" className="btn btn-primary">
            <span>Start a Project</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
