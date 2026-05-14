import { useEffect, useRef, useState, type MutableRefObject } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BellRing,
  Code,
  FileCheck2,
  Forklift,
  GalleryVerticalEnd,
  Globe,
  MailCheck,
  MapPin,
  MessageCircle,
  Plane,
  ShoppingBag,
  Store,
  Truck,
  Warehouse,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { getStatusIcon, type TrackingStatus } from '../utils/tracking-status'
import { Link } from '../components/Link'
import { Nav } from '../components/Nav'
import dhlLogo from '../../carrier-logos/dhl.svg'
import entregaLogo from '../../carrier-logos/entrega.svg'
import estafetaLogo from '../../carrier-logos/estafeta.svg'
import fedexLogo from '../../carrier-logos/fedex.svg'
import imileLogo from '../../carrier-logos/imile.svg'
import jtExpressLogo from '../../carrier-logos/jtexpress.svg'
import paquetexpressLogo from '../../carrier-logos/paquetexpress.svg'
import upsLogo from '../../carrier-logos/ups.svg'
import shopifyLogo from '../../store-logos/shopify.svg'
import woocommerceLogo from '../../store-logos/woocommerce.svg'

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

type HubNode = {
  label: string
  Icon: LucideIcon
  position: string
}

const hubNodes: HubNode[] = [
  { label: 'Shopify', Icon: ShoppingBag, position: 'top-0 left-1/2 -translate-x-1/2' },
  { label: 'Marketplaces', Icon: Store, position: 'top-[18%] right-0 translate-x-0' },
  { label: 'ERP / API', Icon: Code, position: 'bottom-[18%] right-0 translate-x-0' },
  { label: 'Agregadores', Icon: Globe, position: 'bottom-0 left-1/2 -translate-x-1/2' },
  { label: 'Almacenes', Icon: Warehouse, position: 'bottom-[18%] left-0 translate-x-0' },
  { label: 'Tienda física', Icon: Store, position: 'top-[18%] left-0 translate-x-0' },
]

type HubLogo = {
  label: string
  src: string
  position: string
}

const hubLogos: HubLogo[] = [
  { label: 'Envia', src: '/integrations/envia.png', position: 'left-[76%] top-[35%] -translate-x-1/2 -translate-y-1/2' },
  { label: 'Skydropx', src: '/integrations/skydropx.webp', position: 'left-1/2 top-[80%] -translate-x-1/2 -translate-y-1/2' },
  { label: 'T1 Envíos', src: '/integrations/t1envios.webp', position: 'left-[24%] top-[35%] -translate-x-1/2 -translate-y-1/2' },
]

const rateTiers = [
  {
    title: 'Ecommerce',
    description: 'Tarifas terrestres y express negociadas con las paqueterías líderes en México.',
    Icon: Truck,
    tone: 'from-sky-500/15 to-sky-500/0 border-sky-200',
  },
  {
    title: 'LTL & Carga Consolidada',
    description: 'Envíos voluminosos y tarimas con descuentos por volumen y ruta.',
    Icon: Forklift,
    tone: 'from-blue-500/15 to-blue-500/0 border-blue-200',
  },
  {
    title: 'Internacional',
    description: 'Cobertura cross-border y rutas internacionales con tarifas escalonadas por peso.',
    Icon: Plane,
    tone: 'from-emerald-500/15 to-emerald-500/0 border-emerald-200',
  },
]

const complianceFeatures = [
  {
    title: 'Direcciones con SEPOMEX',
    description:
      'Autocompletado de colonia, municipio y estado a partir del código postal. Menos errores de captura, menos guías rechazadas.',
    Icon: MapPin,
  },
  {
    title: 'Carta Porte y SAT',
    description:
      'Catálogos oficiales del SAT integrados para que llenes la documentación de traslado sin salir de la plataforma.',
    Icon: FileCheck2,
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
    label: 'SMS Enviado',
    size: 'small',
  },
  { status: 'delivered', tone: 'emerald', label: 'Entregado' },
  {
    icon: MailCheck,
    tone: 'emerald',
    label: 'Correo Enviado',
    size: 'small',
  },
]

const trackingCardProgress = [
  { status: 'inTransit' as const, tone: 'blue', label: 'En tránsito' },
  { status: 'attemptedDelivery' as const, tone: 'orange', label: 'Intento de entrega' },
  { status: 'exception' as const, tone: 'red', label: 'Incidencia' },
]

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ')

const toneClasses = {
  neutral: { bg: 'bg-slate-100', text: 'text-slate-500' },
  sky: { bg: 'bg-sky-100', text: 'text-sky-600' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
  red: { bg: 'bg-red-100', text: 'text-red-600' },
  emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
} as const

const cardToneText = {
  neutral: 'text-slate-200',
  sky: 'text-sky-300',
  blue: 'text-blue-300',
  orange: 'text-amber-300',
  red: 'text-rose-300',
  emerald: 'text-emerald-300',
} as const

const handleEasterEggClick = (
  id: string,
  heroLogoClicksRef: MutableRefObject<Record<string, number[]>>,
  easterEggUrl: string
) => {
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

export function HomePage() {
  const [shipments, setShipments] = useState<Shipment[]>(() => createInitialShipments())
  const [activeProgressIndex, setActiveProgressIndex] = useState(0)
  const heroLogoClicksRef = useRef<Record<string, number[]>>({})
  const easterEggUrl = 'https://www.youtube.com/watch?v=m39oWoo-JgI'

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
      <header className="pb-16">
        <div className="container px-[clamp(16px,4vw,56px)]">
          <Nav />

          <div className="mt-16 grid items-center gap-[clamp(2rem,6vw,5rem)] [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))] max-[1024px]:grid-cols-1 max-[720px]:mt-8 max-[720px]:gap-8">
            <div className="flex max-w-[540px] flex-col gap-6 animate-[fadeIn_0.8s_ease_forwards] max-[720px]:items-center max-[720px]:text-center">
              <h1 className="m-0 pt-6 text-[clamp(2.7rem,4.6vw,4.2rem)] leading-[1.05] max-[720px]:pt-3">
                De venta a entrega con la mejor experiencia.
              </h1>
              <p className="m-0 text-[1.05rem] text-[var(--muted)]">
                Turboship centraliza tus canales de venta y proveedores de envíos con el fin de mejorar la experiencia
                de entrega de tu negocio, incrementes tus clientes recurrentes y tomes control de tu operación.
              </p>
              <div className="flex items-center gap-4 max-[720px]:flex-wrap max-[720px]:justify-center max-[720px]:gap-2.5">
                <a
                  className="inline-flex items-center justify-center rounded-full border border-transparent bg-[var(--accent)] px-6 py-3 text-[0.95rem] font-semibold text-white shadow-[0_16px_40px_rgba(44,123,229,0.3)] transition-[transform,box-shadow,border-color,color] duration-200 ease-out hover:-translate-y-0.5 max-[720px]:px-4 max-[720px]:py-2.5 max-[720px]:text-[0.88rem]"
                  href="https://app.turboship.mx/auth/signup"
                  target="_blank"
                  rel="noreferrer"
                >
                  Empezar ahora
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-full border border-[var(--line)] px-6 py-3 text-[0.95rem] font-semibold text-[var(--ink)] transition-[transform,box-shadow,border-color,color] duration-200 ease-out hover:border-[var(--accent)] hover:text-[var(--accent)] max-[720px]:px-4 max-[720px]:py-2.5 max-[720px]:text-[0.88rem]"
                  href="https://calendly.com/arturoll-turboship/30min"
                  target="_blank"
                  rel="noreferrer"
                >
                  Agendar demo
                </a>
              </div>
              <div className="grid grid-cols-2 gap-x-7 gap-y-5 text-[0.85rem] text-[var(--muted)] max-[720px]:justify-items-center max-[720px]:text-center max-[720px]:gap-x-4 max-[720px]:gap-y-3 max-[720px]:text-[0.78rem]">
                <div>
                  <strong className="block text-base text-[var(--ink)] max-[720px]:text-[0.92rem]">+20</strong>
                  <span>proveedores conectados</span>
                </div>
                <div>
                  <strong className="block text-base text-[var(--ink)] max-[720px]:text-[0.92rem]">+2M</strong>
                  <span>envíos procesados</span>
                </div>
              </div>
            </div>
            <div className="relative flex min-h-[360px] overflow-hidden p-[26px] [border-radius:0] [background:transparent] [box-shadow:none] [border:none] isolation-isolate max-[720px]:p-0">
              <div className="relative z-[1] mx-auto flex w-full max-w-[600px] flex-col gap-5">
                <ul className="m-0 flex max-h-[410px] list-none flex-col gap-3 p-0">
                  <AnimatePresence initial={false}>
                    {shipments.map((shipment) => (
                      <motion.li
                        key={shipment.id}
                        layout
                        initial={{ opacity: 0, y: -18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 18 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="flex items-center gap-3.5 rounded-2xl border border-[var(--line)] bg-white px-3.5 py-3 shadow-[0_10px_22px_rgba(15,23,42,0.06)]"
                      >
                        <div className="flex items-center gap-2">
                          {shipment.store.src ? (
                            <img
                              className="h-8 w-8 flex-shrink-0 rounded-[10px] border border-[var(--line)] bg-white p-1 object-contain opacity-90"
                              src={shipment.store.src}
                              alt={shipment.store.name}
                            />
                          ) : (
                            <span
                              className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-[10px] border border-[var(--line)] bg-white p-1 text-[var(--muted)] opacity-90"
                              aria-label={shipment.store.name}
                            >
                              {shipment.store.Icon ? (
                                <shipment.store.Icon className="h-3.5 w-3.5" aria-hidden="true" />
                              ) : null}
                            </span>
                          )}
                          <img
                            className="h-[30px] w-[30px] flex-shrink-0 rounded-[12px] border border-[var(--line)] bg-white p-[5px] object-contain opacity-90"
                            src={shipment.carrier.src}
                            alt={shipment.carrier.name}
                          />
                        </div>
                        <div className="flex flex-1 flex-col gap-0.5">
                          <span className="text-[0.95rem] font-semibold">{shipment.carrier.name}</span>
                          <span className="text-[0.75rem] text-[var(--muted)]">{shipment.service}</span>
                        </div>
                        <span className="whitespace-nowrap rounded-full bg-[var(--accent-soft)] px-2.5 py-1.5 text-[0.72rem] font-semibold text-[var(--ink)]">
                          #{shipment.tracking}
                        </span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="px-[7vw] pb-[120px] max-[720px]:px-[4vw] max-[720px]:pb-[80px]">
        <section className="flex flex-col gap-[18px] pb-20 max-[720px]:gap-3 max-[720px]:pb-12" id="integraciones">
          <div className="container">
            <div className="flex flex-nowrap items-center justify-center gap-[clamp(10px,2.6vw,18px)] overflow-hidden max-[720px]:flex-wrap">
              {carrierLogos.map((logo) => (
                <img
                  key={logo.name}
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  loading="lazy"
                  className="h-auto w-full max-w-[68px] rounded-2xl opacity-[0.55] grayscale transition-[opacity,filter] duration-200 ease-out hover:opacity-95 hover:grayscale-0"
                  onClick={() => handleEasterEggClick(`logo-strip-${logo.name}`, heroLogoClicksRef, easterEggUrl)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-[90px] max-[720px]:py-[64px]" id="producto">
          <div className="container">
            <div className="max-w-[640px]">
              <h2 className="m-0 mb-3 text-[clamp(2rem,3vw,2.6rem)] leading-[1.15] max-[720px]:text-[clamp(1.7rem,6vw,2.1rem)]">
                Toma el control de tu operación logística.
              </h2>
              <p className="m-0 text-[var(--muted)]">
                Conecta tus canales de venta con nuestras integraciones o utiliza nuestra API para
                cotizar, generar y rastrear tus envíos de forma automática.
              </p>
            </div>
            <div className="mt-9 grid items-stretch gap-6 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))] max-[720px]:mt-6 max-[720px]:gap-[18px]">
              <article className="flex flex-col gap-4 rounded-[26px] border border-[rgba(44,123,229,0.25)] p-8 shadow-[0_16px_30px_rgba(15,23,42,0.06)] animate-[rise_0.7s_ease_forwards] [background:linear-gradient(135deg,rgba(44,123,229,0.12),rgba(255,255,255,0.95))]">
                <div className="inline-flex">
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    {highlightFeature.icons.map((icon, index) => (
                      <span
                        className="grid h-12 w-12 place-items-center rounded-[12px] border border-[var(--line)] bg-white"
                        key={`${highlightFeature.title}-${index}`}
                      >
                        {typeof icon === 'string' ? (
                          <img className="h-7 w-7" src={icon} alt="" />
                        ) : (
                          (() => {
                            const Icon = icon as LucideIcon
                            return <Icon className="h-[26px] w-[26px] text-[var(--muted)]" aria-hidden="true" />
                          })()
                        )}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="m-0 text-[1.1rem]">{highlightFeature.title}</h3>
                <p className="m-0 text-[var(--muted)]">{highlightFeature.description}</p>
              </article>
              <div className="flex flex-col gap-4">
                {secondaryFeatures.map((feature) => (
                  <article
                    className="flex items-start gap-4 rounded-[20px] border border-[var(--line)] bg-white px-[22px] py-5 shadow-[0_12px_24px_rgba(15,23,42,0.05)]"
                    key={feature.title}
                  >
                    <div className="grid h-11 w-11 place-items-center rounded-[14px] border border-[var(--line)] bg-[var(--surface)]">
                      {typeof feature.icon === 'string' ? (
                        <img className="h-6 w-6 opacity-[0.85]" src={feature.icon} alt="" aria-hidden="true" />
                      ) : (
                        <feature.icon className="h-6 w-6 text-[var(--muted)]" aria-hidden="true" />
                      )}
                    </div>
                    <div>
                      <h3 className="m-0 text-[1.1rem]">{feature.title}</h3>
                      <p className="m-0 text-[var(--muted)]">{feature.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-[90px] max-[720px]:py-[64px]" id="hub">
          <div className="container">
            <div className="grid items-center gap-[clamp(2rem,5vw,4rem)] md:grid-cols-[1fr_1.1fr]">
              <div className="flex flex-col gap-5 max-w-[520px]">
                <span className="eyebrow">Hub central</span>
                <h2 className="m-0 text-[clamp(2rem,3vw,2.6rem)] leading-[1.15] max-[720px]:text-[clamp(1.7rem,6vw,2.1rem)]">
                  Todo tu universo de envíos, en un solo lugar.
                </h2>
                <p className="m-0 text-[var(--muted)]">
                  Marketplaces, tiendas en línea, ERPs, almacenes y agregadores: todo conecta a Turboship. Deja
                  de pelearte con plataformas dispersas y opera con una sola fuente de la verdad.
                </p>
                <ul className="m-0 mt-2 grid list-none gap-3 p-0 text-[0.95rem] text-[var(--muted)]">
                  <li className="flex items-start gap-3">
                    <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    <span>Conecta varios canales con sincronización automática de pedidos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    <span>Centraliza paqueterías, agregadores y carriers propios sin fricción</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    <span>API abierta para que tus sistemas internos hablen con la operación</span>
                  </li>
                </ul>
              </div>
              <div className="relative mx-auto aspect-square w-full max-w-[460px]">
                <div className="absolute inset-[18%] rounded-full border border-[var(--line)] [background:radial-gradient(circle_at_center,rgba(44,123,229,0.18),transparent_70%)]" />
                <div className="absolute inset-[6%] rounded-full border border-dashed border-[rgba(44,123,229,0.25)]" />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[110px] w-[110px] overflow-hidden rounded-[24px] shadow-[0_18px_40px_rgba(44,123,229,0.18)]">
                  <img className="h-full w-full" src="/turboship-icon.svg" alt="Turboship" />
                </div>
                {hubNodes.map((node) => (
                  <div
                    key={node.label}
                    className={cx(
                      'absolute z-[1] flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-3 py-2 shadow-[0_10px_22px_rgba(15,23,42,0.08)]',
                      node.position
                    )}
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                      <node.Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-[0.78rem] font-semibold text-[var(--ink)]">{node.label}</span>
                  </div>
                ))}
                {hubLogos.map((logo) => (
                  <div
                    key={logo.label}
                    className={cx(
                      'absolute z-[2] grid h-12 w-12 place-items-center overflow-hidden rounded-2xl border border-[var(--line)] bg-white shadow-[0_10px_22px_rgba(15,23,42,0.08)]',
                      logo.position
                    )}
                    title={logo.label}
                  >
                    <img
                      src={logo.src}
                      alt={logo.label}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-[90px] max-[720px]:py-[64px]" id="tarifas">
          <div className="container">
            <div className="max-w-[640px]">
              <span className="eyebrow">Tarifas exclusivas</span>
              <h2 className="m-0 mb-3 mt-3 text-[clamp(2rem,3vw,2.6rem)] leading-[1.15] max-[720px]:text-[clamp(1.7rem,6vw,2.1rem)]">
                Envía más, gastando menos.
              </h2>
              <p className="m-0 text-[var(--muted)]">
                Negociamos tarifas con las paqueterías para que las uses sin volúmenes mínimos imposibles.
                Suma a tus propios acuerdos comerciales y opera con lo mejor de ambos mundos.
              </p>
            </div>
            <div className="mt-9 grid gap-6 md:grid-cols-3 max-[720px]:mt-6 max-[720px]:gap-4">
              {rateTiers.map((tier) => (
                <article
                  key={tier.title}
                  className={cx(
                    'flex flex-col gap-4 rounded-[24px] border bg-gradient-to-br p-7 shadow-[0_16px_30px_rgba(15,23,42,0.05)]',
                    tier.tone
                  )}
                >
                  <div className="grid h-12 w-12 place-items-center rounded-[14px] border border-[var(--line)] bg-white">
                    <tier.Icon className="h-6 w-6 text-[var(--ink)]" aria-hidden="true" />
                  </div>
                  <h3 className="m-0 text-[1.15rem]">{tier.title}</h3>
                  <p className="m-0 text-[0.95rem] text-[var(--muted)]">{tier.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-[90px] max-[720px]:py-[64px]" id="cumplimiento">
          <div className="container">
            <div className="grid items-start gap-10 md:grid-cols-[1fr_1.2fr]">
              <div className="flex flex-col gap-4 max-w-[460px]">
                <span className="eyebrow">Hecho para México</span>
                <h2 className="m-0 text-[clamp(2rem,3vw,2.6rem)] leading-[1.15] max-[720px]:text-[clamp(1.7rem,6vw,2.1rem)]">
                  Cumple con SAT y captura sin fricción.
                </h2>
                <p className="m-0 text-[var(--muted)]">
                  Integraciones nativas con SEPOMEX y los catálogos del SAT para que tu equipo
                  trabaje rápido y sin errores que cuestan dinero.
                </p>
              </div>
              <div className="grid gap-5">
                {complianceFeatures.map((feature) => (
                  <article
                    key={feature.title}
                    className="flex items-start gap-4 rounded-[20px] border border-[var(--line)] bg-white px-6 py-5 shadow-[0_12px_24px_rgba(15,23,42,0.05)]"
                  >
                    <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-[14px] border border-[var(--line)] bg-[var(--surface)]">
                      <feature.Icon className="h-6 w-6 text-[var(--ink)]" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="m-0 text-[1.1rem]">{feature.title}</h3>
                      <p className="m-0 text-[var(--muted)]">{feature.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-[90px] max-[720px]:py-[64px]" id="rastreo">
          <div className="container">
            <div className="grid items-center gap-7 md:grid-cols-2">
              <div className="flex flex-col gap-10">
                <h2 className="order-1 text-2xl font-semibold md:text-3xl">
                  Seguimiento claro, clientes tranquilos.
                </h2>
                <p className="order-2 text-sm text-slate-600 md:text-base">
                  Rastrea todos tus envíos de forma centralizada y ofrece una experiencia agradable
                  de post venta a tus clientes.
                </p>
                <div className="order-3 pt-20 md:pt-0 max-[720px]:pt-10" aria-hidden="true">
                  <div className="relative flex w-full flex-col gap-5 md:gap-4">
                    <span className="absolute left-[22px] top-[18px] bottom-[18px] w-px bg-gradient-to-b from-slate-400/40 via-sky-400/60 to-emerald-400/60 md:left-[22px] md:right-[22px] md:top-1/2 md:bottom-auto md:h-px md:w-auto md:-translate-y-1/2 md:bg-gradient-to-r" />
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
                      {trackingProgress.map((step, index) => {
                        const isSmall = step.size === 'small'
                        const isActive = index === activeProgressIndex
                        const tone = toneClasses[step.tone as keyof typeof toneClasses] ?? toneClasses.neutral
                        const ringSize = isSmall ? 'h-8 w-8' : 'h-11 w-11'
                        const innerSize = isSmall ? 'h-5 w-5' : 'h-8 w-8'
                        const iconSize = isSmall ? 'h-3 w-3' : 'h-4 w-4'

                        return (
                          <div
                            key={`${step.label}-${index}`}
                            className="group relative grid grid-cols-[44px_1fr] items-center gap-3 md:flex md:w-11 md:flex-col md:items-center md:gap-2"
                          >
                            <div
                              className={cx(
                                'flex items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition-transform justify-self-center',
                                ringSize,
                                isActive && 'scale-110 shadow-md'
                              )}
                            >
                              <span
                                className={cx(
                                  'flex items-center justify-center rounded-full',
                                  innerSize,
                                  isSmall ? 'bg-transparent text-slate-400' : tone.bg,
                                  isSmall ? '' : tone.text
                                )}
                              >
                                {step.icon ? (
                                  <step.icon className={iconSize} aria-hidden="true" />
                                ) : (
                                  getStatusIcon(step.status ?? 'unknown', iconSize)
                                )}
                              </span>
                            </div>
                            <span
                              className={cx(
                                'text-sm font-semibold text-slate-500 transition-transform duration-200 justify-self-start',
                                isActive && 'text-slate-900 font-bold',
                                "md:absolute md:bottom-full md:left-1/2 md:-translate-x-1/2 md:-translate-y-1 md:rounded-lg md:bg-slate-900 md:px-2.5 md:py-1.5 md:text-xs md:text-white md:shadow-lg md:whitespace-nowrap md:transition-all md:after:absolute md:after:left-1/2 md:after:top-full md:after:-translate-x-1/2 md:after:border-[6px] md:after:border-transparent md:after:border-t-slate-900 md:after:content-['']",
                                isActive
                                  ? 'md:opacity-100 md:translate-y-0'
                                  : 'md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0'
                              )}
                            >
                              <span
                                className={cx('inline-block transition-transform duration-200', isActive && 'scale-105')}
                              >
                                {step.label}
                              </span>
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-3xl border border-blue-500/40 bg-slate-900 p-7 text-white shadow-[0_18px_40px_rgba(15,23,42,0.25)]">
                <h3 className="text-xl font-semibold md:text-2xl">
                  Entérate de incidencias antes que tus clientes
                </h3>
                <div className="relative flex flex-col gap-4 pl-1" aria-hidden="true">
                  <span className="absolute left-[22px] top-4 bottom-4 w-px bg-gradient-to-b from-slate-400/40 via-blue-400/60 to-rose-400/70" />
                  <div className="flex flex-col gap-4">
                    {trackingCardProgress.map((step, index) => {
                      const toneText = cardToneText[step.tone as keyof typeof cardToneText] ?? 'text-slate-200'
                      return (
                        <div
                          key={`${step.status}-${index}`}
                          className="relative flex items-center gap-3"
                        >
                          <div
                            className={cx(
                              'flex h-11 w-11 items-center justify-center rounded-full border bg-slate-800',
                              index === 2 ? 'border-rose-500/70 incident-border-pulse' : 'border-slate-700'
                            )}
                          >
                            {getStatusIcon(step.status, cx('h-4 w-4', toneText))}
                          </div>
                          <span className="text-sm font-semibold text-slate-200 md:text-base">
                            {step.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <p className="text-sm text-slate-300 md:text-base">
                  Nuestro rastreador opera 24/7. Recibe alertas cuando un envío tuvo problemas en
                  tránsito o si no han logrado concretar la entrega.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-[80px] max-[720px]:py-[56px]" id="carrier">
          <div className="container">
            <div className="relative overflow-hidden rounded-[32px] border border-[var(--line)] bg-slate-950 px-[clamp(28px,5vw,56px)] py-[clamp(36px,6vw,64px)] text-white shadow-[0_24px_60px_rgba(15,23,42,0.35)]">
              <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_top_right,rgba(44,123,229,0.45),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.18),transparent_60%)]" />
              <div className="relative grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
                <div className="flex flex-col gap-5">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/80">
                    Turboship Carrier
                  </span>
                  <h2 className="m-0 text-[clamp(2rem,3vw,2.8rem)] leading-[1.1]">
                    ¿Tienes un 3PL, eres revendedor o tu empresa opera su propia logística?
                  </h2>
                  <p className="m-0 max-w-[520px] text-[1.02rem] text-white/75">
                    Accede a la mejor tecnología logística con tu propia marca. Genera miles de guías
                    en clicks, asigna tarifas a la medida y monitorea cada API con transparencia total.
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      to="/carrier"
                      className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-[0.95rem] font-semibold text-slate-950 transition-transform duration-200 ease-out hover:-translate-y-0.5"
                    >
                      Conocer Turboship Carrier
                    </Link>
                    <a
                      className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-[0.95rem] font-semibold text-white transition-colors duration-200 ease-out hover:border-white"
                      href="https://calendly.com/arturoll-turboship/30min"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Agendar demo
                    </a>
                  </div>
                </div>
                <ul className="m-0 grid list-none gap-3 p-0 text-[0.95rem] text-white/85">
                  {[
                    'Tu marca, tus guías, tu experiencia',
                    'Tarifas personalizadas por cliente, zona, kilo y servicio',
                    'Cobros y facturación automáticos',
                    'Ecosistema para intercambiar servicios con otros carriers',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3"
                    >
                      <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--accent)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-[80px] pb-[40px] max-[720px]:pt-[64px] max-[720px]:pb-[32px]">
          <div className="container">
            <div className="flex flex-col items-center gap-4 rounded-[32px] border border-[var(--line)] bg-white p-[clamp(32px,6vw,48px)] text-center shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
              <h2 className="m-0 text-[clamp(2rem,3vw,2.6rem)]">¿Listo para optimizar tu logística?</h2>
              <p className="m-0 max-w-[540px] text-[var(--muted)]">
                Cuéntanos de tu operación y te mostramos por qué Turboship es tu mejor opción.
              </p>
              <a
                className="inline-flex items-center justify-center rounded-full border border-transparent bg-[var(--accent)] px-6 py-3 text-[0.95rem] font-semibold text-white shadow-[0_16px_40px_rgba(44,123,229,0.3)] transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5"
                href="https://calendly.com/arturoll-turboship/30min"
                target="_blank"
                rel="noreferrer"
              >
                Agendar Demo
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
