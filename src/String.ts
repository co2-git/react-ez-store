import first from 'lodash.first'
import last from 'lodash.last'
import includes from 'lodash.includes'
import isArray from 'lodash.isarray'
import isString from 'lodash.isstring'

import Store from './Store'

export type StringStoreType = { value: string }

export default class StringStore extends Store {
  public static USE_FIRST = 0
  public static USE_LAST = -1

  public original: string | null

  public value: string | null

  public _oneOf: Array<string | null> = []

  public constructor(str: string | null | Array<string | null> = '', defVal?: number | string) {
    super()
    if (isArray(str)) {
      let val = null
      if (str.length) {
        if (defVal === StringStore.USE_FIRST) {
          val = first(str) || null
        } else if (defVal === StringStore.USE_LAST) {
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

  public is = (val: string | null) => this.get() === val

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
