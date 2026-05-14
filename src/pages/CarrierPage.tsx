import {
  BarChart3,
  Boxes,
  Building2,
  CreditCard,
  FileSpreadsheet,
  Layers,
  Network,
  PackageCheck,
  Plug,
  ReceiptText,
  Settings2,
  ShieldCheck,
  Sparkles,
  Tag,
  Truck,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Nav } from '../components/Nav'

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ')

type Audience = {
  eyebrow: string
  Icon: LucideIcon
  title: string
  description: string
  highlights: string[]
  accent: string
  accentBorder: string
  accentBg: string
  dot: string
}

const audiences: Audience[] = [
  {
    eyebrow: 'Revendedores y 3PL',
    Icon: Users,
    title: 'Vende paquetería con tu marca y tu experiencia.',
    description:
      'Ofrece servicios de envío como si fueran propios: con tu logo, tus tarifas y tu propio panel para tus clientes.',
    highlights: [
      'Tarifas personalizadas por cliente, zona, kilo y servicio',
      'Recargas de saldo y cobros automáticos con Mercadopago',
      'Facturación automática a tus clientes con Facturama',
      'Conecta los canales de venta de tus clientes',
    ],
    accent: 'text-sky-300',
    accentBorder: 'border-sky-400/30',
    accentBg: 'bg-sky-400/10',
    dot: 'bg-sky-400',
  },
  {
    eyebrow: 'Empresas y operaciones especializadas',
    Icon: Building2,
    title: 'Centraliza almacenes, divisiones y acuerdos comerciales.',
    description:
      'Para empresas con varias plantas, áreas de envíos o necesidades específicas de cumplimiento y control interno.',
    highlights: [
      'Usuarios y tarifas por almacén o división operativa',
      'Integra tus propios acuerdos comerciales con paqueterías',
      'Configura tu propia flotilla 1PL con guías y marca propia',
      'Conecta tus canales de venta y ERPs',
    ],
    accent: 'text-blue-300',
    accentBorder: 'border-blue-400/30',
    accentBg: 'bg-blue-400/10',
    dot: 'bg-blue-400',
  },
]

type Feature = {
  title: string
  description: string
  Icon: LucideIcon
}

const features: Feature[] = [
  {
    title: 'Tu marca, tus guías',
    Icon: Tag,
    description:
      'Personaliza guías, página de rastreo, notificaciones y dominio. Tus clientes ven tu identidad de inicio a fin.',
  },
  {
    title: 'Tarifas a la medida',
    Icon: Settings2,
    description:
      'Asigna tarifas por cliente, zona, kilo y servicio. O configúralas por almacén y división, según tu modelo.',
  },
  {
    title: 'Generación masiva de guías',
    Icon: Boxes,
    description:
      'Genera e imprime miles de guías en un par de clicks con herramientas masivas pensadas para operaciones a escala.',
  },
  {
    title: 'Reglas para reducir errores',
    Icon: ShieldCheck,
    description:
      'Define reglas predefinidas para que cada pedido salga por la paquetería y servicio correcto, sin intervención manual.',
  },
  {
    title: 'Cancelaciones y recolecciones',
    Icon: PackageCheck,
    description:
      'Automatiza el proceso de cancelaciones y la solicitud de recolecciones. Ahorra tiempo a tu equipo operativo.',
  },
  {
    title: 'Cobros con Mercadopago',
    Icon: CreditCard,
    description:
      'Acepta tarjetas bancarias y recarga saldos automáticamente a tus clientes. Olvídate de chasing pagos.',
  },
  {
    title: 'Facturación con Facturama',
    Icon: ReceiptText,
    description:
      'Emite facturas a tus clientes por sus recargas y servicios de forma automática y conforme al SAT.',
  },
  {
    title: 'Logs y monitoreo de APIs',
    Icon: FileSpreadsheet,
    description:
      'Monitorea con total transparencia cada conexión por API con tus proveedores. Audita cada llamada en segundos.',
  },
  {
    title: 'Flotilla 1PL propia',
    Icon: Truck,
    description:
      'Configura tu propia paquetería 1PL con marca, logo y guías personalizadas. Súmala al mismo ecosistema.',
  },
  {
    title: 'Canales de venta conectados',
    Icon: Plug,
    description:
      'Conecta Shopify, WooCommerce, marketplaces o sistemas propios — tuyos o de tus clientes — con sincronización en tiempo real.',
  },
  {
    title: 'Analítica end-to-end',
    Icon: BarChart3,
    description:
      'Mide envíos por paquetería, proveedor, cliente, zona o servicio. Decide con datos, no con suposiciones.',
  },
  {
    title: 'Ecosistema Turboship',
    Icon: Network,
    description:
      'Intercambia servicios con otros carriers dentro de la red. Amplía tu cobertura sin firmar nuevos contratos.',
  },
]

export function CarrierPage() {
  return (
    <>
      <header className="pb-16">
        <div className="container px-[clamp(16px,4vw,56px)]">
          <Nav variant="inner" />

          <div className="mt-12 grid items-center gap-[clamp(2rem,5vw,4rem)] md:grid-cols-[1.1fr_1fr] max-[720px]:mt-6">
            <div className="flex max-w-[560px] flex-col gap-6 animate-[fadeIn_0.8s_ease_forwards] max-[720px]:items-center max-[720px]:text-center">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--card)] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" aria-hidden="true" />
                Turboship Carrier
              </span>
              <h1 className="m-0 text-[clamp(2.6rem,4.4vw,4rem)] leading-[1.05]">
                Tu plataforma, tu marca, nuestra tecnología.
              </h1>
              <p className="m-0 text-[1.05rem] text-[var(--muted)]">
                La solución completa para 3PL, revendedores de paquetería y empresas con operaciones
                logísticas a escala. Un solo motor, adaptado a tu modelo de negocio.
              </p>
              <div className="flex items-center gap-4 max-[720px]:flex-wrap max-[720px]:justify-center max-[720px]:gap-2.5">
                <a
                  className="inline-flex items-center justify-center rounded-full border border-transparent bg-[var(--accent)] px-6 py-3 text-[0.95rem] font-semibold text-white shadow-[0_16px_40px_rgba(44,123,229,0.3)] transition-[transform,box-shadow,border-color,color] duration-200 ease-out hover:-translate-y-0.5"
                  href="https://calendly.com/arturoll-turboship/30min"
                  target="_blank"
                  rel="noreferrer"
                >
                  Agendar demo
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-full border border-[var(--line)] px-6 py-3 text-[0.95rem] font-semibold text-[var(--ink)] transition-[transform,box-shadow,border-color,color] duration-200 ease-out hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  href="mailto:arturoll@turboship.mx?subject=Información%20sobre%20Turboship%20Carrier"
                >
                  Solicitar información
                </a>
              </div>
              <div className="grid grid-cols-3 gap-x-6 gap-y-3 text-[0.85rem] text-[var(--muted)] max-[720px]:justify-items-center max-[720px]:text-center">
                <div>
                  <strong className="block text-base text-[var(--ink)]">Multi-cliente</strong>
                  <span>tarifas y permisos</span>
                </div>
                <div>
                  <strong className="block text-base text-[var(--ink)]">Marca propia</strong>
                  <span>guías y rastreo</span>
                </div>
                <div>
                  <strong className="block text-base text-[var(--ink)]">Ecosistema</strong>
                  <span>red de carriers</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative mx-auto flex max-w-[480px] flex-col gap-4 rounded-[28px] border border-[var(--line)] bg-[var(--card-strong)] p-6 shadow-[var(--card-shadow-lg)] backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="grid h-10 w-10 place-items-center rounded-[12px] border border-[var(--line)] bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Layers className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="m-0 text-[0.85rem] font-semibold">Tu marca</p>
                      <p className="m-0 text-[0.72rem] text-[var(--muted)]">envios.tu-marca.mx</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[0.7rem] font-semibold text-emerald-300">
                    Activo
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[0.8rem]">
                  <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3">
                    <p className="m-0 text-[var(--muted)]">Cliente</p>
                    <p className="m-0 font-semibold">Tienda Acme</p>
                  </div>
                  <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3">
                    <p className="m-0 text-[var(--muted)]">Tarifa</p>
                    <p className="m-0 font-semibold">Zona 2 · 5kg</p>
                  </div>
                  <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3">
                    <p className="m-0 text-[var(--muted)]">Margen</p>
                    <p className="m-0 font-semibold text-emerald-300">+18%</p>
                  </div>
                  <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3">
                    <p className="m-0 text-[var(--muted)]">Cobro</p>
                    <p className="m-0 font-semibold">Mercadopago</p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 rounded-2xl border border-dashed border-[var(--line)] p-3 text-[0.78rem] text-[var(--muted)]">
                  <p className="m-0 font-semibold text-[var(--ink)]">Guías generadas hoy</p>
                  <div className="flex items-end justify-between">
                    <span className="text-[1.6rem] font-bold text-[var(--ink)]">2,418</span>
                    <span className="text-emerald-300">+12% vs ayer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="px-[7vw] pb-[120px] max-[720px]:px-[4vw] max-[720px]:pb-[80px]">
        <section className="py-[90px] max-[720px]:py-[64px]">
          <div className="container">
            <div className="mx-auto max-w-[680px] text-center">
              <span className="eyebrow">Una solución, dos enfoques</span>
              <h2 className="m-0 mb-3 mt-3 text-[clamp(2rem,3vw,2.6rem)] leading-[1.15] max-[720px]:text-[clamp(1.7rem,6vw,2.1rem)]">
                Mismo motor. Distinto enfoque, según tu modelo.
              </h2>
              <p className="m-0 text-[var(--muted)]">
                Ya sea que revendas servicios de paquetería o que tu empresa opere su propia logística,
                Turboship Carrier es la misma plataforma — solo que la configuras a tu medida.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 max-[720px]:mt-7 max-[720px]:gap-4">
              {audiences.map((audience) => (
                <article
                  key={audience.eyebrow}
                  className={cx(
                    'flex flex-col gap-5 rounded-[28px] border bg-[var(--card)] p-7 shadow-[var(--card-shadow)] backdrop-blur-sm',
                    audience.accentBorder
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={cx('grid h-12 w-12 place-items-center rounded-[14px]', audience.accentBg, audience.accent)}>
                      <audience.Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <span className={cx('text-[0.7rem] font-semibold uppercase tracking-[0.16em]', audience.accent)}>
                      {audience.eyebrow}
                    </span>
                  </div>
                  <h3 className="m-0 text-[1.3rem] leading-[1.2]">{audience.title}</h3>
                  <p className="m-0 text-[var(--muted)]">{audience.description}</p>
                  <ul className="m-0 mt-2 grid list-none gap-3 p-0 text-[0.95rem]">
                    {audience.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className={cx('mt-2 inline-block h-1.5 w-1.5 rounded-full', audience.dot)} />
                        <span className="text-[var(--ink)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

          </div>
        </section>

        <section className="py-[80px] max-[720px]:py-[56px]" id="features">
          <div className="container">
            <div className="max-w-[640px]">
              <span className="eyebrow">Capacidades</span>
              <h2 className="m-0 mb-3 mt-3 text-[clamp(2rem,3vw,2.6rem)] leading-[1.15] max-[720px]:text-[clamp(1.7rem,6vw,2.1rem)]">
                Todo lo que tu operación necesita, en una sola plataforma.
              </h2>
              <p className="m-0 text-[var(--muted)]">
                Herramientas pensadas para operadores logísticos serios: automatizadas, auditables y listas
                para escalar contigo.
              </p>
            </div>

            <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-3 max-[720px]:mt-6">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="flex flex-col gap-3 rounded-[20px] border border-[var(--line)] bg-[var(--card)] p-6 shadow-[var(--card-shadow)] backdrop-blur-sm transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:border-[var(--accent)]"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-[14px] border border-[var(--line)] bg-[var(--surface)]">
                    <feature.Icon className="h-5 w-5 text-[var(--ink)]" aria-hidden="true" />
                  </div>
                  <h3 className="m-0 text-[1.05rem]">{feature.title}</h3>
                  <p className="m-0 text-[0.95rem] text-[var(--muted)]">{feature.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-[80px] max-[720px]:py-[56px]">
          <div className="container">
            <div className="grid items-center gap-10 rounded-[32px] border border-[var(--line)] bg-[var(--card-strong)] p-[clamp(28px,5vw,56px)] shadow-[var(--card-shadow-lg)] backdrop-blur-sm md:grid-cols-[1fr_1fr]">
              <div className="flex flex-col gap-4">
                <span className="eyebrow">Ecosistema</span>
                <h2 className="m-0 text-[clamp(2rem,3vw,2.4rem)] leading-[1.15] max-[720px]:text-[clamp(1.7rem,6vw,2rem)]">
                  Crece sin firmar contratos nuevos.
                </h2>
                <p className="m-0 text-[var(--muted)]">
                  Dentro de Turboship, los carriers se conectan entre sí. Si necesitas cobertura en una ruta
                  donde no operas, puedes apoyarte en otro carrier de la red — y viceversa. Tu marca, sin
                  límites geográficos.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-5">
                  <p className="m-0 text-[2rem] font-bold text-[var(--ink)]">100%</p>
                  <p className="m-0 mt-1 text-[0.9rem] text-[var(--muted)]">de las conexiones API auditables en logs</p>
                </div>
                <div className="rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-5">
                  <p className="m-0 text-[2rem] font-bold text-[var(--ink)]">0</p>
                  <p className="m-0 mt-1 text-[0.9rem] text-[var(--muted)]">tareas repetitivas con reglas predefinidas</p>
                </div>
                <div className="rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-5">
                  <p className="m-0 text-[2rem] font-bold text-[var(--ink)]">Multi</p>
                  <p className="m-0 mt-1 text-[0.9rem] text-[var(--muted)]">almacén, cliente y división</p>
                </div>
                <div className="rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-5">
                  <p className="m-0 text-[2rem] font-bold text-[var(--ink)]">1PL</p>
                  <p className="m-0 mt-1 text-[0.9rem] text-[var(--muted)]">flotilla propia con marca y guías</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-[60px] pb-[20px] max-[720px]:pt-[48px]">
          <div className="container">
            <div className="relative flex flex-col items-center gap-4 overflow-hidden rounded-[32px] border border-[rgba(44,123,229,0.4)] bg-[var(--card-strong)] p-[clamp(32px,6vw,56px)] text-center text-white shadow-[var(--card-shadow-lg)]">
              <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_top_left,rgba(44,123,229,0.45),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.18),transparent_60%)]" />
              <div className="relative flex flex-col items-center gap-4">
              <h2 className="m-0 text-[clamp(2rem,3vw,2.6rem)]">Hablemos de tu operación.</h2>
              <p className="m-0 max-w-[560px] text-white/75">
                Cuéntanos cómo opera tu negocio y te mostramos cómo Turboship Carrier se acomoda a tu modelo —
                sin replantear tu logística desde cero.
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-[0.95rem] font-semibold text-slate-950 transition-transform duration-200 ease-out hover:-translate-y-0.5"
                  href="https://calendly.com/arturoll-turboship/30min"
                  target="_blank"
                  rel="noreferrer"
                >
                  Agendar demo
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-[0.95rem] font-semibold text-white transition-colors duration-200 ease-out hover:border-white"
                  href="mailto:arturoll@turboship.mx?subject=Información%20sobre%20Turboship%20Carrier"
                >
                  Solicitar información
                </a>
              </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
