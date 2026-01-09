import Navbar from "../../components/Navbar";
import ContactPageComponent from "../../components/ContactPage";
import Footer from "../../components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-[#0B1B3B] selection:bg-[#D4C5A0] selection:text-[#0B1B3B]">
      <Navbar />
      <main>
        <ContactPageComponent />
      </main>
      <Footer />
    </div>
  );
}
