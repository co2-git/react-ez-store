import Store from './Store'
import { isEqual } from 'lodash';

export default class ArrayStore<T extends any> extends Store {
  public original: T[]

  public value: T[]

  public constructor(array: T[] = []) {
    super()
    this.original = [...array]
    this.value = [...array]
  }

  public reset = async () => {
    this.value = [...this.original]
    await this.update()
  }

  public get = () => [...this.value]

  public is = (array: T[]) => isEqual(array, this.value)

  public set = async (array: T[]) => {
    this.value = array
    await this.update()
  }

  public replace = async (array: T[]) => {
    this.value = array
  }

  public push = async (...items: T[]) => {
    this.value.push(...items)
    await this.update()
  }

  public pop = async () => {
    this.value.pop()
    await this.update()
  }

  public shift = async () => {
    this.value.shift()
    await this.update()
  }

  public map = async (mapper: (item: any, index: number, array: any[]) => any) => {
    this.value = this.value.map(mapper)
    await this.update()
  }

  public filter = async (fn: (item: any, index: number, array: any[]) => boolean) => {
    this.value = this.value.filter(fn)
    await this.update()
  }
}
