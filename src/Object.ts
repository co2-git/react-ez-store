import Store from './Store'

export interface TObject {
  [key: string]: any
}

export type ObjectStoreType = { value: TObject }

export default class ObjectStore extends Store {
  private original = {}

  private value = {}

  public constructor(obj: TObject) {
    super()
    this.original = { ...obj }
    this.value = { ...obj }
  }

  public reset = async () => {
    this.value = this.original
    await this.update()
  }

  public get = () => this.value

  public set = async (obj: TObject) => {
    this.value = obj
    await this.update()
  }

  public assign = async (obj: TObject) => {
    this.value = {
      ...this.value,
      ...obj,
    }
    await this.update()
  }
}
