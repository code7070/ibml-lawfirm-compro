'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from '@/hooks/useTranslations';
import { testimonialsService } from '@/services/testimonials.service';
import { Testimonial } from '@/lib/types/database';
import { Quote } from 'lucide-react';

export function TestimonialsSection() {
  const t = useTranslations();
  const locale = useLocale();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await testimonialsService.getAllSorted();
        if (data) {
          setTestimonials(data.filter(t => t.is_published));
        }
      } catch (error) {
        console.error('Failed to load testimonials', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
            <div className="animate-pulse h-8 w-64 bg-gray-200 mx-auto mb-8 rounded"></div>
            <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
            </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-navy-darkest mb-4">
            {t('testimonials.title') || 'What Our Clients Say'}
          </h2>
          <div className="w-20 h-1 bg-gold-medium mx-auto mb-6"></div>
          <p className="text-gray-600">
            {t('testimonials.subtitle') || 'Trusted by industry leaders and innovative companies across Indonesia.'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div key={item.id} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
              <Quote className="w-8 h-8 text-gold-medium mb-6 flex-shrink-0" />
              <div 
                className="text-gray-600 mb-6 flex-grow italic leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: locale === 'id' ? item.content_id : item.content_en 
                }}
              />
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-100">
                {item.photo_url ? (
                  <img 
                    src={item.photo_url} 
                    alt={item.client_name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-navy-50 flex items-center justify-center text-navy-700 font-bold border border-navy-100">
                    {item.client_name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="font-medium text-navy-darkest">{item.client_name}</div>
                  <div className="text-sm text-gray-500">
                    {item.position}{item.position && item.company ? ', ' : ''}{item.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
