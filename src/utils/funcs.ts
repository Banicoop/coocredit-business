export function formatDate(date: Date) {
  const options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  } as const;
  return date.toLocaleDateString('en-GB', options);
}

