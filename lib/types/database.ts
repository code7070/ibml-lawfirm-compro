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
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
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

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;


// --- Helper Types ---

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];
export type Insertable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type Updateable<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];

export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
};

export type PaginatedResponse<T> = {
  data: T[];
  count: number | null;
  error: string | null;
  page?: number;
  pageSize?: number;
  totalPages?: number;
};

// Lawyers
export type Lawyer = Tables<'lawyers'>;
export type LawyerInsert = Insertable<'lawyers'>;
export type LawyerUpdate = Updateable<'lawyers'>;
export type LawyerStatus = 'active' | 'inactive' | string;
export type LawyerSeniority = string;

export interface LawyerFilters {
  status?: string;
  seniority?: string;
  practice_area_id?: string;
  search?: string;
}

// Lawyer Positions
export type LawyerPosition = Tables<'lawyer_positions'>;
export type LawyerPositionInsert = Insertable<'lawyer_positions'>;
export type LawyerPositionUpdate = Updateable<'lawyer_positions'>;

export type LawyerWithPosition = Lawyer & {
  lawyer_positions: LawyerPosition | null;
};

// Practice Areas
export type PracticeArea = Tables<'practice_areas'>;
export type PracticeAreaInsert = Insertable<'practice_areas'>;
export type PracticeAreaUpdate = Updateable<'practice_areas'>;

export type PracticeGroup = Tables<'practice_groups'>;
export type PracticeGroupInsert = Insertable<'practice_groups'>;
export type PracticeGroupUpdate = Updateable<'practice_groups'>;

export type PracticeAreaWithGroup = PracticeArea & {
  practice_groups: PracticeGroup | null;
};

// Extended types for joins
export type LawyerWithPracticeAreas = Lawyer & {
  practice_areas: {
    practice_area_id: string;
    practice_areas: PracticeArea | null; // Joined
  }[];
};

// Lawyer with both position and practice areas (for lawyers listing page)
export type LawyerWithPositionAndPracticeAreas = Lawyer & {
  lawyer_positions: LawyerPosition | null;
  practice_areas: {
    practice_area_id: string;
    practice_areas: PracticeArea | null;
  }[];
};

// Articles
export type Article = Tables<'articles'>;
export type ArticleInsert = Insertable<'articles'>;
export type ArticleUpdate = Updateable<'articles'>;
export type ArticleStatus = boolean; // is_published

export type ArticleCategory = Tables<'article_categories'>;
export type ArticleCategoryInsert = Insertable<'article_categories'>;
export type ArticleCategoryUpdate = Updateable<'article_categories'>;

export type ArticleWithCategory = Article & {
  article_categories: ArticleCategory | null;
  lawyers: Lawyer | null;
};

export interface ArticleFilters {
  category_id?: string;
  author_id?: string;
  is_published?: boolean;
  search?: string;
  tag?: string;
}

// Events
export type Event = Tables<'events'>;
export type EventInsert = Insertable<'events'>;
export type EventUpdate = Updateable<'events'>;
export type EventStatus = boolean; // is_active

export interface EventFilters {
  is_active?: boolean;
  upcoming?: boolean;
  from_date?: string;
  to_date?: string;
}

// Testimonials
export type Testimonial = Tables<'testimonials'>;
export type TestimonialInsert = Insertable<'testimonials'>;
export type TestimonialUpdate = Updateable<'testimonials'>;

// Clients
export type Client = Tables<'clients'>;
export type ClientInsert = Insertable<'clients'>;
export type ClientUpdate = Updateable<'clients'>;

// Contact
export type ContactSettings = Tables<'contact_settings'>;
export type ContactSettingsInsert = Insertable<'contact_settings'>;
export type ContactSettingsUpdate = Updateable<'contact_settings'>;

export type ContactSubmission = Tables<'contact_submissions'>;
export type ContactSubmissionInsert = Insertable<'contact_submissions'>;
export type ContactSubmissionUpdate = Updateable<'contact_submissions'>;
export type ContactSubmissionStatus = string;

// Jobs
export type JobOpening = Tables<'job_openings'>;
export type JobOpeningInsert = Insertable<'job_openings'>;
export type JobOpeningUpdate = Updateable<'job_openings'>;
export type JobStatus = boolean; // is_active
export type JobType = string;

export interface JobFilters {
  is_active?: boolean;
  department?: string;
  location?: string;
}
