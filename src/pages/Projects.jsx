import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

const categories = ['All', 'Residential', 'Commercial', 'Resort', 'Urban']

const projects = [
  {
    id: 1,
    title: 'Serenity Villa',
    category: 'Residential',
    location: 'Malibu, California',
    year: '2024',
    area: '12,500 sq ft',
    image: '/images/hero-villa.png',
    desc: 'A luxurious seaside villa that seamlessly integrates indoor and outdoor living with floor-to-ceiling glass and an infinity pool overlooking the Pacific.',
  },
  {
    id: 2,
    title: 'The Meridian Tower',
    category: 'Commercial',
    location: 'Dubai, UAE',
    year: '2023',
    area: '85,000 sq ft',
    image: '/images/project-commercial.png',
    desc: 'A landmark commercial building featuring a living vertical garden facade that reduces energy consumption while creating a striking visual identity.',
  },
  {
    id: 3,
    title: 'Horizon Retreat',
    category: 'Resort',
    location: 'Bali, Indonesia',
    year: '2024',
    area: '32,000 sq ft',
    image: '/images/project-resort.png',
    desc: 'An exclusive eco-resort blending Balinese architectural traditions with contemporary design, set within a lush tropical landscape.',
  },
  {
    id: 4,
    title: 'Summit Residence',
    category: 'Residential',
    location: 'Aspen, Colorado',
    year: '2023',
    area: '18,000 sq ft',
    image: '/images/project-hillside.png',
    desc: 'A dramatic hillside mansion with cascading terraces that follow the natural contour of the mountain, maximizing panoramic views.',
  },
  {
    id: 5,
    title: 'Lakefront Pavilion',
    category: 'Residential',
    location: 'Lake Como, Italy',
    year: '2022',
    area: '9,800 sq ft',
    image: '/images/project-waterfront.png',
    desc: 'An elegant waterfront residence that reimagines Italian lakeside living with sleek modern forms and reflective glass surfaces.',
  },
  {
    id: 6,
    title: 'Heritage Row',
    category: 'Urban',
    location: 'London, UK',
    year: '2024',
    area: '42,000 sq ft',
    image: '/images/project-urban.png',
    desc: 'A sensitive urban redevelopment that transforms heritage brownstones with contemporary glass additions while preserving neighborhood character.',
  },
  {
    id: 7,
    title: 'Canopy House',
    category: 'Residential',
    location: 'Singapore',
    year: '2023',
    area: '8,200 sq ft',
    image: '/images/project-modern-home.png',
    desc: 'A tropical modern home with dramatic cantilevered volumes that create deep shade and frame garden views from every room.',
  },
]

export default function Projects() {
  const pageRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const gridRef = useRef(null)

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.projects-hero__title-line', {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.3,
      })

      gsap.from('.projects-hero__desc', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8,
      })
    }, pageRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    // Animate grid items on filter change
    if (gridRef.current) {
      gsap.from(gridRef.current.querySelectorAll('.project-card'), {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      })
    }
  }, [activeFilter])

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="projects-hero section" id="projects-hero">
        <div className="container">
          <span className="section-label">Our Portfolio</span>
          <h1 className="projects-hero__title">
            <span className="projects-hero__title-line">Selected</span>
            <span className="projects-hero__title-line projects-hero__title-line--accent">Projects</span>
          </h1>
          <p className="projects-hero__desc">
            A curated showcase of our most impactful work — each project a testament
            to our commitment to architectural excellence and contextual design.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="projects-filters" id="projects-filters">
        <div className="container">
          <div className="projects-filters__bar">
            {categories.map(cat => (
              <button
                key={cat}
                className={`projects-filter-btn ${activeFilter === cat ? 'projects-filter-btn--active' : ''}`}
                onClick={() => setActiveFilter(cat)}
                id={`filter-${cat.toLowerCase()}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="projects-grid-section section" id="projects-grid">
        <div className="container">
          <div ref={gridRef} className="projects-grid">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="project-card hover-target"
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-card__image-wrapper">
                  <img src={project.image} alt={project.title} className="project-card__image" />
                  <div className="project-card__overlay">
                    <span className="project-card__view">View Project</span>
                  </div>
                </div>
                <div className="project-card__info">
                  <span className="project-card__category">{project.category}</span>
                  <h3 className="project-card__title">{project.title}</h3>
                  <span className="project-card__location">{project.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="project-modal" onClick={() => setSelectedProject(null)}>
          <div className="project-modal__content" onClick={e => e.stopPropagation()}>
            <button
              className="project-modal__close"
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
            >
              ✕
            </button>
            <div className="project-modal__image-wrapper">
              <img src={selectedProject.image} alt={selectedProject.title} className="project-modal__image" />
            </div>
            <div className="project-modal__details">
              <span className="section-label">{selectedProject.category}</span>
              <h2 className="project-modal__title">{selectedProject.title}</h2>
              <p className="project-modal__desc">{selectedProject.desc}</p>
              <div className="project-modal__meta">
                <div className="project-modal__meta-item">
                  <span className="project-modal__meta-label">Location</span>
                  <span className="project-modal__meta-value">{selectedProject.location}</span>
                </div>
                <div className="project-modal__meta-item">
                  <span className="project-modal__meta-label">Year</span>
                  <span className="project-modal__meta-value">{selectedProject.year}</span>
                </div>
                <div className="project-modal__meta-item">
                  <span className="project-modal__meta-label">Area</span>
                  <span className="project-modal__meta-value">{selectedProject.area}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
