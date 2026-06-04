import MaterialIcon from "@/components/ui/MaterialIcon";

/**
 * Top navigation shell — sticky, glass-blurred, with the centered TANORA
 * wordmark, left menu, and right calendar / nav links.
 */
export default function Header() {
  return (
    <header className="bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-xl flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-16 docked full-width top-0 sticky z-[60] border-b border-secondary/20 shadow-sm">
      <div className="flex items-center gap-4">
        <MaterialIcon
          name="menu"
          className="text-primary cursor-pointer"
        />
        <span className="hidden md:block text-label-sm font-label-sm text-on-surface-variant tracking-widest uppercase">
          Navigation
        </span>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2">
        <h1 className="text-headline-md font-headline-md tracking-widest text-primary dark:text-primary-fixed-dim">
          TANORA
        </h1>
      </div>
      <div className="flex items-center gap-6">
        <nav className="hidden md:flex gap-8">
          <a
            className="text-label-sm font-label-sm text-primary font-bold hover:text-secondary-fixed-dim transition-colors duration-300"
            href="#"
          >
            ESTATE
          </a>
          <a
            className="text-label-sm font-label-sm text-on-surface-variant hover:text-secondary-fixed-dim transition-colors duration-300"
            href="#"
          >
            EXPERIENCES
          </a>
        </nav>
        <MaterialIcon
          name="calendar_month"
          className="text-primary cursor-pointer"
        />
      </div>
    </header>
  );
}
