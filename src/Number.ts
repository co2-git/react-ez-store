import Store from './Store'

type NumberStoreValue = number | null

export type NumberStoreType = { value: NumberStoreValue }

export default class NumberStore extends Store {
  public original: NumberStoreValue

  public value: NumberStoreValue

  public constructor(num: NumberStoreValue = 0) {
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
    if (typeof this.value === 'number') {
      this.value = this.value + step
      await this.update()
    }
  }

  public subtract = async (step: number = 1) => {
    if (typeof this.value === 'number') {
      this.value = this.value - step
      await this.update()
    }
  }

  public multiply = async (step: number) => {
    if (typeof this.value === 'number') {
      this.value = this.value * step
      await this.update()
    }
  }

  public divide = async (step: number) => {
    if (typeof this.value === 'number') {
      this.value = this.value / step
      await this.update()
    }
  }
}
