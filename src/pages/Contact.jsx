import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

const contactInfo = [
  {
    icon: '📍',
    title: 'Visit Us',
    lines: ['Farasha Design Studio', '42 Archway Road, Suite 200', 'Mumbai, Maharashtra 400001'],
  },
  {
    icon: '📧',
    title: 'Email Us',
    lines: ['General: hello@farashadesign.com', 'Projects: projects@farashadesign.com', 'Press: media@farashadesign.com'],
  },
  {
    icon: '📞',
    title: 'Call Us',
    lines: ['Main: +971 973 115 1543', 'WhatsApp: +971 973 115 1543', 'Mon–Fri: 9:00 AM – 6:00 PM GST'],
  },
]

export default function Contact() {
  const pageRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from('.contact-hero__title-line', {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.3,
      })

      gsap.from('.contact-hero__desc', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.8,
      })

      // Info cards
      gsap.from('.contact-info-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-info__grid',
          start: 'top 80%',
        }
      })

      // Form
      gsap.from('.contact-form__inner > *', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact-form',
          start: 'top 75%',
        }
      })

    }, pageRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    // In production, this would send the form data to a backend
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div ref={pageRef}>
      {/* Hero */}
      <section className="contact-hero section" id="contact-hero">
        <div className="container">
          <span className="section-label">Contact Us</span>
          <h1 className="contact-hero__title">
            <span className="contact-hero__title-line">Let's Build</span>
            <span className="contact-hero__title-line contact-hero__title-line--accent">Together</span>
          </h1>
          <p className="contact-hero__desc">
            Every extraordinary space starts with a conversation. Whether you have 
            a clear vision or a seed of an idea, we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="contact-info section" id="contact-info">
        <div className="container">
          <div className="contact-info__grid">
            {contactInfo.map((info, i) => (
              <div key={i} className="contact-info-card">
                <span className="contact-info-card__icon">{info.icon}</span>
                <h3 className="contact-info-card__title">{info.title}</h3>
                {info.lines.map((line, j) => (
                  <p key={j} className="contact-info-card__line">{line}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="contact-form section" id="contact-form">
        <div className="container contact-form__grid">
          <div className="contact-form__text">
            <span className="section-label">Start a Project</span>
            <h2>Tell Us About<br />Your <em>Vision</em></h2>
            <p>
              Fill out the form and our team will get back to you within 24 hours.
              We're excited to learn about your project and explore how we can 
              bring your vision to life.
            </p>

            <div className="contact-form__quote">
              <blockquote>
                "Architecture should speak of its time and place, but yearn for timelessness."
              </blockquote>
              <cite>— Frank Gehry</cite>
            </div>
          </div>

          <div className="contact-form__inner">
            {submitted ? (
              <div className="contact-form__success">
                <span className="contact-form__success-icon">✓</span>
                <h3>Thank You!</h3>
                <p>Your message has been sent successfully. We'll get back to you within 24 hours.</p>
                <button className="btn" onClick={() => setSubmitted(false)}>
                  <span>Send Another Message</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-input"
                      placeholder="+971 973 115 1543"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="service" className="form-label">Service Interested In</label>
                    <select
                      id="service"
                      name="service"
                      className="form-input form-select"
                      value={formData.service}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a service</option>
                      <option value="exterior">Exterior Design</option>
                      <option value="landscape">Landscape Architecture</option>
                      <option value="facade">Facade Engineering</option>
                      <option value="urban">Urban Planning</option>
                      <option value="visualization">3D Visualization</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="budget" className="form-label">Estimated Budget</label>
                  <select
                    id="budget"
                    name="budget"
                    className="form-input form-select"
                    value={formData.budget}
                    onChange={handleChange}
                  >
                    <option value="">Select budget range</option>
                    <option value="50-100k">₹50L – ₹1 Cr</option>
                    <option value="100-500k">₹1 Cr – ₹5 Cr</option>
                    <option value="500k-1m">₹5 Cr – ₹10 Cr</option>
                    <option value="1m+">₹10 Cr+</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-input form-textarea"
                    placeholder="Tell us about your project, site, and vision..."
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary form-submit">
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="contact-map" id="contact-map">
        <div className="contact-map__content">
          <div className="contact-map__overlay">
            <h3>Mumbai, Maharashtra</h3>
            <p>42 Archway Road, Suite 200</p>
          </div>
          <div className="contact-map__visual">
            <div className="contact-map__grid-line contact-map__grid-line--h"></div>
            <div className="contact-map__grid-line contact-map__grid-line--v"></div>
            <div className="contact-map__pin">
              <span></span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
