"use client";
import React from "react";
import { usePageContent } from "@/lib/cms/pages";
import SectionEditWrapper from "@/components/section/SectionEditWrapper";
import Image from "next/image";
import Link from "@/components/cms/CmsLink";
import MaterialIcon from "@/components/ui/MaterialIcon";
export default function ContactPage() {
  const content = usePageContent("contact");
  return (
    <>
      <main className="pt-16">

        {/* HERO BANNER */}
        <SectionEditWrapper sectionKey="heroBanner" sectionTitle="Hero Banner">
          <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-center px-4">
            <Image
              src={content.heroBanner.image}
              alt={content.heroBanner.alt}
              fill
              className="object-cover parallax-bg"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 reveal">
              <h1 className="text-5xl md:text-6xl font-display-lg text-white mb-6">
                {content.heroBanner.heading}
              </h1>
              <div className="w-24 h-1 bg-secondary mx-auto"></div>
            </div>
          </section>
        </SectionEditWrapper>

        <SectionEditWrapper sectionKey="contactDetails" sectionTitle="Contact Details">
          <section className="py-24 bg-surface px-4">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 reveal">
  
              {/* CONTACT DETAILS & MAP */}
              <div>
                <h2 className="text-3xl md:text-4xl font-display-lg text-primary mb-8">
                  {content.contactDetails.heading}
              </h2>
  
                <div className="flex flex-col gap-8 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center flex-shrink-0">
                      <MaterialIcon name={content.contactDetails.icon} className="text-primary text-2xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">{content.contactDetails.heading2}
              </h4>
                      <p className="text-on-surface-variant">
                        {content.contactDetails.description}<br />
                        {content.contactDetails.description2}<br />
                        {content.contactDetails.description3}
              </p>
                      <Link
                        href={content.contactDetails.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:text-primary font-medium text-sm mt-2 inline-flex items-center gap-1 transition-colors"
                      >
                        <span>{content.contactDetails.text}</span>
                        <MaterialIcon name={content.contactDetails.icon2} className="text-xs" />
                      </Link>
                    </div>
                  </div>
  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center flex-shrink-0">
                      <MaterialIcon name={content.contactDetails.icon3} className="text-primary text-2xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">{content.contactDetails.heading3}
              </h4>
                      <Link href={content.contactDetails.link2} className="text-on-surface-variant hover:text-secondary text-lg transition-colors">
                        {content.contactDetails.buttonText}</Link>
                    </div>
                  </div>
  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center flex-shrink-0">
                      <MaterialIcon name={content.contactDetails.icon4} className="text-primary text-2xl" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">{content.contactDetails.heading4}
              </h4>
                      <Link href={content.contactDetails.link3} className="text-on-surface-variant hover:text-secondary transition-colors">
                        {content.contactDetails.buttonText2}</Link>
                    </div>
                  </div>
                </div>
  
                {/* GOOGLE MAP EMBED */}
                <div className="w-full h-80 md:h-96 bg-surface-variant rounded-2xl overflow-hidden relative border border-surface-variant/50 shadow-lg group">
                  <iframe
                    src={content.contactDetails.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={content.contactDetails.title}
                    className="w-full h-full rounded-2xl"
                  />
                  <div className="absolute top-4 right-4 z-10">
                    <Link
                      href={content.contactDetails.link4}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/90 hover:bg-white text-primary text-xs font-bold px-3 py-2 rounded-lg shadow-md backdrop-blur-sm flex items-center gap-1.5 transition-all hover:shadow-lg"
                    >
                      <MaterialIcon name={content.contactDetails.icon5} className="text-secondary text-sm" />
                      <span>{content.contactDetails.text2}</span>
                      <MaterialIcon name={content.contactDetails.icon6} className="text-[10px]" />
                    </Link>
                  </div>
                </div>
              </div>
  
              {/* CONTACT FORM */}
              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-surface-variant">
                <h2 className="text-3xl md:text-4xl font-display-lg text-primary mb-8">
                  {content.contactDetails.heading5}
              </h2>
                <form className="flex flex-col gap-6">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2 uppercase tracking-wide">{content.contactDetails.label}</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-surface-variant focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors bg-surface-container-lowest text-on-surface"
                      placeholder={content.contactDetails.placeholder}
                    />
                  </div>
  
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2 uppercase tracking-wide">{content.contactDetails.label2}</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border border-surface-variant focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors bg-surface-container-lowest text-on-surface"
                      placeholder={content.contactDetails.placeholder2}
                    />
                  </div>
  
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2 uppercase tracking-wide">{content.contactDetails.label3}</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg border border-surface-variant focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors bg-surface-container-lowest text-on-surface"
                      placeholder={content.contactDetails.placeholder3}
                    />
                  </div>
  
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2 uppercase tracking-wide">{content.contactDetails.label4}</label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-surface-variant focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors bg-surface-container-lowest text-on-surface resize-none"
                      placeholder={content.contactDetails.placeholder4}
                    ></textarea>
                  </div>
  
                  <button
                    type="button"
                    className="w-full mt-4 px-8 py-4 bg-primary text-white font-bold tracking-widest uppercase rounded-full hover:bg-secondary transition-colors duration-300 shadow-lg"
                  >
                    {content.contactDetails.buttonText3}</button>
                </form>
              </div>
  
            </div>
          </section>
        </SectionEditWrapper>

        {/* QUICK CTAs */}
        <SectionEditWrapper sectionKey="quickCtas" sectionTitle="Quick Ctas">
          <section className="py-16 bg-primary text-center px-4">
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row justify-center gap-6 reveal">
              <Link href={content.quickCtas.link} className="px-10 py-5 bg-white text-primary font-bold tracking-widest uppercase rounded-full hover:bg-secondary transition-colors duration-300 shadow-lg flex items-center justify-center gap-2">
                <MaterialIcon name={content.quickCtas.icon} /> {content.quickCtas.buttonText}</Link>
              <Link
                href={content.quickCtas.link2}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-secondary text-primary font-bold tracking-widest uppercase rounded-full hover:bg-white transition-colors duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <MaterialIcon name={content.quickCtas.icon2} /> {content.quickCtas.buttonText2}</Link>
            </div>
          </section>
        </SectionEditWrapper>

      </main>
    </>
  );
}
