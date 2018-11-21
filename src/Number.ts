import Store from './Store'

export type NumberStoreType = { value: number }

export default class NumberStore extends Store {
  private original = 0

  private value = 0

  public constructor(num: number) {
    super()
    this.original = num
    this.value = num
  }

  public reset = async () => {
    this.value = this.original
    await this.update()
  }

  public get = () => this.value

  public set = async (num: number) => {
    this.value = num
    await this.update()
  }

  public add = async (step: number = 1) => {
    this.value = this.value + step
    await this.update()
  }

  public subtract = async (step: number = 1) => {
    this.value = this.value - step
    await this.update()
  }

  public multiply = async (step: number) => {
    this.value = this.value * step
    await this.update()
  }

  public divide = async (step: number) => {
    this.value = this.value / step
    await this.update()
  }
}
