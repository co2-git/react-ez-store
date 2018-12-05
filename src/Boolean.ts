import Store from './Store'

export default class BooleanStore extends Store {
  public original: boolean

  public value: boolean

  public constructor(bool: boolean = true) {
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

  public replace = async (bool: boolean) => {
    this.value = bool
  }

  public toggle = async () => {
    this.value = !this.value
    await this.update()
  }

  public isTrue = () => this.value === true

  public isFalse = () => this.value === false
}
