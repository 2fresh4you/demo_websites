import { useEffect, useRef, useState } from 'react'
import {
  ArrowUp,
  ArrowUpRight,
  Award,
  Building2,
  CircleDot,
  FolderKanban,
  Grid3X3,
  Hammer,
  Layers,
  Lightbulb,
  MapPin,
  Ruler,
  ScanLine,
  Search,
  SlidersHorizontal,
  Sofa,
  Wrench,
} from 'lucide-react'

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path}`

const rollingWords = ['Architecture', 'Interiors', 'Light Systems', 'Minimal Living']

const stats = [
  { value: '48', label: 'Projects', icon: FolderKanban },
  { value: '12', label: 'Cities', icon: MapPin },
  { value: '06', label: 'Awards', icon: Award },
  { value: '01', label: 'Philosophy', icon: Lightbulb },
]

const services = [
  {
    icon: Building2,
    accent: '#5b9bf6',
    title: 'Architecture',
    text: 'Compact homes, adaptive plans and exact envelope studies for modern living.',
  },
  {
    icon: Sofa,
    accent: '#d4a843',
    title: 'Interior Design',
    text: 'Interior systems shaped by material restraint, light control and daily ritual.',
  },
  {
    icon: ScanLine,
    accent: '#d71921',
    title: 'Spatial Branding',
    text: 'Branded environments with technical clarity, not visual noise.',
  },
  {
    icon: Layers,
    accent: '#8b7cf6',
    title: 'Furniture & Objects',
    text: 'Custom objects, storage logic and fixtures that align with the room.',
  },
  {
    icon: Wrench,
    accent: '#f08a4b',
    title: 'Renovation Concepts',
    text: 'Surgical interventions for existing spaces, from diagnosis to execution.',
  },
  {
    icon: Ruler,
    accent: '#4a9e5c',
    title: 'Material Direction',
    text: 'Material indexes, finishes and tactile systems calibrated to atmosphere.',
  },
]

const projects = [
  {
    title: 'MONO HOUSE',
    place: 'Berlin',
    type: 'Residential shell',
    year: '2026',
    image: publicAsset('projects/mono-house.png'),
    alt: 'Monochrome concrete residence interior with a long structural spine wall.',
    metric: 'MASS 78 / LIGHT 41',
    text: 'A compact urban home organized around one uninterrupted concrete spine and controlled daylight.',
  },
  {
    title: 'GRID APARTMENT',
    place: 'Copenhagen',
    type: 'Interior system',
    year: '2025',
    image: publicAsset('projects/grid-apartment.png'),
    alt: 'Minimal apartment with modular cabinetry, black details and precise panel grid.',
    metric: 'GRID 600 / STORAGE 91',
    text: 'A modular apartment plan where storage, thresholds and lighting follow a strict 600mm matrix.',
  },
  {
    title: 'ATLAS OFFICE',
    place: 'Zurich',
    type: 'Workplace concept',
    year: '2026',
    image: publicAsset('projects/atlas-office.png'),
    alt: 'Dark monochrome office interior with ceiling rails, modular desks and acoustic zones.',
    metric: 'ACOUSTIC 64 / FLOW 88',
    text: 'A quiet workplace with calibrated acoustic zones, exposed circulation and precise team rituals.',
  },
  {
    title: 'LOW LIGHT LOFT',
    place: 'Amsterdam',
    type: 'Adaptive reuse',
    year: '2024',
    image: publicAsset('projects/low-light-loft.png'),
    alt: 'Low-light loft interior with dark material planes, large windows and warm task lighting.',
    metric: 'LUX 180 / GLARE 04',
    text: 'A low-glare loft study built around dark material planes, narrow reveals and warm task light.',
  },
]

const galleryItems = [
  {
    title: 'Material Index',
    image: publicAsset('gallery/material-study.png'),
    metric: 'SURFACE / 04',
    accent: '#5b9bf6',
  },
  {
    title: 'Light Threshold',
    image: publicAsset('gallery/light-study.png'),
    metric: 'LUX / 180',
    accent: '#4a9e5c',
  },
  {
    title: 'Scale Model',
    image: publicAsset('gallery/model-study.png'),
    metric: 'GRID / 1:50',
    accent: '#8b7cf6',
  },
  {
    title: 'Mono House',
    image: publicAsset('projects/mono-house.png'),
    metric: 'MASS / 78',
    accent: '#d71921',
  },
  {
    title: 'Grid Apartment',
    image: publicAsset('projects/grid-apartment.png'),
    metric: 'STORAGE / 91',
    accent: '#d4a843',
  },
]

const calibrationReadouts = [
  { label: 'Daylight Capture', value: 76, unit: '%' },
  { label: 'Plan Efficiency', value: 88, unit: '%' },
  { label: 'Material Reuse', value: 64, unit: '%' },
]

const processSteps = [
  {
    icon: Search,
    accent: '#5b9bf6',
    title: 'Diagnose',
    text: 'Measure the site, constraints, behavior and non-negotiable spatial facts.',
  },
  {
    icon: Grid3X3,
    accent: '#d4a843',
    title: 'Spatial Strategy',
    text: 'Build the governing grid, movement logic and hierarchy of rooms.',
  },
  {
    icon: Layers,
    accent: '#8b7cf6',
    title: 'Material System',
    text: 'Define the palette by tactility, light response, durability and restraint.',
  },
  {
    icon: Hammer,
    accent: '#f08a4b',
    title: 'Execution',
    text: 'Coordinate makers, drawings, procurement and on-site calibration.',
  },
  {
    icon: SlidersHorizontal,
    accent: '#4a9e5c',
    title: 'Final Calibration',
    text: 'Tune lighting, objects and thresholds until the space feels inevitable.',
  },
]

const footerLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
  { label: 'X/Twitter', href: 'https://x.com/', icon: 'x' },
]

const legalLinks = [
  { label: 'Imprint', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms and Conditions', href: '#' },
  { label: 'Cookie Policy', href: '#' },
  { label: 'Contact', href: '#' },
]

const servicePixelColumns = 10
const servicePixelRows = 10
const servicePixelDelays = Array.from({ length: servicePixelColumns * servicePixelRows }, (_, index) => {
  const row = Math.floor(index / servicePixelColumns)
  const column = index % servicePixelColumns
  const direction = column % 3
  const verticalStep = direction === 0 ? row : direction === 1 ? servicePixelRows - 1 - row : Math.abs(row - 4.5)
  const jitter = (row * 37 + column * 61 + ((row + column) % 4) * 29) % 176

  return `${Math.round(verticalStep * 44 + jitter)}ms`
})

const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3)

function useScrollReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]')

    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.16 },
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
}

function useScrollFadeText(ref, text) {
  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const words = [...element.querySelectorAll('.fade-word')]
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (reducedMotion.matches) {
      words.forEach((word) => word.style.setProperty('--word-reveal', '1'))
      return undefined
    }

    let frame = 0

    const update = () => {
      const rect = element.getBoundingClientRect()
      const start = window.innerHeight * 0.86
      const end = window.innerHeight * 0.22
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)))

      words.forEach((word, index) => {
        const amount = Math.min(1, Math.max(0, (progress * (words.length + 6) - index) / 6))
        word.style.setProperty('--word-reveal', amount.toFixed(3))
      })
    }

    const queueUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        update()
      })
    }

    update()
    window.addEventListener('scroll', queueUpdate, { passive: true })
    window.addEventListener('resize', queueUpdate)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', queueUpdate)
      window.removeEventListener('resize', queueUpdate)
    }
  }, [ref, text])
}

function ScrollFadeText({ as: Tag = 'p', children, className = '', id }) {
  const ref = useRef(null)
  const text = String(children)
  useScrollFadeText(ref, text)

  return (
    <Tag id={id} ref={ref} className={`scroll-fade-text ${className}`.trim()}>
      {text.split(' ').map((word, index) => (
        <span className="fade-word" key={`${word}-${index}`}>
          {word}
          {index < text.split(' ').length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}

function useCountUp(target, delay = 0, duration = 1400) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let timeout = 0
    let started = false

    const animate = () => {
      if (started) return
      started = true

      if (reducedMotion.matches) {
        setValue(target)
        return
      }

      timeout = window.setTimeout(() => {
        let startTime = 0

        const step = (time) => {
          if (!startTime) startTime = time
          const progress = Math.min(1, (time - startTime) / duration)
          setValue(Math.round(target * easeOutCubic(progress)))

          if (progress < 1) {
            frame = window.requestAnimationFrame(step)
          }
        }

        frame = window.requestAnimationFrame(step)
      }, delay)
    }

    const isFullyVisible = () => {
      const rect = element.getBoundingClientRect()
      return rect.top >= window.innerHeight * 0.12 && rect.bottom <= window.innerHeight * 0.88
    }

    if (isFullyVisible()) {
      animate()
      return () => {
        window.clearTimeout(timeout)
        if (frame) window.cancelAnimationFrame(frame)
      }
    }

    if (!('IntersectionObserver' in window)) {
      animate()
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          animate()
          observer.disconnect()
        }
      },
      { rootMargin: '-12% 0px -12% 0px', threshold: 0.98 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      window.clearTimeout(timeout)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [delay, duration, target])

  return [ref, value]
}

function AnimatedNumber({ value, delay = 0, duration = 1400 }) {
  const target = Number(value)
  const [ref, current] = useCountUp(target, delay, duration)

  return <span className="stat-value" ref={ref}>{String(current).padStart(String(value).length, '0')}</span>
}

function useActiveProcess() {
  const [processState, setProcessState] = useState({ activeIndex: 0, progress: 0 })

  useEffect(() => {
    const steps = [...document.querySelectorAll('[data-process-step]')]
    if (!steps.length) return undefined

    let frame = 0

    const update = () => {
      const targetY = window.innerHeight * 0.32
      const centers = steps.map((step) => {
        const rect = step.getBoundingClientRect()
        return rect.top + rect.height * 0.5
      })
      const closest = steps.reduce(
        (current, step) => {
          const rect = step.getBoundingClientRect()
          const center = rect.top + rect.height * 0.5
          const distance = Math.abs(center - targetY)

          return distance < current.distance
            ? { distance, index: Number(step.getAttribute('data-process-step')) }
            : current
        },
        { distance: Number.POSITIVE_INFINITY, index: 0 },
      )
      const firstCenter = centers[0]
      const lastCenter = centers[centers.length - 1]
      const progress = Math.min(1, Math.max(0, (targetY - firstCenter) / (lastCenter - firstCenter)))

      setProcessState((current) =>
        current.activeIndex === closest.index && Math.abs(current.progress - progress) < 0.003
          ? current
          : { activeIndex: closest.index, progress },
      )
    }

    const queueUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        update()
      })
    }

    update()
    window.addEventListener('scroll', queueUpdate, { passive: true })
    window.addEventListener('resize', queueUpdate)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', queueUpdate)
      window.removeEventListener('resize', queueUpdate)
    }
  }, [])

  return processState
}

function PixelOverlay() {
  return (
    <span className="service-pixels" aria-hidden="true">
      {servicePixelDelays.map((delay, index) => (
        <span key={index} style={{ '--pixel-delay': delay }}></span>
      ))}
    </span>
  )
}

function BrandIcon({ type }) {
  const gradientId = `social-gradient-${type}`
  const viewBoxes = {
    instagram: '0 0 24 24',
    facebook: '0 0 640 640',
    linkedin: '0 0 24 24',
    x: '0 0 640 640',
  }

  const paths = {
    instagram: (
      <>
        <rect x="5" y="5" width="14" height="14" rx="4.2" fill="none" stroke={`url(#${gradientId})`} strokeWidth="1.6" />
        <circle cx="12" cy="12" r="3.3" fill="none" stroke={`url(#${gradientId})`} strokeWidth="1.6" />
        <circle cx="16.4" cy="7.6" r="0.9" fill={`url(#${gradientId})`} />
      </>
    ),
    facebook: (
      <>
        <path
          fill={`url(#${gradientId})`}
          d="M576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 440 146.7 540.8 258.2 568.5L258.2 398.2L205.4 398.2L205.4 320L258.2 320L258.2 286.3C258.2 199.2 297.6 158.8 383.2 158.8C399.4 158.8 427.4 162 438.9 165.2L438.9 236C432.9 235.4 422.4 235 409.3 235C367.3 235 351.1 250.9 351.1 292.2L351.1 320L434.7 320L420.3 398.2L351 398.2L351 574.1C477.8 558.8 576 450.9 576 320z"
        />
      </>
    ),
    linkedin: (
      <>
        <path fill={`url(#${gradientId})`} d="M5.2 10h3.1v9.2H5.2V10Z" />
        <path fill={`url(#${gradientId})`} d="M6.8 5.2a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6Z" />
        <path fill={`url(#${gradientId})`} d="M10.6 10h3v1.3c.5-.8 1.4-1.6 3-1.6 2.2 0 3.5 1.4 3.5 4.1v5.4H17v-5c0-1.2-.4-1.9-1.5-1.9-1 0-1.7.7-1.7 2v4.9h-3.1V10Z" />
      </>
    ),
    x: (
      <>
        <path
          fill={`url(#${gradientId})`}
          d="M453.2 112L523.8 112L369.6 288.2L551 528L409 528L297.7 382.6L170.5 528L99.8 528L264.7 339.5L90.8 112L236.4 112L336.9 244.9L453.2 112zM428.4 485.8L467.5 485.8L215.1 152L173.1 152L428.4 485.8z"
        />
      </>
    ),
  }

  return (
    <svg className="brand-social-svg" viewBox={viewBoxes[type]} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(99% 0 0)" />
          <stop offset="100%" stopColor="oklch(78% 0 0)" />
        </linearGradient>
      </defs>
      <g strokeLinecap="round" strokeLinejoin="round">
        {paths[type]}
      </g>
    </svg>
  )
}

function GodRaysOverlay() {
  return <img className="god-rays-overlay" src={publicAsset('god-rays-new.png')} alt="" aria-hidden="true" />
}

function SectionMarker({ eyebrow, title }) {
  return (
    <div className="section-marker" data-reveal>
      <span>{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  )
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="VOID STUDIO home">
        <img className="brand-logo" src={publicAsset('logo.png')} alt="" aria-hidden="true" />
        <span>VOID STUDIO</span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="#work">Work</a>
        <a href="#gallery">Gallery</a>
        <a href="#process">Process</a>
        <a href="#contact">Contact</a>
      </nav>
      <span className="header-meta">
        <CircleDot aria-hidden="true" size={12} strokeWidth={1.5} />
        GRID 12-COL
      </span>
    </header>
  )
}

function RollingText() {
  const maxLetters = Math.max(...rollingWords.map((word) => word.length))
  const loopWords = [...rollingWords, rollingWords[0]]

  return (
    <span className="rolling-text" aria-label={rollingWords.join(', ')}>
      <span className="rolling-text-grid" aria-hidden="true">
        {Array.from({ length: maxLetters }, (_, letterIndex) => (
          <span
            className="rolling-letter-slot"
            key={`letter-${letterIndex}`}
            style={{ '--letter-delay': `${letterIndex * 42}ms` }}
          >
            <span className="rolling-letter-track">
              {loopWords.map((word, wordIndex) => (
                <span key={`${word}-${wordIndex}-${letterIndex}`}>
                  {word[letterIndex] === ' ' || word[letterIndex] === undefined
                    ? '\u00a0'
                    : word[letterIndex]}
                </span>
              ))}
            </span>
          </span>
        ))}
      </span>
    </span>
  )
}

function HeroImage() {
  return (
    <figure className="hero-visual" data-reveal>
      <img src={publicAsset('hero/void-spatial-hero.png')} alt="Dark VOID STUDIO spatial installation with concrete, glass, steel and god-ray lighting." />
      <figcaption>
        <span>LIGHT STUDY / GENERATED</span>
        <span>COORD 52.5200 N</span>
      </figcaption>
      <div className="hero-reticle" aria-hidden="true"></div>
      <aside className="hero-panel">
        <div className="panel-row">
          <span>PROJECT ID</span>
          <strong>VOID-2601</strong>
        </div>
        <div className="panel-row">
          <span>LOCATION</span>
          <strong>BERLIN / REMOTE</strong>
        </div>
        <div className="panel-row">
          <span>YEAR</span>
          <strong>2026</strong>
        </div>
        <div className="panel-row">
          <span>MATERIAL INDEX</span>
          <strong>CONCRETE / STEEL / LIGHT</strong>
        </div>
      </aside>
    </figure>
  )
}

function Hero() {
  return (
    <section id="top" className="hero-section">
      <div className="hero-copy" data-reveal>
        <p className="system-label">SYSTEM / SPATIAL-01</p>
        <h1>SPACES WITH NOTHING TO HIDE.</h1>
        <p className="hero-subhead">
          Architecture, interiors and spatial systems for modern living.
        </p>
        <p className="hero-rolling">
          <span className="hero-rolling-label">Current study</span>
          <RollingText />
        </p>
        <div className="hero-actions" aria-label="Primary actions">
          <a className="button button-primary" href="#work">
            View Projects
            <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.5} />
          </a>
          <a className="button button-secondary" href="#contact">
            Book Consultation
            <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.5} />
          </a>
        </div>
      </div>

      <HeroImage />
    </section>
  )
}

function CalibrationPanel() {
  return (
    <aside className="calibration-panel" aria-label="Studio calibration readouts" data-reveal>
      <div className="calibration-head">
        <span>SPATIAL READOUT</span>
        <strong>[MEASURED]</strong>
      </div>
      {calibrationReadouts.map((item, index) => (
        <AnimatedReadout item={item} index={index} key={item.label} />
      ))}
    </aside>
  )
}

function AnimatedReadout({ item, index }) {
  const [ref, current] = useCountUp(item.value, index * 500, 1500)
  const targetSegments = Math.round(item.value / 10)
  const filledSegments = item.value > 0
    ? Math.min(10, Math.round((current / item.value) * targetSegments))
    : 0

  return (
    <div className="readout" ref={ref}>
      <div className="readout-top">
        <span>{item.label}</span>
        <strong>
          {String(current).padStart(2, '0')}
          <small>{item.unit}</small>
        </strong>
      </div>
      <div className="segments" aria-hidden="true">
        {Array.from({ length: 10 }, (_, segmentIndex) => (
          <span
            className={segmentIndex < filledSegments ? 'is-filled' : ''}
            key={`${item.label}-${segmentIndex}`}
          ></span>
        ))}
      </div>
    </div>
  )
}

function Stats() {
  return (
    <section className="intro-section" aria-labelledby="intro-title">
      <div className="intro-copy" data-reveal>
        <p className="system-label">VOID-STUDIO / 2026</p>
        <ScrollFadeText as="h2" id="intro-title">
          We design spatial systems where clarity, materiality and atmosphere carry the experience.
        </ScrollFadeText>
        <p>
          VOID STUDIO works across architecture, interiors and minimal living.
          Each project starts with function, light and behavior, then removes
          everything that does not support the room.
        </p>
      </div>

      <div className="stats-grid" data-reveal>
        {stats.map((stat, index) => {
          const Icon = stat.icon

          return (
            <div className="stat-item" key={stat.label}>
              <AnimatedNumber value={stat.value} delay={index * 160} />
              <p>
                <Icon aria-hidden="true" size={14} strokeWidth={1.6} />
                {stat.label}
              </p>
            </div>
          )
        })}
      </div>

      <CalibrationPanel />
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="section-block">
      <SectionMarker eyebrow="MATERIAL INDEX" title="Services" />
      <div className="services-grid">
        {services.map((service, index) => {
          const Icon = service.icon

          return (
            <article
              className="service-item"
              key={service.title}
              data-reveal
              tabIndex={0}
              onPointerEnter={(event) => event.currentTarget.classList.add('is-hovered')}
              onPointerLeave={(event) => event.currentTarget.classList.remove('is-hovered')}
              onClick={(event) => {
                event.currentTarget.classList.add('is-hovered')
                window.setTimeout(() => event.currentTarget.classList.remove('is-hovered'), 900)
              }}
              onFocus={(event) => event.currentTarget.classList.add('is-hovered')}
              onBlur={(event) => event.currentTarget.classList.remove('is-hovered')}
              style={{ '--item-accent': service.accent }}
            >
              <PixelOverlay />
              <div className="service-top">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <Icon aria-hidden="true" size={22} strokeWidth={1.5} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function ProjectImage({ project }) {
  return (
    <figure className="project-media">
      <img src={project.image} alt={project.alt} loading="eager" decoding="async" />
      <figcaption>
        <span>{project.metric}</span>
        <span>IMAGE / AI GENERATED</span>
      </figcaption>
      <div className="media-reticle" aria-hidden="true"></div>
      <div className="media-scan" aria-hidden="true"></div>
    </figure>
  )
}

function FeaturedProjects() {
  return (
    <section id="work" className="section-block projects-section">
      <SectionMarker eyebrow="LIGHT STUDY" title="Featured Projects" />
      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-item" key={project.title} data-reveal>
            <ProjectImage project={project} />
            <div className="project-info">
              <div>
                <p className="project-kicker">{project.type}</p>
                <h3>
                  {project.title} <span>{project.place}</span>
                </h3>
              </div>
              <p>{project.text}</p>
              <dl>
                <div>
                  <dt>Location</dt>
                  <dd>{project.place}</dd>
                </div>
                <div>
                  <dt>Year</dt>
                  <dd>{project.year}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function AnimatedGallery() {
  const galleryLoop = [...galleryItems, ...galleryItems]

  return (
    <section id="gallery" className="section-block gallery-section">
      <SectionMarker eyebrow="IMAGE SYSTEM" title="Motion Gallery" />
      <div className="gallery-shell" data-reveal>
        <div className="gallery-track">
          {galleryLoop.map((item, index) => (
            <article
              className="gallery-card"
              key={`${item.title}-${index}`}
              style={{ '--item-accent': item.accent }}
              aria-hidden={index >= galleryItems.length}
            >
              <img src={item.image} alt={index < galleryItems.length ? `${item.title} study` : ''} />
              <div className="gallery-card-meta">
                <span>{item.metric}</span>
                <strong>{item.title}</strong>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  const { activeIndex, progress } = useActiveProcess()
  const processProgress = `${progress * 100}%`

  return (
    <section id="process" className="section-block process-section">
      <div className="process-sticky">
        <SectionMarker eyebrow="SEQUENCE 05" title="Process" />
        <div className="process-dial" style={{ '--dial-accent': processSteps[activeIndex].accent }}>
          <span>{String(activeIndex + 1).padStart(2, '0')}</span>
        </div>
      </div>
      <div className="process-list" style={{ '--process-progress': processProgress }}>
        {processSteps.map((step, index) => {
          const Icon = step.icon
          const isActive = activeIndex === index

          return (
            <article
              className={`process-step ${isActive ? 'is-active' : ''}`}
              key={step.title}
              data-process-step={index}
              style={{ '--item-accent': step.accent }}
            >
              <span className="process-node" aria-hidden="true"></span>
              <span className="process-index">
                <Icon aria-hidden="true" size={20} strokeWidth={1.5} />
                {String(index + 1).padStart(2, '0')}
              </span>
              <div className="process-content">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function Philosophy() {
  return (
    <section className="philosophy-section" aria-labelledby="philosophy-title">
      <p className="system-label" data-reveal>
        ONE PHILOSOPHY
      </p>
      <ScrollFadeText as="blockquote" id="philosophy-title">
        We remove visual noise until only structure, light and intention remain.
      </ScrollFadeText>
      <p data-reveal>
        <span className="quote-mark quote-mark-open" aria-hidden="true">“</span>
        Minimalism is not emptiness. It is the pressure test that decides what
        a space can lose and still become more exact, more useful and more
        atmospheric.
        <span className="quote-mark quote-mark-close" aria-hidden="true">”</span>
      </p>
    </section>
  )
}

function CircularText() {
  return (
    <div className="footer-orbit" aria-hidden="true">
      <img src={publicAsset('logo.png')} alt="" />
      <svg viewBox="0 0 220 220">
        <defs>
          <path
            id="footer-orbit-path"
            d="M110,110 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0"
          />
        </defs>
        <text>
          <textPath href="#footer-orbit-path">
            © VOID STUDIO / SPATIAL SYSTEMS / 2026 / © VOID STUDIO / 2026 /
          </textPath>
        </text>
      </svg>
    </div>
  )
}

function ContactFooter() {
  return (
    <footer id="contact" className="contact-footer">
      <div className="contact-cta" data-reveal>
        <p className="system-label">CONTACT / SPATIAL STUDY</p>
        <h2>Start a spatial study</h2>
        <a className="button button-primary" href="mailto:studio@void.example">
          studio@void.example
          <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.5} />
        </a>
        <CircularText />
      </div>

      <div className="footer-grid" data-reveal>
        <div>
          <span>Location</span>
          <p>Berlin / Copenhagen / Remote</p>
        </div>
        <div>
          <span>Social</span>
          <ul>
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a className="social-link" href={link.href} target="_blank" rel="noreferrer">
                  <span className="social-icon" aria-hidden="true">
                    <BrandIcon type={link.icon} />
                  </span>
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span>System</span>
          <p>VOID-STUDIO / 2026</p>
          <p>VERSION 01.07</p>
          <p>GRID 12-COL / MOTION PASS</p>
        </div>
      </div>
      <div className="footer-legal" data-reveal>
        <p>© 2026 VOID STUDIO. All rights reserved.</p>
        <nav aria-label="Legal links">
          {legalLinks.map((link, index) => (
            <span className="legal-link-group" key={link.label}>
              {index > 0 && (
                <span className="legal-separator" aria-hidden="true">
                  ・
                </span>
              )}
              <a href={link.href}>{link.label}</a>
            </span>
          ))}
        </nav>
        <a className="back-to-top" href="#top" aria-label="Back to top">
          <ArrowUp aria-hidden="true" size={18} strokeWidth={1.6} />
        </a>
      </div>
    </footer>
  )
}

function App() {
  useScrollReveal()

  return (
    <>
      <GodRaysOverlay />
      <Header />
      <main id="top">
        <Hero />
        <Stats />
        <Services />
        <FeaturedProjects />
        <AnimatedGallery />
        <Process />
        <Philosophy />
      </main>
      <ContactFooter />
    </>
  )
}

export default App
