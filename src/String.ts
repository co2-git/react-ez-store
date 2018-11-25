import { isArray, includes } from 'lodash'

import Store from './Store'

export type StringStoreType = { value: string }

export default class StringStore extends Store {
  public original: string

  public value: string

  public _oneOf: string[] = []

  public constructor(str: string = '') {
    super()
    this.original = str
    this.value = str
  }

  public reset = async () => {
    this.value = this.original
    await this.update()
  }

  public oneOf = (...args: string[]) => {
    this._oneOf = args
    return this
  }

  public get = () => this.value

  public isNull = () => this.value === null

  public set = async (str: string) => {
    if (this._oneOf.length && !includes(this._oneOf, str)) {
      throw new Error(`String "${ str }" is not in list ${ this._oneOf.join(' ') }`)
    }
    this.value = str
    await this.update()
  }

  public replace = async (str: string) => {
    this.value = str
  }
}
