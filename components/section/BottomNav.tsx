import MaterialIcon from "@/components/ui/MaterialIcon";

const TABS = [
  { icon: "bed", label: "Suites", active: true, fill: true },
  { icon: "restaurant", label: "Dining" },
  { icon: "diversity_3", label: "Banquets" },
  { icon: "event_available", label: "Reserve" },
];

/**
 * Mobile-only fixed bottom navigation bar. The first tab is the active
 * one and uses the FILL axis on the bed icon.
 */
export default function BottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-safe bg-primary dark:bg-primary-container border-t border-secondary/30 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
      {TABS.map((tab) => (
        <a
          key={tab.label}
          className={
            tab.active
              ? "flex flex-col items-center justify-center text-secondary-fixed bg-on-primary-fixed-variant/20 rounded-xl px-4 py-1 active:scale-95 duration-200"
              : "flex flex-col items-center justify-center text-on-primary/60 px-4 py-1 hover:text-secondary-fixed transition-all active:scale-95 duration-200"
          }
          href="#"
        >
          <MaterialIcon name={tab.icon} fill={!!tab.fill} />
          <span className="text-label-sm font-label-sm uppercase mt-1">
            {tab.label}
          </span>
        </a>
      ))}
    </nav>
  );
}
