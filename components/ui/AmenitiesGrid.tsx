import React from "react";

interface Amenity {
  name: string;
  icon: string;
}

const allAmenities: Amenity[] = [
  { name: "Restaurant", icon: "restaurant" },
  { name: "Bar", icon: "local_bar" },
  { name: "Free WiFi", icon: "wifi" },
  { name: "Valet Parking", icon: "valet" },
  { name: "Parking Space", icon: "local_parking" },
  { name: "Concierge", icon: "concierge" },
  { name: "Laundry", icon: "local_laundry_service" },
  { name: "24 Hour Service", icon: "24mp" },
  { name: "Room Service", icon: "room_service" },
  { name: "Meeting Rooms", icon: "meeting_room" },
  { name: "Conference Room", icon: "video_camera_front" },
  { name: "Banquet Hall", icon: "celebration" },
  { name: "Doctor On Call", icon: "medical_services" },
  { name: "Wake Up Call", icon: "alarm" },
  { name: "Daily Housekeeping", icon: "cleaning_services" },
  { name: "Turndown Service", icon: "bed" },
  { name: "CCTV Security", icon: "videocam" },
  { name: "Express Check In", icon: "how_to_reg" },
  { name: "Rooftop Restaurant & Bar", icon: "deck" },
  { name: "Travel Desk", icon: "flight_takeoff" },
  { name: "Ironing Service", icon: "iron" },
  { name: "Photocopying", icon: "print" },
  { name: "Smoking & Non Smoking", icon: "smoking_rooms" },
  { name: "Mini Bar", icon: "kitchen" },
  { name: "In Room Dining", icon: "dining" },
  { name: "Security Guard", icon: "security" },
  { name: "First Aid", icon: "healing" },
  { name: "Fire Safety", icon: "fire_extinguisher" },
  { name: "Elevator", icon: "elevator" },
  { name: "Smoking Area", icon: "smoking_rooms" },
  { name: "Newsstand", icon: "menu_book" },
  { name: "Board Games", icon: "casino" },
  { name: "Key Card Access", icon: "key" },
];

interface AmenitiesGridProps {
  selected?: string[]; // Array of names if we only want a subset. If undefined, show all.
}

export default function AmenitiesGrid({ selected }: AmenitiesGridProps) {
  const displayAmenities = selected
    ? allAmenities.filter((a) => selected.includes(a.name))
    : allAmenities;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {displayAmenities.map((amenity, index) => (
        <div
          key={index}
          className="flex items-center gap-3 p-4 bg-surface rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-surface-variant"
        >
          <span className="material-symbols-outlined text-primary text-3xl">
            {amenity.icon}
          </span>
          <span className="font-medium text-on-surface text-sm md:text-base">
            {amenity.name}
          </span>
        </div>
      ))}
    </div>
  );
}
