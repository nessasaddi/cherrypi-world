export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-16 px-4 md:px-8 lg:px-12 max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-foreground-faint font-body tracking-[0.1em]">
      <span>&copy; {new Date().getFullYear()} Cherry Pi Creative Studio</span>
      <a href="/privacy" className="text-foreground-faint text-[11px] uppercase tracking-[0.15em] hover:text-foreground-muted transition-colors duration-300">
        Privacy Policy
      </a>
      <span>Dvnci Digital LLC</span>
    </footer>
  );
}
