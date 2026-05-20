/**
 * Date Formatting Utilities
 * Shared across server components (SSR) and client components
 *
 * Usage:
 *   formatArticleDate(published_at, created_at, locale)
 *   formatDate(isoString, locale)
 */

/**
 * Format a date string for article display
 * Falls back gracefully: published_at → created_at → null (hides date)
 *
 * @param publishedAt - The publication date (ISO string or null)
 * @param createdAt - The creation date (ISO string or null)
 * @param locale - 'en' or 'id'
 * @returns Formatted date string, or null if no date available
 */
export function formatArticleDate(
  publishedAt: string | null | undefined,
  createdAt: string | null | undefined,
  locale: string,
): string | null {
  const dateStr = publishedAt || createdAt;
  if (!dateStr) return null;

  return formatDate(dateStr, locale);
}

/**
 * Format an ISO date string to human-readable format
 *
 * @param dateStr - ISO date string
 * @param locale - 'en' or 'id'
 * @returns Formatted date string (e.g. "January 15, 2024" or "15 Januari 2024")
 */
export function formatDate(
  dateStr: string,
  locale: string,
): string {
  try {
    const date = new Date(dateStr);
    // Check if date is valid
    if (isNaN(date.getTime())) return '';
    
    return date.toLocaleDateString(
      locale === 'id' ? 'id-ID' : 'en-US',
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    );
  } catch {
    return '';
  }
}
