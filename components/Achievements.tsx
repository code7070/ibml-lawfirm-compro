import { Trophy, Users } from "lucide-react";

const Achievements = () => {
  return (
    <section id="achievements" className="py-32 bg-[#0B1B3B] text-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-light mb-8 leading-tight">
              Results That Define <br />
              <span className="text-[#D4C5A0] font-serif italic">
                The Industry
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-12 font-light">
              From billion-dollar acquisitions to precedent-setting IP
              litigation, our track record speaks to our deep understanding of
              the gaming ecosystem. We don&apos;t just practice law; we help
              shape the industry.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6 border-t border-white/10 pt-8">
                <Trophy
                  className="w-8 h-8 text-[#D4C5A0] shrink-0"
                  strokeWidth={1}
                />
                <div>
                  <h4 className="text-xl font-normal mb-2">
                    Tier 1 Gaming Practice
                  </h4>
                  <p className="text-sm text-gray-500">
                    Recognized by Global Legal 500 for excellence in eSports and
                    Digital Media.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6 border-t border-white/10 pt-8">
                <Users
                  className="w-8 h-8 text-[#D4C5A0] shrink-0"
                  strokeWidth={1}
                />
                <div>
                  <h4 className="text-xl font-normal mb-2">
                    50+ Studios Represented
                  </h4>
                  <p className="text-sm text-gray-500">
                    Trusted counsel for both indie darlings and AAA giants
                    across 12 countries.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Stats Block */}
          <div className="bg-[#1A2F5A] p-12 border border-[#D4C5A0]/20 relative">
            {/* Decorative Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

            <div className="grid grid-cols-2 gap-12">
              <div>
                <span className="block text-5xl md:text-6xl font-light text-white mb-2">
                  $2B+
                </span>
                <span className="text-[#D4C5A0] text-xs font-bold uppercase tracking-widest">
                  Transaction Value
                </span>
              </div>
              <div>
                <span className="block text-5xl md:text-6xl font-light text-white mb-2">
                  98%
                </span>
                <span className="text-[#D4C5A0] text-xs font-bold uppercase tracking-widest">
                  Litigation Success
                </span>
              </div>
              <div className="col-span-2 border-t border-white/10 pt-12">
                <p className="font-serif italic text-xl text-gray-300">
                  &quot;IBLM Law Group understood our business model better than
                  our investors did. They are an essential part of our
                  stack.&quot;
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#D4C5A0] rounded-full"></div>
                  <div>
                    <p className="text-sm font-bold text-white uppercase tracking-wider">
                      Alex Chen
                    </p>
                    <p className="text-xs text-[#D4C5A0]">
                      CEO, VoidWalker Games
                    </p>
                  </div>
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
