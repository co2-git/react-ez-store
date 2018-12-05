import Store from './Store'

export default class StringStore<S extends string = string> extends Store {
  public original: S

  public value: S

  public constructor(str: S = '' as S) {
    super()
    this.original = str
    this.value = str
  }

  public reset = async () => {
    this.value = this.original
    await this.update()
  }

  public is = (val: S) => this.get() === val

  public get = () => this.value

  public set = async (str: S) => {
    this.value = str
    await this.update()
  }

  public replace = async (str: S) => {
    this.value = str
  }
}
