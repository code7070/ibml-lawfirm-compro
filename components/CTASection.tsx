import Button from "./Button";

const CTASection = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-[#0B1B3B] border-t border-[#D4C5A0]/20">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <span className="text-[#D4C5A0] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">
          Start Your Case
        </span>
        <h2 className="text-5xl md:text-6xl font-light mb-10 text-white leading-tight">
          Ready to Level Up Your <br />
          <span className="font-serif italic text-[#D4C5A0]">
            Legal Protection?
          </span>
        </h2>
        <Button variant="primary" href="/contact">
          Book Strategy Session
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
