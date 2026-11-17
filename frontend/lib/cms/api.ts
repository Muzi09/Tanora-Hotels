import pageDefaults from "./pageDefaults.json";
import { HomePageData, CmsPageData } from './types';
import { DEFAULT_HOME_DATA } from './defaultData';

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/**
 * Consolidated fetch for all homepage sections and settings.
 * Designed for server components or client context.
 */
export async function fetchHomePageData(
  mode: 'published' | 'draft' = 'published',
  token?: string | null
): Promise<HomePageData> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const isClient = typeof window !== 'undefined';
    const fetchOptions: RequestInit = {
      method: 'GET',
      headers,
      signal: controller.signal,
    };

    // Only add Next.js specific caching options on the server side
    if (!isClient) {
      (fetchOptions as any).next = mode === 'published' ? { revalidate: 60 } : { revalidate: 0 };
    }
    fetchOptions.cache = mode === 'draft' ? 'no-store' : 'default';

    const res = await fetch(`${API_BASE}/content/home?mode=${mode}`, fetchOptions);
    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`[CMS API] Failed to fetch homepage data: ${res.status} ${res.statusText}`);
      return DEFAULT_HOME_DATA;
    }

    const json = await res.json();
    if (json && json.sections) {
      return {
        hero: json.sections.hero || DEFAULT_HOME_DATA.hero,
        intro: json.sections.intro || DEFAULT_HOME_DATA.intro,
        whyChoose: json.sections.whyChoose || DEFAULT_HOME_DATA.whyChoose,
        featuredRooms: json.sections.featuredRooms || DEFAULT_HOME_DATA.featuredRooms,
        dining: json.sections.dining || DEFAULT_HOME_DATA.dining,
        meetings: json.sections.meetings || DEFAULT_HOME_DATA.meetings,
        amenities: json.sections.amenities || DEFAULT_HOME_DATA.amenities,
        promotionalBanner: json.sections.promotionalBanner || DEFAULT_HOME_DATA.promotionalBanner,
        settings: json.settings || DEFAULT_HOME_DATA.settings,
        metadata: json.metadata,
      };
    }

    return DEFAULT_HOME_DATA;
  } catch (error: any) {
    if (error?.name !== 'AbortError') {
      console.warn('[CMS API] Falling back to default static content:', error?.message || error);
    }
    return DEFAULT_HOME_DATA;
  }
}

/**
 * Save draft changes for a section.
 */
export async function saveSectionDraft(
  sectionKey: string,
  content: any,
  token: string,
  pageSlug = "home"
) {
  const res = await fetch(`${API_BASE}/content/${pageSlug}/${sectionKey}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content }),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || `Failed to save section ${sectionKey}`);
  }
  return json;
}

/**
 * Publish a section draft to public live site.
 */
export async function publishSection(sectionKey: string, token: string, pageSlug = "home") {
  const res = await fetch(`${API_BASE}/content/${pageSlug}/${sectionKey}/publish`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || `Failed to publish section ${sectionKey}`);
  }
  return json;
}

/**
 * Publish all modified drafts to public live site.
 */
export async function publishAllSections(token: string, pageSlug = "home") {
  const res = await fetch(`${API_BASE}/content/${pageSlug}/publish-all`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to publish all sections');
  }
  return json;
}

/**
 * Discard draft and revert to published version.
 */
export async function discardSectionDraft(sectionKey: string, token: string, pageSlug = "home") {
  const res = await fetch(`${API_BASE}/content/${pageSlug}/${sectionKey}/discard`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || `Failed to discard draft for ${sectionKey}`);
  }
  return json;
}

/**
 * Discard all drafts on homepage.
 */
export async function discardAllDrafts(token: string, pageSlug = "home") {
  const res = await fetch(`${API_BASE}/content/${pageSlug}/discard-all`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Failed to discard all drafts');
  }
  return json;
}

/**
 * Restore section from a specific version number.
 */
export async function restoreSectionVersion(
  sectionKey: string,
  version: number,
  token: string,
  pageSlug = "home"
) {
  const res = await fetch(`${API_BASE}/content/${pageSlug}/${sectionKey}/restore`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ version }),
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || `Failed to restore section ${sectionKey}`);
  }
  return json;
}

/**
 * Upload an image file through multer backend endpoint.
 */
export async function uploadMediaFile(file: File, altText: string, token: string) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('altText', altText);

  const res = await fetch(`${API_BASE}/media/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message || 'Image upload failed');
  }
  // If local upload, prepend backend host if relative URL
  const serverHost = API_BASE.replace('/api', '');
  const url = json.data.url.startsWith('http')
    ? json.data.url
    : `${serverHost}${json.data.url}`;

  return {
    ...json.data,
    fullUrl: url,
  };
}

/**
 * Admin login with rate limit error handling.
 */
export async function adminLogin(password: string) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error: any = new Error(json.message || 'Login failed. Invalid credentials.');
    error.status = res.status;
    error.attemptsLeft = json.attemptsLeft;
    error.isBlocked = json.isBlocked;
    error.blockedUntil = json.blockedUntil;
    throw error;
  }
  return json.data;
}

/**
 * Fetch current login rate-limit / block status for current device IP.
 */
export async function getLoginRateLimitStatus(): Promise<{
  ip: string;
  isBlocked: boolean;
  attemptsLeft: number;
  blockedUntil: string | null;
} | null> {
  try {
    const res = await fetch(`${API_BASE}/auth/status`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data || null;
  } catch (err) {
    console.warn('[CMS API] Failed to fetch login status:', err);
    return null;
  }
}

/**
 * Admin logout.
 */
export async function adminLogout() {
  try {
    await fetch(`${API_BASE}/auth/logout`, { method: 'POST' });
  } catch (err) {
    console.warn('[CMS API] Logout error:', err);
  }
}

/**
 * Verify current session token.
 */
export async function getAdminMe(token: string) {
  const res = await fetch(`${API_BASE}/auth/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return null;
  }
  const json = await res.json();
  return json.data.admin;
}

/** Fetch a page with its own defaults. Authenticated failures must surface to the editor. */
export async function fetchPageData(pageSlug: string, mode: "published" | "draft" = "published", token?: string | null): Promise<CmsPageData> {
  if (pageSlug === "home" && mode === "published") return fetchHomePageData(mode, token);
  const definition = pageDefaults[pageSlug as keyof typeof pageDefaults];
  const fallback: CmsPageData = pageSlug === "home" ? DEFAULT_HOME_DATA : {
    ...Object.fromEntries(Object.entries(definition.sections).map(([key, section]) => [key, { data: section.content, isDraftModified: false }])),
    settings: DEFAULT_HOME_DATA.settings,
  };
  try {
    const response = await fetch(`${API_BASE}/content/${pageSlug}?mode=${mode}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error("Unable to load page content");
    const result = await response.json();
    return { ...fallback, ...result.sections, settings: result.settings, metadata: result.metadata };
  } catch (error) {
    if (mode === "draft") throw error;
    return fallback;
  }
}
