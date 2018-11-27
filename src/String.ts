import first from 'lodash.first'
import last from 'lodash.last'
import includes from 'lodash.includes'
import isArray from 'lodash.isarray'
import isString from 'lodash.isstring'

import Store from './Store'

export type StringStoreType = { value: string }

export default class StringStore extends Store {
  public original: string | null

  public value: string | null

  public _oneOf: Array<string | null> = []

  public constructor(str: string | null | Array<string | null> = '', defVal?: 0 | -1 | string) {
    super()
    if (isArray(str)) {
      let val = null
      if (str.length) {
        if (defVal === 0) {
          val = first(str) || null
        } else if (defVal === -1) {
          val = last(str) || null
        } else if (isString(defVal)) {
          val = defVal
        }
      }
      this.original = val
      this.value = val
      this.oneOf(...str)
    } else {
      this.original = str
      this.value = str
    }
  }

  public reset = async () => {
    this.value = this.original
    await this.update()
  }

  public oneOf = (...args: Array<string | null>) => {
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
