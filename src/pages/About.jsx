import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    icon: '◆',
    title: 'Timeless Design',
    desc: 'We create architecture that transcends trends, crafting spaces that remain beautiful and relevant for generations.',
  },
  {
    icon: '◇',
    title: 'Nature Integration',
    desc: 'Every design harmonizes with its natural surroundings, creating a seamless dialogue between built and organic environments.',
  },
  {
    icon: '▽',
    title: 'Precision Craft',
    desc: 'From concept to completion, every detail is meticulously considered — because excellence lives in the details.',
  },
  {
    icon: '○',
    title: 'Sustainable Future',
    desc: 'We embrace sustainable practices and materials, designing with responsibility for the planet and future generations.',
  },
]

const team = [
  { name: 'Arjun Mehta', role: 'Founder & Lead Architect', initial: 'AM' },
  { name: 'Sara Al-Rashid', role: 'Design Director', initial: 'SR' },
  { name: 'Liam Chen', role: 'Landscape Architect', initial: 'LC' },
  { name: 'Priya Sharma', role: 'Project Manager', initial: 'PS' },
]

const milestones = [
  { year: '2014', title: 'Studio Founded', desc: 'Farasha Design Studio was born with a vision to redefine exterior architecture.' },
  { year: '2016', title: 'First Major Award', desc: 'Won the prestigious International Architecture Award for residential design.' },
  { year: '2019', title: 'Global Expansion', desc: 'Opened offices in Dubai and Singapore, expanding our reach to new markets.' },
  { year: '2022', title: '100+ Projects', desc: 'Reached a milestone of 100 completed projects across 6 countries.' },
  { year: '2025', title: 'Sustainability Pledge', desc: 'Committed to 100% sustainable materials in all new projects by 2030.' },
]

export default function About() {
  const pageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Page header
      gsap.from('.about-hero__title-line', {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.3,
      })

      gsap.from('.about-hero__desc', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8,
      })

      // Story section
      gsap.from('.about-story__image', {
        scale: 1.1,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-story',
          start: 'top 70%',
        }
      })

      gsap.from('.about-story__text > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-story',
          start: 'top 60%',
        }
      })

      // Values
      gsap.from('.about-value', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-values__grid',
          start: 'top 75%',
        }
      })

      // Timeline
      gsap.from('.timeline-item', {
        x: -60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-timeline__list',
          start: 'top 75%',
        }
      })

      gsap.from('.about-timeline__line-fill', {
        scaleY: 0,
        duration: 2,
        ease: 'power2.out',
        transformOrigin: 'top',
        scrollTrigger: {
          trigger: '.about-timeline__list',
          start: 'top 75%',
          end: 'bottom 50%',
          scrub: true,
        }
      })

      // Team
      gsap.from('.team-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-team__grid',
          start: 'top 75%',
        }
      })

    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="about-hero section" id="about-hero">
        <div className="container">
          <span className="section-label">About Us</span>
          <h1 className="about-hero__title">
            <span className="about-hero__title-line">Crafting Spaces</span>
            <span className="about-hero__title-line about-hero__title-line--accent">That Inspire</span>
          </h1>
          <p className="about-hero__desc">
            Farasha Design Studio is a multidisciplinary exterior architecture practice 
            dedicated to creating environments that elevate the human experience through 
            thoughtful design, material innovation, and a deep respect for context.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="about-story section" id="about-story">
        <div className="container about-story__grid">
          <div className="about-story__image-wrapper">
            <img src="/images/about-studio.png" alt="Our studio" className="about-story__image" />
          </div>
          <div className="about-story__text">
            <span className="section-label">Our Story</span>
            <h2>Born from a<br /><em>passion</em> for form</h2>
            <p>
              Founded in 2014, Farasha Design Studio emerged from a shared belief 
              that the spaces between buildings are just as important as the buildings 
              themselves. Our name, "Farasha" — meaning butterfly in Arabic — reflects 
              our commitment to transformation and beauty.
            </p>
            <p>
              What began as a small studio of three passionate architects has grown into 
              a team of 25+ professionals spanning architecture, landscape design, urban 
              planning, and environmental engineering. Today, our work spans continents, 
              but our philosophy remains the same: every exterior space should tell a story.
            </p>
            <div className="about-story__highlight">
              <span className="about-story__highlight-num">25+</span>
              <span className="about-story__highlight-text">Creative professionals<br />shaping the future of exterior design</span>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values section" id="about-values">
        <div className="container">
          <div className="about-values__header">
            <span className="section-label">Our Philosophy</span>
            <h2>What Drives Us</h2>
          </div>
          <div className="about-values__grid">
            {values.map((value, i) => (
              <div key={i} className="about-value">
                <span className="about-value__icon">{value.icon}</span>
                <h3 className="about-value__title">{value.title}</h3>
                <p className="about-value__desc">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline section" id="about-timeline">
        <div className="container">
          <div className="about-timeline__header">
            <span className="section-label">Our Journey</span>
            <h2>Milestones</h2>
          </div>
          <div className="about-timeline__list">
            <div className="about-timeline__line">
              <div className="about-timeline__line-fill"></div>
            </div>
            {milestones.map((item, i) => (
              <div key={i} className="timeline-item">
                <span className="timeline-item__year">{item.year}</span>
                <div className="timeline-item__dot"></div>
                <div className="timeline-item__content">
                  <h3 className="timeline-item__title">{item.title}</h3>
                  <p className="timeline-item__desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team section" id="about-team">
        <div className="container">
          <div className="about-team__header">
            <span className="section-label">The Team</span>
            <h2>Meet the Minds</h2>
          </div>
          <div className="about-team__grid">
            {team.map((member, i) => (
              <div key={i} className="team-card">
                <div className="team-card__avatar">
                  <span>{member.initial}</span>
                </div>
                <h3 className="team-card__name">{member.name}</h3>
                <span className="team-card__role">{member.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
