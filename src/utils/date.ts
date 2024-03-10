export function toStringYYYYMMDD_HHMMSS(date: number): string {
  const d = new Date(date * 1000)
  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`
}
