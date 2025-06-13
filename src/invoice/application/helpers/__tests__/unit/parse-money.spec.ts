import { parseMoney } from '../../parse-money'

describe('parseMoney', () => {
  it('should parse a valid BRL money string', () => {
    expect(parseMoney('R$ 126,39')).toBeCloseTo(126.39)
    expect(parseMoney('R$ 1.234,56')).toBeCloseTo(1234.56)
  })

  it('should parse string without currency symbol', () => {
    expect(parseMoney('1.234,56')).toBeCloseTo(1234.56)
  })

  it('should just return the value if its Number', () => {
    expect(parseMoney(1234.56)).toBeCloseTo(1234.56)
  })

  it('should return NaN for invalid values', () => {
    expect(parseMoney('abc')).toBeNaN()
    expect(parseMoney(null)).toBeNaN()
  })
})
