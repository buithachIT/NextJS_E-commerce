export function formatDateToLongString(dateString: string): string {
  const [datePart] = dateString.split(' ');
  const date = new Date(datePart);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
