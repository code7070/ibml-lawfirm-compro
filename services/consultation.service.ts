/**
 * Consultation Service
 * Handles professional consultation form submissions (table: consultation_submission)
 * Separate from contact_submissions — includes consultation_channel and agreed_tnc fields.
 */

import { BaseService } from "./base.service";
import {
  ConsultationSubmission,
  ConsultationSubmissionInsert,
  ConsultationSubmissionUpdate,
  ConsultationSubmissionStatus,
  ApiResponse,
} from "@/lib/types/database";

class ConsultationSubmissionsService extends BaseService<
  ConsultationSubmission,
  ConsultationSubmissionInsert,
  ConsultationSubmissionUpdate
> {
  constructor() {
    super("consultation_submission");
  }

  /**
   * Submit a new consultation request.
   * Note: Does not chain .select().single() after insert because
   * anon/public users have INSERT but not SELECT permission (RLS).
   * The caller only needs to know success/failure, not the created record.
   */
  async submit(
    data: Omit<
      ConsultationSubmissionInsert,
      "status" | "ip_address" | "user_agent"
    >,
  ): Promise<ApiResponse<ConsultationSubmission>> {
    try {
      const submission: ConsultationSubmissionInsert = {
        ...data,
        status: "New" as ConsultationSubmissionStatus,
        ip_address: null,
        user_agent: null,
      };

      const { error } = await this.supabase
        .from(this.tableName)
        .insert(submission as never);

      if (error) throw error;

      return { data: null, error: null };
    } catch (error) {
      console.error("Error submitting consultation request:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Get submissions by status
   */
  async getByStatus(
    status: ConsultationSubmissionStatus,
  ): Promise<ApiResponse<ConsultationSubmission[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select("*")
        .eq("status", status)
        .order("submitted_at", { ascending: false });

      if (error) throw error;

      return { data: data as ConsultationSubmission[], error: null };
    } catch (error) {
      console.error("Error fetching consultation submissions by status:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Get new (unread) consultation requests
   */
  async getNew(): Promise<ApiResponse<ConsultationSubmission[]>> {
    return this.getByStatus("new" as ConsultationSubmissionStatus);
  }

  /**
   * Update submission status (and optionally add admin notes)
   */
  async updateStatus(
    id: string,
    status: ConsultationSubmissionStatus,
    notes?: string,
  ): Promise<ApiResponse<ConsultationSubmission>> {
    try {
      const updateData: Partial<ConsultationSubmission> = { status };
      if (notes) {
        updateData.admin_notes = notes;
      }

      const { data, error } = await this.supabase
        .from(this.tableName)
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      return { data: data as ConsultationSubmission, error: null };
    } catch (error) {
      console.error("Error updating consultation status:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Assign consultation to a CMS user
   */
  async assignTo(
    id: string,
    userId: string,
  ): Promise<ApiResponse<ConsultationSubmission>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .update({ assigned_to: userId })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      return { data: data as ConsultationSubmission, error: null };
    } catch (error) {
      console.error("Error assigning consultation:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Search consultation submissions
   */
  async search(
    query: string,
  ): Promise<ApiResponse<ConsultationSubmission[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select("*")
        .or(
          `name.ilike.%${query}%,email.ilike.%${query}%,subject.ilike.%${query}%,message.ilike.%${query}%,consultation_channel.ilike.%${query}%`,
        )
        .order("submitted_at", { ascending: false });

      if (error) throw error;

      return { data: data as ConsultationSubmission[], error: null };
    } catch (error) {
      console.error("Error searching consultation submissions:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Get consultation submission statistics
   */
  async getStats(): Promise<{
    total: number;
    new: number;
    in_progress: number;
    resolved: number;
    spam: number;
    online: number;
    offline: number;
  }> {
    try {
      const [total, newCount, inProgress, resolved, spam, online, offline] =
        await Promise.all([
          this.count(),
          this.supabase
            .from(this.tableName)
            .select("*", { count: "exact", head: true })
            .eq("status", "new")
            .then(({ count }) => count || 0),
          this.supabase
            .from(this.tableName)
            .select("*", { count: "exact", head: true })
            .eq("status", "in_progress")
            .then(({ count }) => count || 0),
          this.supabase
            .from(this.tableName)
            .select("*", { count: "exact", head: true })
            .eq("status", "resolved")
            .then(({ count }) => count || 0),
          this.supabase
            .from(this.tableName)
            .select("*", { count: "exact", head: true })
            .eq("status", "spam")
            .then(({ count }) => count || 0),
          this.supabase
            .from(this.tableName)
            .select("*", { count: "exact", head: true })
            .eq("consultation_channel", "online")
            .then(({ count }) => count || 0),
          this.supabase
            .from(this.tableName)
            .select("*", { count: "exact", head: true })
            .eq("consultation_channel", "offline")
            .then(({ count }) => count || 0),
        ]);

      return {
        total,
        new: newCount,
        in_progress: inProgress,
        resolved,
        spam,
        online,
        offline,
      };
    } catch (error) {
      console.error("Error fetching consultation stats:", error);
      return {
        total: 0,
        new: 0,
        in_progress: 0,
        resolved: 0,
        spam: 0,
        online: 0,
        offline: 0,
      };
    }
  }
}

// Export singleton instance
export const consultationSubmissionsService =
  new ConsultationSubmissionsService();
