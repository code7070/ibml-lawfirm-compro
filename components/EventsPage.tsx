"use client";

import React, { useEffect } from "react";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import CTASection from "./CTASection";
import { Event } from "../types";
import Link from "next/link";

interface EventsPageProps {
  events: Event[];
}

const EventsPage: React.FC<EventsPageProps> = ({ events }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Group events by year
  const groupedEvents = events.reduce((acc, event) => {
    if (!acc[event.year]) {
      acc[event.year] = [];
    }
    acc[event.year].push(event);
    return acc;
  }, {} as Record<string, Event[]>);

  // Sort years descending
  const sortedYears = Object.keys(groupedEvents).sort(
    (a, b) => Number(b) - Number(a)
  );

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#0B1B3B] text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <span className="text-[#D4C5A0] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">
            Connect & Converge
          </span>
          <h1 className="text-5xl md:text-7xl font-light mb-8">
            Industry{" "}
            <span className="font-serif italic text-[#D4C5A0]">Events</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            Join Nexus Legal at the forefront of the digital entertainment
            industry. Workshops, summits, and networking mixers.
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
                <h2 className="text-6xl md:text-8xl font-light text-[#0B1B3B]/10 font-serif">
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
                          View Details <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {sortedYears.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              No upcoming events scheduled.
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default EventsPage;
