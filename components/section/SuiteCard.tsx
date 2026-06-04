import MaterialIcon from "@/components/ui/MaterialIcon";

type SuiteFeature = {
  icon: string;
  label: string;
};

type SuiteCardProps = {
  image: string;
  alt: string;
  title: string;
  features: SuiteFeature[];
  price: string;
  hoverDescription: string;
  revealDelayMs?: number;
};

/**
 * A single suite card in the horizontal rail. Image first, then a row
 * with the suite info (title, features) on the left and price on the
 * right. Reveals on scroll (handled by the global IntersectionObserver).
 */
export default function SuiteCard({
  image,
  alt,
  title,
  features,
  price,
  hoverDescription,
  revealDelayMs,
}: SuiteCardProps) {
  return (
    <div
      className="min-w-[85%] md:min-w-[450px] snap-center group cursor-pointer reveal"
      style={revealDelayMs ? { transitionDelay: `${revealDelayMs}ms` } : undefined}
    >
      <div className="relative h-[600px] overflow-hidden mb-6">
        <img
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          data-alt={alt}
          src={image}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
          <p className="text-white/80 font-body-md">{hoverDescription}</p>
        </div>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-headline-md text-headline-md text-primary mb-2">
            {title}
          </h4>
          <div className="flex gap-4">
            {features.map((feature) => (
              <span
                key={feature.label}
                className="text-label-sm uppercase text-on-surface-variant flex items-center gap-1"
              >
                <MaterialIcon
                  name={feature.icon}
                  className="text-[14px]"
                />
                {feature.label}
              </span>
            ))}
          </div>
        </div>
        <span className="text-primary font-headline-md">{price}</span>
      </div>
    </div>
  );
}
