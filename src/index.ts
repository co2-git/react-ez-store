import isEqual from 'lodash.isequal'
import isArray from 'lodash.isarray'
import map from 'lodash.map'
import filter from 'lodash.filter'
import get from 'lodash.get'
import set from 'lodash.set'

export { default as withStore } from './withStore'
import Store from './Store'

export class ArrayStore<T> extends Store {
  public original: T[]
  public value: T[]
  public constructor(array: T[] = []) {
    super()
    this.original = [...array]
    this.value = [...array]
  }
}

export class BooleanStore extends Store {
  public original: boolean
  public value: boolean
  public constructor(bool: any = false) {
    super()
    const toBool = Boolean(bool)
    this.original = toBool
    this.value = toBool
  }
}

export class DateStore extends Store {
  public original: Date
  public value: Date
  public constructor(date: Date = new Date()) {
    super()
    this.original = date
    this.value = date
  }
}

export class ErrorStore extends Store {
  public original: Error
  public value: Error
  public constructor(error: Error = new Error()) {
    super()
    this.original = error
    this.value = error
  }
}

export class NumberStore extends Store {
  public original: number
  public value: number
  public constructor(num: any = 0) {
    super()
    this.original = Number(num)
    this.value = Number(num)
  }
}

export class ObjectStore<T extends object> extends Store {
  public original: T
  public value: T
  public constructor(obj: T = {} as T) {
    super()
    this.original = { ...Object(obj) }
    this.value = { ...Object(obj) }
  }
}

export class StringStore extends Store {
  public original: string
  public value: string
  public constructor(str: any = '' as string) {
    super()
    this.original = str.toString()
    this.value = str.toString()
  }
}

type StoreValueType =
  | ArrayStore<any>
  | BooleanStore
  | DateStore
  | ErrorStore
  | NumberStore
  | ObjectStore<any>
  | StringStore

declare function getStore(stored: NumberStore): number
declare function getStore(stored: BooleanStore): boolean
declare function getStore(stored: DateStore): Date
declare function getStore(stored: ErrorStore): Error
declare function getStore(stored: StringStore): string
declare function getStore<T>(stored: ArrayStore<T>): T[]
declare function getStore<T extends object>(stored: ObjectStore<T>): T

interface StoreType {
  Array: <T>(array?: T[]) => ArrayStore<T>
  Boolean: (bool?: any) => BooleanStore
  Date: (date?: Date) => DateStore
  Error: (error?: Error) => ErrorStore
  Number: (num?: any) => NumberStore
  Object: <T extends object>(obj?: T) => ObjectStore<T>
  String: (str?: any) => StringStore

  array: StoreType["Array"]
  boolean: StoreType["Boolean"]
  bool: StoreType["Boolean"]
  date: StoreType["Date"]
  error: StoreType["Error"]
  err: StoreType["Error"]
  number: StoreType["Number"]
  num: StoreType["Number"]
  object: StoreType["Object"]
  obj: StoreType["Object"]
  string: StoreType["String"]
  str: StoreType["String"]
  text: StoreType["String"]

  get: typeof getStore

  is: (stored: StoreValueType, value: any) => boolean

  set: (stored: StoreValueType, setter: any) => Promise<void>

  reset: (stored: StoreValueType) => Promise<void>

  increment: (stored: NumberStore, step?: number) => Promise<void>

  decrement: (stored: NumberStore, step?: number) => Promise<void>

  multiply: (stored: NumberStore, step: number) => Promise<void>

  divide: (stored: NumberStore, step: number) => Promise<void>

  isTrue: (stored: BooleanStore) => boolean

  isFalse: (stored: BooleanStore) => boolean

  toggle: (stored: BooleanStore) => Promise<void>

  push: <T>(stored: ArrayStore<T>, ...items: T[]) => Promise<void>

  pop: <T>(stored: ArrayStore<T>) => Promise<void>

  shift: <T>(stored: ArrayStore<T>) => Promise<void>

  map: <T>(stored: ArrayStore<T>, predicator: (item: T, index: number, items: T[]) => T) => Promise<void>

  filter: <T>(stored: ArrayStore<T>, predicator: (item: T, index: number, items: T[]) => boolean) => Promise<void>

  getAt: <T>(stored: ArrayStore<T>, index: number) => T

  getByKey: <T extends object>(stored: ObjectStore<T>, key: string, defaultValue?: any) => any

  setByKey: <T extends object>(stored: ObjectStore<T>, key: string, value: any) => Promise<void>

  extend: <T extends object>(stored: ObjectStore<T>, object: T) => Promise<void>

}

const makeArray = <T>(array?: T[]) => new ArrayStore<T>(array)
const makeBool = (bool?: any) => new BooleanStore(bool)
const makeDate = (date?: Date) => new DateStore(date)
const makeErr = (error?: Error) => new ErrorStore(error)
const makeNum = (num?: any) => new NumberStore(num)
const makeObj = <T extends object>(obj?: T) => new ObjectStore<T>(obj)
const makeStr = (str?: any) => new StringStore(str)

const store: StoreType = {
  Array: makeArray,
  array: makeArray,
  Boolean: makeBool,
  boolean: makeBool,
  bool: makeBool,
  Date: makeDate,
  date: makeDate,
  Error: makeErr,
  error: makeErr,
  err: makeErr,
  Number: makeNum,
  number: makeNum,
  num: makeNum,
  Object: makeObj,
  object: makeObj,
  obj: makeObj,
  String: makeStr,
  string: makeStr,
  str: makeStr,
  text: makeStr,

  get: (stored: StoreValueType) => {
    if (stored instanceof ArrayStore) {
      return [...stored.value]
    }
    if (
      stored instanceof BooleanStore ||
      stored instanceof DateStore ||
      stored instanceof ErrorStore ||
      stored instanceof NumberStore ||
      stored instanceof StringStore ||
      stored instanceof ObjectStore
    ) {
      return stored.value
    }
    throw new Error('Unrecognized store')
  },

  is: (stored: StoreValueType, value: any) => isEqual(store.get(stored), value),

  set: async (stored: StoreValueType, setter: any) => {
    if (stored instanceof ArrayStore && !isArray(setter)) {
      throw new Error('Can only set arrays. Use push if you want to add an item')
    }
    stored.value = setter
  },

  reset: async (stored: StoreValueType) => {
    stored.value = stored.original
  },

  increment: async (stored: NumberStore, step: number = 1) => {
    await store.set(stored, store.get(stored) + step)
  },

  decrement: async (stored: NumberStore, step: number = 1) => {
    await store.set(stored, store.get(stored) - step)
  },

  multiply: async (stored: NumberStore, step: number) => {
    await store.set(stored, store.get(stored) * step)
  },

  divide: async (stored: NumberStore, step: number) => {
    await store.set(stored, store.get(stored) / step)
  },

  isTrue: (stored: BooleanStore) => stored.value === true,

  isFalse: (stored: BooleanStore) => stored.value === false,

  toggle: (stored: BooleanStore) => store.set(stored, !store.get(stored)),

  push: <T>(stored: ArrayStore<T>, ...items: T[]) => store.set(
    stored,
    [...store.get(stored), ...items],
  ),

  pop: async <T>(stored: ArrayStore<T>) => {
    const arr = [...store.get(stored)]
    arr.pop()
    await store.set(stored, arr)
  },

  shift: async <T>(stored: ArrayStore<T>) => {
    const arr = [...store.get(stored)]
    arr.shift()
    await store.set(stored, arr)
  },

  map: <T>(stored: ArrayStore<T>, predicator: (item: T, index: number, items: T[]) => T) =>
    store.set(stored, map(store.get(stored), predicator)),

  filter: <T>(stored: ArrayStore<T>, predicator: (item: T, index: number, items: T[]) => boolean) =>
    store.set(stored, filter(store.get(stored), predicator)),

  getAt: <T>(stored: ArrayStore<T>, index: number) => store.get(stored)[index],

  getByKey: <T extends object>(stored: ObjectStore<T>, key: string, defaultValue?: any) =>
    get(store.get(stored), key, defaultValue),

  setByKey: async <T extends object>(stored: ObjectStore<T>, key: string, value: any) => {
    const obj = { ...store.get(stored) }
    set(obj, key, value)
    await store.set(stored, obj)
  },

  extend: <T extends object>(stored: ObjectStore<T>, object: T) => store.set(
    stored,
    { ...store.get(stored), ...object }
  )

}

export default store
