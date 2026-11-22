"use client";
import React, { useState } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import PageSectionFields from "./PageSectionFields";
import pageDefaults from "@/lib/cms/pageDefaults.json";
import ImageUploader from "./ImageUploader";
import { useAdmin } from "@/context/AdminContext";

export default function AdminEditDrawer() {
  const { activeEditSection, homeData } = useAdmin();

  const initialSectionData = React.useMemo(() => {
    if (!activeEditSection) return null;
    if (activeEditSection === "settings") {
      return JSON.parse(JSON.stringify(homeData.settings || {}));
    }
    const sectionMeta = (homeData as any)[activeEditSection];
    return sectionMeta?.data ? JSON.parse(JSON.stringify(sectionMeta.data)) : null;
  }, [activeEditSection, homeData]);

  if (!activeEditSection || !initialSectionData) return null;

  return (
    <AdminEditDrawerInner
      key={`${activeEditSection}-${(homeData as any)[activeEditSection]?.draftVersion ?? 0}`}
      activeEditSection={activeEditSection}
      initialData={initialSectionData}
    />
  );
}

function AdminEditDrawerInner({
  activeEditSection,
  initialData,
}: {
  activeEditSection: string;
  initialData: any;
}) {
  const {
    closeEditor,
    pageSlug,
    homeData,
    updateSectionPreview,
    saveSection,
    publishSection,
    discardDraft,
    isSaving,
    isPublishing,
    dirtySections,
  } = useAdmin();

  const [formData, setFormData] = useState<any>(initialData);

  // Propagate changes to live preview immediately
  const handleChange = (newFormData: any) => {
    setFormData(newFormData);
    updateSectionPreview(activeEditSection, newFormData);
  };

  const pageDefinition = pageDefaults[pageSlug as keyof typeof pageDefaults];
  const pageSection = pageDefinition ? (pageDefinition.sections as Record<string, { title: string; content: any }>)[activeEditSection] : undefined;

  const getSectionTitle = () => {
    if (pageSection) return pageSection.title;
    switch (activeEditSection) {
      case "hero":
        return "Hero Section";
      case "intro":
        return "About / Welcome Section";
      case "whyChoose":
        return "Why Choose Tanora";
      case "featuredRooms":
        return "Featured Rooms";
      case "dining":
        return "Dining Experience";
      case "meetings":
        return "Meetings & Events";
      case "amenities":
        return "Comprehensive Amenities";
      case "promotionalBanner":
        return "Promotional Banner";
      case "settings":
        return "Header, Footer & Site Settings";
      default:
        return "Edit Section";
    }
  };

  const sectionMeta = (homeData as any)[activeEditSection];
  const isDraftModified = sectionMeta?.isDraftModified;

  const handlePublish = async () => {
    if (dirtySections.includes(activeEditSection) || !isDraftModified) {
      const saved = await saveSection(activeEditSection, formData);
      if (!saved) return;
    }
    await publishSection(activeEditSection);
  };

  return (
    <>
    <button aria-label="Close editor backdrop" onClick={closeEditor} className="fixed inset-0 z-[65] bg-black/50" />
    <div role="dialog" aria-modal="true" aria-label={getSectionTitle()} className="admin-ui fixed top-12 right-0 bottom-0 w-full sm:w-[540px] bg-surface border-l border-surface-variant shadow-2xl z-[70] flex flex-col transition-all duration-300 animate-in slide-in-from-right">
      {/* Drawer Header */}
      <div className="p-4 sm:p-5 border-b border-surface-variant flex items-center justify-between bg-surface-container-low">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#dcae5d]" />
            <h2 className="text-base font-display-lg font-bold text-primary">
              {getSectionTitle()}
            </h2>
          </div>
          <div className="flex items-center gap-2 mt-1">
            {(isDraftModified || dirtySections.includes(activeEditSection)) && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 font-semibold border border-amber-500/30">
                {dirtySections.includes(activeEditSection) ? "Unsaved Changes" : "Saved Draft"}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={closeEditor}
          className="p-1.5 rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors"
          title="Close Editor"
        >
          <MaterialIcon name="close" className="text-xl" />
        </button>
      </div>

      {/* Drawer Actions Bar */}
      <div className="p-3 bg-surface border-b border-surface-variant flex items-center justify-between gap-2 shadow-xs">
        <button
          type="button"
          disabled={isSaving || isPublishing}
          onClick={() => discardDraft(activeEditSection)}
          className="px-3 py-1.5 rounded-lg border border-surface-variant hover:bg-surface-variant/50 text-xs font-semibold text-on-surface-variant transition-colors"
        >
          Discard
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isSaving || isPublishing}
            onClick={() => saveSection(activeEditSection, formData)}
            className="px-4 py-1.5 rounded-lg bg-primary text-white hover:bg-primary/90 text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
          >
            {isSaving ? (
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <MaterialIcon name="save" className="text-sm" />
            )}
            <span>{activeEditSection === "settings" ? "Save Settings" : "Save Draft"}</span>
          </button>

          <button
            type="button"
            disabled={isPublishing || isSaving}
            onClick={handlePublish}
            className="px-4 py-1.5 rounded-lg bg-[#dcae5d] text-primary hover:bg-[#c99f52] text-xs font-bold uppercase tracking-wider transition-colors disabled:opacity-50 flex items-center gap-1.5 shadow-sm cursor-pointer"
          >
            {isPublishing ? (
              <span className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            ) : (
              <MaterialIcon name="publish" className="text-sm" />
            )}
            <span>Publish Live</span>
          </button>
        </div>
      </div>

      {/* Drawer Scrollable Content Area */}
      <fieldset disabled={isSaving || isPublishing} className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-6">
        {pageSection && <PageSectionFields value={formData} template={pageSection.content} onChange={handleChange} />}
        {/* HERO SECTION FORM */}
        {pageSlug === "home" && activeEditSection === "hero" && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Subtitle / Tagline
              </label>
              <input
                type="text"
                value={formData.subtitle || ""}
                onChange={(e) =>
                  handleChange({ ...formData, subtitle: e.target.value })
                }
                className="w-full text-sm px-3 py-2 rounded-lg border border-surface-variant bg-surface"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Main Headline
              </label>
              <textarea
                rows={2}
                value={formData.title || ""}
                onChange={(e) =>
                  handleChange({ ...formData, title: e.target.value })
                }
                className="w-full text-sm px-3 py-2 rounded-lg border border-surface-variant bg-surface"
              />
            </div>

            <ImageUploader
              label="Hero Background Image"
              url={formData.backgroundImage?.url || ""}
              alt={formData.backgroundImage?.alt || ""}
              onUrlChange={(url) =>
                handleChange({
                  ...formData,
                  backgroundImage: { ...formData.backgroundImage, url },
                })
              }
              onAltChange={(alt) =>
                handleChange({
                  ...formData,
                  backgroundImage: { ...formData.backgroundImage, alt },
                })
              }
            />

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={formData.cta?.label || ""}
                  onChange={(e) =>
                    handleChange({
                      ...formData,
                      cta: { ...formData.cta, label: e.target.value },
                    })
                  }
                  className="w-full text-sm px-3 py-2 rounded-lg border border-surface-variant bg-surface"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                  CTA Button URL
                </label>
                <input
                  type="text"
                  value={formData.cta?.href || ""}
                  onChange={(e) =>
                    handleChange({
                      ...formData,
                      cta: { ...formData.cta, href: e.target.value },
                    })
                  }
                  className="w-full text-sm px-3 py-2 rounded-lg border border-surface-variant bg-surface"
                />
              </div>
            </div>
          </div>
        )}

        {/* INTRO SECTION FORM */}
        {pageSlug === "home" && activeEditSection === "intro" && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Material Icon Name
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.icon || ""}
                  onChange={(e) =>
                    handleChange({ ...formData, icon: e.target.value })
                  }
                  className="flex-1 text-sm px-3 py-2 rounded-lg border border-surface-variant bg-surface"
                />
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center border border-surface-variant text-secondary">
                  <MaterialIcon name={formData.icon || "spa"} className="text-2xl" />
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {["spa", "hotel", "star", "favorite", "bed", "diamond", "verified"].map(
                  (ic) => (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => handleChange({ ...formData, icon: ic })}
                      className="text-xs px-2 py-1 rounded bg-surface-variant hover:bg-secondary/20 hover:text-primary transition-colors"
                    >
                      {ic}
                    </button>
                  )
                )}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Section Title
              </label>
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) =>
                  handleChange({ ...formData, title: e.target.value })
                }
                className="w-full text-sm px-3 py-2 rounded-lg border border-surface-variant bg-surface"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Welcome Description
              </label>
              <textarea
                rows={6}
                value={formData.description || ""}
                onChange={(e) =>
                  handleChange({ ...formData, description: e.target.value })
                }
                className="w-full text-sm px-3 py-2 rounded-lg border border-surface-variant bg-surface leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* WHY CHOOSE SECTION FORM */}
        {pageSlug === "home" && activeEditSection === "whyChoose" && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Section Heading
              </label>
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) =>
                  handleChange({ ...formData, title: e.target.value })
                }
                className="w-full text-sm px-3 py-2 rounded-lg border border-surface-variant bg-surface"
              />
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-primary uppercase tracking-wider">
                  Features List ({formData.features?.length || 0})
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const updated = [
                      ...(formData.features || []),
                      { title: "New Feature", icon: "star" },
                    ];
                    handleChange({ ...formData, features: updated });
                  }}
                  className="px-2.5 py-1 rounded-md bg-[#dcae5d] text-primary text-xs font-bold hover:brightness-105 transition-all flex items-center gap-1"
                >
                  <MaterialIcon name="add" className="text-sm" />
                  <span>Add Feature</span>
                </button>
              </div>

              <div className="space-y-2">
                {formData.features?.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 bg-surface-container-low border border-surface-variant rounded-xl flex items-center gap-2 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                      <MaterialIcon name={item.icon || "star"} className="text-lg" />
                    </div>

                    <div className="flex-1 grid grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={item.title || ""}
                        onChange={(e) => {
                          const updated = [...formData.features];
                          updated[idx].title = e.target.value;
                          handleChange({ ...formData, features: updated });
                        }}
                        placeholder="Feature Title"
                        className="col-span-2 text-xs px-2 py-1.5 rounded border border-surface-variant bg-surface"
                      />
                      <input
                        type="text"
                        value={item.icon || ""}
                        onChange={(e) => {
                          const updated = [...formData.features];
                          updated[idx].icon = e.target.value;
                          handleChange({ ...formData, features: updated });
                        }}
                        placeholder="Icon Name"
                        className="col-span-1 text-xs px-2 py-1.5 rounded border border-surface-variant bg-surface"
                      />
                    </div>

                    {/* Move Up/Down & Delete */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => {
                          const updated = [...formData.features];
                          const temp = updated[idx];
                          updated[idx] = updated[idx - 1];
                          updated[idx - 1] = temp;
                          handleChange({ ...formData, features: updated });
                        }}
                        className="p-1 text-on-surface-variant hover:text-primary disabled:opacity-20"
                        title="Move Up"
                      >
                        <MaterialIcon name="arrow_upward" className="text-xs" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === formData.features.length - 1}
                        onClick={() => {
                          const updated = [...formData.features];
                          const temp = updated[idx];
                          updated[idx] = updated[idx + 1];
                          updated[idx + 1] = temp;
                          handleChange({ ...formData, features: updated });
                        }}
                        className="p-1 text-on-surface-variant hover:text-primary disabled:opacity-20"
                        title="Move Down"
                      >
                        <MaterialIcon name="arrow_downward" className="text-xs" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = formData.features.filter(
                            (_: any, i: number) => i !== idx
                          );
                          handleChange({ ...formData, features: updated });
                        }}
                        className="p-1 text-red-500 hover:text-red-700"
                        title="Delete Feature"
                      >
                        <MaterialIcon name="delete" className="text-xs" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FEATURED ROOMS SECTION FORM */}
        {pageSlug === "home" && activeEditSection === "featuredRooms" && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Section Heading
              </label>
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) =>
                  handleChange({ ...formData, title: e.target.value })
                }
                className="w-full text-sm px-3 py-2 rounded-lg border border-surface-variant bg-surface"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                  View All Link Text
                </label>
                <input
                  type="text"
                  value={formData.viewAllText || ""}
                  onChange={(e) =>
                    handleChange({ ...formData, viewAllText: e.target.value })
                  }
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                  View All Link Href
                </label>
                <input
                  type="text"
                  value={formData.viewAllHref || ""}
                  onChange={(e) =>
                    handleChange({ ...formData, viewAllHref: e.target.value })
                  }
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                />
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-primary uppercase tracking-wider">
                  Rooms Cards ({formData.rooms?.length || 0})
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const newId = `room-${Date.now()}`;
                    const updated = [
                      ...(formData.rooms || []),
                      {
                        id: newId,
                        title: "Deluxe Suite",
                        description: "A sanctuary of comfort with premium amenities.",
                        imageSrc: "/images/standard_room_1784569189614.png",
                        imageAlt: "Deluxe Suite",
                        linkText: "Explore Room",
                        linkHref: "/rooms",
                        amenities: ["King Bed", "High Speed WiFi", "Rain Shower"],
                      },
                    ];
                    handleChange({ ...formData, rooms: updated });
                  }}
                  className="px-2.5 py-1 rounded-md bg-[#dcae5d] text-primary text-xs font-bold hover:brightness-105 transition-all flex items-center gap-1"
                >
                  <MaterialIcon name="add" className="text-sm" />
                  <span>Add Room</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.rooms?.map((room: any, idx: number) => (
                  <div
                    key={room.id || idx}
                    className="p-4 bg-surface-container-low border border-surface-variant rounded-xl space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-surface-variant/60 pb-2">
                      <span className="text-xs font-bold text-primary">
                        Room #{idx + 1}: {room.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = formData.rooms.filter(
                            (_: any, i: number) => i !== idx
                          );
                          handleChange({ ...formData, rooms: updated });
                        }}
                        className="text-xs text-red-500 hover:text-red-700 flex items-center gap-0.5"
                      >
                        <MaterialIcon name="delete" className="text-xs" />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div>
                      <label className="text-[11px] text-on-surface-variant block mb-1">
                        Room Title
                      </label>
                      <input
                        type="text"
                        value={room.title || ""}
                        onChange={(e) => {
                          const updated = [...formData.rooms];
                          updated[idx].title = e.target.value;
                          handleChange({ ...formData, rooms: updated });
                        }}
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-on-surface-variant block mb-1">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={room.description || ""}
                        onChange={(e) => {
                          const updated = [...formData.rooms];
                          updated[idx].description = e.target.value;
                          handleChange({ ...formData, rooms: updated });
                        }}
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                      />
                    </div>

                    <ImageUploader
                      label="Room Photo"
                      url={room.imageSrc || ""}
                      alt={room.imageAlt || room.title}
                      onUrlChange={(url) => {
                        const updated = [...formData.rooms];
                        updated[idx].imageSrc = url;
                        handleChange({ ...formData, rooms: updated });
                      }}
                      onAltChange={(alt) => {
                        const updated = [...formData.rooms];
                        updated[idx].imageAlt = alt;
                        handleChange({ ...formData, rooms: updated });
                      }}
                    />

                    <div>
                      <label className="text-[11px] text-on-surface-variant block mb-1">
                        Amenities (comma separated)
                      </label>
                      <input
                        type="text"
                        value={room.amenities?.join(", ") || ""}
                        onChange={(e) => {
                          const updated = [...formData.rooms];
                          updated[idx].amenities = e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean);
                          handleChange({ ...formData, rooms: updated });
                        }}
                        placeholder="King Bed, High Speed WiFi, Smart TV"
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-on-surface-variant block mb-1">
                          Button Text
                        </label>
                        <input
                          type="text"
                          value={room.linkText || ""}
                          onChange={(e) => {
                            const updated = [...formData.rooms];
                            updated[idx].linkText = e.target.value;
                            handleChange({ ...formData, rooms: updated });
                          }}
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-on-surface-variant block mb-1">
                          Button Link URL
                        </label>
                        <input
                          type="text"
                          value={room.linkHref || ""}
                          onChange={(e) => {
                            const updated = [...formData.rooms];
                            updated[idx].linkHref = e.target.value;
                            handleChange({ ...formData, rooms: updated });
                          }}
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DINING SECTION FORM */}
        {pageSlug === "home" && activeEditSection === "dining" && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Section Heading
              </label>
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) =>
                  handleChange({ ...formData, title: e.target.value })
                }
                className="w-full text-sm px-3 py-2 rounded-lg border border-surface-variant bg-surface"
              />
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-primary uppercase tracking-wider">
                  Dining Cards ({formData.items?.length || 0})
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const newId = `dining-${Date.now()}`;
                    const updated = [
                      ...(formData.items || []),
                      {
                        id: newId,
                        type: "standard",
                        title: "New Dining Venue",
                        description: "Exquisite culinary experience.",
                        imageSrc: "/images/restaurant_pavilion_1784569251819.png",
                        linkText: "Explore",
                        linkHref: "/dining",
                      },
                    ];
                    handleChange({ ...formData, items: updated });
                  }}
                  className="px-2.5 py-1 rounded-md bg-[#dcae5d] text-primary text-xs font-bold hover:brightness-105 transition-all flex items-center gap-1"
                >
                  <MaterialIcon name="add" className="text-sm" />
                  <span>Add Venue</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.items?.map((item: any, idx: number) => (
                  <div
                    key={item.id || idx}
                    className="p-4 bg-surface-container-low border border-surface-variant rounded-xl space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-surface-variant/60 pb-2">
                      <span className="text-xs font-bold text-primary">
                        Venue #{idx + 1}: {item.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = formData.items.filter(
                            (_: any, i: number) => i !== idx
                          );
                          handleChange({ ...formData, items: updated });
                        }}
                        className="text-xs text-red-500 hover:text-red-700 flex items-center gap-0.5"
                      >
                        <MaterialIcon name="delete" className="text-xs" />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-on-surface-variant block mb-1">
                          Card Style Type
                        </label>
                        <select
                          value={item.type || "standard"}
                          onChange={(e) => {
                            const updated = [...formData.items];
                            updated[idx].type = e.target.value;
                            handleChange({ ...formData, items: updated });
                          }}
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                        >
                          <option value="standard">Standard (Photo Card)</option>
                          <option value="featured">Featured (Icon &amp; Border)</option>
                        </select>
                      </div>

                      {item.type === "featured" ? (
                        <div>
                          <label className="text-[11px] text-on-surface-variant block mb-1">
                            Icon Name
                          </label>
                          <input
                            type="text"
                            value={item.icon || "wine_bar"}
                            onChange={(e) => {
                              const updated = [...formData.items];
                              updated[idx].icon = e.target.value;
                              handleChange({ ...formData, items: updated });
                            }}
                            className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                          />
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <label className="text-[11px] text-on-surface-variant block mb-1">
                        Venue Title
                      </label>
                      <input
                        type="text"
                        value={item.title || ""}
                        onChange={(e) => {
                          const updated = [...formData.items];
                          updated[idx].title = e.target.value;
                          handleChange({ ...formData, items: updated });
                        }}
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-on-surface-variant block mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={item.description || ""}
                        onChange={(e) => {
                          const updated = [...formData.items];
                          updated[idx].description = e.target.value;
                          handleChange({ ...formData, items: updated });
                        }}
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                      />
                    </div>

                    {item.type !== "featured" && (
                      <ImageUploader
                        label="Venue Image"
                        url={item.imageSrc || ""}
                        alt={item.imageAlt || item.title}
                        onUrlChange={(url) => {
                          const updated = [...formData.items];
                          updated[idx].imageSrc = url;
                          handleChange({ ...formData, items: updated });
                        }}
                        onAltChange={(alt) => {
                          const updated = [...formData.items];
                          updated[idx].imageAlt = alt;
                          handleChange({ ...formData, items: updated });
                        }}
                      />
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-on-surface-variant block mb-1">
                          Button Text
                        </label>
                        <input
                          type="text"
                          value={item.linkText || ""}
                          onChange={(e) => {
                            const updated = [...formData.items];
                            updated[idx].linkText = e.target.value;
                            handleChange({ ...formData, items: updated });
                          }}
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-on-surface-variant block mb-1">
                          Button Link URL
                        </label>
                        <input
                          type="text"
                          value={item.linkHref || ""}
                          onChange={(e) => {
                            const updated = [...formData.items];
                            updated[idx].linkHref = e.target.value;
                            handleChange({ ...formData, items: updated });
                          }}
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MEETINGS SECTION FORM */}
        {pageSlug === "home" && activeEditSection === "meetings" && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Section Heading
              </label>
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) =>
                  handleChange({ ...formData, title: e.target.value })
                }
                className="w-full text-sm px-3 py-2 rounded-lg border border-surface-variant bg-surface"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Section Subtitle
              </label>
              <textarea
                rows={2}
                value={formData.subtitle || ""}
                onChange={(e) =>
                  handleChange({ ...formData, subtitle: e.target.value })
                }
                className="w-full text-sm px-3 py-2 rounded-lg border border-surface-variant bg-surface"
              />
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold text-primary uppercase tracking-wider">
                  Event Spaces ({formData.cards?.length || 0})
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const newId = `meeting-${Date.now()}`;
                    const updated = [
                      ...(formData.cards || []),
                      {
                        id: newId,
                        title: "Conference Hall",
                        description: "State-of-the-art audiovisual corporate suite.",
                        imageSrc: "/images/hero_hotel_1784569172973.png",
                        linkText: "Details",
                        linkHref: "/meetings",
                      },
                    ];
                    handleChange({ ...formData, cards: updated });
                  }}
                  className="px-2.5 py-1 rounded-md bg-[#dcae5d] text-primary text-xs font-bold hover:brightness-105 transition-all flex items-center gap-1"
                >
                  <MaterialIcon name="add" className="text-sm" />
                  <span>Add Space</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.cards?.map((card: any, idx: number) => (
                  <div
                    key={card.id || idx}
                    className="p-4 bg-surface-container-low border border-surface-variant rounded-xl space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-surface-variant/60 pb-2">
                      <span className="text-xs font-bold text-primary">
                        Space #{idx + 1}: {card.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          const updated = formData.cards.filter(
                            (_: any, i: number) => i !== idx
                          );
                          handleChange({ ...formData, cards: updated });
                        }}
                        className="text-xs text-red-500 hover:text-red-700 flex items-center gap-0.5"
                      >
                        <MaterialIcon name="delete" className="text-xs" />
                        <span>Delete</span>
                      </button>
                    </div>

                    <div>
                      <label className="text-[11px] text-on-surface-variant block mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={card.title || ""}
                        onChange={(e) => {
                          const updated = [...formData.cards];
                          updated[idx].title = e.target.value;
                          handleChange({ ...formData, cards: updated });
                        }}
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] text-on-surface-variant block mb-1">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={card.description || ""}
                        onChange={(e) => {
                          const updated = [...formData.cards];
                          updated[idx].description = e.target.value;
                          handleChange({ ...formData, cards: updated });
                        }}
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                      />
                    </div>

                    <ImageUploader
                      label="Event Space Image"
                      url={card.imageSrc || ""}
                      alt={card.imageAlt || card.title}
                      onUrlChange={(url) => {
                        const updated = [...formData.cards];
                        updated[idx].imageSrc = url;
                        handleChange({ ...formData, cards: updated });
                      }}
                      onAltChange={(alt) => {
                        const updated = [...formData.cards];
                        updated[idx].imageAlt = alt;
                        handleChange({ ...formData, cards: updated });
                      }}
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-on-surface-variant block mb-1">
                          Button Text
                        </label>
                        <input
                          type="text"
                          value={card.linkText || ""}
                          onChange={(e) => {
                            const updated = [...formData.cards];
                            updated[idx].linkText = e.target.value;
                            handleChange({ ...formData, cards: updated });
                          }}
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-on-surface-variant block mb-1">
                          Button Link URL
                        </label>
                        <input
                          type="text"
                          value={card.linkHref || ""}
                          onChange={(e) => {
                            const updated = [...formData.cards];
                            updated[idx].linkHref = e.target.value;
                            handleChange({ ...formData, cards: updated });
                          }}
                          className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AMENITIES SECTION FORM */}
        {pageSlug === "home" && activeEditSection === "amenities" && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Section Heading
              </label>
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) =>
                  handleChange({ ...formData, title: e.target.value })
                }
                className="w-full text-sm px-3 py-2 rounded-lg border border-surface-variant bg-surface"
              />
            </div>

            <div className="pt-2">
              <label className="text-xs font-bold text-primary uppercase tracking-wider block mb-2">
                Amenities Selection (Leave empty to display all 33)
              </label>
              <p className="text-xs text-on-surface-variant mb-3">
                Check specific amenities to display a custom subset, or select none to display all amenities.
              </p>
              <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto p-2 border border-surface-variant rounded-xl bg-surface-container-low">
                {[
                  "Restaurant", "Bar", "Free WiFi", "Valet Parking", "Parking Space",
                  "Concierge", "Laundry", "24 Hour Service", "Room Service", "Meeting Rooms",
                  "Conference Room", "Banquet Hall", "Doctor On Call", "Wake Up Call",
                  "Daily Housekeeping", "Turndown Service", "CCTV Security", "Express Check In",
                  "Rooftop Restaurant & Bar", "Travel Desk", "Ironing Service", "Photocopying",
                  "Smoking & Non Smoking", "Mini Bar", "In Room Dining", "Security Guard",
                  "First Aid", "Fire Safety", "Elevator", "Smoking Area", "Newsstand",
                  "Board Games", "Key Card Access",
                ].map((name) => {
                  const isChecked = formData.selectedAmenities?.includes(name);
                  return (
                    <label
                      key={name}
                      className="flex items-center gap-2 p-1.5 rounded hover:bg-surface-variant/50 text-xs cursor-pointer select-none"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          const current = formData.selectedAmenities || [];
                          const updated = e.target.checked
                            ? [...current, name]
                            : current.filter((item: string) => item !== name);
                          handleChange({
                            ...formData,
                            selectedAmenities: updated,
                          });
                        }}
                        className="rounded text-primary focus:ring-0"
                      />
                      <span>{name}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* PROMOTIONAL BANNER SECTION FORM */}
        {pageSlug === "home" && activeEditSection === "promotionalBanner" && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Main Headline
              </label>
              <input
                type="text"
                value={formData.title || ""}
                onChange={(e) =>
                  handleChange({ ...formData, title: e.target.value })
                }
                className="w-full text-sm px-3 py-2 rounded-lg border border-surface-variant bg-surface"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Description Text
              </label>
              <textarea
                rows={3}
                value={formData.description || ""}
                onChange={(e) =>
                  handleChange({ ...formData, description: e.target.value })
                }
                className="w-full text-sm px-3 py-2 rounded-lg border border-surface-variant bg-surface"
              />
            </div>

            <ImageUploader
              label="Banner Background Image"
              url={formData.backgroundImage?.url || ""}
              alt={formData.backgroundImage?.alt || ""}
              onUrlChange={(url) =>
                handleChange({
                  ...formData,
                  backgroundImage: { ...formData.backgroundImage, url },
                })
              }
              onAltChange={(alt) =>
                handleChange({
                  ...formData,
                  backgroundImage: { ...formData.backgroundImage, alt },
                })
              }
            />

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={formData.cta?.label || ""}
                  onChange={(e) =>
                    handleChange({
                      ...formData,
                      cta: { ...formData.cta, label: e.target.value },
                    })
                  }
                  className="w-full text-sm px-3 py-2 rounded-lg border border-surface-variant bg-surface"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                  CTA Button Link
                </label>
                <input
                  type="text"
                  value={formData.cta?.href || ""}
                  onChange={(e) =>
                    handleChange({
                      ...formData,
                      cta: { ...formData.cta, href: e.target.value },
                    })
                  }
                  className="w-full text-sm px-3 py-2 rounded-lg border border-surface-variant bg-surface"
                />
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS / FOOTER / HEADER FORM */}
        {activeEditSection === "settings" && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Hotel Brand Name
              </label>
              <input
                type="text"
                value={formData.brandName || ""}
                onChange={(e) =>
                  handleChange({ ...formData, brandName: e.target.value })
                }
                className="w-full text-sm px-3 py-2 rounded-lg border border-surface-variant bg-surface"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Brand Tagline
              </label>
              <input
                type="text"
                value={formData.tagline || ""}
                onChange={(e) =>
                  handleChange({ ...formData, tagline: e.target.value })
                }
                className="w-full text-sm px-3 py-2 rounded-lg border border-surface-variant bg-surface"
              />
            </div>

            <div className="p-3 bg-surface-container-low border border-surface-variant rounded-xl space-y-3">
              <label className="text-xs font-bold text-primary uppercase tracking-wider block">
                Contact &amp; Reservations
              </label>

              <div>
                <label className="text-[11px] text-on-surface-variant block mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formData.contact?.phone || ""}
                  onChange={(e) =>
                    handleChange({
                      ...formData,
                      contact: { ...formData.contact, phone: e.target.value },
                    })
                  }
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                />
              </div>

              <div>
                <label className="text-[11px] text-on-surface-variant block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.contact?.email || ""}
                  onChange={(e) =>
                    handleChange({
                      ...formData,
                      contact: { ...formData.contact, email: e.target.value },
                    })
                  }
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                />
              </div>

              <div>
                <label className="text-[11px] text-on-surface-variant block mb-1">
                  Physical Address
                </label>
                <textarea
                  rows={2}
                  value={formData.contact?.address || ""}
                  onChange={(e) =>
                    handleChange({
                      ...formData,
                      contact: { ...formData.contact, address: e.target.value },
                    })
                  }
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                />
              </div>

              <div>
                <label className="text-[11px] text-on-surface-variant block mb-1">
                  Google Maps URL
                </label>
                <input
                  type="text"
                  value={formData.contact?.googleMapsUrl || ""}
                  onChange={(e) =>
                    handleChange({
                      ...formData,
                      contact: {
                        ...formData.contact,
                        googleMapsUrl: e.target.value,
                      },
                    })
                  }
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                />
              </div>

              <div>
                <label className="text-[11px] text-on-surface-variant block mb-1">
                  Direct Booking Engine URL
                </label>
                <input
                  type="text"
                  value={formData.contact?.bookingUrl || ""}
                  onChange={(e) =>
                    handleChange({
                      ...formData,
                      contact: {
                        ...formData.contact,
                        bookingUrl: e.target.value,
                      },
                    })
                  }
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                />
              </div>

              <div>
                <label className="text-[11px] text-on-surface-variant block mb-1">
                  Booking Button Text
                </label>
                <input
                  type="text"
                  value={formData.contact?.bookingButtonText || ""}
                  onChange={(e) =>
                    handleChange({
                      ...formData,
                      contact: {
                        ...formData.contact,
                        bookingButtonText: e.target.value,
                      },
                    })
                  }
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                />
              </div>
            </div>

            <div className="p-3 bg-surface-container-low border border-surface-variant rounded-xl space-y-3">
              <label className="text-xs font-bold text-primary uppercase tracking-wider block">
                Footer Content
              </label>

              <div>
                <label className="text-[11px] text-on-surface-variant block mb-1">
                  Footer About Description
                </label>
                <textarea
                  rows={3}
                  value={formData.footer?.aboutText || ""}
                  onChange={(e) =>
                    handleChange({
                      ...formData,
                      footer: {
                        ...formData.footer,
                        aboutText: e.target.value,
                      },
                    })
                  }
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                />
              </div>

              <div>
                <label className="text-[11px] text-on-surface-variant block mb-1">
                  Copyright Text
                </label>
                <input
                  type="text"
                  value={formData.footer?.copyrightText || ""}
                  onChange={(e) =>
                    handleChange({
                      ...formData,
                      footer: {
                        ...formData.footer,
                        copyrightText: e.target.value,
                      },
                    })
                  }
                  className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-surface-variant bg-surface"
                />
              </div>
            </div>
          </div>
        )}
      </fieldset>
    </div>
    </>
  );
}
