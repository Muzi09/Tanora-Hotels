import { z } from 'zod';

export const updateSettingsSchema = z.object({
  brandName: z.string().optional(),
  tagline: z.string().optional(),
  logoUrl: z.string().optional(),
  faviconUrl: z.string().optional(),
  contact: z.object({
    phone: z.string().optional(),
    email: z.string().email().optional(),
    address: z.string().optional(),
    googleMapsUrl: z.string().optional(),
    bookingUrl: z.string().optional(),
    bookingButtonText: z.string().optional(),
  }).optional(),
  navigation: z.array(z.object({
    name: z.string(),
    path: z.string(),
  })).optional(),
  socialLinks: z.array(z.object({
    platform: z.string(),
    url: z.string(),
    icon: z.string().optional(),
  })).optional(),
  footer: z.object({
    aboutText: z.string().optional(),
    copyrightText: z.string().optional(),
    amenitiesList: z.array(z.string()).optional(),
  }).optional(),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    ogImage: z.string().optional(),
  }).optional(),
});
