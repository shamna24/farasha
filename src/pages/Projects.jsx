import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

const categories = ['All', 'Residential', 'Commercial', 'Resort', 'Urban']

const projects = [
  {
    id: 1,
    title: 'Modern Villa',
    category: 'Residential',
    location: 'Client Project',
    year: '2025',
    area: 'Custom',
    image: '/images/project-client-1.jpg',
    desc: 'An exquisite modern residential project featuring elegant exterior design and harmonious landscaping.',
  },
  {
    id: 2,
    title: 'Luxury Estate',
    category: 'Residential',
    location: 'Client Project',
    year: '2025',
    area: 'Custom',
    image: '/images/project-client-2.jpg',
    desc: 'A luxurious estate blending contemporary architecture with sophisticated outdoor living spaces.',
  },
  {
    id: 3,
    title: 'Urban Residence',
    category: 'Urban',
    location: 'Client Project',
    year: '2024',
    area: 'Custom',
    image: '/images/project-client-3.jpg',
    desc: 'A stunning urban residential project showcasing innovative facade engineering and structural elegance.',
  },
  {
    id: 4,
    title: 'Serene Retreat',
    category: 'Residential',
    location: 'Client Project',
    year: '2024',
    area: 'Custom',
    image: '/images/project-client-4.jpg',
    desc: 'A peaceful architectural retreat designed with a focus on natural light, space, and premium materials.',
  },
  {
    id: 5,
    title: 'Signature Home',
    category: 'Residential',
    location: 'Client Project',
    year: '2023',
    area: 'Custom',
    image: '/images/project-client-5.jpg',
    desc: 'A signature residential masterpiece highlighting the unique exterior design philosophy of Farasha Studio.',
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
