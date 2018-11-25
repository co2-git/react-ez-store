import Store from './Store'

type ObjectStoreValue<T> = | T | {} | null

export default class ObjectStore<T> extends Store {
  public original: ObjectStoreValue<T>

  public value: ObjectStoreValue<T>

  public constructor(obj: ObjectStoreValue<T> = {}) {
    super()
    if (obj === null) {
      this.original = null
      this.value = null
    } else {
      this.original = { ...Object(obj) }
      this.value = { ...Object(obj) }
    }
  }

  public reset = async () => {
    this.value = this.original
    await this.update()
  }

  public get = () => this.value

  public isNull = () => this.value === null

  public replace = async (obj: T) => {
    this.value = obj
  }

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
