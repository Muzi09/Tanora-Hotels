export interface ImageField {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface LinkField {
  label: string;
  href: string;
}

export interface HeroContent {
  subtitle: string;
  title: string;
  backgroundImage: ImageField;
  cta: LinkField;
}

export interface IntroContent {
  icon: string;
  title: string;
  description: string;
}

export interface WhyChooseFeature {
  title: string;
  icon: string;
}

export interface WhyChooseContent {
  title: string;
  features: WhyChooseFeature[];
}

export interface RoomCard {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  linkText: string;
  linkHref: string;
  amenities: string[];
}

export interface FeaturedRoomsContent {
  title: string;
  viewAllText: string;
  viewAllHref: string;
  rooms: RoomCard[];
}

export interface DiningCard {
  id: string;
  type: 'standard' | 'featured';
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  icon?: string;
  linkText: string;
  linkHref: string;
}

export interface DiningContent {
  title: string;
  items: DiningCard[];
}

export interface MeetingCard {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  linkText: string;
  linkHref: string;
}

export interface MeetingsContent {
  title: string;
  subtitle: string;
  cards: MeetingCard[];
}

export interface AmenitiesContent {
  title: string;
  selectedAmenities: string[];
}

export interface PromotionalBannerContent {
  title: string;
  description: string;
  backgroundImage: ImageField;
  cta: LinkField;
}

export interface SiteSettingsContent {
  brandName: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  contact: {
    phone: string;
    email: string;
    address: string;
    googleMapsUrl: string;
    bookingUrl: string;
    bookingButtonText: string;
  };
  navigation: Array<{
    name: string;
    path: string;
  }>;
  socialLinks: Array<{
    platform: string;
    url: string;
    icon?: string;
  }>;
  footer: {
    aboutText: string;
    copyrightText: string;
    amenitiesList: string[];
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
}

export interface SectionMeta<T> {
  data: T;
  isDraftModified?: boolean;
  publishedVersion?: number;
  draftVersion?: number;
  lastPublishedAt?: string | Date;
  lastPublishedBy?: string;
}

export interface HomePageData {
  hero: SectionMeta<HeroContent>;
  intro: SectionMeta<IntroContent>;
  whyChoose: SectionMeta<WhyChooseContent>;
  featuredRooms: SectionMeta<FeaturedRoomsContent>;
  dining: SectionMeta<DiningContent>;
  meetings: SectionMeta<MeetingsContent>;
  amenities: SectionMeta<AmenitiesContent>;
  promotionalBanner: SectionMeta<PromotionalBannerContent>;
  settings?: SiteSettingsContent;
  metadata?: {
    hasDraftChanges: boolean;
    modifiedSections: string[];
    lastPublishedAt?: string;
  };
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface CmsPageData {
  [section: string]: any;
  settings?: SiteSettingsContent;
  metadata?: HomePageData["metadata"];
}
