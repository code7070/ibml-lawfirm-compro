"use client";

import { useEffect, useState, useRef } from "react";
import { useTranslations, useLocale } from "@/hooks/useTranslations";
import { testimonialsService } from "@/services/testimonials.service";
import { Testimonial } from "@/lib/types/database";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function TestimonialsSection() {
  const t = useTranslations();
  const locale = useLocale();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await testimonialsService.getAllSorted();
        if (data) {
          setTestimonials(data.filter((t) => t.is_published));
        }
      } catch (error) {
        console.error("Failed to load testimonials", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <section className="py-32 bg-white px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-4 w-32 bg-gray-200 mx-auto mb-12 rounded"></div>
            <div className="h-32 w-full max-w-3xl bg-gray-200 mx-auto rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="py-32 bg-white px-6">
      <div className="max-w-[1400px] mx-auto">
        <span className="text-[#0B1B3B] font-bold tracking-[0.2em] text-xs uppercase block text-center mb-12">
          {t("testimonials.label") || "Client Intelligence"}
        </span>

        <div className="relative max-w-5xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            spaceBetween={30}
            slidesPerView={1}
            loop={testimonials.length > 1}
            speed={700}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.realIndex);
            }}
            className="testimonials-swiper"
          >
            {testimonials.map((item) => {
              const content =
                locale === "id" ? item.content_id : item.content_en;
              // Remove HTML tags for display
              const cleanContent = content.replace(/<[^>]*>/g, "");

              return (
                <SwiperSlide key={item.id}>
                  <div className="flex flex-col items-center justify-center text-center min-h-[450px] md:min-h-[350px] py-8">
                    <Quote className="w-16 h-16 text-[#D4C5A0]/30 mb-8" />
                    <p className="text-2xl md:text-4xl font-serif italic text-[#0B1B3B] leading-tight mb-10 max-w-4xl px-4">
                      &quot;{cleanContent}&quot;
                    </p>

                    <div className="flex flex-col items-center">
                      {item.photo_url ? (
                        <img
                          src={item.photo_url}
                          alt={item.client_name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-[#D4C5A0] mb-4"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-[#0B1B3B] text-[#D4C5A0] border border-[#D4C5A0] flex items-center justify-center font-bold text-xl mb-4">
                          {item.client_name.charAt(0)}
                        </div>
                      )}
                      <p className="text-sm font-bold text-[#0B1B3B] uppercase tracking-[0.15em] mb-1">
                        {item.client_name}
                      </p>
                      <p className="text-xs text-[#2E4472] font-medium">
                        {item.position}
                        {item.position && item.company ? ", " : ""}
                        {item.company}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Custom Controls */}
          <div className="flex justify-center items-center gap-12 mt-8">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="p-3 border border-[#0B1B3B]/10 hover:border-[#D4C5A0] hover:text-[#D4C5A0] transition-colors rounded-full text-[#0B1B3B]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => swiperRef.current?.slideToLoop(idx)}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? "bg-[#D4C5A0] scale-125"
                      : "bg-[#0B1B3B]/20"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="p-3 border border-[#0B1B3B]/10 hover:border-[#D4C5A0] hover:text-[#D4C5A0] transition-colors rounded-full text-[#0B1B3B]"
              aria-label="Next testimonial"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
