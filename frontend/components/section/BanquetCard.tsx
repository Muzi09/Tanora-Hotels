type BanquetCardProps = {
  image: string;
  alt: string;
  title: string;
  capacity: string;
  revealDelayMs?: number;
};

/**
 * A single banquet card. White background, an aspect-[4/5] image, a
 * title, and an uppercase capacity caption. Reveals on scroll with a
 * configurable delay.
 */
export default function BanquetCard({
  image,
  alt,
  title,
  capacity,
  revealDelayMs,
}: BanquetCardProps) {
  return (
    <div
      className="bg-white p-1 reveal shadow-sm hover:shadow-xl transition-shadow duration-500"
      style={revealDelayMs ? { transitionDelay: `${revealDelayMs}ms` } : undefined}
    >
      <div className="relative overflow-hidden aspect-[4/5] mb-6">
        <img className="w-full h-full object-cover" data-alt={alt} src={image} />
      </div>
      <div className="px-6 py-4">
        <h5 className="text-headline-md font-headline-md text-primary mb-2">
          {title}
        </h5>
        <p className="text-on-surface-variant text-label-sm tracking-widest uppercase">
          {capacity}
        </p>
      </div>
    </div>
  );
}
