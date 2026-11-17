"use client";

import React, { useState } from "react";
import MaterialIcon from "@/components/ui/MaterialIcon";

export default function BookingForm() {
  const [isDayUse, setIsDayUse] = useState(false);
  const [isGuestPopoverOpen, setIsGuestPopoverOpen] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(1);

  return (
    <div className="w-full max-w-[1200px] mx-auto px-2 sm:px-4">
      {/* Top Toggle */}
      <div className="flex items-center gap-3 mb-4 text-white">
        <span className="text-sm font-semibold tracking-wide">Overnight</span>
        <button
          onClick={() => setIsDayUse(!isDayUse)}
          className="relative inline-flex h-6 w-11 items-center rounded-full bg-white transition-colors focus:outline-none"
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-[#dcae5d] transition-transform ${
              isDayUse ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
        <span className="text-sm font-semibold tracking-wide">Day Use</span>
      </div>

      <div className="flex flex-col gap-4">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Place */}
          <div className="flex-1 md:flex-[0.35] flex flex-col">
            <label className="text-white text-xs font-semibold mb-1.5 tracking-wide">Place</label>
            <div className="relative h-12 bg-white">
              <MaterialIcon name="location_on" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl" />
              <select className="w-full h-full pl-10 pr-10 bg-transparent text-on-surface appearance-none outline-none cursor-pointer text-sm font-medium">
                <option>Indore</option>
              </select>
              <MaterialIcon name="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl pointer-events-none" />
            </div>
          </div>
          {/* Hotel */}
          <div className="flex-1 md:flex-[0.65] flex flex-col">
            <label className="text-white text-xs font-semibold mb-1.5 tracking-wide">Hotel</label>
            <div className="relative h-12 bg-white border-2 border-[#dcae5d]">
              <MaterialIcon name="domain" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl" />
              <select className="w-full h-full pl-10 pr-10 bg-transparent text-on-surface appearance-none outline-none cursor-pointer text-sm font-medium">
                <option>Tanora Hotel, Vijay Nagar, Indore</option>
                <option>Auren, Indore</option>
              </select>
              <MaterialIcon name="expand_more" className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Check In */}
          <div className="flex flex-col">
            <label className="text-white text-xs font-semibold mb-1.5 tracking-wide">Check In</label>
            <div className="relative h-12 bg-white">
              <MaterialIcon name="calendar_today" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg" />
              <input 
                type="date" 
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full h-full pl-10 pr-3 bg-transparent text-on-surface text-sm font-medium outline-none cursor-pointer" 
              />
            </div>
          </div>
          {/* Check Out */}
          <div className="flex flex-col">
            <label className="text-white text-xs font-semibold mb-1.5 tracking-wide">Check Out</label>
            <div className="relative h-12 bg-white">
              <MaterialIcon name="calendar_today" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg" />
              <input 
                type="date" 
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full h-full pl-10 pr-3 bg-transparent text-on-surface text-sm font-medium outline-none cursor-pointer" 
              />
            </div>
          </div>
          {/* Rooms & Guests */}
          <div className="flex flex-col">
            <label className="text-white text-xs font-semibold mb-1.5 tracking-wide">Rooms & Guests</label>
            <div className="relative h-12 bg-white">
              <MaterialIcon name="person" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg pointer-events-none" />
              <button 
                type="button"
                className="w-full h-full pl-10 pr-3 bg-transparent text-on-surface text-sm font-medium outline-none cursor-pointer flex items-center justify-between"
                onClick={() => setIsGuestPopoverOpen(!isGuestPopoverOpen)}
              >
                <span>{rooms} Room{rooms > 1 ? 's' : ''}, {guests} Guest{guests > 1 ? 's' : ''}</span>
                <MaterialIcon name="expand_more" className="text-on-surface-variant text-lg pointer-events-none" />
              </button>
              
              {/* Dropdown Popover */}
              {isGuestPopoverOpen && (
                <div className="absolute top-full left-0 mt-2 w-full min-w-[240px] bg-white rounded-xl shadow-2xl border border-surface-variant p-4 z-50 animate-fade-in-up">
                  {/* Rooms Selector */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-on-surface font-semibold text-sm">Rooms</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setRooms(Math.max(1, rooms - 1));
                        }}
                        className="w-8 h-8 rounded-full border border-surface-variant flex items-center justify-center text-on-surface-variant hover:border-secondary hover:text-secondary transition-colors"
                      >
                        <MaterialIcon name="remove" className="text-sm" />
                      </button>
                      <span className="text-on-surface font-semibold w-4 text-center">{rooms}</span>
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setRooms(Math.min(10, rooms + 1));
                        }}
                        className="w-8 h-8 rounded-full border border-surface-variant flex items-center justify-center text-on-surface-variant hover:border-secondary hover:text-secondary transition-colors"
                      >
                        <MaterialIcon name="add" className="text-sm" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Guests Selector */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="text-on-surface font-semibold text-sm">Guests</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setGuests(Math.max(1, guests - 1));
                        }}
                        className="w-8 h-8 rounded-full border border-surface-variant flex items-center justify-center text-on-surface-variant hover:border-secondary hover:text-secondary transition-colors"
                      >
                        <MaterialIcon name="remove" className="text-sm" />
                      </button>
                      <span className="text-on-surface font-semibold w-4 text-center">{guests}</span>
                      <button 
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setGuests(Math.min(20, guests + 1));
                        }}
                        className="w-8 h-8 rounded-full border border-surface-variant flex items-center justify-center text-on-surface-variant hover:border-secondary hover:text-secondary transition-colors"
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
                    className="w-full py-2 bg-primary text-white rounded-lg text-sm font-semibold uppercase tracking-wide hover:bg-secondary transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Promo Code */}
          <div className="flex flex-col">
            <label className="text-white text-xs font-semibold mb-1.5 tracking-wide">Promo Code</label>
            <div className="relative h-12 bg-white">
              <MaterialIcon name="percent" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg" />
              <input type="text" placeholder="Promo Code" className="w-full h-full pl-10 pr-3 bg-transparent text-on-surface text-sm font-medium outline-none placeholder:text-on-surface-variant" />
            </div>
          </div>
          {/* Book Now */}
          <div className="flex flex-col sm:col-span-2 lg:col-span-1">
            <div className="text-white text-[11px] font-semibold mb-1.5 tracking-wide whitespace-nowrap">From 3,399 INR/Night</div>
            <button 
              onClick={() => alert(`Booking functionality coming soon! \nCheckIn: ${checkIn}\nCheckOut: ${checkOut}\nRooms: ${rooms}\nGuests: ${guests}`)}
              className="h-12 w-full bg-[#dcae5d] text-white text-sm font-bold tracking-widest uppercase hover:bg-[#c99f52] transition-colors focus:outline-none"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
