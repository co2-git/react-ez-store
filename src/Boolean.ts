import Store from './Store'

export type BooleanStoreType = { value: boolean }

export default class BooleanStore extends Store {
  private original: boolean

  private value: boolean

  public constructor(bool: boolean) {
    super()
    this.original = bool
    this.value = bool
  }

  public reset = async () => {
    this.value = this.original
    await this.update()
  }

  public get = () => this.value

  public set = async (bool: boolean) => {
    this.value = bool
    await this.update()
  }

  public toggle = async () => {
    this.value = !this.value
    await this.update()
  }
}
