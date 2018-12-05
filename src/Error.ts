import ObjectStore from './Object'

export default class ErrorStore extends ObjectStore<Error> {
  public original: Error

  public value: Error

  public constructor(error: Error = new Error()) {
    super(error)
    this.original = error
    this.value = error
  }
}
