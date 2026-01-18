/**
 * Database Types - IBLM Law Firm Platform
 * Auto-generated from Supabase schema
 *
 * These types are shared between next/ (frontend) and cms2/ (CMS dashboard)
 */

// ============================================================================
// ENUMS
// ============================================================================

export type LawyerStatus = 'active' | 'inactive' | 'archived';
export type LawyerSeniority = 'partner' | 'senior_associate' | 'associate' | 'junior_associate' | 'counsel' | 'of_counsel';
export type ArticleStatus = 'draft' | 'published' | 'archived';
export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
export type ContactSubmissionStatus = 'new' | 'in_progress' | 'resolved' | 'spam';
export type JobStatus = 'open' | 'closed' | 'filled';
export type JobType = 'full_time' | 'part_time' | 'contract' | 'internship';
export type ActivityAction = 'create' | 'update' | 'delete';

// ============================================================================
// TABLE TYPES
// ============================================================================

export interface Lawyer {
  id: string;
  name_id: string;
  name_en: string;
  slug: string;
  title_id: string | null;
  title_en: string | null;
  email: string | null;
  phone: string | null;
  photo_url: string | null;
  bio_id: string | null;
  bio_en: string | null;
  education_id: string | null;
  education_en: string | null;
  experience_years: number | null;
  seniority: LawyerSeniority;
  bar_admission: string | null;
  languages: string[] | null;
  linkedin_url: string | null;
  status: LawyerStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PracticeGroup {
  id: string;
  name_id: string;
  name_en: string;
  slug: string;
  description_id: string | null;
  description_en: string | null;
  icon: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PracticeArea {
  id: string;
  practice_group_id: string;
  name_id: string;
  name_en: string;
  slug: string;
  description_id: string | null;
  description_en: string | null;
  icon: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface LawyerPracticeArea {
  lawyer_id: string;
  practice_area_id: string;
  is_primary: boolean;
  created_at: string;
}

export interface ArticleCategory {
  id: string;
  name_id: string;
  name_en: string;
  slug: string;
  description_id: string | null;
  description_en: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  category_id: string | null;
  author_id: string | null;
  title_id: string;
  title_en: string;
  slug: string;
  excerpt_id: string | null;
  excerpt_en: string | null;
  content_id: string;
  content_en: string;
  featured_image_url: string | null;
  status: ArticleStatus;
  published_at: string | null;
  views: number;
  reading_time_minutes: number | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  title_id: string;
  title_en: string;
  slug: string;
  description_id: string | null;
  description_en: string | null;
  event_date: string;
  end_date: string | null;
  location_id: string | null;
  location_en: string | null;
  event_type: string | null;
  registration_url: string | null;
  image_url: string | null;
  status: EventStatus;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_position_id: string | null;
  client_position_en: string | null;
  client_company: string | null;
  content_id: string;
  content_en: string;
  rating: number | null;
  photo_url: string | null;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  industry: string | null;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ContactSettings {
  id: string;
  office_name_id: string;
  office_name_en: string;
  address_id: string;
  address_en: string;
  city: string;
  postal_code: string | null;
  phone: string;
  whatsapp: string | null;
  email: string;
  working_hours_id: string | null;
  working_hours_en: string | null;
  google_maps_url: string | null;
  latitude: number | null;
  longitude: number | null;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string;
  message: string;
  preferred_contact_method: string | null;
  status: ContactSubmissionStatus;
  notes: string | null;
  assigned_to: string | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
  updated_at: string;
}

export interface JobOpening {
  id: string;
  title_id: string;
  title_en: string;
  slug: string;
  department_id: string | null;
  department_en: string | null;
  location_id: string | null;
  location_en: string | null;
  job_type: JobType;
  description_id: string;
  description_en: string;
  requirements_id: string | null;
  requirements_en: string | null;
  responsibilities_id: string | null;
  responsibilities_en: string | null;
  qualifications_id: string | null;
  qualifications_en: string | null;
  salary_range: string | null;
  application_deadline: string | null;
  status: JobStatus;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  table_name: string;
  record_id: string;
  action: ActivityAction;
  old_data: Record<string, unknown> | null;
  new_data: Record<string, unknown> | null;
  user_id: string | null;
  user_email: string | null;
  ip_address: string | null;
  created_at: string;
}

// ============================================================================
// JOINED/EXTENDED TYPES (for complex queries)
// ============================================================================

export interface LawyerWithPracticeAreas extends Lawyer {
  practice_areas?: PracticeArea[];
}

export interface ArticleWithCategory extends Article {
  category?: ArticleCategory;
  author?: Lawyer;
}

export interface PracticeAreaWithGroup extends PracticeArea {
  practice_group?: PracticeGroup;
}

// ============================================================================
// INSERT/UPDATE TYPES (without auto-generated fields)
// ============================================================================

export type LawyerInsert = Omit<Lawyer, 'id' | 'created_at' | 'updated_at'>;
export type LawyerUpdate = Partial<LawyerInsert>;

export type PracticeGroupInsert = Omit<PracticeGroup, 'id' | 'created_at' | 'updated_at'>;
export type PracticeGroupUpdate = Partial<PracticeGroupInsert>;

export type PracticeAreaInsert = Omit<PracticeArea, 'id' | 'created_at' | 'updated_at'>;
export type PracticeAreaUpdate = Partial<PracticeAreaInsert>;

export type ArticleCategoryInsert = Omit<ArticleCategory, 'id' | 'created_at' | 'updated_at'>;
export type ArticleCategoryUpdate = Partial<ArticleCategoryInsert>;

export type ArticleInsert = Omit<Article, 'id' | 'created_at' | 'updated_at'>;
export type ArticleUpdate = Partial<ArticleInsert>;

export type EventInsert = Omit<Event, 'id' | 'created_at' | 'updated_at'>;
export type EventUpdate = Partial<EventInsert>;

export type TestimonialInsert = Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>;
export type TestimonialUpdate = Partial<TestimonialInsert>;

export type ClientInsert = Omit<Client, 'id' | 'created_at' | 'updated_at'>;
export type ClientUpdate = Partial<ClientInsert>;

export type ContactSettingsInsert = Omit<ContactSettings, 'id' | 'created_at' | 'updated_at'>;
export type ContactSettingsUpdate = Partial<ContactSettingsInsert>;

export type ContactSubmissionInsert = Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at'>;
export type ContactSubmissionUpdate = Partial<ContactSubmissionInsert>;

export type JobOpeningInsert = Omit<JobOpening, 'id' | 'created_at' | 'updated_at'>;
export type JobOpeningUpdate = Partial<JobOpeningInsert>;

// ============================================================================
// QUERY FILTERS
// ============================================================================

export interface LawyerFilters {
  status?: LawyerStatus;
  seniority?: LawyerSeniority;
  practice_area_id?: string;
  search?: string;
}

export interface ArticleFilters {
  category_id?: string;
  author_id?: string;
  status?: ArticleStatus;
  tag?: string;
  search?: string;
}

export interface EventFilters {
  status?: EventStatus;
  is_featured?: boolean;
  from_date?: string;
  to_date?: string;
}

export interface JobFilters {
  status?: JobStatus;
  job_type?: JobType;
  department?: string;
  location?: string;
}

// ============================================================================
// API RESPONSE TYPES
// ============================================================================

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  count?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
