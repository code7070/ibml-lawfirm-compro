/**
 * Clients Service
 * Handles all client-related data operations
 */

import { BaseService } from './base.service';
import {
  Client,
  ClientInsert,
  ClientUpdate,
  ApiResponse,
} from '@/lib/types/database';

class ClientsService extends BaseService<Client, ClientInsert, ClientUpdate> {
  constructor() {
    super('clients');
  }

  /**
   * Get all clients sorted by sort_order
   */
  async getAllSorted(): Promise<ApiResponse<Client[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;

      return { data: data as Client[], error: null };
    } catch (error) {
      console.error('Error fetching sorted clients:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get featured clients (for homepage)
   */
  async getFeatured(): Promise<ApiResponse<Client[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;

      return { data: data as Client[], error: null };
    } catch (error) {
      console.error('Error fetching featured clients:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get clients by type
   */
  async getByIndustry(type: string): Promise<ApiResponse<Client[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('type', type)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      return { data: data as Client[], error: null };
    } catch (error) {
      console.error('Error fetching clients by type:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get all unique industries
   */
  async getAllIndustries(): Promise<ApiResponse<string[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('type');

      if (error) throw error;

      // Extract unique industries, filter out nulls
      const industries = [
        ...new Set(
          data
            .map((client: { type: string | null }) => client.type)
            .filter((type): type is string => type !== null)
        ),
      ].sort();

      return { data: industries, error: null };
    } catch (error) {
      console.error('Error fetching all industries:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Search clients by name or type
   */
  async search(query: string): Promise<ApiResponse<Client[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .or(`name.ilike.%${query}%,type.ilike.%${query}%`)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      return { data: data as Client[], error: null };
    } catch (error) {
      console.error('Error searching clients:', error);
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
      console.error('Error updating client sort order:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Toggle featured status
   */
  async toggleFeatured(id: string): Promise<ApiResponse<Client>> {
    // is_featured column does not exist in clients table
    return { data: null, error: 'Feature not available' };
  }
}

// Export singleton instance
export const clientsService = new ClientsService();
