/**
 * Testimonials Service
 * Handles all testimonial-related data operations
 */

import { BaseService } from './base.service';
import {
  Testimonial,
  TestimonialInsert,
  TestimonialUpdate,
  ApiResponse,
} from '@/lib/types/database';

class TestimonialsService extends BaseService<
  Testimonial,
  TestimonialInsert,
  TestimonialUpdate
> {
  constructor() {
    super('testimonials');
  }

  /**
   * Get all testimonials sorted by sort_order
   */
  async getAllSorted(): Promise<ApiResponse<Testimonial[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;

      return { data: data as Testimonial[], error: null };
    } catch (error) {
      console.error('Error fetching sorted testimonials:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get featured testimonials (for homepage)
   */
  async getFeatured(): Promise<ApiResponse<Testimonial[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('is_featured', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      return { data: data as Testimonial[], error: null };
    } catch (error) {
      console.error('Error fetching featured testimonials:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get testimonials by minimum rating
   */
  async getByMinRating(minRating: number): Promise<ApiResponse<Testimonial[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .gte('rating', minRating)
        .order('rating', { ascending: false })
        .order('sort_order', { ascending: true });

      if (error) throw error;

      return { data: data as Testimonial[], error: null };
    } catch (error) {
      console.error('Error fetching testimonials by rating:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Search testimonials by client name or company
   */
  async search(query: string): Promise<ApiResponse<Testimonial[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .or(
          `client_name.ilike.%${query}%,client_company.ilike.%${query}%,content_id.ilike.%${query}%,content_en.ilike.%${query}%`
        )
        .order('sort_order', { ascending: true });

      if (error) throw error;

      return { data: data as Testimonial[], error: null };
    } catch (error) {
      console.error('Error searching testimonials:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Update sort order (for drag-and-drop reordering)
   */
  async updateSortOrder(
    updates: Array<{ id: string; sort_order: number }>
  ): Promise<ApiResponse<null>> {
    try {
      const promises = updates.map((update) =>
        this.supabase
          .from(this.tableName)
          .update({ sort_order: update.sort_order })
          .eq('id', update.id)
      );

      await Promise.all(promises);

      return { data: null, error: null };
    } catch (error) {
      console.error('Error updating testimonial sort order:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Toggle featured status
   */
  async toggleFeatured(id: string): Promise<ApiResponse<Testimonial>> {
    try {
      // Get current status
      const { data: current } = await this.getById(id);
      if (!current) {
        throw new Error('Testimonial not found');
      }

      // Toggle featured status
      const { data, error } = await this.supabase
        .from(this.tableName)
        .update({ is_featured: !current.is_featured })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { data: data as Testimonial, error: null };
    } catch (error) {
      console.error('Error toggling testimonial featured status:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get average rating
   */
  async getAverageRating(): Promise<number> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('rating');

      if (error) throw error;

      const ratings = data
        .map((item: { rating: number | null }) => item.rating)
        .filter((rating): rating is number => rating !== null);

      if (ratings.length === 0) return 0;

      const sum = ratings.reduce((acc, rating) => acc + rating, 0);
      return sum / ratings.length;
    } catch (error) {
      console.error('Error calculating average rating:', error);
      return 0;
    }
  }
}

// Export singleton instance
export const testimonialsService = new TestimonialsService();
