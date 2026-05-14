import { Link } from './Link'

type NavProps = {
  variant?: 'home' | 'inner'
}

export function Nav({ variant = 'home' }: NavProps) {
  return (
    <nav className="flex items-center justify-between pt-7 pb-[18px] text-[0.92rem] max-[720px]:justify-center">
      <Link
        to="/"
        className="inline-flex items-center text-[1.05rem] font-bold tracking-[0.02em]"
        aria-label="Turboship.mx"
      >
        <img
          className="light-only block h-9 w-auto max-[720px]:h-[34px]"
          src="/logo-light-mode.svg"
          alt="Turboship.mx"
        />
        <img
          className="dark-only h-9 w-auto max-[720px]:h-[34px]"
          src="/logo-dark-mode.svg"
          alt="Turboship.mx"
        />
      </Link>
      <div className="flex items-center gap-[22px] max-[720px]:hidden">
        {variant === 'home' ? (
          <Link
            to="/carrier"
            className="text-[0.95rem] font-semibold text-[var(--ink)] transition-colors duration-200 ease-out hover:text-[var(--accent)]"
          >
            Turboship Carrier
          </Link>
        ) : (
          <Link
            to="/"
            className="text-[0.95rem] font-semibold text-[var(--ink)] transition-colors duration-200 ease-out hover:text-[var(--accent)]"
          >
            ← Inicio
          </Link>
        )}
        <a
          className="inline-flex items-center justify-center rounded-full border border-[var(--line)] px-6 py-3 text-[0.95rem] font-semibold text-[var(--ink)] transition-[transform,box-shadow,border-color,color] duration-200 ease-out hover:border-[var(--accent)] hover:text-[var(--accent)]"
          href="https://app.turboship.mx/auth/signin"
          target="_blank"
          rel="noreferrer"
        >
          Iniciar sesión
        </a>
        <a
          className="inline-flex items-center justify-center rounded-full border border-transparent bg-[var(--accent)] px-6 py-3 text-[0.95rem] font-semibold text-white shadow-[0_16px_40px_rgba(44,123,229,0.3)] transition-[transform,box-shadow,border-color,color] duration-200 ease-out hover:-translate-y-0.5"
          href="https://app.turboship.mx/auth/signup"
          target="_blank"
          rel="noreferrer"
        >
          Empezar ahora
        </a>
      </div>
    </nav>
  )
}
