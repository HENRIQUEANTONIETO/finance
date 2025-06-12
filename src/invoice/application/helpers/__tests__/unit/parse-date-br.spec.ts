import { parseDateBR } from '../../parse-date-br'

describe('parseDateBR', () => {
  it('should parse a valid BR date string', () => {
    const result = parseDateBR('27/04/2025')
    expect(result).toBeInstanceOf(Date)
    expect(result?.getFullYear()).toBe(2025)
    expect(result?.getMonth()).toBe(3) // mês é zero-based
    expect(result?.getDate()).toBe(27)
  })

  it('should parse ISO date format yyyy-mm-dd', () => {
    const result = parseDateBR('2024-07-24')
    expect(result).toBeInstanceOf(Date)
    expect(result?.getFullYear()).toBe(2024)
    expect(result?.getMonth()).toBe(6)
    expect(result?.getDate()).toBe(24)
  })

  it('should return null for invalid date format', () => {
    expect(parseDateBR(2025 as any)).toBeNull()
    expect(parseDateBR('')).toBeNull()
    expect(parseDateBR('abc')).toBeNull()
  })
})
