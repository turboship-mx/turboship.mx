import './App.css'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BellRing, Code, Forklift, GalleryVerticalEnd, Globe, MailCheck, MessageCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { getStatusIcon, type TrackingStatus } from './utils/tracking-status'
import dhlLogo from '../carrier-logos/dhl.svg'
import entregaLogo from '../carrier-logos/entrega.svg'
import estafetaLogo from '../carrier-logos/estafeta.svg'
import fedexLogo from '../carrier-logos/fedex.svg'
import imileLogo from '../carrier-logos/imile.svg'
import jtExpressLogo from '../carrier-logos/jtexpress.svg'
import paquetexpressLogo from '../carrier-logos/paquetexpress.svg'
import upsLogo from '../carrier-logos/ups.svg'
import shopifyLogo from '../store-logos/shopify.svg'
import woocommerceLogo from '../store-logos/woocommerce.svg'

const carrierLogos = [
  { name: 'Estafeta', src: estafetaLogo },
  { name: 'FedEx', src: fedexLogo },
  { name: 'DHL', src: dhlLogo },
  { name: 'UPS', src: upsLogo },
  { name: 'Paquetexpress', src: paquetexpressLogo },
  { name: 'J&T Express', src: jtExpressLogo },
  { name: 'Entrega', src: entregaLogo },
  { name: 'iMile', src: imileLogo },
]

const highlightFeature = {
  title: 'Shopify, WooCommerce, API',
  description:
    'No importa si recibes tus pedidos por tiendas en linea o desde un sistema propio, nuestras integraciones se adaptan a tus necesidades.',
  icons: [shopifyLogo, woocommerceLogo, Code] as const,
}

type StoreLogo = {
  key: 'shopify' | 'woocommerce' | 'marketplace'
  name: string
  src?: string
  Icon?: LucideIcon
}

const storeLogos: StoreLogo[] = [
  { key: 'shopify', name: 'Shopify', src: shopifyLogo },
  { key: 'woocommerce', name: 'WooCommerce', src: woocommerceLogo },
  { key: 'marketplace', name: 'Marketplace', Icon: Globe },
]

type FeatureIcon = string | LucideIcon

const secondaryFeatures: Array<{
  title: string
  description: string
  icon: FeatureIcon
}> = [
    {
      title: 'Solicita Recolecciones',
      description: 'Solicita recolecciones desde la plataforma.',
      icon: Forklift,
    },
    {
      title: 'Notificaciones via WhatsApp & Correo',
      description: 'Tus clientes informados en tiempo real.',
      icon: BellRing,
    },
    {
      title: 'Página de Rastreo Personalizada',
      description: 'Ofrece una mejor experiencia post venta.',
      icon: GalleryVerticalEnd,
    },
  ]

type TrackingProgressStep = {
  status?: TrackingStatus
  tone: string
  label: string
  icon?: LucideIcon
  size?: 'small'
}

const trackingProgress: TrackingProgressStep[] = [
  { status: 'labelCreated', tone: 'neutral', label: 'Etiqueta creada' },
  { status: 'pickedUp', tone: 'sky', label: 'Recolección' },
  { status: 'inTransit', tone: 'blue', label: 'En tránsito' },
  {
    icon: MessageCircle,
    tone: 'sky',
    label: 'Notificación Automática',
    size: 'small',
  },
  { status: 'delivered', tone: 'emerald', label: 'Entregado' },
  {
    icon: MailCheck,
    tone: 'emerald',
    label: 'Notificación Automática',
    size: 'small',
  },
]

const trackingCardProgress = [
  { status: 'inTransit' as const, tone: 'blue', label: 'En tránsito' },
  { status: 'attemptedDelivery' as const, tone: 'orange', label: 'Intento de entrega' },
  { status: 'exception' as const, tone: 'red', label: 'Incidencia' },
]

type Shipment = {
  id: string
  carrier: (typeof carrierLogos)[number]
  store: StoreLogo
  tracking: number
  service: string
}

const serviceTypes = ['Terrestre Economico', 'Express Dia Siguiente']

const getRandomCarrier = () => carrierLogos[Math.floor(Math.random() * carrierLogos.length)]
const getRandomStore = () => storeLogos[Math.floor(Math.random() * storeLogos.length)]
const getRandomService = () => serviceTypes[Math.floor(Math.random() * serviceTypes.length)]

const createShipment = (): Shipment => {
  const unix = Math.floor(Date.now() / 1000)
  const store = getRandomStore()

  return {
    id: `${unix}-${Math.random().toString(16).slice(2)}`,
    carrier: getRandomCarrier(),
    store,
    tracking: unix,
    service: getRandomService(),
  }
}

const createInitialShipments = () => {
  const count = Math.floor(Math.random() * 3) + 6
  return Array.from({ length: count }, () => createShipment())
}

function App() {
  const [shipments, setShipments] = useState<Shipment[]>(() => createInitialShipments())
  const [activeProgressIndex, setActiveProgressIndex] = useState(0)
  const heroLogoClicksRef = useRef<Record<string, number[]>>({})
  const easterEggUrl = 'https://www.youtube.com/watch?v=m39oWoo-JgI'
  const handleEasterEggClick = (id: string, label: string) => {
    const now = Date.now()
    const clicks = heroLogoClicksRef.current[id] ?? []
    const recentClicks = clicks.filter((timestamp) => now - timestamp <= 3000)
    recentClicks.push(now)
    if (recentClicks.length >= 10) {
      heroLogoClicksRef.current[id] = []
      window.open(easterEggUrl, '_blank', 'noopener,noreferrer')
      return
    }
    heroLogoClicksRef.current[id] = recentClicks
  }

  useEffect(() => {
    let timeoutId = window.setTimeout(() => { })
    let active = true

    const scheduleNext = () => {
      const delay = 500 + Math.random() * 3500
      timeoutId = window.setTimeout(() => {
        if (!active) return
        setShipments((prev) => [createShipment(), ...prev].slice(0, 8))
        scheduleNext()
      }, delay)
    }

    scheduleNext()

    return () => {
      active = false
      window.clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    let timeoutId = window.setTimeout(() => { })
    let active = true

    const stepCount = trackingProgress.length

    const advance = (index: number) => {
      if (!active) return
      setActiveProgressIndex(index)
      const isLast = index === stepCount - 1
      const delay = isLast ? 3000 : 800
      timeoutId = window.setTimeout(() => {
        if (!active) return
        advance(isLast ? 0 : index + 1)
      }, delay)
    }

    advance(0)

    return () => {
      active = false
      window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <>
      <header className="hero">
        <div className="container">
          <nav className="nav">
            <span className="brand">
              <img className="brand-logo" src="/logo-light-mode.svg" alt="Turboship.mx" />
            </span>
            <div className="nav-actions">
              <a
                className="btn ghost"
                href="https://app.turboship.mx/auth/signin"
                target="_blank"
                rel="noreferrer"
              >
                Acceder
              </a>
              <a
                className="btn primary"
                href="https://app.turboship.mx/auth/signup"
                target="_blank"
                rel="noreferrer"
              >
                Empezar ahora
              </a>
            </div>
          </nav>

          <div className="hero-content">
            <div className="hero-copy">
              <h1>De venta a entrega con la mejor experiencia.</h1>
              <p className="lead">
                Turboship centraliza tus canales de venta y proveedores de envíos con el fin de mejorar la experiencia
                de entrega de tu negocio, incrementes tus clientes recurrentes y tomes control de tu operación.
              </p>
              <div className="hero-actions">
                <a
                  className="btn primary"
                  href="https://app.turboship.mx/auth/signup"
                  target="_blank"
                  rel="noreferrer"
                >
                  Empezar ahora
                </a>
                <a
                  className="btn ghost"
                  href="https://calendly.com/arturoll-turboship/30min"
                  target="_blank"
                  rel="noreferrer"
                >
                  Agendar demo
                </a>
              </div>
              <div className="hero-meta">
                <div>
                  <strong>+12</strong>
                  <span>proveedores conectados</span>
                </div>
                <div>
                  <strong>24/7</strong>
                  <span>visibilidad operativa</span>
                </div>
              </div>
            </div>
            <div className="hero-media">
              <div className="shipments-card">
                <ul className="shipments-list">
                  <AnimatePresence initial={false}>
                    {shipments.map((shipment) => (
                      <motion.li
                        key={shipment.id}
                        layout
                        initial={{ opacity: 0, y: -18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 18 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="shipment-row"
                      >
                        <div className="shipment-logos">
                          {shipment.store.src ? (
                            <img
                              className="shipment-logo shipment-store-logo"
                              src={shipment.store.src}
                              alt={shipment.store.name}
                            />
                          ) : (
                            <span
                              className="shipment-logo shipment-store-logo shipment-store-icon"
                              aria-label={shipment.store.name}
                            >
                              {shipment.store.Icon ? (
                                <shipment.store.Icon aria-hidden="true" />
                              ) : null}
                            </span>
                          )}
                          <img
                            className="shipment-logo"
                            src={shipment.carrier.src}
                            alt={shipment.carrier.name}
                          />
                        </div>
                        <div className="shipment-meta">
                          <span className="shipment-title">{shipment.carrier.name}</span>
                          <span className="shipment-subtitle">{shipment.service}</span>
                        </div>
                        <span className="shipment-track">#{shipment.tracking}</span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="page">
        <section className="logo-strip" id="integraciones">
          <div className="container">
            <div className="logo-grid">
              {carrierLogos.map((logo) => (
                <img
                  key={logo.name}
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  loading="lazy"
                  onClick={() => handleEasterEggClick(`logo-strip-${logo.name}`, logo.name)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="producto">
          <div className="container">
            <div className="section-heading">
              <h2>Toma el control de tu operación logística.</h2>
              <p>
                Conecta tus canales de venta con nuestras integraciones o utiliza nuestra API para
                cotizar, generar y rastrear tus envíos de forma automática.
              </p>
            </div>
            <div className="feature-grid">
              <article className="feature-card highlight">
                <div className="feature-icon">
                  <div className="feature-icon-group" aria-hidden="true">
                    {highlightFeature.icons.map((icon, index) => (
                      <span className="feature-icon-chip" key={`${highlightFeature.title}-${index}`}>
                        {typeof icon === 'string' ? (
                          <img src={icon} alt="" />
                        ) : (
                          (() => {
                            const Icon = icon as LucideIcon
                            return <Icon aria-hidden="true" />
                          })()
                        )}
                      </span>
                    ))}
                  </div>
                </div>
                <h3>{highlightFeature.title}</h3>
                <p>{highlightFeature.description}</p>
              </article>
              <div className="feature-list">
                {secondaryFeatures.map((feature) => (
                  <article className="feature-row" key={feature.title}>
                    <div className="feature-icon">
                      {typeof feature.icon === 'string' ? (
                        <img src={feature.icon} alt="" aria-hidden="true" />
                      ) : (
                        <feature.icon aria-hidden="true" />
                      )}
                    </div>
                    <div>
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="rastreo">
          <div className="container">
            <div className="tracking-grid">
              <div>
                <div className="tracking-progress" aria-hidden="true">
                  <span className="tracking-progress-line" />
                  <div className="tracking-progress-steps">
                    {trackingProgress.map((step, index) => (
                      <span
                        key={`${step.label}-${index}`}
                        className={`tracking-progress-step tracking-progress-${step.tone} ${
                          step.size === 'small'
                            ? 'tracking-progress-step-small tracking-progress-step-muted'
                            : ''
                        } ${index === activeProgressIndex ? 'tracking-progress-step-active' : ''}`}
                      >
                        <span className="tracking-progress-tooltip" role="tooltip">
                          {step.label}
                        </span>
                        <span className="tracking-progress-icon">
                          {step.icon ? (
                            <step.icon className="tracking-progress-svg" aria-hidden="true" />
                          ) : (
                            getStatusIcon(step.status ?? 'unknown', 'tracking-progress-svg')
                          )}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
                <h2>Seguimiento claro, clientes tranquilos.</h2>
                <p>
                  Rastrea todos tus envíos de forma centralizada y ofrece una experiencia agradable
                  de post venta a tus clientes.
                </p>
              </div>
              <div className="tracking-card">
                <h3>Entérate de incidencias antes que tus clientes</h3>
                <div className="tracking-progress tracking-progress-compact" aria-hidden="true">
                  <span className="tracking-progress-line" />
                  <div className="tracking-progress-steps">
                    {trackingCardProgress.map((step, index) => (
                      <span
                        key={`${step.status}-${index}`}
                        className={`tracking-progress-step tracking-progress-${step.tone} ${
                          index === 2 ? 'tracking-progress-alert' : ''
                        }`}
                      >
                        <span className="tracking-progress-tooltip" role="tooltip">
                          {step.label}
                        </span>
                        <span className="tracking-progress-icon">
                          {getStatusIcon(step.status, 'tracking-progress-svg')}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
                <p>
                  Nuestro rastreador opera 24/7. Recibe alertas cuando un envío tuvo problemas en
                  tránsito o si no han logrado concretar la entrega.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="container">
            <div className="cta-card">
              <h2>¿Listo para optimizar tu logística?</h2>
              <p>
                Cuéntanos de tu operación y te mostramos por qué Turboship es tu mejor opción.
              </p>
              <a
                className="btn primary"
                href="https://calendly.com/arturoll-turboship/30min"
                target="_blank"
                rel="noreferrer"
              >
                Agendar Demo
              </a>
            </div>
          </div>
        </section>

        <footer className="footer">
          <div className="container footer-inner">
            <span>© 2026 Turboship.mx</span>
            <div>
              <a href="#">Privacidad</a>
              <a href="#">Contacto</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
