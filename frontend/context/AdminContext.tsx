"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  CmsPageData,
  AdminUser,
} from "@/lib/cms/types";
import { DEFAULT_HOME_DATA } from "@/lib/cms/defaultData";
import {
  fetchPageData,
  saveSectionDraft as apiSaveSectionDraft,
  publishSection as apiPublishSection,
  publishAllSections as apiPublishAllSections,
  discardSectionDraft as apiDiscardSectionDraft,
  discardAllDrafts as apiDiscardAllDrafts,
  restoreSectionVersion as apiRestoreSectionVersion,
  uploadMediaFile,
  adminLogin as apiAdminLogin,
  adminLogout as apiAdminLogout,
  getAdminMe,
} from "@/lib/cms/api";

interface ToastMessage {
  type: "success" | "error" | "info";
  message: string;
}

interface AdminContextType {
  isAdmin: boolean;
  pageSlug: string;
  token: string | null;
  adminUser: AdminUser | null;
  isCheckingSession: boolean;
  homeData: CmsPageData;
  activeEditSection: string | null;
  isSaving: boolean;
  isPublishing: boolean;
  toast: ToastMessage | null;
  hasUnsavedDrafts: boolean;
  dirtySections: string[];
  openEditor: (sectionKey: string) => void;
  closeEditor: () => void;
  updateSectionPreview: (sectionKey: string, newContent: any) => void;
  saveSection: (sectionKey: string, customContent?: any) => Promise<boolean>;
  publishSection: (sectionKey: string) => Promise<boolean>;
  publishAll: () => Promise<boolean>;
  discardDraft: (sectionKey: string) => Promise<boolean>;
  discardAll: () => Promise<boolean>;
  restoreVersion: (sectionKey: string, version: number) => Promise<boolean>;
  uploadImage: (file: File, altText?: string) => Promise<string | null>;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  hideToast: () => void;
  refreshData: (clearedSections?: string[]) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({
  children,
  initialData = DEFAULT_HOME_DATA,
  initialIsAdmin = false,
  pageSlug = "home",
}: {
  children: React.ReactNode;
  initialData?: CmsPageData;
  initialIsAdmin?: boolean;
  pageSlug?: string;
}) {
  const [isAdmin, setIsAdmin] = useState<boolean>(initialIsAdmin);
  const [token, setToken] = useState<string | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(initialIsAdmin);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [homeData, setHomeData] = useState<CmsPageData>(initialData);
  const [activeEditSection, setActiveEditSection] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [dirtySections, setDirtySections] = useState<string[]>([]);
  const dirtySectionsRef = React.useRef(dirtySections);
  dirtySectionsRef.current = dirtySections;
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "success") => {
      setToast({ type, message });
      setTimeout(() => {
        setToast((current) => (current?.message === message ? null : current));
      }, 4000);
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  const initialDataRef = React.useRef(initialData);

  // Keep homeData synced with initialData on public page only when data actually changes
  useEffect(() => {
    if (!initialIsAdmin && initialData && initialData !== initialDataRef.current) {
      initialDataRef.current = initialData;
      setHomeData(initialData);
    }
  }, [initialData, initialIsAdmin]);

  // Resolve the saved session before deciding whether login is needed.
  useEffect(() => {
    if (!initialIsAdmin) return;
    let cancelled = false;

    async function restoreSession() {
      try {
        const storedToken = localStorage.getItem("tanora_admin_token");
        if (!storedToken) return;
        const admin = await getAdminMe(storedToken);
        if (cancelled) return;
        if (admin) {
          setToken(storedToken);
          setAdminUser(admin);
          setIsAdmin(true);
        } else {
          localStorage.removeItem("tanora_admin_token");
        }
      } catch {
        if (!cancelled) {
          setToken(null);
          setAdminUser(null);
        }
      } finally {
        if (!cancelled) setIsCheckingSession(false);
      }
    }

    void restoreSession();
    return () => { cancelled = true; };
  }, [initialIsAdmin]);

  // Fetch draft content when in admin mode and token is ready
  useEffect(() => {
    let cancelled = false;
    if (isAdmin && token) {
      fetchPageData(pageSlug, "draft", token)
        .then((data) => {
          if (!cancelled && data) { setHomeData(data); setDirtySections([]); }
        })
        .catch((err) => {
          console.error("[AdminContext] Error refreshing home data:", err);
        });
    }
    return () => { cancelled = true; };
  }, [isAdmin, token, pageSlug]);

  const refreshData = useCallback(async (clearedSections: string[] = []) => {
    const mode = isAdmin ? "draft" : "published";
    const data = await fetchPageData(pageSlug, mode, token);
    const keep = dirtySectionsRef.current.filter((key) => !clearedSections.includes(key));
    setHomeData((previous) => ({
      ...data,
      ...Object.fromEntries(keep.map((key) => [key, previous[key]])),
    }));
    setDirtySections(keep);
  }, [isAdmin, token, pageSlug]);

  // Check if any section has modified draft changes
  const hasUnsavedDrafts = Boolean(
    homeData.metadata?.hasDraftChanges ||
      Object.values(homeData).some((s: any) => s?.isDraftModified)
  );

  const openEditor = useCallback((sectionKey: string) => {
    setActiveEditSection(sectionKey);
  }, []);

  const closeEditor = useCallback(() => {
    setActiveEditSection(null);
  }, []);

  // Real-time live preview update
  const updateSectionPreview = useCallback(
    (sectionKey: string, newContent: any) => {
      setDirtySections((current) => Array.from(new Set([...current, sectionKey])));
      setHomeData((prev) => {
        if (sectionKey === "settings") {
          return {
            ...prev,
            settings: {
              ...prev.settings,
              ...newContent,
            },
          };
        }

        const currentSection = (prev as any)[sectionKey];
        if (!currentSection) return prev;

        return {
          ...prev,
          [sectionKey]: {
            ...currentSection,
            data: newContent,

          },

        };
      });
    },
    []
  );

  // Save draft to backend
  const saveSection = useCallback(
    async (sectionKey: string, customContent?: any): Promise<boolean> => {
      if (!token) {
        showToast("Please log in to save changes", "error");
        return false;
      }

      setIsSaving(true);
      try {
        if (sectionKey === "settings") {
          const contentToSave = customContent !== undefined ? customContent : homeData.settings;
          const API_BASE =
            process.env.NEXT_PUBLIC_API_URL || "https://tanora-hotels.onrender.com/api";
          const res = await fetch(`${API_BASE}/settings`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(contentToSave),
          });
          if (!res.ok) throw new Error("Failed to save settings");
          showToast("Global settings saved successfully", "success");
        } else {
          const sectionData = customContent !== undefined ? customContent : (homeData as any)[sectionKey]?.data;
          await apiSaveSectionDraft(sectionKey, sectionData, token, pageSlug);
          showToast(
            `Section "${sectionKey}" draft saved. Click Publish to make live.`,
            "success"
          );
        }

        await refreshData([sectionKey]);
        return true;
      } catch (err: any) {
        showToast(err.message || "Failed to save draft", "error");
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [token, pageSlug, homeData, showToast, refreshData]
  );

  // Publish single section
  const publishSection = useCallback(
    async (sectionKey: string): Promise<boolean> => {
      if (!token) {
        showToast("Please log in to publish changes", "error");
        return false;
      }

      if (dirtySections.includes(sectionKey) || !(homeData as any)[sectionKey]?.isDraftModified || isSaving) return false;
      setIsPublishing(true);
      try {
        if (sectionKey === "settings") {
          const API_BASE =
            process.env.NEXT_PUBLIC_API_URL || "https://tanora-hotels.onrender.com/api";
          const res = await fetch(`${API_BASE}/settings`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(homeData.settings),
          });
          if (!res.ok) throw new Error("Failed to save and publish settings");
          showToast("Global settings published live!", "success");
        } else {
          await apiPublishSection(sectionKey, token, pageSlug);
          showToast(
            `Section "${sectionKey}" published! Changes are now live on public site.`,
            "success"
          );
        }
        await refreshData([sectionKey]);
        closeEditor();
        return true;
      } catch (err: any) {
        showToast(err.message || "Failed to publish section", "error");
        return false;
      } finally {
        setIsPublishing(false);
      }
    },
    [token, pageSlug, homeData, dirtySections, isSaving, showToast, refreshData, closeEditor]
  );

  // Publish all modified sections
  const publishAll = useCallback(async (): Promise<boolean> => {
    if (!token) {
      showToast("Please log in to publish changes", "error");
      return false;
    }

    if (!hasUnsavedDrafts || dirtySections.length > 0 || isSaving) return false;
    setIsPublishing(true);
    try {
      const result = await apiPublishAllSections(token, pageSlug);
      showToast(
        `All changes published (${result.data.publishedCount} section(s)). Public site updated!`,
        "success"
      );
      await refreshData(dirtySectionsRef.current);
      closeEditor();
      return true;
    } catch (err: any) {
      showToast(err.message || "Failed to publish all changes", "error");
      return false;
    } finally {
      setIsPublishing(false);
    }
  }, [token, pageSlug, hasUnsavedDrafts, dirtySections, isSaving, showToast, refreshData, closeEditor]);

  // Discard draft for single section
  const discardDraft = useCallback(
    async (sectionKey: string): Promise<boolean> => {
      if (!token) return false;

      try {
        if (sectionKey === "settings") {
          showToast("Discarded settings changes.", "info");
        } else {
          await apiDiscardSectionDraft(sectionKey, token, pageSlug);
          showToast(`Discarded draft changes for "${sectionKey}".`, "info");
        }
        await refreshData([sectionKey]);
        closeEditor();
        return true;
      } catch (err: any) {
        showToast(err.message || "Failed to discard draft", "error");
        return false;
      }
    },
    [token, pageSlug, showToast, refreshData, closeEditor]
  );

  // Discard all drafts
  const discardAll = useCallback(async (): Promise<boolean> => {
    if (!token) return false;

    try {
      await apiDiscardAllDrafts(token, pageSlug);
      showToast("All unpublished drafts discarded.", "info");
      await refreshData(dirtySectionsRef.current);
      closeEditor();
      return true;
    } catch (err: any) {
      showToast(err.message || "Failed to discard drafts", "error");
      return false;
    }
  }, [token, pageSlug, showToast, refreshData, closeEditor]);

  // Restore section from version
  const restoreVersion = useCallback(
    async (sectionKey: string, version: number): Promise<boolean> => {
      if (!token) return false;

      try {
        await apiRestoreSectionVersion(sectionKey, version, token, pageSlug);
        showToast(
          `Restored "${sectionKey}" to version ${version}. Review and publish.`,
          "success"
        );
        await refreshData([sectionKey]);
        return true;
      } catch (err: any) {
        showToast(err.message || "Failed to restore version", "error");
        return false;
      }
    },
    [token, pageSlug, showToast, refreshData]
  );

  // Upload image through backend media API
  const uploadImage = useCallback(
    async (file: File, altText = ""): Promise<string | null> => {
      if (!token) {
        showToast("Please log in to upload media", "error");
        return null;
      }

      try {
        showToast("Uploading image...", "info");
        const media = await uploadMediaFile(file, altText, token);
        showToast("Image uploaded successfully!", "success");
        return media.fullUrl;
      } catch (err: any) {
        showToast(err.message || "Image upload failed", "error");
        return null;
      }
    },
    [token, showToast]
  );

  // Login
  const login = useCallback(
    async (pass: string): Promise<boolean> => {
      try {
        const data = await apiAdminLogin(pass);
        setToken(data.token);
        setAdminUser(data.admin);
        setIsAdmin(true);
        if (typeof window !== "undefined") {
          localStorage.setItem("tanora_admin_token", data.token);
        }
        showToast(`Welcome back, ${data.admin.name}!`, "success");
        return true;
      } catch (err: any) {
        showToast(err.message || "Login failed", "error");
        throw err;
      }
    },
    [showToast]
  );

  // Logout
  const logout = useCallback(async () => {
    await apiAdminLogout();
    setToken(null);
    setAdminUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("tanora_admin_token");
    }
    showToast("Logged out from admin panel", "info");
  }, [showToast]);

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        pageSlug,
        token,
        adminUser,
        isCheckingSession,
        homeData,
        activeEditSection,
        isSaving,
        isPublishing,
        toast,
        hasUnsavedDrafts,
        dirtySections,
        openEditor,
        closeEditor,
        updateSectionPreview,
        saveSection,
        publishSection,
        publishAll,
        discardDraft,
        discardAll,
        restoreVersion,
        uploadImage,
        login,
        logout,
        showToast,
        hideToast,
        refreshData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

const DEFAULT_ADMIN_FALLBACK: AdminContextType = {
  isAdmin: false,
  pageSlug: "home",
  token: null,
  adminUser: null,
  isCheckingSession: false,
  homeData: DEFAULT_HOME_DATA,
  activeEditSection: null,
  isSaving: false,
  isPublishing: false,
  toast: null,
  hasUnsavedDrafts: false,
  dirtySections: [],
  openEditor: () => {},
  closeEditor: () => {},
  updateSectionPreview: () => {},
  saveSection: async () => false,
  publishSection: async () => false,
  publishAll: async () => false,
  discardDraft: async () => false,
  discardAll: async () => false,
  restoreVersion: async () => false,
  uploadImage: async () => null,
  login: async () => false,
  logout: async () => {},
  showToast: () => {},
  hideToast: () => {},
  refreshData: async () => {},
};

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    return DEFAULT_ADMIN_FALLBACK;
  }
  return context;
}
