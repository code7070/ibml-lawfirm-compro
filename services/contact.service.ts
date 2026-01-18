/**
 * Contact Service
 * Handles contact settings and form submissions
 */

import { BaseService } from "./base.service";
import {
  ContactSettings,
  ContactSettingsInsert,
  ContactSettingsUpdate,
  ContactSubmission,
  ContactSubmissionInsert,
  ContactSubmissionUpdate,
  ContactSubmissionStatus,
  ApiResponse,
} from "@/lib/types/database";

// Contact Settings Service
class ContactSettingsService extends BaseService<
  ContactSettings,
  ContactSettingsInsert,
  ContactSettingsUpdate
> {
  constructor() {
    super("contact_settings");
  }

  /**
   * Get the main/first contact settings
   * (Typically there's only one record)
   */
  async getMain(): Promise<ApiResponse<ContactSettings>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select("*")
        .limit(1)
        .single();

      if (error) throw error;

      return { data: data as ContactSettings, error: null };
    } catch (error) {
      console.error("Error fetching main contact settings:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

// Contact Submissions Service
class ContactSubmissionsService extends BaseService<
  ContactSubmission,
  ContactSubmissionInsert,
  ContactSubmissionUpdate
> {
  constructor() {
    super("contact_submissions");
  }

  /**
   * Submit a new contact form
   */
  async submit(
    data: Omit<ContactSubmissionInsert, "status" | "ip_address" | "user_agent">,
  ): Promise<ApiResponse<ContactSubmission>> {
    try {
      const submission: ContactSubmissionInsert = {
        ...data,
        status: "new" as ContactSubmissionStatus,
        ip_address: null,
        user_agent: null,
        // ip_address and user_agent would be set server-side in a real implementation
      };

      const { data: record, error } = await this.supabase
        .from(this.tableName)
        .insert(submission as never)
        .select()
        .single();

      if (error) throw error;

      return { data: record as ContactSubmission, error: null };
    } catch (error) {
      console.error("Error submitting contact form:", error);
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
    status: ContactSubmissionStatus,
  ): Promise<ApiResponse<ContactSubmission[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select("*")
        .eq("status", status)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return { data: data as ContactSubmission[], error: null };
    } catch (error) {
      console.error("Error fetching submissions by status:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Get new (unread) submissions
   */
  async getNew(): Promise<ApiResponse<ContactSubmission[]>> {
    return this.getByStatus("new" as ContactSubmissionStatus);
  }

  /**
   * Get submissions assigned to a user
   */
  async getAssignedTo(
    userId: string,
  ): Promise<ApiResponse<ContactSubmission[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select("*")
        .eq("assigned_to", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return { data: data as ContactSubmission[], error: null };
    } catch (error) {
      console.error("Error fetching assigned submissions:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Update submission status
   */
  async updateStatus(
    id: string,
    status: ContactSubmissionStatus,
    notes?: string,
  ): Promise<ApiResponse<ContactSubmission>> {
    try {
      const updateData: Partial<ContactSubmission> = { status };
      if (notes) {
        updateData.notes = notes;
      }

      const { data, error } = await this.supabase
        .from(this.tableName)
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      return { data: data as ContactSubmission, error: null };
    } catch (error) {
      console.error("Error updating submission status:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Assign submission to user
   */
  async assignTo(
    id: string,
    userId: string,
  ): Promise<ApiResponse<ContactSubmission>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .update({ assigned_to: userId })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      return { data: data as ContactSubmission, error: null };
    } catch (error) {
      console.error("Error assigning submission:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Mark as spam
   */
  async markAsSpam(id: string): Promise<ApiResponse<ContactSubmission>> {
    return this.updateStatus(id, "spam" as ContactSubmissionStatus);
  }

  /**
   * Search submissions
   */
  async search(query: string): Promise<ApiResponse<ContactSubmission[]>> {
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select("*")
        .or(
          `name.ilike.%${query}%,email.ilike.%${query}%,subject.ilike.%${query}%,message.ilike.%${query}%`,
        )
        .order("created_at", { ascending: false });

      if (error) throw error;

      return { data: data as ContactSubmission[], error: null };
    } catch (error) {
      console.error("Error searching submissions:", error);
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Get submission statistics
   */
  async getStats(): Promise<{
    total: number;
    new: number;
    in_progress: number;
    resolved: number;
    spam: number;
  }> {
    try {
      const [total, newCount, inProgress, resolved, spam] = await Promise.all([
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
      ]);

      return {
        total,
        new: newCount,
        in_progress: inProgress,
        resolved,
        spam,
      };
    } catch (error) {
      console.error("Error fetching submission stats:", error);
      return {
        total: 0,
        new: 0,
        in_progress: 0,
        resolved: 0,
        spam: 0,
      };
    }
  }
}

// Export singleton instances
export const contactSettingsService = new ContactSettingsService();
export const contactSubmissionsService = new ContactSubmissionsService();
