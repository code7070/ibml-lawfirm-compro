import {
  MapPin,
  Mail,
  MessageCircle,
  Linkedin,
  Twitter,
  Youtube,
  Instagram,
} from "lucide-react";
import ContactFormSelector, { TFormContact } from "./ContactFormSelector";
import { contactSettingsService } from "@/services/contact.service";

// ─── Social URL normalizers ───────────────────────────────────────────────────
function normalizeSocialUrl(raw: string, base: string): string {
  const trimmed = raw.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  const handle = trimmed.replace(/^[@/]+/, "");
  return `${base}${handle}`;
}

const SOCIAL_BASES = {
  linkedin: "https://linkedin.com/company/",
  twitter: "https://x.com/",
  instagram: "https://instagram.com/",
  youtube: "https://youtube.com/@",
} as const;

function socialLabel(raw: string, base: string): string {
  const url = normalizeSocialUrl(raw, base);
  const path = url.replace(base, "").replace(/\/$/, "");
  return path || url;
}
// ─────────────────────────────────────────────────────────────────────────────

const ContactPage = async ({ form }: { form?: TFormContact }) => {
  const { data: settings } = await contactSettingsService.getMain();

  // ─── Derived flags ────────────────────────────────────────────────────────
  const hasEmail = Boolean(settings?.email);
  const hasPhone = Boolean(settings?.whatsapp || settings?.phone_primary);
  const hasDirectComms = hasEmail || hasPhone;

  const hasAddress = Boolean(settings?.address_text);
  const hasMap = Boolean(settings?.address_map_link);
  const hasOffice = hasAddress || hasMap;

  const hasSocials = Boolean(
    settings?.linkedin_url ||
    settings?.twitter_url ||
    settings?.instagram_url ||
    settings?.youtube_url,
  );

  const hasLeftColumn = hasDirectComms || hasOffice || hasSocials;
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-[#0B1B3B] text-white py-20 px-6 relative overflow-hidden">
        {/* Diagonal accent lines */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 14px,
            #D4C5A0 14px,
            #D4C5A0 15px
          )`,
          }}
        />

        <div className="max-w-[1400px] mx-auto text-center relative z-10">
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
        <div
          className={`grid gap-16 ${hasLeftColumn ? "lg:grid-cols-12" : ""}`}
        >
          {/* LEFT COLUMN: Contact Info */}
          {hasLeftColumn && (
            <div className="lg:col-span-5 space-y-12">
              {/* ── Direct Comms ─────────────────────────────────────────── */}
              {hasDirectComms && (
                <div className="space-y-6">
                  <h3 className="text-[#0B1B3B] font-serif text-2xl mb-6">
                    Direct Comms
                  </h3>

                  {hasEmail && (
                    <a
                      href={`mailto:${settings!.email}`}
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
                          {settings!.email}
                        </p>
                      </div>
                    </a>
                  )}

                  {hasPhone && (
                    <a
                      href={
                        settings?.whatsapp
                          ? `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}`
                          : `tel:${settings?.phone_primary}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-6 group p-6 border border-[#0B1B3B]/10 hover:border-[#25D366] transition-all bg-[#F5F5F7] hover:bg-white"
                    >
                      <div className="w-12 h-12 bg-[#0B1B3B] flex items-center justify-center text-[#25D366]">
                        <MessageCircle strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#0B1B3B] uppercase tracking-widest mb-1">
                          {settings?.whatsapp ? "Secure Chat" : "Phone Line"}
                        </p>
                        <p className="text-[#2E4472] text-lg font-light group-hover:text-[#25D366] transition-colors">
                          {settings?.whatsapp
                            ? "WhatsApp Line"
                            : settings?.phone_primary}
                        </p>
                      </div>
                    </a>
                  )}
                </div>
              )}

              {/* ── Office Address ───────────────────────────────────── */}
              {hasOffice && (
                <div>
                  <h3 className="text-[#0B1B3B] font-serif text-2xl mb-6">
                    Office Address
                  </h3>

                  {hasAddress && (
                    <div className="flex items-start gap-4 mb-6 text-[#2E4472]">
                      <MapPin className="text-[#D4C5A0] shrink-0 mt-1" />
                      <p className="leading-relaxed font-light whitespace-pre-wrap">
                        {settings!.address_text}
                      </p>
                    </div>
                  )}

                  {hasMap && (
                    <div className="w-full h-64 bg-[#0B1B3B] relative overflow-hidden border border-[#D4C5A0]/30 grayscale hover:grayscale-0 transition-all duration-700">
                      <iframe
                        src={settings!.address_map_link!}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        title="Office Location"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* ── Signal Frequency (Socials) ───────────────────────────── */}
              {hasSocials && (
                <div>
                  <h3 className="text-[#0B1B3B] font-serif text-2xl mb-6">
                    Signal Frequency
                  </h3>
                  <div className="space-y-4">
                    {settings?.linkedin_url && (
                      <a
                        href={normalizeSocialUrl(
                          settings.linkedin_url,
                          SOCIAL_BASES.linkedin,
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-6 group p-6 border border-[#0B1B3B]/10 hover:border-[#D4C5A0] transition-all bg-[#F5F5F7] hover:bg-white"
                      >
                        <div className="w-12 h-12 bg-[#0B1B3B] flex items-center justify-center text-[#D4C5A0] shrink-0">
                          <Linkedin strokeWidth={1.5} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#0B1B3B] uppercase tracking-widest mb-1">
                            LinkedIn
                          </p>
                          <p className="text-[#2E4472] text-sm font-light group-hover:text-[#D4C5A0] transition-colors truncate">
                            {socialLabel(
                              settings.linkedin_url,
                              SOCIAL_BASES.linkedin,
                            )}
                          </p>
                        </div>
                      </a>
                    )}
                    {settings?.twitter_url && (
                      <a
                        href={normalizeSocialUrl(
                          settings.twitter_url,
                          SOCIAL_BASES.twitter,
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-6 group p-6 border border-[#0B1B3B]/10 hover:border-[#D4C5A0] transition-all bg-[#F5F5F7] hover:bg-white"
                      >
                        <div className="w-12 h-12 bg-[#0B1B3B] flex items-center justify-center text-[#D4C5A0] shrink-0">
                          <Twitter strokeWidth={1.5} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#0B1B3B] uppercase tracking-widest mb-1">
                            Twitter / X
                          </p>
                          <p className="text-[#2E4472] text-sm font-light group-hover:text-[#D4C5A0] transition-colors truncate">
                            {socialLabel(
                              settings.twitter_url,
                              SOCIAL_BASES.twitter,
                            )}
                          </p>
                        </div>
                      </a>
                    )}
                    {settings?.instagram_url && (
                      <a
                        href={normalizeSocialUrl(
                          settings.instagram_url,
                          SOCIAL_BASES.instagram,
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-6 group p-6 border border-[#0B1B3B]/10 hover:border-[#D4C5A0] transition-all bg-[#F5F5F7] hover:bg-white"
                      >
                        <div className="w-12 h-12 bg-[#0B1B3B] flex items-center justify-center text-[#D4C5A0] shrink-0">
                          <Instagram strokeWidth={1.5} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#0B1B3B] uppercase tracking-widest mb-1">
                            Instagram
                          </p>
                          <p className="text-[#2E4472] text-sm font-light group-hover:text-[#D4C5A0] transition-colors truncate">
                            {socialLabel(
                              settings.instagram_url,
                              SOCIAL_BASES.instagram,
                            )}
                          </p>
                        </div>
                      </a>
                    )}
                    {settings?.youtube_url && (
                      <a
                        href={normalizeSocialUrl(
                          settings.youtube_url,
                          SOCIAL_BASES.youtube,
                        )}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-6 group p-6 border border-[#0B1B3B]/10 hover:border-[#D4C5A0] transition-all bg-[#F5F5F7] hover:bg-white"
                      >
                        <div className="w-12 h-12 bg-[#0B1B3B] flex items-center justify-center text-[#D4C5A0] shrink-0">
                          <Youtube strokeWidth={1.5} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-[#0B1B3B] uppercase tracking-widest mb-1">
                            YouTube
                          </p>
                          <p className="text-[#2E4472] text-sm font-light group-hover:text-[#D4C5A0] transition-colors truncate">
                            {socialLabel(
                              settings.youtube_url,
                              SOCIAL_BASES.youtube,
                            )}
                          </p>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* RIGHT COLUMN: Form Selector */}
          <div
            className={
              hasLeftColumn ? "lg:col-span-7" : "w-full max-w-3xl mx-auto"
            }
          >
            <ContactFormSelector form={form} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
