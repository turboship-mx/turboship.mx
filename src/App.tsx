import './App.css'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import dhlLogo from '../carrier-logos/dhl.svg'
import entregaLogo from '../carrier-logos/entrega.svg'
import estafetaLogo from '../carrier-logos/estafeta.svg'
import fedexLogo from '../carrier-logos/fedex.svg'
import imileLogo from '../carrier-logos/imile.svg'
import jtExpressLogo from '../carrier-logos/jtexpress.svg'
import paquetexpressLogo from '../carrier-logos/paquetexpress.svg'
import upsLogo from '../carrier-logos/ups.svg'

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
  title: 'Centraliza envios en un solo dashboard',
  description:
    'Conecta tus paqueterias, fija tus tarifas y automatiza el tracking desde una plataforma que entiende tu operacion.',
  icon: estafetaLogo,
}

const secondaryFeatures = [
  {
    title: 'Integraciones por API',
    description: 'Recibe ordenes desde Shopify, WooCommerce o sistemas internos.',
    icon: fedexLogo,
  },
  {
    title: 'Alertas inteligentes',
    description: 'Notifica incidencias y entregas en WhatsApp Business.',
    icon: dhlLogo,
  },
  {
    title: 'Pagina de rastreo propia',
    description: 'Tu marca al frente con una experiencia de tracking clara.',
    icon: upsLogo,
  },
]

type Shipment = {
  id: string
  carrier: (typeof carrierLogos)[number]
  tracking: number
  service: string
}

const serviceTypes = ['Terrestre Economico', 'Express Dia Siguiente']

const getRandomCarrier = () => carrierLogos[Math.floor(Math.random() * carrierLogos.length)]
const getRandomService = () => serviceTypes[Math.floor(Math.random() * serviceTypes.length)]

const createShipment = (): Shipment => {
  const unix = Math.floor(Date.now() / 1000)

  return {
    id: `${unix}-${Math.random().toString(16).slice(2)}`,
    carrier: getRandomCarrier(),
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
    <div className="page">
      <header className="hero">
        <div className="container">
          <nav className="nav">
            <span className="brand">
              <img className="brand-logo" src="/logo-light-mode.svg" alt="Turboship.mx" />
            </span>
            <div className="nav-links">
              <a href="#producto">Producto</a>
              <a href="#integraciones">Integraciones</a>
              <a href="#rastreo">Rastreo</a>
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
                <button className="btn primary">Empezar ahora</button>
                <a className="btn ghost" href="#demo">
                  Ver demo
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
                        <img
                          className="shipment-logo"
                          src={shipment.carrier.src}
                          alt={shipment.carrier.name}
                        />
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
            <h2>Todo tu envio, orquestado en tiempo real.</h2>
            <p>
              Integra canales de venta, genera etiquetas con tarifas propias y asegura seguimiento
              automatico para cada orden.
            </p>
          </div>
          <div className="feature-grid">
            <article className="feature-card highlight">
              <div className="feature-icon">
                <img src={highlightFeature.icon} alt="" aria-hidden="true" />
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
                    <img src={feature.icon} alt="" aria-hidden="true" />
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

      <section className="flow" id="demo">
        <div className="container">
          <div className="flow-card">
            <p className="flow-label">Flujo Turboship</p>
            <div className="flow-steps">
              <span>Vende donde quieras</span>
              <span>Genera etiquetas</span>
              <span>Seguimiento automatico</span>
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
  )
}

export default App
