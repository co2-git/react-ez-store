import Store from './Store'
import { includes } from 'lodash';

type NumberStoreValue = number | null

export type NumberStoreType = { value: NumberStoreValue }

export default class NumberStore extends Store {
  public original: NumberStoreValue

  public value: NumberStoreValue

  public _enum: NumberStoreValue[] = []

  public constructor(num: NumberStoreValue = 0) {
    super()
    this.original = num
    this.value = num
  }

  public enum = async (...args: number[]) => {
    this._enum = args
    return this
  }

  public reset = async () => {
    this.value = this.original
    await this.update()
  }

  public get = () => this.value

  public isNull = () => this.value === null

  public set = async (num: number) => {
    if (this._enum.length && !includes(this._enum, num)) {
      throw new Error(`Number ${ num } is not in list ${ this._enum.join(' ') }`)
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
