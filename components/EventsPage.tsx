"use client";

import React, { useEffect } from "react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import CTASection from "./CTASection";
import { Event } from "../types";
import Link from "next/link";
import { useTranslations } from "@/hooks/useTranslations";

interface EventsPageProps {
  events: Event[];
}

const EventsPage: React.FC<EventsPageProps> = ({ events }) => {
  const t = useTranslations("events");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Group events by year
  const groupedEvents = events.reduce(
    (acc, event) => {
      if (!acc[event.year]) {
        acc[event.year] = [];
      }
      acc[event.year].push(event);
      return acc;
    },
    {} as Record<string, Event[]>,
  );

  // Sort years descending
  const sortedYears = Object.keys(groupedEvents).sort(
    (a, b) => Number(b) - Number(a),
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#0B1B3B] text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <span className="text-[#D4C5A0] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">
            {t("hero.tags")}
          </span>
          <h1 className="text-5xl md:text-7xl font-light mb-8">
            {t("hero.title")}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Events List Grouped by Year */}
      <section className="py-24 px-6">
        <div className="max-w-[1400px] mx-auto space-y-24">
          {sortedYears.map((year) => (
            <div key={year} className="border-t border-[#0B1B3B]/10 pt-12">
              {/* Year Header */}
              <div className="flex items-center gap-6 mb-12">
                <h2 className="text-6xl md:text-7xl font-light text-[#0B1B3B]/10 font-serif">
                  {year}
                </h2>
                <div className="h-px bg-[#0B1B3B]/10 flex-grow"></div>
              </div>

              {/* 2-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                {groupedEvents[year].map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.id}`}
                    className="group cursor-pointer flex flex-col h-full"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[16/9] mb-8 overflow-hidden bg-[#F5F5F7] border border-[#0B1B3B]/5">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                      />
                      {/* Date Badge */}
                      <div className="absolute top-4 left-4 bg-[#0B1B3B] text-white px-4 py-2 flex flex-col items-center min-w-[60px]">
                        <span className="text-xs font-bold uppercase tracking-widest">
                          {event.date.split(" ")[0]}
                        </span>
                        <span className="text-xl font-serif italic text-[#D4C5A0]">
                          {event.date.split(" ")[1].replace(",", "")}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-3xl font-light text-[#0B1B3B] mb-4 group-hover:text-[#2E4472] transition-colors leading-tight">
                        {event.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-6 text-[#2E4472] text-sm font-light mb-6">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#D4C5A0]" />
                          <span>
                            {event.date} {event.time && `• ${event.time}`}
                          </span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#D4C5A0]" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-auto pt-6 border-t border-[#0B1B3B]/5">
                        <div className="inline-flex items-center gap-2 text-[#D4C5A0] text-sm font-bold uppercase tracking-widest group-hover:text-[#0B1B3B] transition-colors">
                          {t("details")} <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {sortedYears.length === 0 && (
            <div className="relative">
              {/* Decorative top hairline with diamond */}
              <div className="flex items-center justify-center gap-6 mb-16">
                <div className="h-px w-24 md:w-40 bg-gradient-to-r from-transparent to-[#D4C5A0]" />
                <div className="w-2 h-2 rotate-45 border border-[#D4C5A0]" />
                <div className="h-px w-24 md:w-40 bg-gradient-to-l from-transparent to-[#D4C5A0]" />
              </div>

              <div className="relative mx-auto max-w-3xl">
                {/* Gold corner brackets */}
                <span className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#D4C5A0]" />
                <span className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-[#D4C5A0]" />
                <span className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-[#D4C5A0]" />
                <span className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#D4C5A0]" />

                <div
                  className="relative bg-[#0B1B3B] text-white px-8 md:px-20 py-20 md:py-28 text-center overflow-hidden"
                  style={{
                    backgroundImage:
                      "radial-gradient(ellipse at top, rgba(212,197,160,0.12), transparent 60%), radial-gradient(ellipse at bottom, rgba(118,171,255,0.06), transparent 60%)",
                  }}
                >
                  {/* Faint grid pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.06] pointer-events-none"
                    style={{
                      backgroundImage:
                        "linear-gradient(#D4C5A0 1px, transparent 1px), linear-gradient(90deg, #D4C5A0 1px, transparent 1px)",
                      backgroundSize: "44px 44px",
                    }}
                  />

                  {/* Calendar medallion */}
                  <div className="relative inline-flex items-center justify-center mb-10">
                    <div className="absolute inset-0 rounded-full bg-[#D4C5A0]/10 blur-2xl scale-150" />
                    <div className="relative w-20 h-20 rounded-full border border-[#D4C5A0]/40 flex items-center justify-center">
                      <div className="absolute inset-2 rounded-full border border-[#D4C5A0]/20" />
                      <Calendar
                        className="w-8 h-8 text-[#D4C5A0]"
                        strokeWidth={1}
                      />
                    </div>
                  </div>

                  <span className="relative text-[#D4C5A0] font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-8 block">
                    — {t("empty.eyebrow")} —
                  </span>

                  <h3 className="relative font-serif font-light leading-[0.95] text-5xl md:text-7xl mb-3">
                    {t("empty.title")}
                  </h3>
                  <h3 className="relative font-serif italic font-light text-4xl md:text-6xl text-[#D4C5A0] mb-10">
                    {t("empty.titleAccent")}
                  </h3>

                  {/* Hairline divider */}
                  <div className="relative flex items-center justify-center gap-3 mb-10">
                    <div className="h-px w-12 bg-[#D4C5A0]/40" />
                    <div className="w-1 h-1 rotate-45 bg-[#D4C5A0]/60" />
                    <div className="h-px w-12 bg-[#D4C5A0]/40" />
                  </div>

                  <p className="relative max-w-xl mx-auto text-gray-300 font-light leading-relaxed text-base md:text-lg mb-12">
                    {t("empty.body")}
                  </p>

                  <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      href="/contact/engage"
                      className="group inline-flex items-center gap-3 bg-[#D4C5A0] text-[#0B1B3B] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
                    >
                      {t("empty.cta")}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      href="/insights"
                      className="inline-flex items-center gap-3 border border-[#D4C5A0]/30 text-[#D4C5A0] px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:border-[#D4C5A0] hover:bg-[#D4C5A0]/5 transition-colors"
                    >
                      {t("empty.secondary")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default EventsPage;
