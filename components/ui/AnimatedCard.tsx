import React from "react";
import Image from "next/image";
import Link from "next/link";

interface AnimatedCardProps {
  imageSrc: string;
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
  amenities?: string[];
}

export default function AnimatedCard({
  imageSrc,
  title,
  description,
  linkText,
  linkHref,
  amenities,
}: AnimatedCardProps) {
  return (
    <div className="group rounded-2xl overflow-hidden bg-surface shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-surface-variant reveal">
      <div className="relative h-64 sm:h-80 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-headline-md font-display-lg text-primary mb-3">
          {title}
        </h3>
        <p className="text-on-surface-variant font-body-md mb-6 flex-grow">
          {description}
        </p>

        {amenities && amenities.length > 0 && (
          <div className="mb-6">
            <h4 className="text-label-sm uppercase text-outline mb-2 tracking-widest">
              Amenities
            </h4>
            <div className="flex flex-wrap gap-2">
              {amenities.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-surface-container-high rounded-full text-xs font-medium text-on-surface"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {linkText && linkHref && (
          <div className="mt-auto pt-4 border-t border-surface-variant">
            <Link
              href={linkHref}
              className="inline-flex items-center text-primary font-medium hover:text-secondary transition-colors duration-300"
            >
              {linkText}
              <span className="material-symbols-outlined ml-2 text-xl transition-transform duration-300 group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
