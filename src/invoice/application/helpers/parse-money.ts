export function parseMoney(value: string): number {
  if (!value) return NaN
  return Number(
    value.replace(/\s/g, '').replace('R$', '').replace(/\./g, '').replace(',', '.'),
  )
}
