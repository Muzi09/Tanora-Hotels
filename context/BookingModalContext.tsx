"use client";

import React, { createContext, useContext, useState } from "react";
import BookingModal from "@/components/section/BookingModal";

interface BookingModalContextType {
  isModalOpen: boolean;
  openBookingModal: () => void;
  closeBookingModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(
  undefined
);

export const BookingModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openBookingModal = () => setIsModalOpen(true);
  const closeBookingModal = () => setIsModalOpen(false);

  return (
    <BookingModalContext.Provider
      value={{ isModalOpen, openBookingModal, closeBookingModal }}
    >
      {children}
      <BookingModal isOpen={isModalOpen} onClose={closeBookingModal} />
    </BookingModalContext.Provider>
  );
};

export const useBookingModal = () => {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error("useBookingModal must be used within a BookingModalProvider");
  }
  return context;
};
