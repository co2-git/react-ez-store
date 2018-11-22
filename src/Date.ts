import Store from './Store'

type DateStoreValue = Date | null

export type DateStoreType = { value: DateStoreValue }

export default class DateStore extends Store {
  public original: DateStoreValue

  public value: DateStoreValue

  public constructor(date: DateStoreValue = null) {
    super()
    this.original = date
    this.value = date
  }

  public reset = async () => {
    this.value = this.original
    await this.update()
  }

  public isDate = () => (this.value instanceof Date)

  public get = () => this.value

  public set = async (date: Date) => {
    this.value = date
    await this.update()
  }

  public unset = async () => {
    this.value = null
    await this.update()
  }
}
