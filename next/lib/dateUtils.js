
import { format, parseISO, formatDistanceToNow } from 'date-fns';

export const formatBlogDate = (dateString) => {
  const date = parseISO(dateString);
  return format(date, 'MMMM dd, yyyy');
};

export const formatRelativeDate = (dateString) => {
  const date = parseISO(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

export const formatDateShort = (dateString) => {
  const date = parseISO(dateString);
  return format(date, 'MMM dd, yyyy');
};
