import Store from './Store'

type ErrorStoreValue = Error | null

export type ErrorStoreType = { value: ErrorStoreValue }

export default class ErrorStore extends Store {
  public original: ErrorStoreValue

  public value: ErrorStoreValue

  public constructor(error: ErrorStoreValue = null) {
    super()
    this.original = error
    this.value = error
  }

  public reset = async () => {
    this.value = this.original
    await this.update()
  }

  public isError = () => (this.value instanceof Error)

  public get = () => this.value

  public set = async (error: Error) => {
    this.value = error
    await this.update()
  }

  public unset = async () => {
    this.value = null
    await this.update()
  }
}
