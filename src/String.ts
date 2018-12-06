import Store from './Store'

export default class StringStore extends Store {
  public original: string

  public value: string

  public constructor(str: string = '' as string) {
    super()
    this.original = str
    this.value = str
  }

  public reset = async () => {
    this.value = this.original
    await this.update()
  }

  public is = (val: string) => this.get() === val

  public get = () => this.value

  public set = async (str: string) => {
    this.value = str
    await this.update()
  }

  public replace = async (str: string) => {
    this.value = str
  }
}
