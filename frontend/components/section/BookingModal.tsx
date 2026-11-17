"use client";

import React, { useState, useEffect } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [isDayUse, setIsDayUse] = useState(false);
  const [isGuestPopoverOpen, setIsGuestPopoverOpen] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);
  const [promoCode, setPromoCode] = useState("");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Booking Confirmed!\nType: ${isDayUse ? "Day Use" : "Overnight"}\nCheck-in: ${checkIn || "Not selected"
      }\nCheck-out: ${checkOut || "Not selected"}\nRooms: ${rooms}\nGuests: ${guests}${promoCode ? `\nPromo: ${promoCode}` : ""
      }`
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 animate-fade-in-up my-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#dcae5d]/10 flex items-center justify-center text-[#dcae5d]">
              <MaterialIcon name="hotel" className="text-xl" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display-lg font-bold tracking-wide">
                Book Your Stay
              </h2>
              <p className="text-xs text-gray-400">
                TANORA Hotel — Luxury Comfort Exceptional Hospitality
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-500 hover:transition-colors"
            aria-label="Close modal"
          >
            <MaterialIcon name="close" className="text-2xl" />
          </button>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleBookingSubmit} className="pb-8">
          {/* Top Toggle */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-semibold tracking-wide text-gray-500">
              Overnight
            </span>
            <button
              type="button"
              onClick={() => setIsDayUse(!isDayUse)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-[#dcae5d] transition-transform ${isDayUse ? "translate-x-6" : "translate-x-1"
                  }`}
              />
            </button>
            <span className="text-sm font-semibold tracking-wide text-gray-500">
              Day Use
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {/* Row 1: Place & Hotel */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Place */}
              <div className="flex-1 md:flex-[0.35] flex flex-col">
                <label className="text-xs font-semibold mb-1.5 tracking-wide text-gray-500">
                  Place
                </label>
                <div className="relative h-12 bg-white text-gray-800 rounded-lg border-2 border-[#dcae5d] rounded-lg">
                  <MaterialIcon
                    name="location_on"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl pointer-events-none"
                  />
                  <select className="w-full h-full pl-10 pr-10 bg-transparent text-gray-900 appearance-none outline-none cursor-pointer text-sm font-medium rounded-lg">
                    <option>Indore</option>
                  </select>
                  <MaterialIcon
                    name="expand_more"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl pointer-events-none"
                  />
                </div>
              </div>

              {/* Hotel */}
              <div className="flex-1 md:flex-[0.65] flex flex-col">
                <label className="text-xs font-semibold mb-1.5 tracking-wide text-gray-500">
                  Hotel
                </label>
                <div className="relative h-12 bg-white text-gray-800 rounded-lg border-2 border-[#dcae5d]">
                  <MaterialIcon
                    name="domain"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl pointer-events-none"
                  />
                  <select className="w-full h-full pl-10 pr-10 bg-transparent text-gray-900 appearance-none outline-none cursor-pointer text-sm font-medium rounded-lg">
                    <option>Tanora Hotel, Vijay Nagar, Indore</option>
                    <option>Auren, Indore</option>
                  </select>
                  <MaterialIcon
                    name="expand_more"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xl pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Dates, Guests, Promo Code & Submit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Check In */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1.5 tracking-wide text-gray-500">
                  Check In
                </label>
                <div className="relative h-12 bg-white text-gray-800 rounded-lg border-2 border-[#dcae5d]">
                  <MaterialIcon
                    name="calendar_today"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none"
                  />
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full h-full pl-10 pr-3 bg-transparent text-gray-900 text-sm font-medium outline-none cursor-pointer rounded-lg"
                  />
                </div>
              </div>

              {/* Check Out */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1.5 tracking-wide text-gray-500">
                  Check Out
                </label>
                <div className="relative h-12 bg-white text-gray-800 rounded-lg border-2 border-[#dcae5d]">
                  <MaterialIcon
                    name="calendar_today"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none"
                  />
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full h-full pl-10 pr-3 bg-transparent text-gray-900 text-sm font-medium outline-none cursor-pointer rounded-lg"
                  />
                </div>
              </div>

              {/* Rooms & Guests */}
              <div className="flex flex-col relative">
                <label className="text-xs font-semibold mb-1.5 tracking-wide text-gray-500">
                  Rooms & Guests
                </label>
                <div className="relative h-12 bg-white text-gray-800 rounded-lg border-2 border-[#dcae5d]">
                  <MaterialIcon
                    name="person"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none"
                  />
                  <button
                    type="button"
                    className="w-full h-full pl-10 pr-3 bg-transparent text-gray-900 text-sm font-medium outline-none cursor-pointer flex items-center justify-between rounded-lg"
                    onClick={() => setIsGuestPopoverOpen(!isGuestPopoverOpen)}
                  >
                    <span className="truncate">
                      {rooms} Room{rooms > 1 ? "s" : ""}, {guests} Guest
                      {guests > 1 ? "s" : ""}
                    </span>
                    <MaterialIcon
                      name="expand_more"
                      className="text-gray-500 text-lg pointer-events-none"
                    />
                  </button>

                  {/* Dropdown Popover */}
                  {isGuestPopoverOpen && (
                    <div className="absolute top-full left-0 mt-2 w-full min-w-[250px] bg-white text-gray-900 rounded-xl shadow-2xl border border-gray-200 p-4 z-[100] animate-fade-in-up">
                      {/* Rooms Selector */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold text-sm">Rooms</span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setRooms(Math.max(1, rooms - 1));
                            }}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-[#dcae5d] hover:text-[#dcae5d] transition-colors"
                          >
                            <MaterialIcon name="remove" className="text-sm" />
                          </button>
                          <span className="font-semibold w-4 text-center">
                            {rooms}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setRooms(Math.min(10, rooms + 1));
                            }}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-[#dcae5d] hover:text-[#dcae5d] transition-colors"
                          >
                            <MaterialIcon name="add" className="text-sm" />
                          </button>
                        </div>
                      </div>

                      {/* Guests Selector */}
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-semibold text-sm">Guests</span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setGuests(Math.max(1, guests - 1));
                            }}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-[#dcae5d] hover:text-[#dcae5d] transition-colors"
                          >
                            <MaterialIcon name="remove" className="text-sm" />
                          </button>
                          <span className="font-semibold w-4 text-center">
                            {guests}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setGuests(Math.min(20, guests + 1));
                            }}
                            className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-700 hover:border-[#dcae5d] hover:text-[#dcae5d] transition-colors"
                          >
                            <MaterialIcon name="add" className="text-sm" />
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setIsGuestPopoverOpen(false);
                        }}
                        className="w-full py-2 bg-primary rounded-lg text-sm font-semibold uppercase tracking-wide text-white hover:bg-[#dcae5d] transition-colors"
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Promo Code */}
              <div className="flex flex-col">
                <label className="text-xs font-semibold mb-1.5 tracking-wide text-gray-500">
                  Promo Code
                </label>
                <div className="relative h-12 bg-white text-gray-800 rounded-lg border-2 border-[#dcae5d]">
                  <MaterialIcon
                    name="percent"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg pointer-events-none"
                  />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo Code"
                    className="w-full h-full pl-10 pr-3 bg-transparent text-gray-900 text-sm font-medium outline-none placeholder:text-gray-400 rounded-lg"
                  />
                </div>
              </div>

              {/* Book Now Button */}
              <div className="flex flex-col sm:col-span-2 lg:col-span-1">
                <div className="text-xs font-semibold mb-1.5 tracking-wide text-[#dcae5d] whitespace-nowrap">
                  From 3,399 INR/Night
                </div>
                <button
                  type="submit"
                  className="h-12 w-full bg-[#dcae5d] text-sm font-bold tracking-widest uppercase rounded-lg hover:bg-[#c99f52] transition-colors focus:outline-none shadow-md"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
