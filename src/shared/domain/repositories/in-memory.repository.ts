import { Entity } from '../entities/entity'
import { NotFoundError } from '../errors/not-found-error'
import { RepositoryInterface } from './repository-contract'

export abstract class InMemoryRepository<E extends Entity>
  implements RepositoryInterface<E>
{
  private _items: E[] = []

  async insert(entity: E): Promise<void> {
    this._items.push(entity)
  }

  get items() {
    return this._items
  }

  async findById(id: string): Promise<E> {
    const index = await this.getIndexById(id)
    const entity = this._items[index]

    return entity
  }

  async findAll(): Promise<E[]> {
    return this._items
  }

  async update(entity: E): Promise<void> {
    const index = await this.getIndexById(entity.id)
    this._items[index] = entity //Tá diferente da aula
  }

  async delete(id: string): Promise<void> {
    const index = await this.getIndexById(id)
    this._items.splice(index, 1)
  }

  private async getIndexById(id: string): Promise<number> {
    const index = this._items.findIndex(i => i.id === id)
    if (index === -1) throw new NotFoundError('Entity Not Found')

    return index
  }
}
