import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Services.css'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    num: '01',
    title: 'Exterior Design',
    desc: 'We craft stunning building exteriors that make powerful first impressions. From residential masterpieces to commercial landmarks, our designs balance form, function, and context to create facades that tell compelling architectural stories.',
    features: ['Conceptual Design', 'Material Selection', 'Color & Texture Studies', 'Environmental Integration'],
    image: '/images/hero-villa.png',
  },
  {
    num: '02',
    title: 'Landscape Architecture',
    desc: 'Our landscape architects create outdoor environments that breathe life into architecture. We design gardens, terraces, water features, and green spaces that complement the built environment and enhance the quality of life for inhabitants.',
    features: ['Garden Design', 'Water Features', 'Hardscape Planning', 'Plant Curation'],
    image: '/images/project-resort.png',
  },
  {
    num: '03',
    title: 'Facade Engineering',
    desc: 'We push the boundaries of building envelope design with innovative materials, cutting-edge engineering, and a relentless focus on performance. Our facades are both art and science — beautiful, durable, and energy-efficient.',
    features: ['Curtain Wall Systems', 'Cladding Design', 'Thermal Analysis', 'Structural Integration'],
    image: '/images/project-commercial.png',
  },
  {
    num: '04',
    title: 'Urban Planning',
    desc: 'We design holistic urban experiences that foster community and culture. Our urban planning practice creates connected, walkable, and vibrant districts that respect heritage while embracing the future.',
    features: ['Master Planning', 'Public Realm Design', 'Streetscape Design', 'Community Engagement'],
    image: '/images/project-urban.png',
  },
  {
    num: '05',
    title: '3D Visualization',
    desc: 'Our visualization team brings architectural concepts to life with photorealistic renders and immersive walkthroughs. We help clients and stakeholders experience spaces before a single brick is laid.',
    features: ['Photorealistic Renders', 'Virtual Walkthroughs', 'Aerial Perspectives', 'Animated Flythroughs'],
    image: '/images/project-hillside.png',
  },
]

const process = [
  { step: '01', title: 'Discovery', desc: 'We listen deeply to understand your vision, goals, and site context.' },
  { step: '02', title: 'Concept', desc: 'Our team develops multiple creative concepts that explore possibilities.' },
  { step: '03', title: 'Design', desc: 'The chosen concept is refined into detailed, buildable design documents.' },
  { step: '04', title: 'Realization', desc: 'We oversee construction to ensure the design vision is faithfully executed.' },
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

      // Service cards — alternate slide directions
      document.querySelectorAll('.service-card').forEach((card, i) => {
        const direction = i % 2 === 0 ? -80 : 80

        gsap.from(card.querySelector('.service-card__image-wrapper'), {
          x: direction,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 75%',
          }
        })

        gsap.from(card.querySelector('.service-card__text'), {
          x: -direction,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 70%',
          }
        })
      })

      // Process
      gsap.from('.process-step', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-process__grid',
          start: 'top 75%',
        }
      })

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

      {/* Services list */}
      <section className="services-list section" id="services-list">
        <div className="container">
          {services.map((service, i) => (
            <div key={service.num} className={`service-card ${i % 2 !== 0 ? 'service-card--reverse' : ''}`}>
              <div className="service-card__image-wrapper">
                <img src={service.image} alt={service.title} className="service-card__image" />
                <span className="service-card__num">{service.num}</span>
              </div>
              <div className="service-card__text">
                <h2 className="service-card__title">{service.title}</h2>
                <p className="service-card__desc">{service.desc}</p>
                <ul className="service-card__features">
                  {service.features.map((f, j) => (
                    <li key={j} className="service-card__feature">
                      <span className="service-card__feature-dot"></span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="services-process section" id="services-process">
        <div className="container">
          <div className="services-process__header">
            <span className="section-label">Our Process</span>
            <h2>How We Work</h2>
          </div>
          <div className="services-process__grid">
            {process.map((p) => (
              <div key={p.step} className="process-step">
                <span className="process-step__num">{p.step}</span>
                <h3 className="process-step__title">{p.title}</h3>
                <p className="process-step__desc">{p.desc}</p>
                <div className="process-step__connector"></div>
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
