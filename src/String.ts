import Store from './Store'

export type StringStoreType = { value: string }

export default class StringStore extends Store {
  private original = ''

  private value = ''

  public constructor(str: string) {
    super()
    this.original = str
    this.value = str
  }

  public reset = async () => {
    this.value = this.original
    await this.update()
  }

  public get = () => this.value

  public set = async (str: string) => {
    this.value = str
    await this.update()
  }
}
