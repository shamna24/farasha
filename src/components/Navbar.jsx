import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import './Navbar.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const [isHidden, setIsHidden] = useState(location.pathname === '/')
  
  const navRef = useRef(null)
  const overlayRef = useRef(null)
  const linksRef = useRef([])
  const tlRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 80);
      
      // Hide the header on the Home page until scrolled past the first section
      if (location.pathname === '/') {
        setIsHidden(scrollY < window.innerHeight * 0.8);
      } else {
        setIsHidden(false);
      }
    }
    
    // Check initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [location.pathname])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      const tl = gsap.timeline()
      tlRef.current = tl

      tl.fromTo(linksRef.current, 
        { y: 80, opacity: 0, rotateX: -15 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      )
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <nav ref={navRef} className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${isHidden ? 'navbar--hidden' : ''}`} id="main-navbar">
        <div className="navbar__inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center w-full">
          <Link to="/" className="navbar__brand" id="navbar-brand">
            <span className="navbar__brand-name">Farasha</span>
            <span className="navbar__brand-sub">Design Studio</span>
          </Link>

          <div className="navbar__links-desktop hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                id={`nav-link-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link to="/contact" className="navbar__cta" id="navbar-cta">
            <span>Get in Touch</span>
          </Link>

          <button
            className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            id="navbar-burger"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Fullscreen mobile menu */}
      <div ref={overlayRef} className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} id="mobile-menu">
        <div className="mobile-menu__content">
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              ref={el => linksRef.current[i] = el}
              className={`mobile-menu__link ${location.pathname === link.path ? 'mobile-menu__link--active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="mobile-menu__link-num">0{i + 1}</span>
              <span className="mobile-menu__link-text">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
