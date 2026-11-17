"use client";
import React from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { useAdmin } from "@/context/AdminContext";

interface SectionEditWrapperProps {
  sectionKey: string;
  sectionTitle: string;
  children: React.ReactNode;
  className?: string;
  isAdmin?: boolean;
}

export default function SectionEditWrapper({
  sectionKey,
  sectionTitle,
  children,
  className = "",
  isAdmin: propIsAdmin,
}: SectionEditWrapperProps) {
  const { isAdmin: contextIsAdmin, openEditor, homeData } = useAdmin();
  const isAdmin = propIsAdmin !== undefined ? propIsAdmin : contextIsAdmin;

  if (!isAdmin) {
    return <div className={className}>{children}</div>;
  }

  // Check if this section has pending draft changes
  const sectionMeta = (homeData as any)?.[sectionKey];
  const isModified = sectionMeta?.isDraftModified;

  return (
    <div className={`relative group/cms-section ${className}`}>
      {/* Admin Section Control Badge in Top-Left Corner */}
      <div className="admin-ui absolute top-4 left-4 z-40 flex items-center gap-2 pointer-events-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            openEditor(sectionKey);
          }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/95 text-white border border-[#dcae5d]/60 shadow-xl hover:bg-[#dcae5d] hover:text-primary transition-all duration-300 text-xs font-semibold tracking-wide backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95 group/btn"
          title={`Edit ${sectionTitle}`}
          aria-label={`Edit ${sectionTitle}`}
        >
          <MaterialIcon name="edit" className="text-sm text-[#dcae5d] group-hover/btn:text-primary transition-colors" />
          <span className="opacity-90 group-hover/btn:opacity-100">
            Edit {sectionTitle}
          </span>
          {isModified && (
            <span
              className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse"
              title="Has unpublished draft changes"
            />
          )}
        </button>
      </div>

      {/* Visual outline on hover in admin mode */}
      <div className="pointer-events-none absolute inset-0 border border-transparent group-hover/cms-section:border-[#dcae5d]/40 transition-colors duration-300 rounded-lg z-30" />

      {children}
    </div>
  );
}
