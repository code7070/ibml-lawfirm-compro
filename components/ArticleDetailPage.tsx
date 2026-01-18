import { ArrowLeft, Clock, Share2, Linkedin, Twitter } from "lucide-react";
import { Article } from "../types";
import CTASection from "./CTASection";
import Link from "next/link";

interface ArticleDetailPageProps {
  article: Article;
  allArticles: Article[];
}

const ArticleDetailPage = ({
  article,
  allArticles,
}: ArticleDetailPageProps) => {
  // Get related articles (exclude current, take 3)
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  // Fallback if not enough same-category articles
  const finalRelated =
    relatedArticles.length > 0
      ? relatedArticles
      : allArticles.filter((a) => a.id !== article.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Article Hero */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3B] via-[#0B1B3B]/50 to-transparent"></div>

        <div className="absolute inset-0 flex flex-col justify-end pb-20 px-6">
          <div className="max-w-[1000px] mx-auto w-full">
            <Link
              href="/articles"
              className="flex items-center gap-2 text-[#D4C5A0] hover:text-white mb-8 transition-colors text-xs font-bold uppercase tracking-widest"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Intelligence
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <span className="bg-[#D4C5A0] text-[#0B1B3B] px-3 py-1 text-xs font-bold uppercase tracking-wider">
                {article.category}
              </span>
              <span className="text-gray-300 text-sm font-mono flex items-center gap-2">
                <Clock className="w-4 h-4" /> {article.date}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight mb-8">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-white/80 border-t border-white/20 pt-6">
              <div className="w-10 h-10 bg-[#D4C5A0] rounded-full flex items-center justify-center text-[#0B1B3B] font-bold">
                {article.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-white">
                  By {article.author}
                </p>
                <p className="text-xs text-[#D4C5A0]">IBLM Law Group</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Layout */}
      <div className="max-w-[1400px] mx-auto px-6 py-20 grid lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <article className="lg:col-span-8 lg:col-start-3 prose prose-lg prose-headings:font-serif prose-headings:text-[#0B1B3B] prose-p:text-[#2E4472] prose-p:font-light prose-p:leading-relaxed prose-strong:text-[#0B1B3B] max-w-none">
          {article.content}
        </article>

        {/* Share / Sidebar (Sticky) */}
        <div className="lg:col-span-2 hidden lg:flex flex-col gap-6 pt-4">
          <p className="text-xs font-bold text-[#0B1B3B] uppercase tracking-widest">
            Share
          </p>
          <button className="w-10 h-10 border border-[#0B1B3B]/10 flex items-center justify-center text-[#0B1B3B] hover:bg-[#0B1B3B] hover:text-[#D4C5A0] transition-colors rounded-full">
            <Linkedin className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 border border-[#0B1B3B]/10 flex items-center justify-center text-[#0B1B3B] hover:bg-[#0B1B3B] hover:text-[#D4C5A0] transition-colors rounded-full">
            <Twitter className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 border border-[#0B1B3B]/10 flex items-center justify-center text-[#0B1B3B] hover:bg-[#0B1B3B] hover:text-[#D4C5A0] transition-colors rounded-full">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Related Articles */}
      <section className="bg-[#F5F5F7] py-24 px-6 border-t border-[#0B1B3B]/10">
        <div className="max-w-[1400px] mx-auto">
          <h3 className="text-3xl font-light text-[#0B1B3B] mb-12">
            Related Intelligence
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {finalRelated.map((item) => (
              <Link
                key={item.id}
                href={`/articles/${item.id}`}
                className="group cursor-pointer bg-white p-6 border border-transparent hover:border-[#D4C5A0] transition-all"
              >
                <p className="text-[#D4C5A0] text-xs font-bold uppercase tracking-widest mb-3">
                  {item.category}
                </p>
                <h4 className="text-xl font-serif text-[#0B1B3B] mb-4 group-hover:text-[#2E4472] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-400 font-mono">{item.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};

export default ArticleDetailPage;
