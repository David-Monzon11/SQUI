/**
 * Formats a Date object to YYYY-MM-DD string format
 */
export const formatDateToKey = (date: Date = new Date()): string => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Validates if string matches YYYY-MM-DD
 */
export const isValidDateKey = (dateStr: string): boolean => {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
};
