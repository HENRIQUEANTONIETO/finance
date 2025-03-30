import { randomUUID } from 'node:crypto'

export abstract class Entity<Props = any> {
  protected readonly _id: string
  public readonly props: Props

  constructor(props: Props) {
    this.props = props
    this._id = randomUUID()
  }

  get id(): string {
    return this._id
  }

  toJSON(): { id: string } & Props {
    return {
      id: this._id,
      ...this.props,
    }
  }
}
