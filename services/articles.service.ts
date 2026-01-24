/**
 * Articles Service
 * Handles all article-related data operations
 */

import { BaseService } from './base.service';
import {
  Article,
  ArticleInsert,
  ArticleUpdate,
  ArticleWithCategory,
  ArticleFilters,
  ApiResponse,
  ArticleStatus,
  PaginatedResponse,
} from '@/lib/types/database';

class ArticlesService extends BaseService<Article, ArticleInsert, ArticleUpdate> {
  constructor() {
    super('articles');
  }

  /**
   * Get all published articles with category and author
   */
  async getPublished(): Promise<ApiResponse<ArticleWithCategory[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(`
          *,
          category:article_categories(*),
          author:lawyers(*)
        `)
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;

      return { data: data as ArticleWithCategory[], error: null };
    } catch (error) {
      console.error('Error fetching published articles:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get paginated published articles
   */
  async getPublishedPaginated(
    page: number = 1,
    pageSize: number = 10,
    filters?: ArticleFilters
  ): Promise<PaginatedResponse<ArticleWithCategory>> {
    try {
      let query = this.supabase
        .from(this.tableName)
        .select(
          `
          *,
          category:article_categories(*),
          author:lawyers(*)
        `,
          { count: 'exact' }
        )
        .eq('is_published', true);

      // Apply filters
      if (filters?.category_id) {
        query = query.eq('category_id', filters.category_id);
      }

      if (filters?.author_id) {
        query = query.eq('author_id', filters.author_id);
      }

      if (filters?.tag) {
        query = query.contains('tags', [filters.tag]);
      }

      if (filters?.search) {
        query = query.or(
          `title_id.ilike.%${filters.search}%,title_en.ilike.%${filters.search}%,excerpt_id.ilike.%${filters.search}%,excerpt_en.ilike.%${filters.search}%`
        );
      }

      // Apply pagination
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      query = query
        .order('published_at', { ascending: false })
        .range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      return {
        data: (data as ArticleWithCategory[]) || [],
        count: count || 0,
        page,
        pageSize,
        totalPages: Math.ceil((count || 0) / pageSize),
        error: null,
      };
    } catch (error) {
      console.error('Error fetching paginated articles:', error);
      return {
        data: [],
        count: 0,
        page,
        pageSize,
        totalPages: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get article by slug with category and author
   */
  async getBySlugWithDetails(
    slug: string
  ): Promise<ApiResponse<ArticleWithCategory>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(`
          *,
          category:article_categories(*),
          author:lawyers(*)
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;

      // Increment view count
      await this.incrementViews(data.id);

      return { data: data as ArticleWithCategory, error: null };
    } catch (error) {
      console.error('Error fetching article by slug:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get articles by category
   */
  async getByCategory(
    categoryId: string
  ): Promise<ApiResponse<ArticleWithCategory[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(`
          *,
          category:article_categories(*),
          author:lawyers(*)
        `)
        .eq('category_id', categoryId)
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;

      return { data: data as ArticleWithCategory[], error: null };
    } catch (error) {
      console.error('Error fetching articles by category:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get articles by tag
   */
  async getByTag(tag: string): Promise<ApiResponse<ArticleWithCategory[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(`
          *,
          category:article_categories(*),
          author:lawyers(*)
        `)
        .contains('tags', [tag])
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;

      return { data: data as ArticleWithCategory[], error: null };
    } catch (error) {
      console.error('Error fetching articles by tag:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get featured/recent articles (for homepage)
   */
  async getFeatured(limit: number = 3): Promise<ApiResponse<ArticleWithCategory[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(`
          *,
          category:article_categories(*),
          author:lawyers(*)
        `)
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return { data: data as ArticleWithCategory[], error: null };
    } catch (error) {
      console.error('Error fetching featured articles:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get related articles (by category or tags)
   */
  async getRelated(
    articleId: string,
    limit: number = 3
  ): Promise<ApiResponse<ArticleWithCategory[]>> {
    try {
      // First, get the current article to find its category and tags
      const { data: currentArticle } = await this.supabase
        .from(this.tableName)
        .select('category_id, tags')
        .eq('id', articleId)
        .single();

      if (!currentArticle) {
        return { data: [], error: null };
      }

      // Get related articles by category
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(`
          *,
          category:article_categories(*),
          author:lawyers(*)
        `)
        .eq('category_id', currentArticle.category_id)
        .eq('is_published', true)
        .neq('id', articleId)
        .order('published_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return { data: data as ArticleWithCategory[], error: null };
    } catch (error) {
      console.error('Error fetching related articles:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Search articles
   */
  async search(query: string): Promise<ApiResponse<ArticleWithCategory[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(`
          *,
          category:article_categories(*),
          author:lawyers(*)
        `)
        .or(
          `title_id.ilike.%${query}%,title_en.ilike.%${query}%,content_id.ilike.%${query}%,content_en.ilike.%${query}%`
        )
        .eq('is_published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;

      return { data: data as ArticleWithCategory[], error: null };
    } catch (error) {
      console.error('Error searching articles:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Increment article view count
   */
  async incrementViews(articleId: string): Promise<void> {
    try {
      await this.supabase.rpc('increment', {
        table_name: 'articles',
        row_id: articleId,
        column_name: 'views',
      });
    } catch (error) {
      console.error('Error incrementing article views:', error);
    }
  }

  /**
   * Get all unique tags
   */
  async getAllTags(): Promise<ApiResponse<string[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('tags')
        .eq('is_published', true);

      if (error) throw error;

      // Extract and flatten all tags
      const allTags = data
        .flatMap((article: { tags: string[] | null }) => article.tags || [])
        .filter((tag, index, self) => self.indexOf(tag) === index)
        .sort();

      return { data: allTags, error: null };
    } catch (error) {
      console.error('Error fetching all tags:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

// Export singleton instance
export const articlesService = new ArticlesService();
