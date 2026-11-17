"use client";
import React from "react";
import Link from "next/link";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { useAdmin } from "@/context/AdminContext";

export default function AdminTopBar() {
  const {
    adminUser,
    pageSlug,
    hasUnsavedDrafts,
    publishAll,
    discardAll,
    isPublishing,
    isSaving,
    dirtySections,
    logout,
  } = useAdmin();

  return (
    <div className="admin-ui fixed top-0 left-0 right-0 z-[80] h-12 bg-[#121820]/95 backdrop-blur-md text-white border-b border-[#dcae5d]/30 px-4 md:px-8 flex items-center justify-between shadow-lg text-sm select-none">
      {/* Left: Branding & CMS Mode Badge */}
      <div className="flex items-center gap-3">
        <span className="font-display-lg font-bold tracking-widest text-[#dcae5d] text-base">
          TANORA CMS
        </span>
        <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/30" />
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Live Editor</span>
        </div>

        {hasUnsavedDrafts ? (
          <div className="hidden md:flex items-center gap-1.5 text-xs text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Unpublished Drafts</span>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-1.5 text-xs text-white/50">
            <MaterialIcon name="check" className="text-xs text-emerald-400" />
            <span>All Published</span>
          </div>
        )}
      </div>

      {/* Right: Actions, Live Site, User & Logout */}
      <div className="flex items-center gap-2 sm:gap-4">
        {(
          <>
            <button
              disabled={isSaving || isPublishing}
              onClick={() => discardAll()}
              className="text-xs text-white/70 hover:text-white px-2.5 py-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
              title="Discard all pending drafts and revert to published version"
            >
              Discard Drafts
            </button>
            <button
              onClick={() => publishAll()}
              disabled={isPublishing || isSaving || !hasUnsavedDrafts || dirtySections.length > 0}
              className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#dcae5d] to-[#c99f52] text-primary font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              <MaterialIcon name="cloud_upload" className="text-sm" />
              <span>{isPublishing ? "Publishing..." : "Publish Page"}</span>
            </button>
          </>
        )}

        <Link
          href={pageSlug === "home" ? "/" : `/${pageSlug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1 text-xs text-white/80 hover:text-[#dcae5d] transition-colors px-2 py-1 rounded hover:bg-white/5"
          title="Open the public website in a new tab"
        >
          <span>View Live Site</span>
          <MaterialIcon name="open_in_new" className="text-xs" />
        </Link>

        {adminUser && (
          <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-white/15 text-xs text-white/80">
            <MaterialIcon name="account_circle" className="text-base text-[#dcae5d]" />
            <span className="font-medium">{adminUser.name}</span>
          </div>
        )}

        <button
          onClick={() => logout()}
          className="flex items-center gap-1 text-xs text-white/70 hover:text-red-300 px-2 py-1 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
          title="Sign out of CMS"
        >
          <MaterialIcon name="logout" className="text-sm" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
}
