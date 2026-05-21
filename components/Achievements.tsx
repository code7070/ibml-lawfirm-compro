import { ShieldCheck, Heart, Handshake } from "lucide-react";

const Achievements = () => {
  return (
    <section id="achievements" className="py-32 bg-[#0B1B3B] text-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-light mb-8 leading-tight">
              Built On Principles, <br />
              <span className="text-[#D4C5A0] font-serif italic">
                Driven By Expertise
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-12 font-light">
              IBLM Law Group is anchored on three core principles and operates
              through four interlocking Legal Expertise Groups. We tailor every
              engagement to the client&apos;s world — never to a template —
              because sophisticated matters demand sophisticated guardianship.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6 border-t border-white/10 pt-8">
                <div className="bg-[#D4C5A0] size-12 flex items-center justify-center">
                  <ShieldCheck
                    className="size-8 text-[#0b1b3b] shrink-0"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-normal mb-2">
                    Professional Standards, Meaningful Impact
                  </h4>
                  <p className="text-sm text-gray-500">
                    At IBLM Law Group, professionalism is more than a
                    benchmark&mdash;it is the foundation of every decision we
                    make. We uphold rigorous standards of practice, ensuring
                    precision, accountability, and clarity in our counsel. By
                    combining technical excellence with strategic foresight, we
                    deliver outcomes that create meaningful impact for clients,
                    institutions, and society at large.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6 border-t border-white/10 pt-8">
                <div className="bg-[#D4C5A0] size-12 flex items-center justify-center">
                  <Heart
                    className="size-8 text-[#0b1b3b] shrink-0"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-normal mb-2">
                    Guiding with Care, Serving with Integrity
                  </h4>
                  <p className="text-sm text-gray-500">
                    Empathy shapes the way we advise and represent. We listen
                    closely, understand deeply, and respond with solutions that
                    respect both human needs and legal frameworks. Integrity
                    anchors this process, ensuring that every recommendation is
                    honest, transparent, and aligned with the best interests of
                    those we serve. Our guidance is not only legal&mdash;it is
                    care in action.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6 border-t border-white/10 pt-8">
                <div className="bg-[#D4C5A0] size-12 flex items-center justify-center">
                  <Handshake
                    className="size-8 text-[#0b1b3b] shrink-0"
                    strokeWidth={1.5}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-normal mb-2">
                    Loyal Partnerships, Lasting Trust
                  </h4>
                  <p className="text-sm text-gray-500">
                    We believe that true success in law is built on enduring
                    relationships. Loyalty to our clients, colleagues, and
                    communities defines our approach, fostering collaboration
                    that stands the test of time. Through consistent dedication
                    and an unwavering focus on our clients&apos; long-term
                    goals, we build partnerships that transcend individual
                    engagements and become the bedrock of lasting trust and
                    shared success.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 4-LEGged Firm Showcase */}
          <div className="bg-[#1A2F5A] p-12 border border-[#D4C5A0]/20 relative">
            {/* Decorative Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

            <div className="grid grid-cols-2 gap-10">
              <div className="col-span-2">
                <p className="font-serif italic text-xl text-gray-300">
                  &quot;We anchor our specially tailored services for our
                  clients on our core values of professional standards,
                  compassionate guidance, and enduring partnerships.&quot;
                </p>
                <div className="mt-6">
                  <p className="text-sm font-bold text-white uppercase tracking-wider">
                    IBLM Law Group
                  </p>
                  <p className="text-xs text-[#D4C5A0]">Founding Principle</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
