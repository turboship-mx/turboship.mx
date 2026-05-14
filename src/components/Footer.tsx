export function Footer() {
  return (
    <footer className="pt-[40px] pb-[20px] text-[0.85rem] text-[var(--muted)] max-[720px]:pt-[28px] max-[720px]:pb-[16px]">
      <div className="container flex flex-wrap justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span>© 2026 Turboship.mx</span>
          <div className="flex items-center gap-3 rounded-[12px] bg-white pl-0 pr-3 py-2 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
            <img className="h-10 w-auto" src="/meta.svg" alt="Meta logo" />
            <span className="font-semibold text-[#222F36]">Verified Tech Provider</span>
          </div>
        </div>
        <div>
          <a className="ml-4 text-inherit max-[720px]:ml-0" href="#">Privacidad</a>
          <a className="ml-4 text-inherit" href="#">Contacto</a>
        </div>
      </div>
    </footer>
  )
}
