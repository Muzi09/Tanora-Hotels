import mongoose from 'mongoose';

const SiteSettingsSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      default: 'TANORA',
      trim: true,
    },
    tagline: {
      type: String,
      default: 'Modern Luxury Hotel & Banquet',
      trim: true,
    },
    logoUrl: {
      type: String,
      default: '',
    },
    faviconUrl: {
      type: String,
      default: '/favicon.ico',
    },
    contact: {
      phone: { type: String, default: '8889866686' },
      email: { type: String, default: 'info@tanorahotels.com' },
      address: { type: String, default: 'Indore, Madhya Pradesh, India' },
      googleMapsUrl: {
        type: String,
        default: 'https://maps.app.goo.gl/yQdyQVsYHpe96Njs9?g_st=iw',
      },
      bookingUrl: {
        type: String,
        default: 'https://reservations.hotel-spider.com/03w6a62fee16853',
      },
      bookingButtonText: { type: String, default: 'Book Now' },
    },
    navigation: [
      {
        name: { type: String, required: true },
        path: { type: String, required: true },
      },
    ],
    socialLinks: [
      {
        platform: { type: String, required: true },
        url: { type: String, default: '#' },
        icon: { type: String, default: 'share' },
      },
    ],
    footer: {
      aboutText: {
        type: String,
        default:
          'Nestled in the vibrant heart of Indore, Tanora Hotel is a premium 3-star property offering a sanctuary of comfort, elegance, and genuine hospitality.',
      },
      copyrightText: {
        type: String,
        default: '© 2026 TANORA HOTEL. ALL RIGHTS RESERVED.',
      },
      amenitiesList: [String],
    },
    seo: {
      title: {
        type: String,
        default: 'TANORA | Modern Luxury Hotel & Banquet',
      },
      description: {
        type: String,
        default:
          'A Heritage of Quiet Confidence. Refined sanctuaries, exquisite dining, and grand banquets.',
      },
      keywords: {
        type: [String],
        default: ['hotel', 'indore', 'luxury', 'banquet', 'tanora hotel'],
      },
      ogImage: {
        type: String,
        default: '/images/hero_hotel_1784569172973.png',
      },
    },
  },
  {
    timestamps: true,
  }
);

export const SiteSettings = mongoose.model('SiteSettings', SiteSettingsSchema);
