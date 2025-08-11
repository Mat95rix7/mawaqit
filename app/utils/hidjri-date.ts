
export function getHijriDate(date: Date) {
  // const date = new Date();
  return new Intl.DateTimeFormat("ar-dz-u-ca-islamic", {
    weekday: 'long',
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}