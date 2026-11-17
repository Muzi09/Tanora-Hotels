"use client";
import React from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";
import { useAdmin } from "@/context/AdminContext";

export default function ToastNotification() {
  const { toast, hideToast } = useAdmin();

  if (!toast) return null;

  const getColors = () => {
    switch (toast.type) {
      case "error":
        return "bg-red-900/95 text-white border-red-500/50";
      case "info":
        return "bg-slate-900/95 text-white border-slate-500/50";
      case "success":
      default:
        return "bg-[#121820]/95 text-white border-[#dcae5d]/60";
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case "error":
        return "error";
      case "info":
        return "info";
      case "success":
      default:
        return "check_circle";
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-bottom duration-300">
      <div
        className={`px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md flex items-center gap-3 max-w-md ${getColors()}`}
      >
        <MaterialIcon
          name={getIcon()}
          className={`text-xl ${
            toast.type === "success"
              ? "text-[#dcae5d]"
              : toast.type === "error"
              ? "text-red-400"
              : "text-blue-400"
          }`}
        />
        <p className="text-xs font-medium tracking-wide flex-1">
          {toast.message}
        </p>
        <button
          onClick={hideToast}
          className="text-white/60 hover:text-white p-1"
        >
          <MaterialIcon name="close" className="text-sm" />
        </button>
      </div>
    </div>
  );
}
