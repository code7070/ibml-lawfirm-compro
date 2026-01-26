import { MapPin, Mail, MessageCircle, Linkedin, Twitter, Youtube, Instagram } from "lucide-react";
import ContactForm from "./ContactForm";
import { contactSettingsService } from "@/services/contact.service";

const ContactPage = async () => {
  const { data: settings } = await contactSettingsService.getMain();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-[#0B1B3B] text-white py-20 px-6">
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="text-[#D4C5A0] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
            Secure Channel
          </span>
          <h1 className="text-5xl md:text-6xl font-light mb-6">
            Initiate{" "}
            <span className="font-serif italic text-[#D4C5A0]">Protocol</span>
          </h1>
          <p className="text-gray-400 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Whether you are facing a platform dispute or structuring a new
            studio, our council is ready to deploy. All communications are
            privileged and confidential.
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* LEFT COLUMN: Contact Info */}
          <div className="lg:col-span-5 space-y-12">
            {/* Quick Actions */}
            <div className="space-y-6">
              <h3 className="text-[#0B1B3B] font-serif text-2xl mb-6">
                Direct Comms
              </h3>

              <a
                href={`mailto:${settings?.email || 'counsel@iblm.law'}`}
                className="flex items-center gap-6 group p-6 border border-[#0B1B3B]/10 hover:border-[#D4C5A0] transition-all bg-[#F5F5F7] hover:bg-white"
              >
                <div className="w-12 h-12 bg-[#0B1B3B] flex items-center justify-center text-[#D4C5A0]">
                  <Mail strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0B1B3B] uppercase tracking-widest mb-1">
                    Email Inquiry
                  </p>
                  <p className="text-[#2E4472] text-lg font-light group-hover:text-[#D4C5A0] transition-colors">
                    {settings?.email || 'counsel@iblm.law'}
                  </p>
                </div>
              </a>

              {(settings?.whatsapp || settings?.phone_primary) && (
                 <a
                  href={settings?.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}` : `tel:${settings?.phone_primary}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-6 group p-6 border border-[#0B1B3B]/10 hover:border-[#25D366] transition-all bg-[#F5F5F7] hover:bg-white"
                >
                  <div className="w-12 h-12 bg-[#0B1B3B] flex items-center justify-center text-[#25D366]">
                    <MessageCircle strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0B1B3B] uppercase tracking-widest mb-1">
                      {settings?.whatsapp ? 'Secure Chat' : 'Phone Line'}
                    </p>
                    <p className="text-[#2E4472] text-lg font-light group-hover:text-[#25D366] transition-colors">
                      {settings?.whatsapp ? 'WhatsApp Line' : settings?.phone_primary}
                    </p>
                  </div>
                </a>
              )}
            </div>

            {/* Office & Map */}
            <div>
              <h3 className="text-[#0B1B3B] font-serif text-2xl mb-6">
                Base of Operations
              </h3>
              <div className="flex items-start gap-4 mb-6 text-[#2E4472]">
                <MapPin className="text-[#D4C5A0] shrink-0 mt-1" />
                <p className="leading-relaxed font-light whitespace-pre-wrap">
                  {settings?.address_text || "IBLM HQ, Innovation District\n101 Tech Blvd, Suite 404\nLos Angeles, CA 90012"}
                </p>
              </div>

              {/* Styled Map Box */}
              <div className="w-full h-64 bg-[#0B1B3B] relative overflow-hidden border border-[#D4C5A0]/30 grayscale hover:grayscale-0 transition-all duration-700">
                <iframe
                  src={settings?.address_map_link || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.715220363297!2d-118.24531868478494!3d34.0505709806063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c648fa1d4803%3A0xdec27bf11f9fdee0!2sLos%20Angeles%2C%20CA%2090012!5e0!3m2!1sen!2sus!4v1696969696969!5m2!1sen!2sus"}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  title="Office Location"
                ></iframe>
              </div>
            </div>

            {/* Socials */}
            <div>
              <h3 className="text-[#0B1B3B] font-serif text-2xl mb-6">
                Signal Frequency
              </h3>
              <div className="flex gap-4">
                {settings?.linkedin_url && (
                  <a
                    href={settings.linkedin_url}
                    className="w-12 h-12 border border-[#0B1B3B]/20 flex items-center justify-center hover:bg-[#0B1B3B] hover:text-[#D4C5A0] hover:border-[#0B1B3B] transition-all text-[#0B1B3B]"
                  >
                    <Linkedin strokeWidth={1.5} />
                  </a>
                )}
                {settings?.twitter_url && (
                  <a
                    href={settings.twitter_url}
                    className="w-12 h-12 border border-[#0B1B3B]/20 flex items-center justify-center hover:bg-[#0B1B3B] hover:text-[#D4C5A0] hover:border-[#0B1B3B] transition-all text-[#0B1B3B]"
                  >
                    <Twitter strokeWidth={1.5} />
                  </a>
                )}
                 {settings?.instagram_url && (
                  <a
                    href={settings.instagram_url}
                    className="w-12 h-12 border border-[#0B1B3B]/20 flex items-center justify-center hover:bg-[#0B1B3B] hover:text-[#D4C5A0] hover:border-[#0B1B3B] transition-all text-[#0B1B3B]"
                  >
                    <Instagram strokeWidth={1.5} />
                  </a>
                )}
                 {settings?.youtube_url && (
                  <a
                    href={settings.youtube_url}
                    className="w-12 h-12 border border-[#0B1B3B]/20 flex items-center justify-center hover:bg-[#0B1B3B] hover:text-[#D4C5A0] hover:border-[#0B1B3B] transition-all text-[#0B1B3B]"
                  >
                    <Youtube strokeWidth={1.5} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Form */}
          <div className="lg:col-span-7">
             <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

