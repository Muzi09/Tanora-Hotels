import MaterialIcon from "@/components/ui/MaterialIcon";

const NAV_LINKS = [
  "The Estate",
  "Curated Experiences",
  "Private Events",
  "Contact Us",
];

const SOCIAL = [
  { icon: "share" },
  { icon: "location_on" },
  { icon: "mail" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-container-highest dark:bg-surface-dim border-t border-secondary/10 pt-20 pb-12">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop flex flex-col items-center text-center gap-12">
        <h1 className="text-headline-lg font-headline-lg-mobile md:text-headline-lg text-primary dark:text-primary-fixed-dim tracking-widest">
          TANORA
        </h1>
        <nav className="flex flex-wrap justify-center gap-8 md:gap-12">
          {NAV_LINKS.map((label) => (
            <a
              key={label}
              className="text-label-sm font-label-sm text-on-surface-variant hover:text-secondary transition-colors duration-300 uppercase tracking-widest"
              href="#"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex gap-6">
          {SOCIAL.map((item) => (
            <a
              key={item.icon}
              className="w-10 h-10 border border-primary/20 flex items-center justify-center rounded-full hover:bg-primary hover:text-white transition-all"
              href="#"
            >
              <MaterialIcon name={item.icon} className="text-[20px]" />
            </a>
          ))}
        </div>
        <p className="text-label-sm font-label-sm text-on-surface-variant/60 tracking-widest">
          © 2024 TANORA HOTEL &amp; BANQUET. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
