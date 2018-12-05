import { get, set } from 'lodash'

import Store from './Store'

export default class ObjectStore<T extends object> extends Store {
  public original: T

  public value: T

  public constructor(obj: T = {} as T) {
    super()
    this.original = { ...Object(obj) }
    this.value = { ...Object(obj) }
  }

  public reset = async () => {
    this.value = this.original
    await this.update()
  }

  public get = () => this.value

  public replace = async (obj: T) => {
    this.value = obj
  }

  public set = async (obj: T) => {
    this.value = obj
    await this.update()
  }

  public assign = async (obj: Partial<T>) => {
    this.value = {
      ...(this.value as object),
      ...(obj as object),
    } as T
    await this.update()
  }

  public getKey = (key: string, defaultValue?: any) => get(this.value, key, defaultValue)

  public setKey = async (key: string, val: any) => {
    const { value } = this
    if (value) {
      set(value as object, key, val)
      await this.update()
    }
  }
}
