/**
 * Practice Areas Service
 * Handles all practice area-related data operations
 */

import { BaseService } from './base.service';
import {
  PracticeArea,
  PracticeAreaInsert,
  PracticeAreaUpdate,
  PracticeAreaWithGroup,
  ApiResponse,
} from '@/lib/types/database';

class PracticeAreasService extends BaseService<
  PracticeArea,
  PracticeAreaInsert,
  PracticeAreaUpdate
> {
  constructor() {
    super('practice_areas');
  }

  /**
   * Get all practice areas with their groups
   */
  async getAllWithGroups(): Promise<ApiResponse<PracticeAreaWithGroup[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(`
          *,
          practice_group:practice_groups(*)
        `)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      return { data: data as PracticeAreaWithGroup[], error: null };
    } catch (error) {
      console.error('Error fetching practice areas with groups:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get practice areas by group
   */
  async getByGroup(
    groupId: string
  ): Promise<ApiResponse<PracticeArea[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('practice_group_id', groupId)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      return { data: data as PracticeArea[], error: null };
    } catch (error) {
      console.error('Error fetching practice areas by group:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get practice area by slug with group
   */
  async getBySlugWithGroup(
    slug: string
  ): Promise<ApiResponse<PracticeAreaWithGroup>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(`
          *,
          practice_group:practice_groups(*)
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;

      return { data: data as PracticeAreaWithGroup, error: null };
    } catch (error) {
      console.error('Error fetching practice area by slug:', error);
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
      console.error('Error updating practice area sort order:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Search practice areas
   */
  async search(query: string): Promise<ApiResponse<PracticeAreaWithGroup[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(`
          *,
          practice_group:practice_groups(*)
        `)
        .or(
          `name_id.ilike.%${query}%,name_en.ilike.%${query}%,description_id.ilike.%${query}%,description_en.ilike.%${query}%`
        )
        .order('sort_order', { ascending: true });

      if (error) throw error;

      return { data: data as PracticeAreaWithGroup[], error: null };
    } catch (error) {
      console.error('Error searching practice areas:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

// Export singleton instance
export const practiceAreasService = new PracticeAreasService();
