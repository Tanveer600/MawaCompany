import { useEffect, useRef, useState, type FormEvent } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ChevronDown,
  Clock3,
  Droplets,
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

const priceHighlights = [
  { category: 'General service', item: 'Wall-mounted AC', price: 'RM 60' },
  { category: 'Chemical service', item: 'Wall-mounted AC · any HP', price: 'RM 130' },
  { category: 'Chemical service', item: 'Ceiling cassette · any HP', price: 'RM 180' },
  { category: 'Overhaul service', item: 'Wall-mounted AC', price: 'RM 200' },
  { category: 'Installation package', item: 'Wall-mounted · 1.0 HP', price: 'RM 210' },
  { category: 'Installation package', item: 'Ceiling cassette · 1.5 HP', price: 'RM 280' },
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
  const [quickPriceIndex, setQuickPriceIndex] = useState(0)
  const [quickPriceVisible, setQuickPriceVisible] = useState(false)
  const [quickPriceDismissed, setQuickPriceDismissed] = useState(false)

  useEffect(() => {
    if (quickPriceDismissed) {
      return
    }

    let hideTimeout: number | undefined
    const showPrice = () => {
      setQuickPriceVisible(true)
      window.clearTimeout(hideTimeout)
      hideTimeout = window.setTimeout(() => setQuickPriceVisible(false), 8500)
    }

    const firstDisplay = window.setTimeout(showPrice, 6500)
    const rotation = window.setInterval(() => {
      setQuickPriceIndex((index) => (index + 1) % priceHighlights.length)
      showPrice()
    }, 35000)

    return () => {
      window.clearTimeout(firstDisplay)
      window.clearInterval(rotation)
      window.clearTimeout(hideTimeout)
    }
  }, [quickPriceDismissed])

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
        <span>Comfort starts with a conversation.</span>
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

          <div className="mawa-hero__visual">
            <div className="mawa-hero__image" role="img" aria-label="Air conditioning technician at work" />
            <div className="mawa-hero__image-shade" />
            <div className="mawa-hero__image-caption">
              <span className="mawa-caption-icon"><Wind size={19} /></span>
              <span>
                <strong>Feel the difference</strong>
                <small>Comfort, taken care of</small>
              </span>
              <ArrowUpRight size={19} />
            </div>
            <div className="mawa-hero__floating-card">
              <span className="mawa-floating-card__icon"><Check size={17} /></span>
              <span><strong>All makes & models</strong><small>One team for every season</small></span>
            </div>
            <div className="mawa-hero__vertical-label">MAWA · CLIMATE CARE</div>
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

          <div className="mawa-pricing__grid">
            <article className="mawa-pricing-card">
              <span className="mawa-pricing-card__eyebrow">01 · Routine care</span>
              <h3>General service</h3>
              <PriceList items={generalServicePrices} />
              <p className="mawa-pricing-card__note">Gas refill surcharge may apply depending on the unit's existing gas volume.</p>
            </article>

            <article className="mawa-pricing-card">
              <span className="mawa-pricing-card__eyebrow">02 · Deep clean</span>
              <h3>Chemical service</h3>
              <PriceList items={chemicalServicePrices} />
              <p className="mawa-pricing-card__note">Wall-mounted and ceiling cassette prices are per unit, regardless of HP.</p>
            </article>

            <article className="mawa-pricing-card">
              <span className="mawa-pricing-card__eyebrow">03 · Full clean</span>
              <h3>Overhaul service</h3>
              <PriceList items={overhaulServicePrices} />
              <p className="mawa-pricing-card__note">Includes a free 20 psi gas top-up. Any additional gas requirement will be discussed before work proceeds.</p>
            </article>

            <article className="mawa-pricing-card mawa-pricing-card--installation">
              <span className="mawa-pricing-card__eyebrow">04 · Supply & install</span>
              <h3>Installation packages</h3>
              <div className="mawa-pricing-card__columns">
                <div>
                  <h4>Wall-mounted</h4>
                  <PriceList items={wallInstallationPrices} />
                  <p className="mawa-pricing-card__note">Includes 6 ft copper, 6 ft wire, 6 ft insulation and 10 ft drain pipe.</p>
                </div>
                <div>
                  <h4>Ceiling cassette</h4>
                  <PriceList items={cassetteInstallationPrices} />
                </div>
              </div>
              <div className="mawa-pricing-card__extras">
                <span>Extra length beyond 6 ft: RM 22 / ft</span>
                <span>Above 3.0 HP: RM 25 / ft</span>
                <span>Copper supply & install: RM 11 / ft</span>
                <span>Cable tray supply & install: RM 22 / ft</span>
              </div>
              <p className="mawa-pricing-card__note">30-day workmanship warranty for installation.</p>
            </article>
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
              <span className="mawa-contact__whatsapp-icon"><MessageCircle size={19} /></span>
              <span><strong>Message MAWA on WhatsApp</strong><small>We’re happy to help you get started</small></span>
              <ArrowUpRight size={18} />
            </a>
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
        <MessageCircle size={24} />
        <span>Chat with us</span>
      </a>

      <aside
        className={`mawa-price-toast${quickPriceVisible ? ' mawa-price-toast--visible' : ''}`}
        aria-hidden={!quickPriceVisible}
      >
        <div className="mawa-price-toast__top">
          <span><Sparkles size={14} /> Quick price</span>
          <button
            type="button"
            aria-label="Dismiss price highlight"
            onClick={() => {
              setQuickPriceDismissed(true)
              setQuickPriceVisible(false)
            }}
          >
            <X size={15} />
          </button>
        </div>
        <strong className="mawa-price-toast__category">{priceHighlights[quickPriceIndex].category}</strong>
        <span className="mawa-price-toast__item">{priceHighlights[quickPriceIndex].item}</span>
        <span className="mawa-price-toast__price">{priceHighlights[quickPriceIndex].price}</span>
        <button className="mawa-price-toast__link" type="button" onClick={() => visitSection('pricing')}>
          View all prices <ArrowUpRight size={14} />
        </button>
      </aside>
    </main>
  )
}
