import ObjectStore from './Object';

export type DateStoreType = { value: Date }

export default class DateStore extends ObjectStore<Date> {
  public original: Date

  public value: Date

  public constructor(date: Date = new Date()) {
    super(date)
    this.original = date
    this.value = date
  }

  public reset = async () => {
    this.value = new Date(this.original)
    await this.update()
  }
}
