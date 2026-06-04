import BanquetCard from "@/components/section/BanquetCard";
import MaterialIcon from "@/components/ui/MaterialIcon";

const BANQUETS = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDxGn0CTONTW1UR162TSi3t9IDEATWg4dPphywbUKKY9smBV9PgBVvuabKpnSJRfP9c75S5YkGjktlJGfoDLyU2cy9j5vtb-GKcG2X6XhHBcUt6lfPowp8xLYpmLphxAxQpbjiul1IGmZ_pamBd419PJOTQnA8HTnTQyaViHsH-0_zfmtvMKvoiFltVWUqsL339QR4BGG7API4ohx_WPROVfRAIps2PPPsTEqRDUH6G8rZ4pNO5Dw00NA-bPpeypuHcl_V-X4D4_vml",
    alt: "A grand ballroom prepared for a high-end wedding. The ceiling features multiple crystal chandeliers, and the tables are decorated with tall, lush floral centerpieces and soft candlelight. The color palette is predominantly cream and gold with deep green foliage accents. The space feels expansive, opulent, and perfectly staged for a significant life event.",
    title: "Weddings",
    capacity: "Capacity: up to 500 Guests",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBX1kGsDYQzEp9lz6PENPkgvH8Y-ghGYzSJKH0n05-0fa2OWlIhlKp7RuSna5pJmpUY_SHVDknR9zPFYXSu3hTb-n2mgeCW2041qeGBmwxW-eJBDumULNlksK0JI3qbEYY--r4eeYBC_KjyxuPH2GzI3Uc48sej-3BWWAPV7K7o-n3fR6mqsQjROpcrydkuKmcXbNicbCF8nGlF-gCjKlxhkKwDk7EHMCyBeVJsrwfS5uKMexlz4fBuogAokOj7Vj0--BTSVr72FmjH",
    alt: "A modern corporate conference setup in a sleek, minimalist hall. The room features a large digital screen at the front, rows of contemporary ergonomic chairs, and professional stage lighting. The environment is clean and technologically advanced, with a neutral color palette that emphasizes focus and professional precision in a luxury hotel setting.",
    title: "Conferences",
    capacity: "Capacity: up to 350 Guests",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDn2_ETdfv5aqcZ7p0zIAxBtPnOCpfaw-keeiXHWgBiGwLEZwn9GQzn7JIw9nzmgHs7RBagBwov_vPV__jAhllzNrQSZxd4GdyqhBokptQNG2LPAjjFJzwwh71oJn-vxcy4B9h1oDmLJEzciXz2apgnckJZEea73_Wkh_C894DfFvWpxviG3vUcbeEzVC5C_a8xngwDU1scMNahi41qTsG7ZLVvWDQ1x95D5O7kCWEQ-F_LY7xKnKCTPLXzjAPiHtzitwbUCKaIBJdS",
    alt: "An intimate outdoor gala event on a manicured lawn of a luxury estate. Strings of fairy lights hang between trees, and small circular tables are elegantly set for a dinner party. The background shows the silhouette of the hotel under a clear night sky. The mood is festive yet exclusive, reflecting a high-end curated experience under the stars.",
    title: "Gala Evenings",
    capacity: "Capacity: up to 400 Guests",
  },
];

export default function Banquets() {
  return (
    <section className="py-24 md:py-40 bg-surface-container-low">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop text-center">
        <div className="max-w-3xl mx-auto mb-20 reveal">
          <span className="text-secondary font-label-sm uppercase tracking-[0.2em] mb-4 block">
            Celebrations Reimagined
          </span>
          <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-8">
            Grand Banquets &amp; Private Events
          </h3>
          <p className="text-on-surface-variant text-body-lg leading-relaxed">
            Transforming your most significant moments into timeless memories.
            Our banquet halls combine architectural grandeur with
            state-of-the-art technology for events that leave a lasting
            impression.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {BANQUETS.map((banquet, idx) => (
            <BanquetCard
              key={banquet.title}
              image={banquet.image}
              alt={banquet.alt}
              title={banquet.title}
              capacity={banquet.capacity}
              revealDelayMs={(idx + 1) * 100}
            />
          ))}
        </div>
        <a
          className="inline-flex items-center gap-4 border-b border-primary pb-2 text-primary font-bold tracking-widest uppercase hover:text-secondary hover:border-secondary transition-all"
          href="#"
        >
          Download Banquet Brochure
          <MaterialIcon name="download" />
        </a>
      </div>
    </section>
  );
}
