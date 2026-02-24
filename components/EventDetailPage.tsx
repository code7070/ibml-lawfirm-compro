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
      {/* ━━━ Hero Image — Full Bleed, No Text Overlay ━━━ */}
      <div className="relative h-[55vh] min-h-[400px] lg:h-[65vh] lg:min-h-[500px] w-full overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        {/* Subtle vignette — purely aesthetic, no text readability concern */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1B3B]/40 via-transparent to-[#0B1B3B]/20 pointer-events-none" />

        {/* Back navigation — floating pill over image */}
        <div className="absolute top-6 left-6 z-10">
          <Link
            href="/events"
            className="
              inline-flex items-center gap-2 px-4 py-2
              bg-[#0B1B3B]/60 backdrop-blur-md
              text-white/90 hover:text-[#D4C5A0] hover:bg-[#0B1B3B]/80
              transition-all duration-300
              text-xs font-bold uppercase tracking-widest
              rounded-sm
            "
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Events
          </Link>
        </div>
      </div>

      {/* ━━━ Event Header Card — Rises Into Hero ━━━ */}
      <div className="relative z-10 -mt-20 lg:-mt-28">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="bg-white pt-10 pb-8 px-8 lg:px-12 border-t-[3px] border-[#D4C5A0] shadow-[0_-20px_60px_rgba(11,27,59,0.12)]">
            {/* Year Badge + Location */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="bg-[#0B1B3B] text-[#D4C5A0] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em]">
                {event.year}
              </span>
              {event.location && (
                <span className="text-[#2E4472]/60 text-sm font-mono flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D4C5A0]" />{" "}
                  {event.location}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-[#0B1B3B] leading-tight mb-4 max-w-4xl">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ━━━ Content Layout ━━━ */}
      <div className="max-w-[1400px] mx-auto px-6 py-24 grid lg:grid-cols-12 gap-16">
        {/* Sidebar Metadata */}
        <div className="lg:col-span-4 space-y-12 sticky">
          <div className="bg-[#F5F5F7] p-8 border-l-4 border-[#D4C5A0]">
            <h3 className="text-[#0B1B3B] font-bold text-sm uppercase tracking-widest mb-8">
              Event Details
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#D4C5A0] p-1.5">
                  <Calendar className="w-5 h-5 text-[#0b1b3b] shrink-0" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                    Date
                  </p>
                  <p className="text-[#0B1B3B] font-medium">{event.date}</p>
                </div>
              </div>

              {event.time && (
                <div className="flex items-start gap-4">
                  <div className="bg-[#D4C5A0] p-1.5">
                    <Clock className="w-5 h-5 text-[#0B1B3B] shrink-0" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                      Time
                    </p>
                    <p className="text-[#0B1B3B] font-medium">{event.time}</p>
                  </div>
                </div>
              )}

              {event.location && (
                <div className="flex items-start gap-4">
                  <div className="bg-[#D4C5A0] p-1.5">
                    <MapPin className="w-5 h-5 text-[#0B1B3B] shrink-0" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
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
                  <div className="bg-[#D4C5A0] p-1.5">
                    <Mail className="w-5 h-5 text-[#0B1B3B] shrink-0" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
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
        <div
          className="lg:col-span-8 rich-content max-w-none"
          dangerouslySetInnerHTML={{ __html: `${event.description}` }}
        />
      </div>

      <CTASection />
    </div>
  );
};

export default EventDetailPage;
