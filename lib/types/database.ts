export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1";
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string;
          created_at: string | null;
          id: string;
          ip_address: unknown;
          new_data: Json | null;
          old_data: Json | null;
          record_id: string | null;
          table_name: string | null;
          user_agent: string | null;
          user_email: string | null;
          user_id: string | null;
        };
        Insert: {
          action: string;
          created_at?: string | null;
          id?: string;
          ip_address?: unknown;
          new_data?: Json | null;
          old_data?: Json | null;
          record_id?: string | null;
          table_name?: string | null;
          user_agent?: string | null;
          user_email?: string | null;
          user_id?: string | null;
        };
        Update: {
          action?: string;
          created_at?: string | null;
          id?: string;
          ip_address?: unknown;
          new_data?: Json | null;
          old_data?: Json | null;
          record_id?: string | null;
          table_name?: string | null;
          user_agent?: string | null;
          user_email?: string | null;
          user_id?: string | null;
        };
        Relationships: [];
      };
      article_categories: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          id: string;
          is_active: boolean | null;
          name_en: string;
          name_id: string;
          slug: string;
          sort_order: number | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          id?: string;
          is_active?: boolean | null;
          name_en: string;
          name_id: string;
          slug: string;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          id?: string;
          is_active?: boolean | null;
          name_en?: string;
          name_id?: string;
          slug?: string;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      articles: {
        Row: {
          author_id: string | null;
          category_id: string | null;
          content_en: string;
          content_id: string;
          cover_url: string | null;
          created_at: string | null;
          created_by: string | null;
          excerpt_en: string | null;
          excerpt_id: string | null;
          id: string;
          is_published: boolean | null;
          meta_description_en: string | null;
          meta_description_id: string | null;
          published_at: string | null;
          slug: string;
          tags: string[] | null;
          title_en: string;
          title_id: string;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          author_id?: string | null;
          category_id?: string | null;
          content_en: string;
          content_id: string;
          cover_url?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          excerpt_en?: string | null;
          excerpt_id?: string | null;
          id?: string;
          is_published?: boolean | null;
          meta_description_en?: string | null;
          meta_description_id?: string | null;
          published_at?: string | null;
          slug: string;
          tags?: string[] | null;
          title_en: string;
          title_id: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          author_id?: string | null;
          category_id?: string | null;
          content_en?: string;
          content_id?: string;
          cover_url?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          excerpt_en?: string | null;
          excerpt_id?: string | null;
          id?: string;
          is_published?: boolean | null;
          meta_description_en?: string | null;
          meta_description_id?: string | null;
          published_at?: string | null;
          slug?: string;
          tags?: string[] | null;
          title_en?: string;
          title_id?: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "articles_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "lawyers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "articles_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "article_categories";
            referencedColumns: ["id"];
          },
        ];
      };
      clients: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          id: string;
          logo_url: string | null;
          name: string;
          sort_order: number | null;
          status: string | null;
          type: string | null;
          updated_at: string | null;
          updated_by: string | null;
          website_url: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          id?: string;
          logo_url?: string | null;
          name: string;
          sort_order?: number | null;
          status?: string | null;
          type?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
          website_url?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          id?: string;
          logo_url?: string | null;
          name?: string;
          sort_order?: number | null;
          status?: string | null;
          type?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
          website_url?: string | null;
        };
        Relationships: [];
      };
      cms_users: {
        Row: {
          created_at: string | null;
          email: string;
          id: string;
          is_active: boolean | null;
          last_login_at: string | null;
          name: string | null;
          password_hash: string;
          role: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          id?: string;
          is_active?: boolean | null;
          last_login_at?: string | null;
          name?: string | null;
          password_hash: string;
          role?: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          id?: string;
          is_active?: boolean | null;
          last_login_at?: string | null;
          name?: string | null;
          password_hash?: string;
          role?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      contact_settings: {
        Row: {
          address_map_link: string | null;
          address_text: string | null;
          created_at: string | null;
          created_by: string | null;
          email: string | null;
          id: string;
          instagram_url: string | null;
          linkedin_url: string | null;
          phone_primary: string | null;
          phone_secondary: string | null;
          twitter_url: string | null;
          updated_at: string | null;
          updated_by: string | null;
          whatsapp: string | null;
          youtube_url: string | null;
        };
        Insert: {
          address_map_link?: string | null;
          address_text?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          email?: string | null;
          id?: string;
          instagram_url?: string | null;
          linkedin_url?: string | null;
          phone_primary?: string | null;
          phone_secondary?: string | null;
          twitter_url?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
          whatsapp?: string | null;
          youtube_url?: string | null;
        };
        Update: {
          address_map_link?: string | null;
          address_text?: string | null;
          created_at?: string | null;
          created_by?: string | null;
          email?: string | null;
          id?: string;
          instagram_url?: string | null;
          linkedin_url?: string | null;
          phone_primary?: string | null;
          phone_secondary?: string | null;
          twitter_url?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
          whatsapp?: string | null;
          youtube_url?: string | null;
        };
        Relationships: [];
      };
      contact_submissions: {
        Row: {
          admin_notes: string | null;
          assigned_to: string | null;
          created_by: string | null;
          email: string;
          id: string;
          ip_address: unknown;
          message: string;
          name: string;
          phone: string | null;
          referrer: string | null;
          responded_at: string | null;
          status: string | null;
          subject: string | null;
          submitted_at: string | null;
          updated_at: string | null;
          updated_by: string | null;
          user_agent: string | null;
        };
        Insert: {
          admin_notes?: string | null;
          assigned_to?: string | null;
          created_by?: string | null;
          email: string;
          id?: string;
          ip_address?: unknown;
          message: string;
          name: string;
          phone?: string | null;
          referrer?: string | null;
          responded_at?: string | null;
          status?: string | null;
          subject?: string | null;
          submitted_at?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
          user_agent?: string | null;
        };
        Update: {
          admin_notes?: string | null;
          assigned_to?: string | null;
          created_by?: string | null;
          email?: string;
          id?: string;
          ip_address?: unknown;
          message?: string;
          name?: string;
          phone?: string | null;
          referrer?: string | null;
          responded_at?: string | null;
          status?: string | null;
          subject?: string | null;
          submitted_at?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
          user_agent?: string | null;
        };
        Relationships: [];
      };
      events: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          description_en: string | null;
          description_id: string | null;
          end_date: string | null;
          event_date: string;
          event_type: string | null;
          id: string;
          image_url: string | null;
          is_active: boolean | null;
          location_en: string | null;
          location_id: string | null;
          max_participants: number | null;
          registration_url: string | null;
          title_en: string;
          title_id: string;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          description_en?: string | null;
          description_id?: string | null;
          end_date?: string | null;
          event_date: string;
          event_type?: string | null;
          id?: string;
          image_url?: string | null;
          is_active?: boolean | null;
          location_en?: string | null;
          location_id?: string | null;
          max_participants?: number | null;
          registration_url?: string | null;
          title_en: string;
          title_id: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          description_en?: string | null;
          description_id?: string | null;
          end_date?: string | null;
          event_date?: string;
          event_type?: string | null;
          id?: string;
          image_url?: string | null;
          is_active?: boolean | null;
          location_en?: string | null;
          location_id?: string | null;
          max_participants?: number | null;
          registration_url?: string | null;
          title_en?: string;
          title_id?: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      job_openings: {
        Row: {
          application_deadline: string | null;
          benefits_en: string[] | null;
          benefits_id: string[] | null;
          created_at: string | null;
          created_by: string | null;
          department: string | null;
          description_en: string;
          description_id: string;
          employment_type: string | null;
          experience_level: string | null;
          id: string;
          is_active: boolean | null;
          location_en: string | null;
          location_id: string | null;
          posted_date: string | null;
          requirements_en: string[] | null;
          requirements_id: string[] | null;
          responsibilities_en: string[] | null;
          responsibilities_id: string[] | null;
          salary_range: string | null;
          slug: string | null;
          sort_order: number | null;
          title_en: string;
          title_id: string;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          application_deadline?: string | null;
          benefits_en?: string[] | null;
          benefits_id?: string[] | null;
          created_at?: string | null;
          created_by?: string | null;
          department?: string | null;
          description_en: string;
          description_id: string;
          employment_type?: string | null;
          experience_level?: string | null;
          id?: string;
          is_active?: boolean | null;
          location_en?: string | null;
          location_id?: string | null;
          posted_date?: string | null;
          requirements_en?: string[] | null;
          requirements_id?: string[] | null;
          responsibilities_en?: string[] | null;
          responsibilities_id?: string[] | null;
          salary_range?: string | null;
          slug?: string | null;
          sort_order?: number | null;
          title_en: string;
          title_id: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          application_deadline?: string | null;
          benefits_en?: string[] | null;
          benefits_id?: string[] | null;
          created_at?: string | null;
          created_by?: string | null;
          department?: string | null;
          description_en?: string;
          description_id?: string;
          employment_type?: string | null;
          experience_level?: string | null;
          id?: string;
          is_active?: boolean | null;
          location_en?: string | null;
          location_id?: string | null;
          posted_date?: string | null;
          requirements_en?: string[] | null;
          requirements_id?: string[] | null;
          responsibilities_en?: string[] | null;
          responsibilities_id?: string[] | null;
          salary_range?: string | null;
          slug?: string | null;
          sort_order?: number | null;
          title_en?: string;
          title_id?: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      lawyer_positions: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          description_en: string | null;
          description_id: string | null;
          id: string;
          name_en: string;
          name_id: string;
          slug: string;
          sort_order: number | null;
          status: string | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          description_en?: string | null;
          description_id?: string | null;
          id?: string;
          name_en: string;
          name_id: string;
          slug: string;
          sort_order?: number | null;
          status?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          description_en?: string | null;
          description_id?: string | null;
          id?: string;
          name_en?: string;
          name_id?: string;
          slug?: string;
          sort_order?: number | null;
          status?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      lawyer_practice_areas: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          lawyer_id: string;
          practice_area_id: string;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          lawyer_id: string;
          practice_area_id: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          lawyer_id?: string;
          practice_area_id?: string;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "lawyer_practice_areas_lawyer_id_fkey";
            columns: ["lawyer_id"];
            isOneToOne: false;
            referencedRelation: "lawyers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "lawyer_practice_areas_practice_area_id_fkey";
            columns: ["practice_area_id"];
            isOneToOne: false;
            referencedRelation: "practice_areas";
            referencedColumns: ["id"];
          },
        ];
      };
      lawyers: {
        Row: {
          bio_en: string | null;
          bio_id: string | null;
          certifications: string[] | null;
          created_at: string | null;
          created_by: string | null;
          education: Json | null;
          email: string | null;
          experience: Json | null;
          id: string;
          is_active: boolean | null;
          languages: Json | null;
          lawyer_position_id: string | null;
          linkedin_url: string | null;
          name_en: string;
          name_id: string;
          phone: string | null;
          photo_url: string | null;
          position_en: string | null;
          position_id: string | null;
          slug: string | null;
          sort_order: number | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          bio_en?: string | null;
          bio_id?: string | null;
          certifications?: string[] | null;
          created_at?: string | null;
          created_by?: string | null;
          education?: Json | null;
          email?: string | null;
          experience?: Json | null;
          id?: string;
          is_active?: boolean | null;
          languages?: Json | null;
          lawyer_position_id?: string | null;
          linkedin_url?: string | null;
          name_en: string;
          name_id: string;
          phone?: string | null;
          photo_url?: string | null;
          position_en?: string | null;
          position_id?: string | null;
          slug?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          bio_en?: string | null;
          bio_id?: string | null;
          certifications?: string[] | null;
          created_at?: string | null;
          created_by?: string | null;
          education?: Json | null;
          email?: string | null;
          experience?: Json | null;
          id?: string;
          is_active?: boolean | null;
          languages?: Json | null;
          lawyer_position_id?: string | null;
          linkedin_url?: string | null;
          name_en?: string;
          name_id?: string;
          phone?: string | null;
          photo_url?: string | null;
          position_en?: string | null;
          position_id?: string | null;
          slug?: string | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "lawyers_lawyer_position_id_fkey";
            columns: ["lawyer_position_id"];
            isOneToOne: false;
            referencedRelation: "lawyer_positions";
            referencedColumns: ["id"];
          },
        ];
      };
      practice_areas: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          description_en: string | null;
          description_id: string | null;
          icon_url: string | null;
          id: string;
          meta_desc_en: string | null;
          meta_desc_id: string | null;
          meta_title_en: string | null;
          meta_title_id: string | null;
          name_en: string;
          name_id: string;
          practice_group_id: string | null;
          services_en: string[] | null;
          services_id: string[] | null;
          slug: string;
          sort_order: number | null;
          status: string | null;
          tagline_en: string | null;
          tagline_id: string | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          description_en?: string | null;
          description_id?: string | null;
          icon_url?: string | null;
          id?: string;
          meta_desc_en?: string | null;
          meta_desc_id?: string | null;
          meta_title_en?: string | null;
          meta_title_id?: string | null;
          name_en: string;
          name_id: string;
          practice_group_id?: string | null;
          services_en?: string[] | null;
          services_id?: string[] | null;
          slug: string;
          sort_order?: number | null;
          status?: string | null;
          tagline_en?: string | null;
          tagline_id?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          description_en?: string | null;
          description_id?: string | null;
          icon_url?: string | null;
          id?: string;
          meta_desc_en?: string | null;
          meta_desc_id?: string | null;
          meta_title_en?: string | null;
          meta_title_id?: string | null;
          name_en?: string;
          name_id?: string;
          practice_group_id?: string | null;
          services_en?: string[] | null;
          services_id?: string[] | null;
          slug?: string;
          sort_order?: number | null;
          status?: string | null;
          tagline_en?: string | null;
          tagline_id?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "practice_areas_practice_group_id_fkey";
            columns: ["practice_group_id"];
            isOneToOne: false;
            referencedRelation: "practice_groups";
            referencedColumns: ["id"];
          },
        ];
      };
      practice_groups: {
        Row: {
          created_at: string | null;
          created_by: string | null;
          description_en: string | null;
          description_id: string | null;
          icon_url: string | null;
          id: string;
          name_en: string;
          name_id: string;
          slug: string;
          sort_order: number | null;
          status: string | null;
          subtitle_en: string | null;
          subtitle_id: string | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string | null;
          created_by?: string | null;
          description_en?: string | null;
          description_id?: string | null;
          icon_url?: string | null;
          id?: string;
          name_en: string;
          name_id: string;
          slug: string;
          sort_order?: number | null;
          status?: string | null;
          subtitle_en?: string | null;
          subtitle_id?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string | null;
          created_by?: string | null;
          description_en?: string | null;
          description_id?: string | null;
          icon_url?: string | null;
          id?: string;
          name_en?: string;
          name_id?: string;
          slug?: string;
          sort_order?: number | null;
          status?: string | null;
          subtitle_en?: string | null;
          subtitle_id?: string | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          client_name: string;
          company: string | null;
          content_en: string;
          content_id: string;
          created_at: string | null;
          created_by: string | null;
          id: string;
          is_published: boolean | null;
          photo_url: string | null;
          position: string | null;
          rating: number | null;
          sort_order: number | null;
          updated_at: string | null;
          updated_by: string | null;
        };
        Insert: {
          client_name: string;
          company?: string | null;
          content_en: string;
          content_id: string;
          created_at?: string | null;
          created_by?: string | null;
          id?: string;
          is_published?: boolean | null;
          photo_url?: string | null;
          position?: string | null;
          rating?: number | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Update: {
          client_name?: string;
          company?: string | null;
          content_en?: string;
          content_id?: string;
          created_at?: string | null;
          created_by?: string | null;
          id?: string;
          is_published?: boolean | null;
          photo_url?: string | null;
          position?: string | null;
          rating?: number | null;
          sort_order?: number | null;
          updated_at?: string | null;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string | null;
          email: string;
          id: string;
          role: string;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          id: string;
          role: string;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          id?: string;
          role?: string;
          updated_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      cms_create_user: {
        Args: {
          p_email: string;
          p_name?: string;
          p_password: string;
          p_role?: string;
        };
        Returns: string;
      };
      cms_delete_user: { Args: { p_user_id: string }; Returns: boolean };
      cms_login: {
        Args: { p_email: string; p_password: string };
        Returns: {
          email: string;
          id: string;
          is_active: boolean;
          name: string;
          role: string;
        }[];
      };
      cms_update_password: {
        Args: { p_new_password: string; p_user_id: string };
        Returns: boolean;
      };
      create_cms_user: {
        Args: { p_email: string; p_password: string; p_role?: string };
        Returns: string;
      };
      delete_cms_user: {
        Args: { p_target_user_id: string };
        Returns: undefined;
      };
      get_user_role: { Args: never; Returns: string };
      slugify: { Args: { text: string }; Returns: string };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;

export type LawyerWithPositionAndPracticeAreas = Tables<"lawyers"> & {
  lawyer_positions: Tables<"lawyer_positions"> | null;
  practice_areas: (Tables<"lawyer_practice_areas"> & {
    practice_areas: Tables<"practice_areas"> | null;
  })[];
};

export type Client = Tables<"clients">;
export type ClientInsert = TablesInsert<"clients">;
export type ClientUpdate = TablesUpdate<"clients">;

export type PracticeGroup = Tables<"practice_groups">;
export type PracticeGroupInsert = TablesInsert<"practice_groups">;
export type PracticeGroupUpdate = TablesUpdate<"practice_groups">;

export type PracticeArea = Tables<"practice_areas">;
export type PracticeAreaInsert = TablesInsert<"practice_areas">;
export type PracticeAreaUpdate = TablesUpdate<"practice_areas">;

export type LawyerPosition = Tables<"lawyer_positions">;

export type Testimonial = Tables<"testimonials">;
export type TestimonialInsert = TablesInsert<"testimonials">;
export type TestimonialUpdate = TablesUpdate<"testimonials">;

export type ContactSettings = Tables<"contact_settings">;
export type ContactSettingsInsert = TablesInsert<"contact_settings">;
export type ContactSettingsUpdate = TablesUpdate<"contact_settings">;

export type ContactSubmission = Tables<"contact_submissions">;
export type ContactSubmissionInsert = TablesInsert<"contact_submissions">;
export type ContactSubmissionUpdate = TablesUpdate<"contact_submissions">;
export type ContactSubmissionStatus = "new" | "read" | "replied" | "spam" | "resolved" | "in_progress";

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
  error: string | null;
}

export type Event = Tables<"events">;
export type EventInsert = TablesInsert<"events">;
export type EventUpdate = TablesUpdate<"events">;
export type EventFilters = {
  is_active?: boolean;
  upcoming?: boolean;
  from_date?: string;
  to_date?: string;
};
export type EventStatus = "upcoming" | "past"; // Example
