import Navbar from "../../components/Navbar";
import ArticleListPageComponent from "../../components/ArticleListPage";
import Footer from "../../components/Footer";
import { ARTICLE_DATA } from "../../data/articles";

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-white text-[#0B1B3B] selection:bg-[#D4C5A0] selection:text-[#0B1B3B]">
      <Navbar />
      <main>
        <ArticleListPageComponent articles={ARTICLE_DATA} />
      </main>
      <Footer />
    </div>
  );
}
