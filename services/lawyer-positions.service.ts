/**
 * Lawyer Positions Service
 * Handles all lawyer position/level data operations
 * (Managing Partner, Partner, Counsel, Senior Associate, Associate)
 */

import { BaseService } from "./base.service";
import type { ApiResponse } from "@/lib/types/database";

// Types for LawyerPosition - will be replaced once database.ts is synced with supabase.ts
export interface LawyerPosition {
  id: string;
  name_en: string;
  name_id: string;
  slug: string;
  description_en: string | null;
  description_id: string | null;
  sort_order: number | null;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
  created_by: string | null;
  updated_by: string | null;
}

export interface LawyerPositionInsert {
  id?: string;
  name_en: string;
  name_id: string;
  slug: string;
  description_en?: string | null;
  description_id?: string | null;
  sort_order?: number | null;
  status?: string | null;
}

export interface LawyerPositionUpdate {
  name_en?: string;
  name_id?: string;
  slug?: string;
  description_en?: string | null;
  description_id?: string | null;
  sort_order?: number | null;
  status?: string | null;
}

export interface LawyerPositionWithCount extends LawyerPosition {
  lawyer_count: number;
}

class LawyerPositionsService extends BaseService<
  LawyerPosition,
  LawyerPositionInsert,
  LawyerPositionUpdate
> {
  constructor() {
    super("lawyer_positions");
  }

  /**
   * Get all active positions sorted by sort_order
   */
  async getActive(): Promise<ApiResponse<LawyerPosition[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select("*")
        .eq("status", "Active")
        .order("sort_order", { ascending: true });

      if (error) throw error;

      return { data: data as LawyerPosition[], error: null };
    } catch (error) {
      console.error("Error fetching active lawyer positions:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Get all positions (including inactive) sorted by sort_order
   */
  async getAllSorted(): Promise<ApiResponse<LawyerPosition[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select("*")
        .order("sort_order", { ascending: true });

      if (error) throw error;

      return { data: data as LawyerPosition[], error: null };
    } catch (error) {
      console.error("Error fetching all lawyer positions:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Get position by slug
   */
  async getBySlug(slug: string): Promise<ApiResponse<LawyerPosition>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) throw error;

      return { data: data as LawyerPosition, error: null };
    } catch (error) {
      console.error("Error fetching lawyer position by slug:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Get positions with lawyer count
   */
  async getWithLawyerCount(): Promise<ApiResponse<LawyerPositionWithCount[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(
          `
          *,
          lawyers:lawyers(count)
        `
        )
        .eq("status", "Active")
        .order("sort_order", { ascending: true });

      if (error) throw error;

      // Transform the count from nested object
      const transformed = (data || []).map((position) => ({
        ...position,
        lawyer_count:
          (position.lawyers as unknown as { count: number }[])?.[0]?.count || 0,
      })) as LawyerPositionWithCount[];

      return { data: transformed, error: null };
    } catch (error) {
      console.error("Error fetching positions with lawyer count:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Update position sort order (for drag-and-drop reordering)
   */
  async updateSortOrder(
    updates: Array<{ id: string; sort_order: number }>
  ): Promise<ApiResponse<null>> {
    try {
      const promises = updates.map((update) =>
        this.supabase
          .from(this.tableName)
          .update({ sort_order: update.sort_order })
          .eq("id", update.id)
      );

      await Promise.all(promises);

      return { data: null, error: null };
    } catch (error) {
      console.error("Error updating position sort order:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

// Export singleton instance
export const lawyerPositionsService = new LawyerPositionsService();
