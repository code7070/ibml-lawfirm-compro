/**
 * Events Service
 * Handles all event-related data operations
 */

import { BaseService } from './base.service';
import {
  Event,
  EventInsert,
  EventUpdate,
  EventFilters,
  ApiResponse,
  EventStatus,
} from '@/lib/types/database';

class EventsService extends BaseService<Event, EventInsert, EventUpdate> {
  constructor() {
    super('events');
  }

  /**
   * Get all upcoming events
   */
  async getUpcoming(): Promise<ApiResponse<Event[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('status', 'upcoming' as EventStatus)
        .gte('event_date', new Date().toISOString())
        .order('event_date', { ascending: true });

      if (error) throw error;

      return { data: data as Event[], error: null };
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get past events
   */
  async getPast(): Promise<ApiResponse<Event[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('status', 'completed' as EventStatus)
        .lt('event_date', new Date().toISOString())
        .order('event_date', { ascending: false });

      if (error) throw error;

      return { data: data as Event[], error: null };
    } catch (error) {
      console.error('Error fetching past events:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get featured events (for homepage)
   */
  async getFeatured(limit: number = 3): Promise<ApiResponse<Event[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('is_featured', true)
        .eq('status', 'upcoming' as EventStatus)
        .gte('event_date', new Date().toISOString())
        .order('event_date', { ascending: true })
        .limit(limit);

      if (error) throw error;

      return { data: data as Event[], error: null };
    } catch (error) {
      console.error('Error fetching featured events:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get events by date range
   */
  async getByDateRange(
    fromDate: string,
    toDate: string
  ): Promise<ApiResponse<Event[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .gte('event_date', fromDate)
        .lte('event_date', toDate)
        .order('event_date', { ascending: true });

      if (error) throw error;

      return { data: data as Event[], error: null };
    } catch (error) {
      console.error('Error fetching events by date range:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get events by type
   */
  async getByType(eventType: string): Promise<ApiResponse<Event[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('event_type', eventType)
        .order('event_date', { ascending: true });

      if (error) throw error;

      return { data: data as Event[], error: null };
    } catch (error) {
      console.error('Error fetching events by type:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get events with filters
   */
  async getFiltered(filters: EventFilters): Promise<ApiResponse<Event[]>> {
    try {
      let query = this.supabase.from(this.tableName).select('*');

      // Apply filters
      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      if (filters.is_featured !== undefined) {
        query = query.eq('is_featured', filters.is_featured);
      }

      if (filters.from_date) {
        query = query.gte('event_date', filters.from_date);
      }

      if (filters.to_date) {
        query = query.lte('event_date', filters.to_date);
      }

      query = query.order('event_date', { ascending: true });

      const { data, error } = await query;

      if (error) throw error;

      return { data: data as Event[], error: null };
    } catch (error) {
      console.error('Error fetching filtered events:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Search events
   */
  async search(query: string): Promise<ApiResponse<Event[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .or(
          `title_id.ilike.%${query}%,title_en.ilike.%${query}%,description_id.ilike.%${query}%,description_en.ilike.%${query}%`
        )
        .order('event_date', { ascending: true });

      if (error) throw error;

      return { data: data as Event[], error: null };
    } catch (error) {
      console.error('Error searching events:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Get events for calendar view (by month)
   */
  async getByMonth(year: number, month: number): Promise<ApiResponse<Event[]>> {
    try {
      const startDate = new Date(year, month - 1, 1).toISOString();
      const endDate = new Date(year, month, 0, 23, 59, 59).toISOString();

      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .gte('event_date', startDate)
        .lte('event_date', endDate)
        .order('event_date', { ascending: true });

      if (error) throw error;

      return { data: data as Event[], error: null };
    } catch (error) {
      console.error('Error fetching events by month:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Auto-update event status based on date
   * (Should be called periodically or via cron job)
   */
  async autoUpdateStatus(): Promise<ApiResponse<null>> {
    try {
      const now = new Date().toISOString();

      // Update events to 'ongoing' if event_date has passed but end_date hasn't
      await this.supabase
        .from(this.tableName)
        .update({ status: 'ongoing' as EventStatus })
        .eq('status', 'upcoming' as EventStatus)
        .lte('event_date', now)
        .or(`end_date.is.null,end_date.gte.${now}`);

      // Update events to 'completed' if end_date has passed (or event_date if no end_date)
      await this.supabase
        .from(this.tableName)
        .update({ status: 'completed' as EventStatus })
        .in('status', ['upcoming', 'ongoing'])
        .or(`end_date.lt.${now},event_date.lt.${now}.and.end_date.is.null`);

      return { data: null, error: null };
    } catch (error) {
      console.error('Error auto-updating event status:', error);
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

// Export singleton instance
export const eventsService = new EventsService();
