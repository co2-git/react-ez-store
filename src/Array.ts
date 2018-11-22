import Store from './Store'
export type ArrayStoreType = { value: any[] }

export default class ArrayStore extends Store {
  public original: any[]

  public value: any[]

  public constructor(array: any[] = []) {
    super()
    this.original = [...array]
    this.value = array
  }

  public reset = async () => {
    this.value = [...this.original]
    await this.update()
  }

  public get = () => [...this.value]

  public set = async (array: any[]) => {
    this.value = array
    await this.update()
  }

  public push = async (...items: any[]) => {
    this.value.push(...items)
    await this.update()
  }

  public pop = async () => {
    this.value.pop()
    await this.update()
  }

  public shift = async () => {
    this.value.shift()
    await this.update()
  }

  public map = async (mapper: (item: any, index: number, array: any[]) => any) => {
    this.value = this.value.map(mapper)
    await this.update()
  }

  public filter = async (fn: (item: any, index: number, array: any[]) => boolean) => {
    this.value = this.value.filter(fn)
    await this.update()
  }
}
