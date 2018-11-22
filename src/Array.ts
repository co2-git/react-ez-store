import Store from './Store'

type ArrayStoreValue<T> = T[] | null

export type ArrayStoreType<T> = { value: ArrayStoreValue<T> }

export default class ArrayStore<T extends any> extends Store {
  public original: ArrayStoreValue<T>

  public value: ArrayStoreValue<T>

  public constructor(array: ArrayStoreValue<T> = []) {
    super()
    if (array === null) {
      this.original = null
      this.value = null
    } else {
      this.original = [...array]
      this.value = [...array]
    }
  }

  public reset = async () => {
    if (this.original === null) {
      this.value = null
    } else {
      this.value = [...this.original]
    }
    await this.update()
  }

  public get = () => this.value === null ? null : [...this.value]

  public set = async (array: ArrayStoreValue<T>) => {
    this.value = array
    await this.update()
  }

  public push = async (...items: any[]) => {
    if (this.value !== null) {
      this.value.push(...items)
      await this.update()
    }
  }

  public pop = async () => {
    if (this.value !== null) {
      this.value.pop()
      await this.update()
    }
  }

  public shift = async () => {
    if (this.value !== null) {
      this.value.shift()
      await this.update()
    }
  }

  public map = async (mapper: (item: any, index: number, array: any[]) => any) => {
    if (this.value !== null) {
      this.value = this.value.map(mapper)
      await this.update()
    }
  }

  public filter = async (fn: (item: any, index: number, array: any[]) => boolean) => {
    if (this.value !== null) {
      this.value = this.value.filter(fn)
      await this.update()
    }
  }
}
