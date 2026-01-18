"use client";

import React, { useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Mail,
  ExternalLink,
  Clock,
} from "lucide-react";
import { Event } from "../types";
import CTASection from "./CTASection";
import Link from "next/link";

interface EventDetailPageProps {
  event: Event;
}

const EventDetailPage: React.FC<EventDetailPageProps> = ({ event }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Event Hero */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3B] via-[#0B1B3B]/60 to-transparent"></div>

        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-6">
          <div className="max-w-[1400px] mx-auto w-full">
            <Link
              href="/events"
              className="flex items-center gap-2 text-[#D4C5A0] hover:text-white mb-8 transition-colors text-xs font-bold uppercase tracking-widest w-fit"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Events
            </Link>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-[#D4C5A0] text-[#0B1B3B] px-4 py-1 text-xs font-bold uppercase tracking-wider">
                {event.year}
              </span>
              {event.location && (
                <span className="text-white/80 text-sm font-mono flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D4C5A0]" /> {event.location}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-8 max-w-4xl">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="max-w-[1400px] mx-auto px-6 py-24 grid lg:grid-cols-12 gap-16">
        {/* Sidebar Metadata */}
        <div className="lg:col-span-4 space-y-12">
          <div className="bg-[#F5F5F7] p-8 border-l-4 border-[#D4C5A0]">
            <h3 className="text-[#0B1B3B] font-bold text-sm uppercase tracking-widest mb-8">
              Event Details
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Calendar className="w-5 h-5 text-[#D4C5A0] shrink-0 mt-1" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                    Date
                  </p>
                  <p className="text-[#0B1B3B] font-medium">{event.date}</p>
                </div>
              </div>

              {event.time && (
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-[#D4C5A0] shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                      Time
                    </p>
                    <p className="text-[#0B1B3B] font-medium">{event.time}</p>
                  </div>
                </div>
              )}

              {event.location && (
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#D4C5A0] shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                      Location
                    </p>
                    <p className="text-[#0B1B3B] font-medium">
                      {event.location}
                    </p>
                  </div>
                </div>
              )}

              {event.contactEmail && (
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[#D4C5A0] shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                      Inquiries
                    </p>
                    <a
                      href={`mailto:${event.contactEmail}`}
                      className="text-[#0B1B3B] font-medium hover:text-[#D4C5A0] transition-colors"
                    >
                      {event.contactEmail}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {event.externalLink && (
              <div className="mt-8 pt-8 border-t border-[#0B1B3B]/10">
                <a
                  href={event.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#0B1B3B] text-white hover:bg-[#D4C5A0] hover:text-[#0B1B3B] transition-colors uppercase text-xs font-bold tracking-widest"
                >
                  Register / Info <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Main Description */}
        <div className="lg:col-span-8 prose prose-lg prose-headings:font-serif prose-headings:text-[#0B1B3B] prose-p:text-[#2E4472] prose-p:font-light prose-p:leading-relaxed prose-strong:text-[#0B1B3B] max-w-none">
          {event.description}
        </div>
      </div>

      <CTASection />
    </div>
  );
};

export default EventDetailPage;
