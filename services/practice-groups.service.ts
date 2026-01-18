/**
 * Practice Groups Service
 * Handles all practice group-related data operations
 */

import { BaseService } from './base.service';
import {
  PracticeGroup,
  PracticeGroupInsert,
  PracticeGroupUpdate,
  PracticeArea,
  ApiResponse,
} from '@/lib/types/database';

interface PracticeGroupWithAreas extends PracticeGroup {
  practice_areas?: PracticeArea[];
}

class PracticeGroupsService extends BaseService<
  PracticeGroup,
  PracticeGroupInsert,
  PracticeGroupUpdate
> {
  constructor() {
    super('practice_groups');
  }

  /**
   * Get all practice groups with their areas
   */
  async getAllWithAreas(): Promise<ApiResponse<PracticeGroupWithAreas[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(`
          *,
          practice_areas(*)
        `)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      return { data: data as PracticeGroupWithAreas[], error: null };
    } catch (error) {
      console.error('Error fetching practice groups with areas:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get practice group by slug with areas
   */
  async getBySlugWithAreas(
    slug: string
  ): Promise<ApiResponse<PracticeGroupWithAreas>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(`
          *,
          practice_areas(*)
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;

      return { data: data as PracticeGroupWithAreas, error: null };
    } catch (error) {
      console.error('Error fetching practice group by slug:', error);
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
      console.error('Error updating practice group sort order:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Search practice groups
   */
  async search(query: string): Promise<ApiResponse<PracticeGroupWithAreas[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(`
          *,
          practice_areas(*)
        `)
        .or(
          `name_id.ilike.%${query}%,name_en.ilike.%${query}%,description_id.ilike.%${query}%,description_en.ilike.%${query}%`
        )
        .order('sort_order', { ascending: true });

      if (error) throw error;

      return { data: data as PracticeGroupWithAreas[], error: null };
    } catch (error) {
      console.error('Error searching practice groups:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

// Export singleton instance
export const practiceGroupsService = new PracticeGroupsService();
