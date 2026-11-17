export const DEFAULT_SITE_SETTINGS = {
  brandName: 'TANORA',
  tagline: 'Modern Luxury Hotel & Banquet',
  logoUrl: '',
  faviconUrl: '/favicon.ico',
  contact: {
    phone: '8889866686',
    email: 'info@tanorahotels.com',
    address: 'Indore, Madhya Pradesh, India',
    googleMapsUrl: 'https://maps.app.goo.gl/yQdyQVsYHpe96Njs9?g_st=iw',
    bookingUrl: 'https://reservations.hotel-spider.com/03w6a62fee16853',
    bookingButtonText: 'Book Now',
  },
  navigation: [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Rooms & Suites', path: '/rooms' },
    { name: 'Dining', path: '/dining' },
    { name: 'Rooftop', path: '/rooftop' },
    { name: 'Meetings', path: '/meetings' },
    { name: 'Banquet', path: '/banquet' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Offers', path: '/offers' },
    { name: 'Contact', path: '/contact' },
  ],
  socialLinks: [
    { platform: 'share', url: '#', icon: 'share' },
    { platform: 'photo_camera', url: '#', icon: 'photo_camera' },
  ],
  footer: {
    aboutText:
      'Nestled in the vibrant heart of Indore, Tanora Hotel is a premium 3-star property offering a sanctuary of comfort, elegance, and genuine hospitality.',
    copyrightText: '© 2026 TANORA HOTEL. ALL RIGHTS RESERVED.',
    amenitiesList: [
      'Free WiFi',
      'Valet Parking',
      '24/7 Service',
      'Room Service',
      'Meeting Rooms',
      'Banquet Hall',
      'Restaurants',
      'Rooftop Bar',
    ],
  },
  seo: {
    title: 'TANORA | Modern Luxury Hotel & Banquet',
    description:
      'A Heritage of Quiet Confidence. Refined sanctuaries, exquisite dining, and grand banquets.',
    keywords: ['hotel', 'indore', 'luxury', 'banquet', 'tanora hotel'],
    ogImage: '/images/hero_hotel_1784569172973.png',
  },
};

export const DEFAULT_HOME_SECTIONS = {
  hero: {
    subtitle: 'Premium 3 star hotel in Indore',
    title: 'Luxury Comfort Exceptional Hospitililty',
    backgroundImage: {
      url: '/images/hero_hotel_1784569172973.png',
      alt: 'Tanora Hotel Exterior',
    },
    cta: {
      label: 'Book Now',
      href: 'https://reservations.hotel-spider.com/03w6a62fee16853',
    },
  },

  intro: {
    icon: 'spa',
    title: 'Welcome to Tanora Hotel',
    description:
      'Nestled in the vibrant heart of Indore, Tanora Hotel is a premium 3-star property that offers more than just a place to stay. It is a sanctuary of comfort, elegance, and genuine hospitality. Every stay is designed to deliver unforgettable experiences through personalized service, modern comfort, and exceptional hospitality.',
  },

  whyChoose: {
    title: 'Why Choose Tanora',
    features: [
      { title: 'Elegant 3-Star Accommodation', icon: 'king_bed' },
      { title: 'Modern Rooms', icon: 'bedroom_parent' },
      { title: 'Restaurant', icon: 'restaurant' },
      { title: 'Rooftop Restaurant & Bar', icon: 'deck' },
      { title: 'Conference Rooms', icon: 'video_camera_front' },
      { title: 'Banquet Hall', icon: 'celebration' },
      { title: 'Free WiFi', icon: 'wifi' },
      { title: 'Valet Parking', icon: 'directions_car' },
      { title: '24/7 Service', icon: 'support_agent' },
      { title: 'Hospitality from the Heart', icon: 'favorite' },
    ],
  },

  featuredRooms: {
    title: 'Featured Rooms',
    viewAllText: 'View All Rooms',
    viewAllHref: '/rooms',
    rooms: [
      {
        id: 'room-1',
        title: 'Standard Room',
        description:
          'A peaceful retreat featuring modern comforts, king-size bed, premium linens, and a stylish workspace designed for both relaxation and productivity.',
        imageSrc: '/images/standard_room_1784569189614.png',
        imageAlt: 'Standard Room',
        linkText: 'Explore Room',
        linkHref: '/rooms',
        amenities: ['King Size Bed', 'High Speed WiFi', 'Smart TV', 'Rain Shower'],
      },
      {
        id: 'room-2',
        title: 'Executive Suite',
        description:
          'Our most luxurious offering. A massive open layout suite with a private lounge area, premium sofa set, oversized bathroom, and unparalleled comfort.',
        imageSrc: '/images/executive_suite_1784569211005.png',
        imageAlt: 'Executive Suite',
        linkText: 'Explore Suite',
        linkHref: '/rooms',
        amenities: ['Private Lounge', 'Oversized Bathroom', 'Premium Coffee', 'Luxury Bed'],
      },
    ],
  },

  dining: {
    title: 'Dining Experience',
    items: [
      {
        id: 'dining-1',
        type: 'standard',
        title: 'The Pavilion',
        description:
          'Ground Floor Restaurant offering all-day dining with a curated menu of multi-cuisine delights.',
        imageSrc: '/images/restaurant_pavilion_1784569251819.png',
        imageAlt: 'The Pavilion',
        linkText: 'Explore',
        linkHref: '/dining',
      },
      {
        id: 'dining-2',
        type: 'standard',
        title: 'The LUXE',
        description:
          'Rooftop Restaurant & Bar featuring city skyline views, premium spirits, and fusion cuisine.',
        imageSrc: '/images/restaurant_luxe_1784569279478.png',
        imageAlt: 'The LUXE',
        linkText: 'Explore',
        linkHref: '/rooftop',
      },
      {
        id: 'dining-3',
        type: 'featured',
        icon: 'wine_bar',
        title: 'Private Dining',
        description:
          'Exclusive private dining rooms for VIP experiences and intimate celebrations.',
        linkText: 'View Details',
        linkHref: '/dining',
      },
    ],
  },

  meetings: {
    title: 'Meetings & Events',
    subtitle:
      'Host your next corporate meeting or grand celebration in our premium, state-of-the-art event spaces.',
    cards: [
      {
        id: 'meeting-1',
        title: 'Boardroom',
        description:
          'Executive luxury for high-stakes decisions. Private, fully-equipped space for 10-12 guests.',
        imageSrc: '/images/hero_hotel_1784569172973.png',
        imageAlt: 'Boardroom',
        linkText: 'Details',
        linkHref: '/meetings',
      },
      {
        id: 'meeting-2',
        title: 'Regent Room',
        description:
          'Ideal for interviews, brainstorming, and small team meetings for 5-6 guests with natural lighting.',
        imageSrc: '/images/hero_hotel_1784569172973.png',
        imageAlt: 'Regent Room',
        linkText: 'Details',
        linkHref: '/meetings',
      },
      {
        id: 'meeting-3',
        title: 'The Ballroom',
        description:
          'Elegant 1,000+ sq ft premium banquet hall perfect for birthdays, private celebrations, and social gatherings.',
        imageSrc: '/images/banquet_hall_1784569314141.png',
        imageAlt: 'The Ballroom',
        linkText: 'Explore Banquet',
        linkHref: '/banquet',
      },
    ],
  },

  amenities: {
    title: 'Comprehensive Amenities',
    selectedAmenities: [], // Empty means show all default amenities in AmenitiesGrid
  },

  promotionalBanner: {
    title: 'Luxury Stay Awaits',
    description:
      'Book directly with us and enjoy exclusive offers, premium hospitality and unforgettable experiences.',
    backgroundImage: {
      url: '/images/hero_hotel_1784569172973.png',
      alt: 'Luxury Stay Background',
    },
    cta: {
      label: 'Book Now',
      href: 'https://reservations.hotel-spider.com/03w6a62fee16853',
    },
  },
};
