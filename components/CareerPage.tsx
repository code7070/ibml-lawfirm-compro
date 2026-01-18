"use client";

import { useState } from "react";
import {
  Target,
  Users,
  Zap,
  Briefcase,
  ArrowRight,
  Brain,
  Globe,
  Shield,
  Mail,
  Copy,
  Check,
} from "lucide-react";
import CTASection from "./CTASection";

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <button
      onClick={handleCopy}
      title={copied ? "Copied!" : "Copy email address"}
      className="ml-2 inline-flex items-center justify-center text-[#0B1B3B] hover:text-[#D4C5A0] transition-colors"
      aria-label="Copy email to clipboard"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
};

const CareerPage = () => {
  const values = [
    {
      icon: Target,
      title: "Precision & Excellence",
      description:
        "We operate at the highest level of legal practice. 'Good enough' is not in our vocabulary when billion-dollar IPs are at stake.",
    },
    {
      icon: Zap,
      title: "Digital Native",
      description:
        "We don't just learn the industry; we live it. Our team understands the difference between a MOBA and an FPS because we play them.",
    },
    {
      icon: Users,
      title: "Collaborative Intelligence",
      description:
        "We believe in the collective mind. Partners, associates, and staff work as a unified unit to solve complex cross-border challenges.",
    },
  ];

  const positions = [
    {
      title: "Senior Associate - IP Litigation",
      location: "Los Angeles / Hybrid",
      type: "Full-time",
      department: "Litigation",
    },
    {
      title: "Mid-Level Associate - Corporate M&A",
      location: "New York / Remote",
      type: "Full-time",
      department: "Corporate",
    },
    {
      title: "Legal Technologist",
      location: "Los Angeles",
      type: "Full-time",
      department: "Operations",
    },
  ];

  const benefits = [
    { icon: Brain, label: "Advanced Mentorship" },
    { icon: Globe, label: "Global Secondments" },
    { icon: Shield, label: "Top-Tier Health" },
    { icon: Briefcase, label: "Hybrid Work" },
  ];

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-[#0B1B3B] text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="max-w-[1400px] mx-auto relative z-10 text-center">
          <span className="text-[#D4C5A0] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">
            Careers at IBLM
          </span>
          <h1 className="text-5xl md:text-7xl font-light mb-8">
            Join the{" "}
            <span className="font-serif italic text-[#D4C5A0]">Vanguard</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            We are looking for brilliant legal minds who are passionate about
            the intersection of technology, entertainment, and law.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light text-[#0B1B3B] mb-4">
              Our Code
            </h2>
            <div className="w-16 h-1 bg-[#D4C5A0] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {values.map((v) => (
              <div
                key={v.title}
                className="group p-8 border border-[#F5F5F7] hover:border-[#D4C5A0]/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-[#F5F5F7] flex items-center justify-center text-[#D4C5A0] mb-8 group-hover:bg-[#0B1B3B] transition-colors duration-300">
                  <v.icon strokeWidth={1.5} size={28} />
                </div>
                <h3 className="text-2xl font-serif text-[#0B1B3B] mb-4">
                  {v.title}
                </h3>
                <p className="text-[#2E4472] font-light leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture/Image Section */}
      <section
        className="relative py-32 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600')",
        }}
      >
        <div className="absolute inset-0 bg-[#0B1B3B]/90 mix-blend-multiply"></div>
        <div className="absolute inset-0 flex items-center justify-center relative z-10 px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <h2 className="text-4xl font-light mb-6">
                A Firm Where Tradition Meets Disruption
              </h2>
              <p className="text-gray-300 font-light leading-relaxed mb-8">
                At IBLM, you won&apos;t just draft contracts; you&apos;ll shape
                the regulatory frameworks for metaverses, eSports leagues, and
                AI governance. We offer an environment that values intellectual
                rigor and creative problem-solving equally.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <b.icon className="text-[#D4C5A0] w-5 h-5" />
                    <span className="text-sm font-bold tracking-wider uppercase">
                      {b.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="border border-[#D4C5A0] p-8 bg-[#0B1B3B]/50 backdrop-blur-sm">
                <p className="font-serif italic text-2xl text-white mb-6">
                  &quot;The pace here is electric. We are dealing with legal
                  questions that didn&apos;t exist six months ago.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#D4C5A0] rounded-full flex items-center justify-center text-[#0B1B3B] font-bold">
                    D
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white uppercase">
                      David Choi
                    </p>
                    <p className="text-xs text-[#D4C5A0]">Associate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 px-6 bg-[#F5F5F7]">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-3xl font-light text-[#0B1B3B] mb-12 text-center">
            Current Openings
          </h2>

          <div className="space-y-4">
            {positions.map((job) => (
              <div
                key={job.title}
                className="bg-white p-8 border border-transparent hover:border-[#D4C5A0] transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group cursor-pointer shadow-sm hover:shadow-md"
              >
                <div>
                  <h3 className="font-serif !text-lg font-bold text-[#0B1B3B] mb-2">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 font-mono">
                    <span>{job.department}</span>
                    <span className="hidden md:inline">•</span>
                    <span>{job.location}</span>
                    <span className="hidden md:inline">•</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[#D4C5A0] font-bold uppercase text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                  Apply Now <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work With Us Section */}
      <section className="py-24 px-6 bg-white border-t border-[#0B1B3B]/10">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#D4C5A0] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
              Future Opportunities
            </span>
            <h2 className="text-4xl font-serif text-[#0B1B3B] mb-6">
              Work with Us
            </h2>
            <p className="text-[#2E4472] text-lg font-light leading-relaxed mb-8">
              We are always scouting for exceptional talent to join our ranks.
              Whether you are a seasoned partner looking to pivot into digital
              media law, or a law student with a background in computer science,
              we want to hear from you.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-[#F5F5F7] group-hover:bg-[#0B1B3B] transition-colors flex items-center justify-center text-[#0B1B3B] group-hover:text-[#D4C5A0] shrink-0 border border-[#0B1B3B]/10">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-[#0B1B3B] font-bold uppercase text-xs tracking-widest mb-1">
                    General Inquiries
                  </h4>
                  <p className="text-gray-500 font-light mb-2 text-sm">
                    For attorneys, paralegals, and support staff.
                  </p>
                  <div className="flex items-center">
                    <a
                      href="mailto:careers@iblm.law"
                      className="text-[#0B1B3B] font-bold hover:text-[#D4C5A0] transition-colors border-b border-[#D4C5A0] text-sm"
                    >
                      careers@iblm.law
                    </a>
                    <CopyButton text="careers@iblm.law" />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-[#F5F5F7] group-hover:bg-[#0B1B3B] transition-colors flex items-center justify-center text-[#0B1B3B] group-hover:text-[#D4C5A0] shrink-0 border border-[#0B1B3B]/10">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="text-[#0B1B3B] font-bold uppercase text-xs tracking-widest mb-1">
                    Internship Program
                  </h4>
                  <p className="text-gray-500 font-light mb-2 text-sm">
                    Summer associates and legal clerkships.
                  </p>
                  <div className="flex items-center">
                    <a
                      href="mailto:internships@iblm.law"
                      className="text-[#0B1B3B] font-bold hover:text-[#D4C5A0] transition-colors border-b border-[#D4C5A0] text-sm"
                    >
                      internships@iblm.law
                    </a>
                    <CopyButton text="internships@iblm.law" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[500px] bg-[#0B1B3B] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1600"
              alt="Team Collaboration"
              className="w-full h-full object-cover opacity-60 mix-blend-overlay grayscale hover:grayscale-0 transition-all duration-1000"
            />
            <div className="absolute inset-0 border border-[#D4C5A0]/30 m-6 pointer-events-none"></div>
            <div className="absolute bottom-10 left-10 right-10">
              <p className="text-white text-xl font-serif italic leading-relaxed">
                &quot;We don&apos;t hire backgrounds. We hire potential and
                passion for the craft.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default CareerPage;
