import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'
import { ClassValidatorFields } from '../../class-validator-fields'

class StubRules {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string

  @IsNotEmpty()
  @IsNumber()
  amount: number

  constructor(data: any) {
    Object.assign(this, data)
  }
}

class StubClassValidatorFields extends ClassValidatorFields<StubRules> {
  validate(data: any): boolean {
    return super.validate(new StubRules(data))
  }
}

describe('ClassValidator integration tests', () => {
  it('Should validate with errors', () => {
    const sut = new StubClassValidatorFields()
    expect(sut.validate(null)).toBeFalsy()
    expect(sut.errors).toStrictEqual({
      title: [
        'title must be shorter than or equal to 255 characters',
        'title must be a string',
        'title should not be empty',
      ],
      amount: [
        'amount must be a number conforming to the specified constraints',
        'amount should not be empty',
      ],
    })
  })

  it('Should validate without errors', () => {
    const sut = new StubClassValidatorFields()
    expect(sut.validate({ title: 'market', amount: 200 })).toBeTruthy()
    expect(sut.errors).toBeNull()
    expect(sut.validatedData).toStrictEqual(
      new StubRules({ title: 'market', amount: 200 }),
    )
  })
})
