import Navbar from "../../components/Navbar";
import PracticeAreaPageComponent from "../../components/PracticeAreaPage";
import Footer from "../../components/Footer";

export default function PracticeAreasPage() {
  return (
    <div className="min-h-screen bg-white text-[#0B1B3B] selection:bg-[#D4C5A0] selection:text-[#0B1B3B]">
      <Navbar />
      <main>
        <PracticeAreaPageComponent />
      </main>
      <Footer />
    </div>
  );
}
