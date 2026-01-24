import { BaseService } from './base.service';
import type { Tables, TablesInsert, TablesUpdate } from '@/lib/types/database';

export type ArticleCategory = Tables<'article_categories'>;
export type ArticleCategoryInsert = TablesInsert<'article_categories'>;
export type ArticleCategoryUpdate = TablesUpdate<'article_categories'>;

class ArticleCategoriesService extends BaseService<
  ArticleCategory,
  ArticleCategoryInsert,
  ArticleCategoryUpdate
> {
  constructor() {
    super('article_categories');
  }
}

export const articleCategoriesService = new ArticleCategoriesService();
