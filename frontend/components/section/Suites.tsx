"use client";

import SuiteCard from "@/components/section/SuiteCard";
import { useSuitesSlider } from "@/lib/useSuitesSlider";

const SUITES = [
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMBEV5ZRKnaxD_UazNSeodKQQqLytE03DbcGlhPhvuJrPW1gt7wmVpVYX_TYOSt1sbgthBK-hJAQdxkQgZHub6P8TOB1RvuJeL0RN_IT1MekCXrkBn9FCcuEHOMskX17NhXVcaHUR7xpUaydjKP6SnJrXb1X6Mytpz4xJsY6MJvtzqky82qfUh9F9HNQF8cjJhwIweP8LcoMoDBBhZO0_NyXSx3vzFhIqfl6rcGtYtdVweIwHleAYB5TDkgWqxIeejRdKTZPc5EjKx",
    alt: "A master suite in a luxury hotel featuring high ceilings and floor-to-ceiling windows overlooking a serene garden. The interior design is minimalist and sophisticated, with cream-colored textiles, dark forest green accents, and fine-lined gold hardware. Natural afternoon light fills the room, highlighting the textures of premium linens and polished marble surfaces.",
    title: "Imperial Terrace Suite",
    features: [
      { icon: "square_foot", label: "120sqm" },
      { icon: "bed", label: "King Bed" },
    ],
    price: "$1,200",
    hoverDescription:
      "The Imperial Suite offers a master bedroom with panoramic views and bespoke amenities.",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDlTKYINIxPfoy03L3tEfAaQ-c86kYidE6v9BjA_VjsTMi49eleggy67hkfui-KJKyQci-vflKkITooS9Y4BhL3u7fPJaqVNUdNm-z7Eewkdct9h45xC68Y_M8setZ6XYRhAO4kBMgKQJ4K4wzAQcGQHnShbl0XWtjsRrFZNjv6n3-pyABOGRelGgdpwttdGRrjasVyNwVt460NH-0ohyPe2vjTxl9xNl9gO7N47VX1U00SOGTgPe5CLHilKMTsAjbDqIADSTKD654c",
    alt: "An elegant hotel bathroom showcasing a freestanding porcelain tub on a white marble floor. The walls are adorned with dark green tiles and gold-rimmed mirrors. The lighting is soft and ambient, creating a spa-like atmosphere. Luxury toiletries are neatly arranged on a vanity, emphasizing the hotel's attention to detail and high-end hospitality.",
    title: "Royal Sanctuary Room",
    features: [
      { icon: "square_foot", label: "85sqm" },
      { icon: "hot_tub", label: "Spa Bath" },
    ],
    price: "$850",
    hoverDescription:
      "Experience tranquility in our bespoke Sanctuary Rooms with en-suite spa features.",
  },
  {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBR1HVx2N_mNr3Ok_ati5LAm6zQistfjmiWeE_pMsY9QsAuEdQRRAoLPBJFd9Oe6CE5SxA71zpoirSUtgZ7b1JSH18nDS26MZ58bHq-JwO7QTj1iK-_tTDI2jP3TKwr87raWvtGbKyRc0cNy5nKv8_WAw_2qXtRoohh6t5M5JiYXQThA7UCPzyCdnDS9Va_sJTguicZ7J4HBX7UpElOOuJApD-5jyOI6T3M9p7l0JaPUBVELtYua2n1Hr1PxqN7S3R_4nTSTd7lpYs-",
    alt: "A modern luxury hotel living room area within a penthouse suite. The space features low-profile velvet furniture in deep emerald green, a minimalist gold coffee table, and large windows that frame a stunning city skyline at dusk. The mood is sophisticated and exclusive, with a focus on comfortable luxury and high-design aesthetics.",
    title: "Heritage Penthouse",
    features: [
      { icon: "square_foot", label: "210sqm" },
      { icon: "star", label: "Private Concierge" },
    ],
    price: "$2,400",
    hoverDescription:
      "Our Executive Penthouses are designed for those who require the pinnacle of privacy and style.",
  },
];

export default function Suites() {
  useSuitesSlider();

  return (
    <section className="py-24 md:py-32 bg-surface overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 reveal">
          <div className="max-w-2xl">
            <span className="text-secondary font-label-sm uppercase tracking-[0.2em] mb-4 block">
              Refined Sanctuaries
            </span>
            <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-6">
              Curated Suites for Discerning Travelers
            </h3>
          </div>
        </div>
        <div className="suite-rail flex gap-8 overflow-x-auto pb-12 snap-x no-scrollbar">
          {SUITES.map((suite, idx) => (
            <SuiteCard
              key={suite.title}
              image={suite.image}
              alt={suite.alt}
              title={suite.title}
              features={suite.features}
              price={suite.price}
              hoverDescription={suite.hoverDescription}
              revealDelayMs={idx === 0 ? undefined : idx * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
