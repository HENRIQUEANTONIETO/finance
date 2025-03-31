import { Entity } from '../../entity'

type StubProps = {
  prop1: string
  prop2: number
}

class StubEntity extends Entity<StubProps> {}

const props: StubProps = {
  prop1: 'Henrique',
  prop2: 26,
}

const entity = new StubEntity(props)
describe('Entity unit tests', () => {
  it('Should instantiate an Entity class', () => {
    expect(entity.props).toStrictEqual(props)
    expect(entity.id).toBeDefined()
  })

  it('Should validate toJSON method', () => {
    expect(entity.toJSON()).toStrictEqual({
      id: entity.id,
      ...props,
    })
  })
})
