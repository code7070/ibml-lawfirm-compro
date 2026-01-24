/**
 * Lawyers Service
 * Handles all lawyer-related data operations
 */

import { BaseService } from "./base.service";
import {
  Lawyer,
  LawyerInsert,
  LawyerUpdate,
  LawyerWithPracticeAreas,
  LawyerWithPositionAndPracticeAreas,
  LawyerFilters,
  ApiResponse,
  LawyerSeniority,
} from "@/lib/types/database";

class LawyersService extends BaseService<Lawyer, LawyerInsert, LawyerUpdate> {
  constructor() {
    super("lawyers");
  }

  /**
   * Get all active lawyers sorted by sort_order
   */
  async getActive(): Promise<ApiResponse<Lawyer[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select("*")
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error) throw error;

      return { data: data as Lawyer[], error: null };
    } catch (error) {
      console.error("Error fetching active lawyers:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Get lawyers with their practice areas (joined query)
   */
  async getWithPracticeAreas(
    filters?: LawyerFilters,
  ): Promise<ApiResponse<LawyerWithPracticeAreas[]>> {
    try {
      let query = this.supabase.from(this.tableName).select(`
          *,
          practice_areas:lawyer_practice_areas(
            practice_area_id,
            practice_areas(*)
          )
        `);

      // Apply filters
      if (filters?.status === 'active') {
        query = query.eq("is_active", true);
      }

      if (filters?.seniority) {
        query = query.eq("seniority", filters.seniority);
      }

      if (filters?.practice_area_id) {
        query = query.contains("lawyer_practice_areas.practice_area_id", [
          filters.practice_area_id,
        ]);
      }

      query = query.order("sort_order", { ascending: true });

      const { data, error } = await query;

      if (error) throw error;

      return { data: data as LawyerWithPracticeAreas[], error: null };
    } catch (error) {
      console.error("Error fetching lawyers with practice areas:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Get lawyers with their position and practice areas (for lawyers listing page)
   * This includes the lawyer_positions relationship for proper categorization
   */
  async getActiveWithPositionAndPracticeAreas(): Promise<ApiResponse<LawyerWithPositionAndPracticeAreas[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(`
          *,
          lawyer_positions(*),
          practice_areas:lawyer_practice_areas(
            practice_area_id,
            practice_areas(*)
          )
        `)
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error) throw error;

      return { data: data as LawyerWithPositionAndPracticeAreas[], error: null };
    } catch (error) {
      console.error("Error fetching lawyers with position and practice areas:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Get lawyer by slug with practice areas
   */
  async getBySlugWithPracticeAreas(
    slug: string,
  ): Promise<ApiResponse<LawyerWithPracticeAreas>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select(
          `
          *,
          practice_areas:lawyer_practice_areas(
            practice_area_id,
            practice_areas(*)
          )
        `,
        )
        .eq("slug", slug)
        .single();

      if (error) throw error;

      return { data: data as LawyerWithPracticeAreas, error: null };
    } catch (error) {
      console.error("Error fetching lawyer by slug:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Search lawyers by name or email
   */
  async search(query: string): Promise<ApiResponse<Lawyer[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select("*")
        .or(
          `name_id.ilike.%${query}%,name_en.ilike.%${query}%,email.ilike.%${query}%`,
        )
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error) throw error;

      return { data: data as Lawyer[], error: null };
    } catch (error) {
      console.error("Error searching lawyers:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Get lawyers by seniority level
   */
  async getBySeniority(
    seniority: LawyerSeniority,
  ): Promise<ApiResponse<Lawyer[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select("*")
        .eq("seniority", seniority)
        .eq("is_active", true)
        .order("sort_order", { ascending: true });

      if (error) throw error;

      return { data: data as Lawyer[], error: null };
    } catch (error) {
      console.error("Error fetching lawyers by seniority:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Get lawyers by practice area
   */
  async getByPracticeArea(
    practiceAreaId: string,
  ): Promise<ApiResponse<LawyerWithPracticeAreas[]>> {
    try {
      const { data, error } = await this.supabase
        .from("lawyer_practice_areas")
        .select(
          `
          lawyers(
            *,
            practice_areas:lawyer_practice_areas(
              practice_area_id,
              is_primary,
              practice_areas(*)
            )
          )
        `,
        )
        .eq("practice_area_id", practiceAreaId)
        .eq("lawyers.is_active", true);

      if (error) throw error;

      // Extract lawyers from joined data
      const lawyers = data
        .map(
          (item: {
            lawyers: LawyerWithPracticeAreas | LawyerWithPracticeAreas[];
          }) => item.lawyers,
        )
        .flat()
        .filter((lawyer): lawyer is LawyerWithPracticeAreas => Boolean(lawyer));

      return { data: lawyers, error: null };
    } catch (error) {
      console.error("Error fetching lawyers by practice area:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Update lawyer sort order (for drag-and-drop reordering)
   */
  async updateSortOrder(
    updates: Array<{ id: string; sort_order: number }>,
  ): Promise<ApiResponse<null>> {
    try {
      // Batch update using transaction
      const promises = updates.map((update) =>
        this.supabase
          .from(this.tableName)
          .update({ sort_order: update.sort_order })
          .eq("id", update.id),
      );

      await Promise.all(promises);

      return { data: null, error: null };
    } catch (error) {
      console.error("Error updating lawyer sort order:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Assign practice areas to lawyer
   */
  async assignPracticeAreas(
    lawyerId: string,
    practiceAreaIds: string[],
    primaryAreaId?: string,
  ): Promise<ApiResponse<null>> {
    try {
      // Delete existing assignments
      await this.supabase
        .from("lawyer_practice_areas")
        .delete()
        .eq("lawyer_id", lawyerId);

      // Insert new assignments
      const assignments = practiceAreaIds.map((areaId) => ({
        lawyer_id: lawyerId,
        practice_area_id: areaId,
      }));

      const { error } = await this.supabase
        .from("lawyer_practice_areas")
        .insert(assignments);

      if (error) throw error;

      return { data: null, error: null };
    } catch (error) {
      console.error("Error assigning practice areas:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

// Export singleton instance
export const lawyersService = new LawyersService();
