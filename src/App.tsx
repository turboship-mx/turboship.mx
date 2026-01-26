import './App.css'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BellRing, Code, Forklift, GalleryVerticalEnd, Globe } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
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

  useEffect(() => {
    let timeoutId = window.setTimeout(() => {})
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
              <h1>Envios conectados para marcas que crecen rapido.</h1>
              <p className="lead">
                Unifica canales, cotiza al instante y entrega experiencias de tracking claras sin
                friccion operativa.
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
                <a className="text-link" href="#">
                  Conoce la plataforma
                </a>
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
                <h2>Seguimiento claro, clientes tranquilos.</h2>
                <p>
                  Tu pagina de rastreo con tu logotipo y una interfaz amigable para que tus clientes
                  sigan su envio y reciban ayuda en segundos.
                </p>
                <a className="text-link" href="#">
                  Ver experiencia de tracking
                </a>
              </div>
              <div className="tracking-card">
                <h3>Notificaciones en tiempo real</h3>
                <p>
                  Integra WhatsApp Business y envia actualizaciones automaticas ante incidencias o
                  entregas confirmadas.
                </p>
                <div className="tracking-icons">
                  <img src={entregaLogo} alt="" aria-hidden="true" />
                  <img src={imileLogo} alt="" aria-hidden="true" />
                  <img src={paquetexpressLogo} alt="" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="container">
            <div className="cta-card">
              <h2>Listo para centralizar tu logistica.</h2>
              <p>
                Unifica paqueterias, automatiza mensajes y ofrece visibilidad total desde el primer dia.
              </p>
              <button className="btn primary">Solicitar acceso</button>
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
