import DiningItem from "@/components/section/DiningItem";

const DINING_ITEMS = [
  {
    title: "The Amber Room",
    icon: "restaurant",
    description: "Fine Dining • Contemporary French",
  },
  {
    title: "Veranda Bistro",
    icon: "local_bar",
    description: "Casual • Mediterranean Al Fresco",
  },
];

const GALLERY = [
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBA4lCC2qoq6mSf3gbUZ4982dl6zxg3nfI42rlYIzgYL5xjhiTGmGs6-Q87ggZLAZ0tJLLbpQi4NmqnKzmKRJPLxxh5uhSGEBbp5u8Pzfs1hWJUVQe-bHO4cVquXSWt56l5MYv_ePaqc-YfuKHjCIOsnh8WQZfe026A_YreEnYImoMqyKa3Hz08Un7oZWxOHRHPu3Z95t0hCzDZZqljqLEJy4qnJXc29XgrVW2VvWCmBn1yxZ9HWg9UjRN7cadY4-N_9qfJaFeX3bFX",
    alt: "A close-up, high-fashion shot of a gourmet dish served on a dark matte plate. The food is expertly plated with micro-greens and a rich sauce, illuminated by a single spotlight that creates dramatic shadows. The setting is a dimly lit, upscale restaurant with hints of gold and dark wood in the background, conveying a sense of exclusivity and culinary excellence.",
    className: "h-[300px] md:h-[450px]",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW8IfsCnFDN8duC1xOKy0EGVnaDmMajmki53bmrZJSEGaiOIvXbA_sIuzI8H3tNHTB48tkVN942JDwz8BN4ZfPQpHgjQzHts5dnnxaz-zQFlt_ATCgm35GBgebRbqFtO-S7cET6x6gs2C4E1kTXvfF8wJhkkFgCVsKwFI8GgaMjpDczm8DG7_wRvFZ7Bt8h-gwG_smuToePogv2GaPcW6XqeaPcgfn9-7OFiN0L2g_KYYQA5Vl4z2MpKtq0pSKS4dLpbURpV2Drpmw",
    alt: "A professional bartender crafting a signature cocktail in a luxurious hotel lounge. The lighting is moody and warm, highlighting the crystalline glassware and the vibrant colors of the drink. Fine gold details on the bar counter and back shelving add a touch of modern luxury. The atmosphere is calm and sophisticated, perfect for an evening of quiet confidence.",
    className: "h-[200px] md:h-[300px]",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwVRZhb7SP-qo4VPNWNc2Vvsv03NIdGtqJhQ3kQDU_05Dv53uwOwcf1mIH-Lz05QCP-00M8VcTlnEgWiX2h_lVKPzq-8gL_Bl9LYHX_gXtvZGN2XdlvHLgKbPjckrbKiM6S2yvU1-9exDwbgCvM3K8vPvKSCRkDoPxhP6EMF5FDskDYwuOURDZMPFV1K2WgGeE4HuxH5UNknOzp9OxJ9--q6T-XMQ65koBgsWOYAFquQpD50Gna-mw5gZj-nTO6IGcdzXqJpcwwf1f",
    alt: "An wide interior shot of a sunlit bistro within a luxury estate. The space features light cream-colored walls, natural light from high arched windows, and white linen-covered tables. Large indoor plants provide fresh green accents, while the overall aesthetic is bright, airy, and impeccably clean, representing a modern minimalist approach to high-end dining.",
    className: "h-[200px] md:h-[300px]",
  },
  {
    src: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5yWhQX36w99d9XHz3Jrwn0C-kSdk7ox3pJ8w2T3iFz1-qYrIAh06EayPtPZbzvoA8xzJb2GBJQ-jhOox6WfiQvpdouLmGucF78h_dY2XDpw_-_3_Vmne20MzrVKEysM64-8Y-vrKZZcrW53s3j3YrPCFfZvYiYJjrMpejVBcK-z26vdiiJM-loqdq9dyoUIXmc12eCMoob1fGPPLM4KutmkhroB3lN9ftoaYnNu2ERdPOUq0_M9s_LIqwtZWT9GhXqLpAdFDjn3Gd",
    alt: "A perfectly set formal dining table in a high-end restaurant. Each place setting features fine white china, polished silver cutlery, and tall crystal wine glasses. A small, elegant floral arrangement in soft cream and green tones sits in the center. The surrounding room is out of focus but shows warm lighting and a sophisticated architectural detail, emphasizing the premium quality of the experience.",
    className: "h-[300px] md:h-[450px]",
  },
];

export default function Dining() {
  return (
    <section className="bg-primary text-white py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 reveal">
            <span className="text-secondary-fixed font-label-sm uppercase tracking-[0.2em] mb-4 block">
              Culinary Artistry
            </span>
            <h3 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg mb-8">
              Exquisite Dining for the Epicurean
            </h3>
            <p className="text-white/70 text-body-lg mb-10 leading-relaxed">
              From the morning&apos;s first sunrise tea to the evening&apos;s
              final signature cocktail, our culinary destinations offer a
              sensory journey through world flavors, redefined with local
              precision.
            </p>
            <div className="space-y-8">
              {DINING_ITEMS.map((item) => (
                <DiningItem key={item.title} {...item} />
              ))}
            </div>
            <button className="mt-12 text-secondary-fixed font-label-sm uppercase tracking-widest flex items-center gap-2 group">
              Book a Table
              <span className="w-12 h-[1px] bg-secondary-fixed group-hover:w-16 transition-all duration-300"></span>
            </button>
          </div>
          <div
            className="lg:col-span-7 grid grid-cols-2 gap-4 md:gap-8 reveal"
            style={{ transitionDelay: "200ms" }}
          >
            <div className="space-y-4 md:space-y-8">
              <div className={`${GALLERY[0].className} overflow-hidden rounded-sm`}>
                <img
                  className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                  data-alt={GALLERY[0].alt}
                  src={GALLERY[0].src}
                />
              </div>
              <div className={`${GALLERY[1].className} overflow-hidden rounded-sm`}>
                <img
                  className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                  data-alt={GALLERY[1].alt}
                  src={GALLERY[1].src}
                />
              </div>
            </div>
            <div className="pt-12 space-y-4 md:space-y-8">
              <div className={`${GALLERY[2].className} overflow-hidden rounded-sm`}>
                <img
                  className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                  data-alt={GALLERY[2].alt}
                  src={GALLERY[2].src}
                />
              </div>
              <div className={`${GALLERY[3].className} overflow-hidden rounded-sm`}>
                <img
                  className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                  data-alt={GALLERY[3].alt}
                  src={GALLERY[3].src}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
