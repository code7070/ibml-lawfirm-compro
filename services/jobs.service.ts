/**
 * Jobs Service
 * Handles all job opening-related data operations
 */

import { BaseService } from './base.service';
import {
  JobOpening,
  JobOpeningInsert,
  JobOpeningUpdate,
  JobFilters,
  ApiResponse,
  JobStatus,
  JobType,
} from '@/lib/types/database';

class JobsService extends BaseService<JobOpening, JobOpeningInsert, JobOpeningUpdate> {
  constructor() {
    super('job_openings');
  }

  /**
   * Get all open job positions
   */
  async getOpen(): Promise<ApiResponse<JobOpening[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      return { data: data as JobOpening[], error: null };
    } catch (error) {
      console.error('Error fetching open jobs:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get jobs with filters
   */
  async getFiltered(filters: JobFilters): Promise<ApiResponse<JobOpening[]>> {
    try {
      let query = this.supabase.from(this.tableName).select('*');

      // Apply filters
      if (filters.is_active !== undefined) {
        query = query.eq('is_active', filters.is_active);
      }

      if (filters.department) {
        query = query.or(
          `department.ilike.%${filters.department}%`
        );
      }

      if (filters.location) {
        query = query.or(
          `location_id.ilike.%${filters.location}%,location_en.ilike.%${filters.location}%`
        );
      }

      query = query.order('sort_order', { ascending: true });

      const { data, error } = await query;

      if (error) throw error;

      return { data: data as JobOpening[], error: null };
    } catch (error) {
      console.error('Error fetching filtered jobs:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get jobs by type
   */
  async getByType(jobType: JobType): Promise<ApiResponse<JobOpening[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('employment_type', jobType)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      return { data: data as JobOpening[], error: null };
    } catch (error) {
      console.error('Error fetching jobs by type:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get jobs by department
   */
  async getByDepartment(department: string): Promise<ApiResponse<JobOpening[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .or(`department.ilike.%${department}%`)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      return { data: data as JobOpening[], error: null };
    } catch (error) {
      console.error('Error fetching jobs by department:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get jobs by location
   */
  async getByLocation(location: string): Promise<ApiResponse<JobOpening[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .or(`location_id.ilike.%${location}%,location_en.ilike.%${location}%`)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      return { data: data as JobOpening[], error: null };
    } catch (error) {
      console.error('Error fetching jobs by location:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get jobs with upcoming deadlines
   */
  async getWithDeadlines(daysFromNow: number = 30): Promise<ApiResponse<JobOpening[]>> {
    try {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + daysFromNow);

      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('is_active', true)
        .not('application_deadline', 'is', null)
        .lte('application_deadline', futureDate.toISOString())
        .order('application_deadline', { ascending: true });

      if (error) throw error;

      return { data: data as JobOpening[], error: null };
    } catch (error) {
      console.error('Error fetching jobs with deadlines:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Search jobs
   */
  async search(query: string): Promise<ApiResponse<JobOpening[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .or(
          `title_id.ilike.%${query}%,title_en.ilike.%${query}%,description_id.ilike.%${query}%,description_en.ilike.%${query}%`
        )
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      return { data: data as JobOpening[], error: null };
    } catch (error) {
      console.error('Error searching jobs:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get all unique departments
   */
  async getAllDepartments(): Promise<ApiResponse<string[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('department')
        .eq('is_active', true);

      if (error) throw error;

      // Extract unique departments, filter out nulls
      const departments = [
        ...new Set(
          data
            .map((job: { department: string | null }) => job.department)
            .filter((dept): dept is string => dept !== null)
        ),
      ].sort();

      return { data: departments, error: null };
    } catch (error) {
      console.error('Error fetching all departments:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get all unique locations
   */
  async getAllLocations(): Promise<ApiResponse<string[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('location_en')
        .eq('is_active', true);

      if (error) throw error;

      // Extract unique locations, filter out nulls
      const locations = [
        ...new Set(
          data
            .map((job: { location_en: string | null }) => job.location_en)
            .filter((loc): loc is string => loc !== null)
        ),
      ].sort();

      return { data: locations, error: null };
    } catch (error) {
      console.error('Error fetching all locations:', error);
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
      console.error('Error updating job sort order:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Auto-close jobs past deadline
   * (Should be called periodically or via cron job)
   */
  async autoCloseExpired(): Promise<ApiResponse<null>> {
    try {
      const now = new Date().toISOString();

      await this.supabase
        .from(this.tableName)
        .update({ is_active: false })
        .eq('is_active', true)
        .not('application_deadline', 'is', null)
        .lt('application_deadline', now);

      return { data: null, error: null };
    } catch (error) {
      console.error('Error auto-closing expired jobs:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

// Export singleton instance
export const jobsService = new JobsService();
