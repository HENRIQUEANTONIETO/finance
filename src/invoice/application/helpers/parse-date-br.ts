export function parseDateBR(input: string): Date | null {
  if (!input) return null
  if (typeof input !== 'string') return null

  // Tenta o formato ISO: yyyy-mm-dd
  const isoMatch = input.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (isoMatch) {
    const [_, year, month, day] = isoMatch
    const date = new Date(Number(year), Number(month) - 1, Number(day))
    return isNaN(date.getTime()) ? null : date
  }

  // Tenta o formato brasileiro: dd/mm/yyyy
  const brMatch = input.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (brMatch) {
    const [_, day, month, year] = brMatch
    const date = new Date(Number(year), Number(month) - 1, Number(day))
    return isNaN(date.getTime()) ? null : date
  }

  return null
}
