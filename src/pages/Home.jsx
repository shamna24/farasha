import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Home.css'

gsap.registerPlugin(ScrollTrigger)

const featuredProjects = [
  {
    id: 1,
    title: 'Modern Villa',
    category: 'Residential',
    location: 'Client Project',
    image: '/images/project-client-1.jpg',
  },
  {
    id: 2,
    title: 'Luxury Estate',
    category: 'Residential',
    location: 'Client Project',
    image: '/images/project-client-2.jpg',
  },
  {
    id: 3,
    title: 'Urban Residence',
    category: 'Urban',
    location: 'Client Project',
    image: '/images/project-client-3.jpg',
  },
  {
    id: 4,
    title: 'Serene Retreat',
    category: 'Residential',
    location: 'Client Project',
    image: '/images/project-client-4.jpg',
  },
]



const services = [
  {
    num: '01',
    title: 'Exterior Design',
    desc: 'Transforming visions into architectural masterpieces that define skylines and elevate living.',
  },
  {
    num: '02',
    title: 'Landscape Architecture',
    desc: 'Creating harmonious outdoor environments that seamlessly blend nature with design intent.',
  },
  {
    num: '03',
    title: 'Facade Engineering',
    desc: 'Engineering innovative building envelopes that balance aesthetics, performance, and sustainability.',
  },
  {
    num: '04',
    title: 'Urban Planning',
    desc: 'Designing integrated urban experiences that foster community, culture, and connectivity.',
  },
]

export default function Home() {
  const heroRef = useRef(null)
  const introVideoContainerRef = useRef(null)
  const introVideoRef = useRef(null)
  const introText1Ref = useRef(null)
  const introText2Ref = useRef(null)
  const aboutRef = useRef(null)
  const servicesRef = useRef(null)
  const projectsRef = useRef(null)

  const ctaRef = useRef(null)

  useEffect(() => {
    let scrollTimeout;
    const ctx = gsap.context((self) => {

      // Hero animations
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      heroTl
        .from('.hero__label', { y: 30, opacity: 0, duration: 0.8, delay: 1.8 })
        .from('.hero__title-line', { y: 100, opacity: 0, duration: 1, stagger: 0.15 }, '-=0.4')
        .from('.hero__subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
        .from('.hero__cta-group', { y: 30, opacity: 0, duration: 0.8 }, '-=0.4')
        .from('.hero__scroll-indicator', { opacity: 0, duration: 1 }, '-=0.3')

      // Video scroll animation (Intro) - Removed for now as requested.

      // Hero parallax
      gsap.fromTo('.hero__bg-image',
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top', // Start immediately since it's the first section again
            end: 'bottom top',
            scrub: true,
          }
        }
      )

      // About section
      gsap.from('.home-about__image-wrapper', {
        x: -80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 70%',
        }
      })

      gsap.from('.home-about__text > *', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 65%',
        }
      })

      // Services
      gsap.from('.home-service', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 70%',
        }
      })

      // Projects — horizontal scroll
      const projectsTrack = document.querySelector('.home-projects__track')
      if (projectsTrack) {
        gsap.to(projectsTrack, {
          x: () => -(projectsTrack.scrollWidth - window.innerWidth + 200),
          ease: 'none',
          scrollTrigger: {
            trigger: projectsRef.current,
            start: 'top top',
            end: () => `+=${projectsTrack.scrollWidth - window.innerWidth + 200}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          }
        })
      }



      // CTA Section
      gsap.from('.home-cta__content > *', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 75%',
        }
      })

    }, heroRef)

    return () => {
      ctx.revert();
      if (scrollTimeout) {
         gsap.ticker.remove(scrollTimeout);
      }
    }
  }, [])

  return (
    <div ref={heroRef}>
      {/* ===== HERO ===== */}
      <section className="hero section" id="hero-section">
        <div className="hero__bg overflow-hidden">
          <img src="/images/hero-villa.png" alt="Modern luxury villa" className="hero__bg-image w-full h-full object-cover" />
          <div className="hero__bg-overlay"></div>
          <div className="hero__bg-grain"></div>
        </div>

        <div className="container hero__content">
          <span className="hero__label section-label">Exterior Architecture</span>
          <h1 className="hero__title">
            <span className="hero__title-line">Where Vision</span>
            <span className="hero__title-line hero__title-line--accent">Meets</span>
            <span className="hero__title-line">Landscape</span>
          </h1>
          <p className="hero__subtitle">
            We craft exterior spaces that transcend the ordinary — blending architectural
            precision with natural beauty to create environments that inspire.
          </p>
          <div className="hero__cta-group">
            <Link to="/projects" className="btn btn-primary">
              <span>View Our Work</span>
            </Link>
            <Link to="/contact" className="btn">
              <span>Start a Project</span>
            </Link>
          </div>
        </div>

        <div className="hero__scroll-indicator">
          <span>Scroll</span>
          <div className="hero__scroll-line">
            <div className="hero__scroll-dot"></div>
          </div>
        </div>


      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section ref={aboutRef} className="home-about section" id="home-about-section">
        <div className="container home-about__grid">
          <div className="home-about__image-wrapper w-full relative overflow-hidden rounded-lg">
            <img src="/images/project-modern-home.png" alt="Modern architectural work" className="home-about__image w-full h-[400px] md:h-[550px] lg:h-[650px] object-cover max-w-full" />
            <div className="home-about__image-accent"></div>
          </div>
          <div className="home-about__text">
            <span className="section-label">About Our Studio</span>
            <h2>Architecture is<br /><em>frozen music</em></h2>
            <p>
              At Farasha Design Studio, we believe that exceptional exterior architecture 
              is born from the harmony between human ambition and nature's canvas. Our team 
              of visionary architects and landscape designers brings over a decade of 
              expertise to every project.
            </p>
            <p>
              From sprawling residential estates to iconic commercial facades, we approach 
              each commission as a unique opportunity to push the boundaries of what's possible.
            </p>
            <div className="divider"></div>
            <Link to="/about" className="btn-arrow">
              Learn Our Story
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SERVICES PREVIEW ===== */}
      <section ref={servicesRef} className="home-services section" id="home-services-section">
        <div className="container">
          <div className="home-services__header">
            <span className="section-label">What We Do</span>
            <h2>Our Expertise</h2>
          </div>
          <div className="home-services__grid">
            {services.map((service) => (
              <div key={service.num} className="home-service">
                <span className="home-service__num">{service.num}</span>
                <h3 className="home-service__title">{service.title}</h3>
                <p className="home-service__desc">{service.desc}</p>
                <div className="home-service__line"></div>
              </div>
            ))}
          </div>
          <div className="home-services__cta">
            <Link to="/services" className="btn-arrow">
              Explore All Services
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PROJECTS HORIZONTAL SCROLL ===== */}
      <section ref={projectsRef} className="home-projects" id="home-projects-section">
        <div className="home-projects__track">
          <div className="home-projects__intro">
            <span className="section-label">Featured Work</span>
            <h2>Selected<br />Projects</h2>
            <p>A curated collection of our most impactful exterior architecture and landscape design projects.</p>
          </div>

          {featuredProjects.map((project, i) => (
            <Link to="/projects" key={project.id} className="home-project-card hover-target">
              <div className="home-project-card__image-wrapper overflow-hidden w-full h-full rounded-xl">
                <img src={project.image} alt={project.title} className="home-project-card__image w-full h-full object-cover max-w-full" />
                <div className="home-project-card__overlay"></div>
              </div>
              <div className="home-project-card__info">
                <span className="home-project-card__category">{project.category}</span>
                <h3 className="home-project-card__title">{project.title}</h3>
                <span className="home-project-card__location">{project.location}</span>
              </div>
              <span className="home-project-card__num">0{i + 1}</span>
            </Link>
          ))}

          <div className="home-projects__end">
            <Link to="/projects" className="btn btn-primary">
              <span>View All Projects</span>
            </Link>
          </div>
        </div>
      </section>



      {/* ===== CTA ===== */}
      <section ref={ctaRef} className="home-cta section" id="home-cta-section">
        <div className="home-cta__bg overflow-hidden w-full h-full absolute inset-0">
          <img src="/images/project-hillside.png" alt="Architecture project" className="home-cta__bg-image w-full h-full object-cover max-w-full" />
          <div className="home-cta__bg-overlay"></div>
        </div>
        <div className="container home-cta__content">
          <span className="section-label">Start Your Journey</span>
          <h2>Ready to Transform<br />Your Vision?</h2>
          <p>
            Every masterpiece begins with a conversation. Let's discuss how 
            Farasha Design Studio can bring your architectural dreams to life.
          </p>
          <Link to="/contact" className="btn btn-primary">
            <span>Get in Touch</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
