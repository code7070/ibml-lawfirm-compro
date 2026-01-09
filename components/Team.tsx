import { TeamMember } from "../types";
import Button from "./Button";
import { Linkedin, Mail } from "lucide-react";

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Elena Vance",
    role: "Managing Partner",
    specialty: "Corporate & M&A",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    name: "Marcus Thorne",
    role: "Partner",
    specialty: "IP Litigation",
    imageUrl:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    name: "Sarah Jenkins",
    role: "Senior Counsel",
    specialty: "Data & Privacy",
    imageUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "4",
    name: "David Choi",
    role: "Associate",
    specialty: "eSports Contracts",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
  },
];

const Team = () => {
  return (
    <section id="team" className="py-32 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
          <div>
            <span className="text-[#0B1B3B] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
              Leadership
            </span>
            <h2 className="text-5xl font-light text-[#0B1B3B]">The Council</h2>
          </div>
          <div className="hidden md:block">
            <Button variant="secondary" href="/lawyers">
              View Full Roster
            </Button>
          </div>
        </div>

        {/* Members Grid - NEW CARD DESIGN */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {teamMembers.map((member) => (
            <div key={member.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-[#F5F5F7]">
                {/* Image: Grayscale by default, color on hover */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 ease-out"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[#0B1B3B]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Decorative border frame */}
                <div className="absolute inset-0 border border-transparent group-hover:border-[#D4C5A0] transition-colors duration-500 m-4" />

                {/* Social Links Slide Up */}
                <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex gap-4 bg-[#0B1B3B]">
                  <Linkedin className="w-5 h-5 text-[#D4C5A0] hover:text-white transition-colors" />
                  <Mail className="w-5 h-5 text-[#D4C5A0] hover:text-white transition-colors" />
                </div>
              </div>

              {/* Text Info */}
              <div className="border-l-2 border-transparent group-hover:border-[#D4C5A0] pl-4 transition-all duration-300">
                <h3 className="text-2xl font-normal text-[#0B1B3B] mb-1 font-serif">
                  {member.name}
                </h3>
                <p className="text-[#D4C5A0] text-xs font-bold uppercase tracking-widest mb-1">
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm font-light">
                  {member.specialty}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 md:hidden text-center">
          <Button variant="secondary" href="/lawyers">
            View Full Roster
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Team;
