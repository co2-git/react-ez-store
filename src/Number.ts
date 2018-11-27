import first from 'lodash.first'
import last from 'lodash.last'
import includes from 'lodash.includes'
import isArray from 'lodash.isarray'
import isUndefined from 'lodash.isundefined'
import isNumber from 'lodash.isnumber'

import Store from './Store'

type NumberStoreValue = number | null

export type NumberStoreType = { value: NumberStoreValue }

export default class NumberStore extends Store {
  public original: NumberStoreValue

  public value: NumberStoreValue

  public _oneOf: NumberStoreValue[] = []

  public constructor(num: NumberStoreValue | NumberStoreValue[] = 0, defaultValue?: 'first' | 'last' | number) {
    super()
    if (isArray(num)) {
      let val: NumberStoreValue = null
      if (isUndefined(defaultValue) || defaultValue === 'first') {
        val = first(num) || null
      } else if (defaultValue === 'last') {
        val = last(num) || null
      } else if (isNumber(defaultValue)) {
        val = defaultValue
      }
      this.original = val
      this.value = val
      this.oneOf(...num)
    } else {
      this.original = num
      this.value = num
    }
  }

  public oneOf = (...args: Array<number | null>) => {
    this._oneOf = args
    return this
  }

  public reset = async () => {
    this.value = this.original
    await this.update()
  }

  public get = () => this.value

  public isNull = () => this.value === null

  public set = async (num: number) => {
    if (this._oneOf.length && !includes(this._oneOf, num)) {
      throw new Error(`Number ${ num } is not in list ${ this._oneOf.join(' ') }`)
    }
    this.value = num
    await this.update()
  }

  public replace = async (num: number) => {
    this.value = num
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
