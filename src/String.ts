import { isArray, includes } from 'lodash'

import Store from './Store'

export type StringStoreType = { value: string }

export default class StringStore extends Store {
  public original: string

  public value: string

  public _enum: string[] = []

  public constructor(str: string = '') {
    super()
    this.original = str
    this.value = str
  }

  public reset = async () => {
    this.value = this.original
    await this.update()
  }

  public enum = async (...args: string[]) => {
    this._enum = args
    return this
  }

  public get = () => this.value

  public isNull = () => this.value === null

  public set = async (str: string) => {
    if (this._enum.length && !includes(this._enum, str)) {
      throw new Error(`String "${ str }" is not in list ${ this._enum.join(' ') }`)
    }
    this.value = str
    await this.update()
  }

  public replace = async (str: string) => {
    this.value = str
  }
}
