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
              IBLM Law Group is anchored on three core values and operates
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
                  <h4 className="text-xl font-normal mb-2">Professionalism</h4>
                  <p className="text-sm text-gray-500">
                    Tailored legal strategy grounded in deep doctrinal knowledge
                    and industry-native insight.
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
                  <h4 className="text-xl font-normal mb-2">Empathy</h4>
                  <p className="text-sm text-gray-500">
                    We listen first. Every engagement starts from understanding
                    the client&apos;s world, not the firm&apos;s template.
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
                  <h4 className="text-xl font-normal mb-2">Loyalty</h4>
                  <p className="text-sm text-gray-500">
                    A long-term partnership built to protect your dignity,
                    security, and legacy.
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
              <div>
                {/*<span className="text-[#D4C5A0] text-xs font-bold uppercase tracking-widest block mb-2">
                  LEG-1
                </span>*/}
                <span className="block text-2xl md:text-3xl font-light text-white leading-tight">
                  Entertainment &amp; Creative
                </span>
              </div>
              <div>
                {/*<span className="text-[#D4C5A0] text-xs font-bold uppercase tracking-widest block mb-2">
                  LEG-2
                </span>*/}
                <span className="block text-2xl md:text-3xl font-light text-white leading-tight">
                  People &amp; Labor
                </span>
              </div>
              <div>
                {/*<span className="text-[#D4C5A0] text-xs font-bold uppercase tracking-widest block mb-2">
                  LEG-3
                </span>*/}
                <span className="block text-2xl md:text-3xl font-light text-white leading-tight">
                  Technology
                </span>
              </div>
              <div>
                {/*<span className="text-[#D4C5A0] text-xs font-bold uppercase tracking-widest block mb-2">
                  LEG-4
                </span>*/}
                <span className="block text-2xl md:text-3xl font-light text-white leading-tight">
                  Education &amp; Health
                </span>
              </div>

              <div className="col-span-2 border-t border-white/10 pt-10 mt-2">
                <p className="font-serif italic text-xl text-gray-300">
                  &quot;We anchor our specially tailored services for our
                  clients on our core values that revolve on Professionalism,
                  Empathy, and Loyalty.&quot;
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
