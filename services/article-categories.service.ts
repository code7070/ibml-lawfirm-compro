import { BaseService } from './base.service';
import type { Tables, TablesInsert, TablesUpdate, ApiResponse } from '@/lib/types/database';

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

  /**
   * Get all active categories ordered by sort_order
   */
  async getActive(): Promise<ApiResponse<ArticleCategory[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      return { data: data as ArticleCategory[], error: null };
    } catch (error) {
      console.error('Error fetching active article categories:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

export const articleCategoriesService = new ArticleCategoriesService();
