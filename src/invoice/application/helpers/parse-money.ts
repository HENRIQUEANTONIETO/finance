export function parseMoney(value: string | number): number {
  if (!value) return NaN
  if (typeof value === 'number') return value
  return Number(
    value.replace(/\s/g, '').replace('R$', '').replace(/\./g, '').replace(',', '.'),
  )
}
