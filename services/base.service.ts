/**
 * Base Service Class
 * Abstract class providing common CRUD operations for all services
 *
 * Shared between next/ (frontend) and cms2/ (CMS dashboard)
 */

import { SupabaseClient } from '@supabase/supabase-js';
import { getSupabase } from '@/lib/supabase';
import { ApiResponse, PaginatedResponse } from '@/lib/types/database';

export interface PaginationOptions {
  page?: number;
  pageSize?: number;
}

export interface SortOptions {
  column: string;
  ascending?: boolean;
}

export abstract class BaseService<T, TInsert = Partial<T>, TUpdate = Partial<T>> {
  protected supabase: SupabaseClient;
  protected tableName: string;

  constructor(tableName: string) {
    this.supabase = getSupabase();
    this.tableName = tableName;
  }

  /**
   * Get all records
   * @param options - Pagination and sort options
   */
  async getAll(
    options?: PaginationOptions & { sort?: SortOptions }
  ): Promise<ApiResponse<T[]>> {
    try {
      let query = this.supabase.from(this.tableName).select('*');

      // Apply sorting
      if (options?.sort) {
        query = query.order(options.sort.column, {
          ascending: options.sort.ascending ?? true,
        });
      }

      // Apply pagination
      if (options?.page && options?.pageSize) {
        const from = (options.page - 1) * options.pageSize;
        const to = from + options.pageSize - 1;
        query = query.range(from, to);
      }

      const { data, error } = await query;

      if (error) throw error;

      return { data: data as T[], error: null };
    } catch (error) {
      console.error(`Error fetching all ${this.tableName}:`, error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get paginated records with total count
   */
  async getPaginated(
    options: PaginationOptions & { sort?: SortOptions } = {}
  ): Promise<PaginatedResponse<T>> {
    const page = options.page || 1;
    const pageSize = options.pageSize || 10;

    try {
      // Get total count
      const { count } = await this.supabase
        .from(this.tableName)
        .select('*', { count: 'exact', head: true });

      // Get paginated data
      let query = this.supabase.from(this.tableName).select('*');

      // Apply sorting
      if (options.sort) {
        query = query.order(options.sort.column, {
          ascending: options.sort.ascending ?? true,
        });
      }

      // Apply pagination
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;
      query = query.range(from, to);

      const { data, error } = await query;

      if (error) throw error;

      return {
        data: (data as T[]) || [],
        count: count || 0,
        page,
        pageSize,
        totalPages: Math.ceil((count || 0) / pageSize),
        error: null,
      };
    } catch (error) {
      console.error(`Error fetching paginated ${this.tableName}:`, error);
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
   * Get single record by ID
   */
  async getById(id: string): Promise<ApiResponse<T>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      return { data: data as T, error: null };
    } catch (error) {
      console.error(`Error fetching ${this.tableName} by ID:`, error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get single record by slug
   */
  async getBySlug(slug: string): Promise<ApiResponse<T>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('slug', slug)
        .single();

      if (error) throw error;

      return { data: data as T, error: null };
    } catch (error) {
      console.error(`Error fetching ${this.tableName} by slug:`, error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Create new record
   * @param data - Record data to insert
   */
  async create(data: TInsert): Promise<ApiResponse<T>> {
    try {
      const { data: record, error } = await this.supabase
        .from(this.tableName)
        .insert(data as never)
        .select()
        .single();

      if (error) throw error;

      return { data: record as T, error: null };
    } catch (error) {
      console.error(`Error creating ${this.tableName}:`, error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Update existing record
   */
  async update(id: string, data: TUpdate): Promise<ApiResponse<T>> {
    try {
      const { data: record, error } = await this.supabase
        .from(this.tableName)
        .update(data as never)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { data: record as T, error: null };
    } catch (error) {
      console.error(`Error updating ${this.tableName}:`, error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Delete record
   */
  async delete(id: string): Promise<ApiResponse<null>> {
    try {
      const { error } = await this.supabase
        .from(this.tableName)
        .delete()
        .eq('id', id);

      if (error) throw error;

      return { data: null, error: null };
    } catch (error) {
      console.error(`Error deleting ${this.tableName}:`, error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Count total records
   */
  async count(): Promise<number> {
    try {
      const { count, error } = await this.supabase
        .from(this.tableName)
        .select('*', { count: 'exact', head: true });

      if (error) throw error;

      return count || 0;
    } catch (error) {
      console.error(`Error counting ${this.tableName}:`, error);
      return 0;
    }
  }

  /**
   * Check if record exists
   */
  async exists(id: string): Promise<boolean> {
    try {
      const { count, error } = await this.supabase
        .from(this.tableName)
        .select('*', { count: 'exact', head: true })
        .eq('id', id);

      if (error) throw error;

      return (count || 0) > 0;
    } catch (error) {
      console.error(`Error checking if ${this.tableName} exists:`, error);
      return false;
    }
  }
}
