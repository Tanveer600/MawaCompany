import { useEffect, useRef, useState, type FormEvent } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Droplets,
  Download,
  Fan,
  House,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  PanelsTopLeft,
  PhoneCall,
  ShieldCheck,
  Snowflake,
  Sparkles,
  ThermometerSnowflake,
  UsersRound,
  Wind,
  Wrench,
  X,
  type LucideIcon,
} from 'lucide-react'

const services: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'AC installation',
    description: 'Careful installation for split, ceiling and cassette air conditioners.',
    icon: Wind,
  },
  {
    title: 'General servicing',
    description: 'A proper clean and performance check to help your AC run its best.',
    icon: Sparkles,
  },
  {
    title: 'Chemical cleaning',
    description: 'A deeper clean for stubborn dirt, odours and reduced airflow.',
    icon: Droplets,
  },
  {
    title: 'Repairs & diagnostics',
    description: 'Thoughtful fault-finding for air conditioners that are not cooling right.',
    icon: Wrench,
  },
  {
    title: 'Water leakage repair',
    description: 'Get to the source of leaks, drainage problems and unwanted drips.',
    icon: ThermometerSnowflake,
  },
  {
    title: 'Cassette & ceiling units',
    description: 'Installation, maintenance and repairs for ceiling-mounted systems.',
    icon: PanelsTopLeft,
  },
  {
    title: 'Dismantling & relocation',
    description: 'Careful removal and relocation when your space or plans change.',
    icon: ArrowDownRight,
  },
  {
    title: 'Fans & lighting',
    description: 'Practical help with fan and lighting installation around your home.',
    icon: Fan,
  },
  {
    title: 'Water heater service',
    description: 'Installation and troubleshooting for a more comfortable home.',
    icon: House,
  },
  {
    title: 'Renovation',
    description: 'Air conditioning work to support your renovation or space upgrade.',
    icon: Wrench,
  },
]

const reasons: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Skilled technicians',
    description: 'Experienced hands and careful workmanship on every visit.',
    icon: UsersRound,
  },
  {
    title: 'Straightforward advice',
    description: 'We explain your options and recommend what suits your needs.',
    icon: MessageCircle,
  },
  {
    title: 'Service you can trust',
    description: 'Respectful, reliable support from first message to finished job.',
    icon: ShieldCheck,
  },
  {
    title: 'Flexible appointments',
    description: 'Tell us what works for you and we will help arrange a visit.',
    icon: Clock3,
  },
]

const workPhotos = [
  {
    src: '/mawa-technician-ceiling-clean.jpeg',
    alt: 'MAWA technician servicing a ceiling air conditioner',
    title: 'Ceiling AC servicing',
  },
  {
    src: '/mawa-technician-cleaning.jpeg',
    alt: 'Technician carefully cleaning an indoor air conditioner',
    title: 'Indoor unit cleaning',
  },
  {
    src: '/mawa-outdoor-unit-clean.jpeg',
    alt: 'Cleaning the coil of an outdoor air conditioner',
    title: 'Outdoor unit cleaning',
  },
  {
    src: '/mawa-indoor-unit-service.jpeg',
    alt: 'Indoor air conditioner taken apart for servicing',
    title: 'Detailed maintenance',
  },
  {
    src: '/mawa-installation-work.jpeg',
    alt: 'Technician working on air conditioner installation piping',
    title: 'Installation work',
  },
  {
    src: '/mawa-outdoor-installation.jpeg',
    alt: 'Technician installing outdoor air conditioning units',
    title: 'Outdoor installation',
  },
  {
    src: '/mawa-finished-installation.jpeg',
    alt: 'Finished wall-mounted air conditioner installation',
    title: 'Finished installation',
  },
  {
    src: '/mawa-ceiling-ac-installation.jpeg',
    alt: 'Finished ceiling cassette air conditioner',
    title: 'Ceiling cassette AC',
  },
]

const generalServicePrices = [
  { item: 'Wall-mounted', price: 'RM 60' },
  { item: 'Ceiling cassette', price: 'RM 130' },
  { item: 'FCU', price: 'RM 200' },
]

const chemicalServicePrices = [
  { item: 'Wall-mounted · any HP', price: 'RM 130 / unit' },
  { item: 'Ceiling cassette · any HP', price: 'RM 180 / unit' },
  { item: 'Ceiling exposed', price: 'RM 180' },
  { item: 'FCU', price: 'RM 380' },
  { item: 'Washing machine', price: 'RM 100' },
]

const overhaulServicePrices = [
  { item: 'Wall-mounted', price: 'RM 200' },
  { item: 'Ceiling cassette', price: 'RM 380' },
  { item: 'Ceiling exposed', price: 'RM 400' },
  { item: 'FCU air conditioner', price: 'RM 450' },
]

const wallInstallationPrices = [
  { item: '1.0 HP', price: 'RM 210' },
  { item: '1.5 HP', price: 'RM 230' },
  { item: '2.0 HP', price: 'RM 250' },
  { item: '2.5 HP', price: 'RM 290' },
]

const cassetteInstallationPrices = [
  { item: '1.5 HP', price: 'RM 280' },
  { item: '2.0 HP', price: 'RM 340' },
  { item: '2.5 HP', price: 'RM 380' },
  { item: '3.0 HP', price: 'RM 380' },
  { item: '3.5 HP', price: 'RM 420' },
]

type PricingSlide = {
  eyebrow: string
  title: string
  icon: LucideIcon
  background: string
  groups: { title?: string; items: { item: string; price: string }[]; note?: string }[]
  extras?: string[]
  note?: string
}

type HeroSlide =
  | { type: 'photo'; src: string; alt: string; title: string }
  | { type: 'service'; slide: PricingSlide }

const pricingSlides: PricingSlide[] = [
  {
    eyebrow: '01 · Routine care',
    title: 'General service',
    icon: Sparkles,
    background: workPhotos[1].src,
    groups: [{ items: generalServicePrices }],
    note: "Gas refill surcharge may apply depending on the unit's existing gas volume.",
  },
  {
    eyebrow: '02 · Deep clean',
    title: 'Chemical service',
    icon: Droplets,
    background: workPhotos[2].src,
    groups: [{ items: chemicalServicePrices }],
    note: 'Wall-mounted and ceiling cassette prices are per unit, regardless of HP.',
  },
  {
    eyebrow: '03 · Full clean',
    title: 'Overhaul service',
    icon: Wrench,
    background: workPhotos[3].src,
    groups: [{ items: overhaulServicePrices }],
    note: 'Includes a free 20 psi gas top-up. Any additional gas requirement will be discussed before work proceeds.',
  },
  {
    eyebrow: '04 · Supply & install',
    title: 'Installation packages',
    icon: Wind,
    background: workPhotos[4].src,
    groups: [
      {
        title: 'Wall-mounted',
        items: wallInstallationPrices,
        note: 'Includes 6 ft copper, 6 ft wire, 6 ft insulation and 10 ft drain pipe.',
      },
      { title: 'Ceiling cassette', items: cassetteInstallationPrices },
    ],
    extras: [
      'Extra length beyond 6 ft: RM 22 / ft',
      'Above 3.0 HP: RM 25 / ft',
      'Copper casing supply & install: RM 11 / ft',
      'Cable tray supply & install: RM 22 / ft',
    ],
    note: '30-day workmanship warranty for installation.',
  },
]

const heroSlides: HeroSlide[] = [
  {
    type: 'photo',
    src: '/mawa-featured-technician.jpeg',
    alt: 'MAWA technician carefully preparing an air-conditioning installation',
    title: 'Careful AC installation',
  },
  ...pricingSlides.map((slide) => ({ type: 'service' as const, slide })),
]

const WHATSAPP_NUMBER = '60173132571'
const PHONE_NUMBER = '+60173132571'
const DISPLAY_PHONE_NUMBER = '+60 17-313 2571'
const CONTACT_EMAIL = 'mawaaircondservice@gmail.com'

const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`mawa-logo${light ? ' mawa-logo--light' : ''}`}
      href="#home"
      aria-label="MAWA Air Cond Service home"
      onClick={(event) => {
        event.preventDefault()
        document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })
      }}
    >
      <img className="mawa-logo__image" src="/mawa-logo.png" alt="MAWA Air Cond Service — Cool Comfort, Reliable Service" />
    </a>
  )
}

function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.793.372s-1.04 1.016-1.04 2.479 1.064 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.626.711.226 1.358.194 1.87.118.571-.085 1.758-.718 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.234c0-5.45 4.44-9.89 9.9-9.89 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.9 6.99c-.01 5.45-4.45 9.89-9.9 9.89m8.41-18.29A11.815 11.815 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.15 1.59 5.96L0 24l6.3-1.65a11.87 11.87 0 0 0 5.74 1.47h.01c6.55 0 11.89-5.34 11.9-11.89a11.83 11.83 0 0 0-3.49-8.43" />
    </svg>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: {
  eyebrow: string
  title: string
  description?: string
  align?: 'center' | 'left'
}) {
  return (
    <div className={`mawa-section-heading mawa-section-heading--${align}`}>
      <span className="mawa-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

function PriceList({ items }: { items: { item: string; price: string }[] }) {
  return (
    <ul className="mawa-price-list">
      {items.map(({ item, price }) => (
        <li key={item}>
          <span>{item}</span>
          <strong>{price}</strong>
        </li>
      ))}
    </ul>
  )
}

function PricingServiceCard({ slide }: { slide: PricingSlide }) {
  const groupedPrices = slide.groups.length > 1
  const Icon = slide.icon

  return (
    <article className="mawa-pricing-card">
      <div className="mawa-pricing-card__heading">
        <div>
          <span className="mawa-pricing-card__eyebrow">{slide.eyebrow}</span>
          <h3>{slide.title}</h3>
        </div>
        <span className="mawa-pricing-card__icon"><Icon size={24} strokeWidth={1.8} /></span>
      </div>
      {groupedPrices ? (
        <div className="mawa-pricing-card__columns">
          {slide.groups.map(({ title, items, note }) => (
            <div key={title}>
              <h4>{title}</h4>
              <PriceList items={items} />
              {note && <p className="mawa-pricing-card__note mawa-pricing-card__note--group">{note}</p>}
            </div>
          ))}
        </div>
      ) : (
        <PriceList items={slide.groups[0].items} />
      )}
      {slide.extras && (
        <div className="mawa-pricing-card__extras">
          {slide.extras.map((extra) => <span key={extra}>{extra}</span>)}
        </div>
      )}
      {slide.note && <p className="mawa-pricing-card__note">{slide.note}</p>}
    </article>
  )
}

function WorkShowcase() {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      return
    }

    const togglePlayback = () => {
      const isVisible = video.getBoundingClientRect().top < window.innerHeight * 0.9
      if (isVisible) {
        video.muted = true
        video.play().catch(() => undefined)
        return
      }

      video.pause()
      video.currentTime = 0
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.muted = true
            video.play().catch(() => undefined)
            return
          }

          video.pause()
          video.currentTime = 0
        })
      },
      { threshold: 0.45 },
    )

    observer.observe(video)
    togglePlayback()

    return () => {
      observer.disconnect()
      video.pause()
    }
  }, [])

  return (
    <section className="mawa-showcase mawa-section" aria-label="Recent MAWA work video">
      <div className="mawa-container">
        <SectionHeading
          eyebrow="Watch our team at work"
          title="See our technician in action."
          description="Watch a real MAWA service visit. The video starts when you scroll to it and pauses when you move past."
        />

        <div className="mawa-showcase__video-frame">
          <video
            ref={videoRef}
            className="mawa-showcase__video"
            src="/mawa-work.mp4"
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="mawa-showcase__caption">
            <span className="mawa-showcase__chip">Work in progress</span>
            <h3>AC service by the MAWA team</h3>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function MawaHome() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedService, setSelectedService] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerMessage, setCustomerMessage] = useState('')
  const [heroSlideIndex, setHeroSlideIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const rotation = window.setInterval(() => {
      setHeroSlideIndex((index) => (index + 1) % heroSlides.length)
    }, 6000)

    return () => window.clearInterval(rotation)
  }, [])

  const visitSection = (section: string) => {
    setMenuOpen(false)
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const message = [
      'Hi MAWA, I would like to enquire about a service.',
      customerName && `Name: ${customerName}`,
      selectedService && `Service: ${selectedService}`,
      customerMessage && `Details: ${customerMessage}`,
    ]
      .filter(Boolean)
      .join('\n')

    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <main className="mawa-site">
      <div className="mawa-announcement">
        <span className="mawa-announcement__dot" />
        <span>Online 24 hours</span>
        <button type="button" onClick={() => visitSection('contact')}>
          Talk to our team <ArrowUpRight size={14} />
        </button>
      </div>

      <header className="mawa-header">
        <div className="mawa-header__inner">
          <Logo />

          <button
            className={`mawa-menu-toggle${menuOpen ? ' mawa-menu-toggle--open' : ''}`}
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mawa-main-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <nav
            className={`mawa-nav${menuOpen ? ' mawa-nav--open' : ''}`}
            id="mawa-main-nav"
            aria-label="Main navigation"
          >
            {[
              ['Services', 'services'],
              ['Prices', 'pricing'],
              ['About us', 'about'],
              ['Why MAWA', 'why-mawa'],
              ['How it works', 'how-it-works'],
            ].map(([label, section], index) => (
              <a
                className="mawa-nav__link"
                href={`#${section}`}
                key={section}
                onClick={(event) => {
                  event.preventDefault()
                  visitSection(section)
                }}
              >
                <span className="mawa-nav__index">{String(index + 1).padStart(2, '0')}</span>
                <span className="mawa-nav__link-label">{label}</span>
                <ArrowUpRight className="mawa-nav__arrow" size={15} />
              </a>
            ))}
            <button
              className="mawa-button mawa-button--nav"
              type="button"
              onClick={() => visitSection('contact')}
            >
              Book a service <ArrowUpRight size={16} />
            </button>
          </nav>
        </div>
      </header>

      <section className="mawa-hero" id="home">
        <div className="mawa-hero__glow" aria-hidden="true" />
        <div className="mawa-container mawa-hero__inner">
          <div className="mawa-hero__copy">
            <div className="mawa-kicker">
              <span className="mawa-kicker__icon"><Snowflake size={15} /></span>
              Air conditioning, made easy
            </div>
            <h1>
              A cooler home.
              <br />
              <span>A calmer day.</span>
            </h1>
            <p className="mawa-hero__description">
              Reliable air conditioning service for homes and businesses in Kuala Lumpur.
              From a quick fix to a fresh installation, we are here to help.
            </p>
            <div className="mawa-hero__actions">
              <button
                className="mawa-button mawa-button--primary"
                type="button"
                onClick={() => visitSection('contact')}
              >
                Book your service <ArrowRight size={17} />
              </button>
              <button
                className="mawa-text-link"
                type="button"
                onClick={() => visitSection('services')}
              >
                Explore services <ArrowDownRight size={16} />
              </button>
            </div>
            <div className="mawa-hero__proof">
              <span className="mawa-hero__proof-icon"><BadgeCheck size={18} /></span>
              <span>Helpful advice. Careful work. Comfort restored.</span>
            </div>
          </div>

          <div
            className="mawa-hero__visual"
            role="region"
            aria-roledescription="carousel"
            aria-label="MAWA work photo and service-price posters"
          >
            <div
              className="mawa-hero__slides"
              style={{ transform: `translateX(-${heroSlideIndex * 100}%)` }}
            >
              {heroSlides.map((slide, index) =>
                slide.type === 'photo' ? (
                  <div
                    className="mawa-hero__poster-slide mawa-hero__poster-slide--photo"
                    aria-hidden={index !== heroSlideIndex}
                    aria-label={`${slide.title}, MAWA work photo, slide ${index + 1} of ${heroSlides.length}`}
                    key={slide.src}
                  >
                    <img
                      className="mawa-hero__photo-image"
                      src={slide.src}
                      alt={index === heroSlideIndex ? slide.alt : ''}
                    />
                    <div className="mawa-hero__photo-caption">
                      <span className="mawa-hero__poster-mark"><Wind size={20} /></span>
                      <span>
                        <strong>{slide.title}</strong>
                        <small>Careful work by the MAWA team</small>
                      </span>
                    </div>
                  </div>
                ) : (
                  <article
                    className="mawa-hero__poster-slide mawa-hero__poster-slide--service"
                    aria-hidden={index !== heroSlideIndex}
                    aria-label={`${slide.slide.title}, service poster ${index + 1} of ${heroSlides.length}`}
                    key={slide.slide.title}
                  >
                    <img className="mawa-hero__poster-background" src={slide.slide.background} alt="" aria-hidden="true" />
                    <PricingServiceCard slide={slide.slide} />
                  </article>
                ),
              )}
            </div>
            <div className="mawa-hero__carousel-controls">
              <button
                type="button"
                aria-label="Previous price slide"
                onClick={() => setHeroSlideIndex((index) => (index - 1 + heroSlides.length) % heroSlides.length)}
              >
                <ChevronLeft size={17} />
              </button>
              <span aria-live="off">
                {String(heroSlideIndex + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                aria-label="Next price slide"
                onClick={() => setHeroSlideIndex((index) => (index + 1) % heroSlides.length)}
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
          <div className="mawa-hero__scroll" aria-hidden="true">
            <span />
            Scroll to explore
          </div>
        </div>
      </section>

      <section className="mawa-trust-strip" aria-label="Our service promise">
        <div className="mawa-container mawa-trust-strip__inner">
          <div><Snowflake size={19} /><span>Air conditioning specialists</span></div>
          <div><ShieldCheck size={19} /><span>Service you can trust</span></div>
          <div><MapPin size={19} /><span>Kuala Lumpur & nearby</span></div>
          <div><Clock3 size={19} /><span>Appointments that work for you</span></div>
        </div>
      </section>

      <section className="mawa-about mawa-section" id="about">
        <div className="mawa-container mawa-about__grid">
          <div className="mawa-about__visual">
            <div className="mawa-about__photo" role="img" aria-label="Technician servicing an air conditioner" />
            <div className="mawa-about__photo-accent" />
            <div className="mawa-about__note">
              <Snowflake size={20} />
              <span><strong>Comfort is personal.</strong><small>So is the way we care for it.</small></span>
            </div>
          </div>
          <div className="mawa-about__copy">
            <SectionHeading
              eyebrow="A little about us"
              title="Good service feels different."
              align="left"
            />
            <p>
              MAWA is an air conditioning service team built around one simple idea:
              getting help should feel straightforward. We take time to understand
              the problem, explain the options and recommend what makes sense for you.
            </p>
            <p>
              Our technicians work across air conditioning systems and everyday home
              comfort needs in Kuala Lumpur. Whether it is routine maintenance or a
              system that needs attention, we bring care and know-how to every visit.
            </p>
            <ul className="mawa-check-list">
              <li><Check size={16} /> Clear, considerate recommendations</li>
              <li><Check size={16} /> Service for homes and businesses</li>
              <li><Check size={16} /> Support for all major AC makes and models</li>
            </ul>
            <button
              className="mawa-button mawa-button--outline"
              type="button"
              onClick={() => visitSection('why-mawa')}
            >
              Get to know MAWA <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="mawa-work-gallery mawa-section" aria-label="Photos of MAWA air conditioning work">
        <div className="mawa-container">
          <SectionHeading
            eyebrow="Our recent work"
            title="Real work. Real results."
            description="A few snapshots from air conditioning cleaning, servicing and installation jobs completed by our team."
          />
          <div className="mawa-work-gallery__grid">
            {workPhotos.map(({ src, alt, title }) => (
              <figure className="mawa-work-gallery__item" key={src}>
                <img src={src} alt={alt} loading="lazy" />
                <figcaption>{title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mawa-services mawa-section" id="services">
        <div className="mawa-container">
          <SectionHeading
            eyebrow="What we can help with"
            title="Comfort care, from A to AC."
            description="From a new installation to the little things that keep your system running smoothly, find the right help for your space."
          />
          <div className="mawa-service-grid">
            {services.map(({ title, description, icon: Icon }, index) => (
              <article className="mawa-service-card" key={title}>
                <div className="mawa-service-card__top">
                  <span className="mawa-service-card__icon"><Icon size={22} strokeWidth={1.8} /></span>
                  <span className="mawa-service-card__number">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
                <button
                  type="button"
                  className="mawa-service-card__link"
                  onClick={() => {
                    setSelectedService(title)
                    visitSection('contact')
                  }}
                  aria-label={`Ask us about ${title}`}
                >
                  Ask us about this <ArrowUpRight size={15} />
                </button>
              </article>
            ))}
          </div>
          <p className="mawa-services__note">
            Not sure what your system needs? <button type="button" onClick={() => visitSection('contact')}>Tell us what is going on <ArrowRight size={14} /></button>
          </p>
        </div>
      </section>

      <section className="mawa-pricing mawa-section" id="pricing">
        <div className="mawa-container">
          <SectionHeading
            eyebrow="Clear prices, careful work"
            title="MAWA Aircon Service prices."
            description="Straightforward starting prices for our most requested services. If anything needs extra parts or work, we will discuss the cost with you first."
          />

          <div className="mawa-pricing__cards">
            {pricingSlides.map((slide) => (
              <PricingServiceCard slide={slide} key={slide.title} />
            ))}
          </div>

          <div className="mawa-pricing__details">
            <div>
              <span className="mawa-pricing-card__eyebrow">Included in chemical cleaning</span>
              <h3>What our chemical service covers</h3>
              <ul>
                <li>Indoor cooling coil, filters and casing chemical wash</li>
                <li>Drainage tray and pipe vacuuming</li>
                <li>Outdoor coil chemical wash and outdoor drainage pipe vacuuming</li>
                <li>Compressor health check and free 20 psi gas top-up</li>
              </ul>
              <p>Extra gas top-up is RM 2 per psi if required, depending on the unit's existing gas volume and size.</p>
            </div>
            <div className="mawa-pricing__terms">
              <h3>Good to know</h3>
              <p>30-day workmanship warranty for water-leakage issues. Additional services or replacement parts will be quoted before work proceeds.</p>
              <p>RM 50 cancellation charge applies if the team has started travelling or has arrived at your location.</p>
              <p>Renovation, water heater, lighting and fan installation are available on request; the team will provide a quote.</p>
            </div>
          </div>

          <p className="mawa-services__note mawa-pricing__cta">
            Need a quote? <button type="button" onClick={() => visitSection('contact')}>Talk to the MAWA team <ArrowRight size={14} /></button>
          </p>
        </div>
      </section>

      <section className="mawa-why mawa-section" id="why-mawa">
        <div className="mawa-container">
          <div className="mawa-why__intro">
            <SectionHeading
              eyebrow="The MAWA difference"
              title="People first. Comfort always."
              description="Great service is more than a working air conditioner. It is feeling heard, looked after and confident about what comes next."
              align="left"
            />
            <div className="mawa-why__seal"><Snowflake size={30} /><span>MAWA<br />CLIMATE CARE</span></div>
          </div>
          <div className="mawa-reasons-grid">
            {reasons.map(({ title, description, icon: Icon }, index) => (
              <article className="mawa-reason" key={title}>
                <span className="mawa-reason__icon"><Icon size={21} strokeWidth={1.8} /></span>
                <span className="mawa-reason__number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mawa-process mawa-section" id="how-it-works">
        <div className="mawa-container mawa-process__grid">
          <div className="mawa-process__intro">
            <SectionHeading
              eyebrow="Simple from the start"
              title="Three steps to feeling good again."
              description="No complicated forms. Just tell us what you need, and we will take it from there."
              align="left"
            />
            <button
              className="mawa-button mawa-button--primary"
              type="button"
              onClick={() => visitSection('contact')}
            >
              Start a conversation <ArrowRight size={17} />
            </button>
          </div>
          <div className="mawa-steps">
            {[
              { title: 'Tell us what you need', description: 'Send a message with the service you are looking for and a little about the issue.', icon: MessageCircle },
              { title: 'Choose a time', description: 'We will talk through the details and help arrange an appointment that suits you.', icon: Clock3 },
              { title: 'Enjoy the comfort', description: 'Our technician arrives ready to help get your space feeling right again.', icon: Snowflake },
            ].map(({ title, description, icon: Icon }, index) => (
              <article className="mawa-step" key={title}>
                <span className="mawa-step__icon"><Icon size={20} /></span>
                <span className="mawa-step__body">
                  <span className="mawa-step__eyebrow">STEP 0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <WorkShowcase />

      <section className="mawa-cta-band">
        <div className="mawa-container mawa-cta-band__inner">
          <span className="mawa-cta-band__icon"><PhoneCall size={21} /></span>
          <div>
            <span className="mawa-eyebrow">Ready when you are</span>
            <h2>Let’s make your space feel better.</h2>
          </div>
          <button type="button" className="mawa-button mawa-button--light" onClick={() => visitSection('contact')}>
            Get in touch <ArrowUpRight size={17} />
          </button>
        </div>
      </section>

      <section className="mawa-contact mawa-section" id="contact">
        <div className="mawa-container mawa-contact__grid">
          <div className="mawa-contact__copy">
            <SectionHeading
              eyebrow="Let's talk comfort"
              title="Tell us what you need."
              description="Share a few details and we will help you figure out the next step. Your message opens in WhatsApp, so there is no online form submission or backend."
              align="left"
            />
            <a
              className="mawa-contact__whatsapp"
              href={whatsappLink('Hi MAWA, I would like to ask about your air conditioning services.')}
              target="_blank"
              rel="noreferrer"
            >
              <span className="mawa-contact__whatsapp-icon"><WhatsAppIcon size={20} /></span>
              <span><strong>Message MAWA on WhatsApp</strong><small>We’re happy to help you get started</small></span>
              <ArrowUpRight size={18} />
            </a>
            <div className="mawa-contact__website-qr">
              <img src="/mawa-website-qr.png" alt="QR code linking to the MAWA website" />
              <div>
                <strong>Visit our website</strong>
                <p>Scan the code to explore MAWA services and prices.</p>
                <a href="/mawa-website-qr.png" download>
                  <Download size={14} /> Download QR image
                </a>
                <a href="/mawa-website-qr.pdf" download>
                  <Download size={14} /> Printable QR poster (PDF)
                </a>
              </div>
            </div>
            <div className="mawa-contact__location">
              <MapPin size={17} />
              <span><strong>Kuala Lumpur, Malaysia</strong><small>Serving homes and businesses in the area</small></span>
            </div>
            <div className="mawa-contact__details">
              <a className="mawa-contact__detail" href={`tel:${PHONE_NUMBER}`}>
                <PhoneCall size={17} />
                <span><strong>{DISPLAY_PHONE_NUMBER}</strong><small>Call MAWA</small></span>
              </a>
              <a className="mawa-contact__detail" href={`mailto:${CONTACT_EMAIL}`}>
                <Mail size={17} />
                <span><strong>{CONTACT_EMAIL}</strong><small>Email our team</small></span>
              </a>
            </div>
          </div>

          <form className="mawa-inquiry" onSubmit={sendInquiry}>
            <div className="mawa-inquiry__heading">
              <div><span className="mawa-eyebrow">A quick enquiry</span><h3>How can we help?</h3></div>
              <span className="mawa-inquiry__sparkle"><Snowflake size={19} /></span>
            </div>
            <label htmlFor="mawa-name">Your name <span>(optional)</span></label>
            <input
              id="mawa-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="What should we call you?"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
            />
            <label htmlFor="mawa-service">What do you need help with?</label>
            <div className="mawa-select-wrap">
              <select
                id="mawa-service"
                name="service"
                value={selectedService}
                onChange={(event) => setSelectedService(event.target.value)}
              >
                <option value="">Choose a service</option>
                {services.map(({ title }) => <option value={title} key={title}>{title}</option>)}
                <option value="Something else">Something else</option>
              </select>
              <ChevronDown size={17} aria-hidden="true" />
            </div>
            <label htmlFor="mawa-details">A few details <span>(optional)</span></label>
            <textarea
              id="mawa-details"
              name="details"
              rows={3}
              placeholder="Tell us a little about your space or issue..."
              value={customerMessage}
              onChange={(event) => setCustomerMessage(event.target.value)}
            />
            <button className="mawa-button mawa-button--primary mawa-inquiry__submit" type="submit">
              Continue in WhatsApp <ArrowUpRight size={16} />
            </button>
            <p className="mawa-inquiry__privacy">Your message is prepared in WhatsApp. It is not stored on this website.</p>
          </form>
        </div>
      </section>

      <footer className="mawa-footer">
        <div className="mawa-container">
          <div className="mawa-footer__top">
            <div className="mawa-footer__brand">
              <Logo light />
              <p>Thoughtful air conditioning care<br />for more comfortable spaces.</p>
            </div>
            <div className="mawa-footer__links">
              <span>Explore</span>
              {[
                ['Services', 'services'],
                ['Prices', 'pricing'],
                ['About MAWA', 'about'],
                ['Why choose us', 'why-mawa'],
              ].map(([label, section]) => (
                <button type="button" key={section} onClick={() => visitSection(section)}>{label}</button>
              ))}
            </div>
            <div className="mawa-footer__contact">
              <span>Get in touch</span>
              <a href={whatsappLink('Hi MAWA, I would like to ask about your air conditioning services.')} target="_blank" rel="noreferrer">
                WhatsApp our team <ArrowUpRight size={14} />
              </a>
              <a href={`tel:${PHONE_NUMBER}`}>{DISPLAY_PHONE_NUMBER}</a>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
              <span className="mawa-footer__location"><MapPin size={14} /> Kuala Lumpur, Malaysia</span>
            </div>
            <button className="mawa-footer__top-link" type="button" onClick={() => visitSection('home')} aria-label="Back to top">
              <ArrowUpRight size={17} />
            </button>
          </div>
          <div className="mawa-footer__bottom">
            <span>© {new Date().getFullYear()} MAWA Air Cond Service. All rights reserved.</span>
            <span>Made for comfort, with care. <Snowflake size={14} /></span>
          </div>
        </div>
      </footer>

      <a
        className="mawa-whatsapp-float"
        href={whatsappLink('Hi MAWA, I would like to ask about your air conditioning services.')}
        target="_blank"
        rel="noreferrer"
        aria-label={`Message MAWA on WhatsApp at ${DISPLAY_PHONE_NUMBER}`}
      >
        <WhatsAppIcon size={25} />
        <span>Chat with us</span>
      </a>

    </main>
  )
}
