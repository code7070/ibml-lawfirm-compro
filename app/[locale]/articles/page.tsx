import ArticleListPageComponent from "@/components/ArticleListPage";
import { ARTICLE_DATA } from "@/data/articles";

export default function ArticlesPage() {
  return <ArticleListPageComponent articles={ARTICLE_DATA} />;
}
