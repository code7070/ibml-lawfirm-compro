import Navbar from "../../components/Navbar";
import AboutPageComponent from "../../components/AboutPage";
import Footer from "../../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-[#0B1B3B] selection:bg-[#D4C5A0] selection:text-[#0B1B3B]">
      <Navbar />
      <main>
        <AboutPageComponent />
      </main>
      <Footer />
    </div>
  );
}
