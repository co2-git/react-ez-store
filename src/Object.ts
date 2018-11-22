import Store from './Store'

export default class ObjectStore<T> extends Store {
  public original: T | {} = {}

  public value: T | {}

  public constructor(obj: T | {} = {}) {
    super()
    this.original = { ...(obj as object) }
    this.value = { ...(obj as object) }
  }

  public reset = async () => {
    this.value = this.original
    await this.update()
  }

  public get = () => this.value

  public set = async (obj: T) => {
    this.value = obj
    await this.update()
  }

  public assign = async (obj: Partial<T>) => {
    this.value = {
      ...(this.value as object),
      ...(obj as object),
    }
    await this.update()
  }
}
