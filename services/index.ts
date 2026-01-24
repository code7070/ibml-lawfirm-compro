/**
 * Services Barrel Export
 * Centralized export for all service instances
 *
 * Usage:
 * import { lawyersService, articlesService } from '@/services';
 */

// Export all service instances
export { lawyersService } from './lawyers.service';
export { lawyerPositionsService } from './lawyer-positions.service';
export { articlesService } from './articles.service';
export { articleCategoriesService } from './article-categories.service';
export { eventsService } from './events.service';
export { practiceAreasService } from './practice-areas.service';
export { practiceGroupsService } from './practice-groups.service';
export { testimonialsService } from './testimonials.service';
export { clientsService } from './clients.service';
export { contactSettingsService, contactSubmissionsService } from './contact.service';
export { jobsService } from './jobs.service';

// Export base service for extension (if needed)
export { BaseService } from './base.service';

// Re-export LawyerPosition types from service (until database.ts is synced)
export type {
  LawyerPosition,
  LawyerPositionInsert,
  LawyerPositionUpdate,
  LawyerPositionWithCount,
} from './lawyer-positions.service';

// Re-export types for convenience
export type {
  ApiResponse,
  PaginatedResponse,
  // Lawyers
  Lawyer,
  LawyerInsert,
  LawyerUpdate,
  LawyerWithPracticeAreas,
  LawyerWithPositionAndPracticeAreas,
  LawyerFilters,
  LawyerStatus,
  LawyerSeniority,
  // Articles
  Article,
  ArticleInsert,
  ArticleUpdate,
  ArticleWithCategory,
  ArticleCategory,
  ArticleCategoryInsert,
  ArticleCategoryUpdate,
  ArticleFilters,
  ArticleStatus,
  // Events
  Event,
  EventInsert,
  EventUpdate,
  EventFilters,
  EventStatus,
  // Practice Areas & Groups
  PracticeArea,
  PracticeAreaInsert,
  PracticeAreaUpdate,
  PracticeAreaWithGroup,
  PracticeGroup,
  PracticeGroupInsert,
  PracticeGroupUpdate,
  // Testimonials
  Testimonial,
  TestimonialInsert,
  TestimonialUpdate,
  // Clients
  Client,
  ClientInsert,
  ClientUpdate,
  // Contact
  ContactSettings,
  ContactSettingsInsert,
  ContactSettingsUpdate,
  ContactSubmission,
  ContactSubmissionInsert,
  ContactSubmissionUpdate,
  ContactSubmissionStatus,
  // Jobs
  JobOpening,
  JobOpeningInsert,
  JobOpeningUpdate,
  JobFilters,
  JobStatus,
  JobType,
} from '@/lib/types/database';
