import isEqual from 'lodash.isequal'
import isArray from 'lodash.isarray'
import map from 'lodash.map'
import filter from 'lodash.filter'
import get from 'lodash.get'
import set from 'lodash.set'

export { default as withStore } from './withStore'
import Store from './Store'

export class ArrayStoreClass<T> extends Store {
  public original: T[]
  public value: T[]
  public constructor(array: T[] = []) {
    super()
    this.original = [...array]
    this.value = [...array]
  }
}

export class BooleanStoreClass extends Store {
  public original: boolean
  public value: boolean
  public constructor(bool: any = false) {
    super()
    const toBool = Boolean(bool)
    this.original = toBool
    this.value = toBool
  }
}

export class DateStoreClass extends Store {
  public original: Date
  public value: Date
  public constructor(date: Date = new Date()) {
    super()
    this.original = date
    this.value = date
  }
}

export class ErrorStoreClass extends Store {
  public original: Error
  public value: Error
  public constructor(error: Error = new Error()) {
    super()
    this.original = error
    this.value = error
  }
}

export class NumberStoreClass extends Store {
  public original: number
  public value: number
  public constructor(num: any = 0) {
    super()
    this.original = Number(num)
    this.value = Number(num)
  }
}

export class ObjectStoreClass<T extends object> extends Store {
  public original: T
  public value: T
  public constructor(obj: T = {} as T) {
    super()
    this.original = { ...Object(obj) }
    this.value = { ...Object(obj) }
  }
}

class StringStoreClass extends Store {
  public original: string
  public value: string
  public constructor(str: any = '' as string) {
    super()
    this.original = str.toString()
    this.value = str.toString()
  }
}

type StoreValueType =
  | ArrayStoreClass<any>
  | BooleanStoreClass
  | DateStoreClass
  | ErrorStoreClass
  | NumberStoreClass
  | ObjectStoreClass<any>
  | StringStoreClass

declare function getStore(stored: NumberStoreClass): number
declare function getStore(stored: BooleanStoreClass): boolean
declare function getStore(stored: DateStoreClass): Date
declare function getStore(stored: ErrorStoreClass): Error
declare function getStore(stored: StringStoreClass): string
declare function getStore<T>(stored: ArrayStoreClass<T>): T[]
declare function getStore<T extends object>(stored: ObjectStoreClass<T>): T

interface StoreType {
  Array: <T>(array?: T[]) => ArrayStoreClass<T>
  Boolean: (bool?: any) => BooleanStoreClass
  Date: (date?: Date) => DateStoreClass
  Error: (error?: Error) => ErrorStoreClass
  Number: (num?: any) => NumberStoreClass
  Object: <T extends object>(obj?: T) => ObjectStoreClass<T>
  String: (str?: any) => StringStoreClass

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

  increment: (stored: NumberStoreClass, step?: number) => Promise<void>

  decrement: (stored: NumberStoreClass, step?: number) => Promise<void>

  multiply: (stored: NumberStoreClass, step: number) => Promise<void>

  divide: (stored: NumberStoreClass, step: number) => Promise<void>

  isTrue: (stored: BooleanStoreClass) => boolean

  isFalse: (stored: BooleanStoreClass) => boolean

  toggle: (stored: BooleanStoreClass) => Promise<void>

  push: <T>(stored: ArrayStoreClass<T>, ...items: T[]) => Promise<void>

  pop: <T>(stored: ArrayStoreClass<T>) => Promise<void>

  shift: <T>(stored: ArrayStoreClass<T>) => Promise<void>

  map: <T>(stored: ArrayStoreClass<T>, predicator: (item: T, index: number, items: T[]) => T) => Promise<void>

  filter: <T>(stored: ArrayStoreClass<T>, predicator: (item: T, index: number, items: T[]) => boolean) => Promise<void>

  getByKey: <T extends object>(stored: ObjectStoreClass<T>, key: string, defaultValue?: any) => any

  setByKey: <T extends object>(stored: ObjectStoreClass<T>, key: string, value: any) => Promise<void>

  extend: <T extends object>(stored: ObjectStoreClass<T>, object: T) => Promise<void>

}

const makeArray = <T>(array?: T[]) => new ArrayStoreClass<T>(array)
const makeBool = (bool?: any) => new BooleanStoreClass(bool)
const makeDate = (date?: Date) => new DateStoreClass(date)
const makeErr = (error?: Error) => new ErrorStoreClass(error)
const makeNum = (num?: any) => new NumberStoreClass(num)
const makeObj = <T extends object>(obj?: T) => new ObjectStoreClass<T>(obj)
const makeStr = (str?: any) => new StringStoreClass(str)

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
    if (stored instanceof ArrayStoreClass) {
      return [...stored.value]
    }
    if (
      stored instanceof BooleanStoreClass ||
      stored instanceof DateStoreClass ||
      stored instanceof ErrorStoreClass ||
      stored instanceof NumberStoreClass ||
      stored instanceof StringStoreClass ||
      stored instanceof ObjectStoreClass
    ) {
      return stored.value
    }
    throw new Error('Unrecognized store')
  },

  is: (stored: StoreValueType, value: any) => isEqual(store.get(stored), value),

  set: async (stored: StoreValueType, setter: any) => {
    if (stored instanceof ArrayStoreClass && !isArray(setter)) {
      throw new Error('Can only set arrays. Use push if you want to add an item')
    }
    stored.value = setter
  },

  reset: async (stored: StoreValueType) => {
    stored.value = stored.original
  },

  increment: async (stored: NumberStoreClass, step: number = 1) => {
    await store.set(stored, store.get(stored) + step)
  },

  decrement: async (stored: NumberStoreClass, step: number = 1) => {
    await store.set(stored, store.get(stored) - step)
  },

  multiply: async (stored: NumberStoreClass, step: number) => {
    await store.set(stored, store.get(stored) * step)
  },

  divide: async (stored: NumberStoreClass, step: number) => {
    await store.set(stored, store.get(stored) / step)
  },

  isTrue: (stored: BooleanStoreClass) => stored.value === true,

  isFalse: (stored: BooleanStoreClass) => stored.value === false,

  toggle: (stored: BooleanStoreClass) => store.set(stored, !store.get(stored)),

  push: <T>(stored: ArrayStoreClass<T>, ...items: T[]) => store.set(
    stored,
    [...store.get(stored), ...items],
  ),

  pop: async <T>(stored: ArrayStoreClass<T>) => {
    const arr = [...store.get(stored)]
    arr.pop()
    await store.set(stored, arr)
  },

  shift: async <T>(stored: ArrayStoreClass<T>) => {
    const arr = [...store.get(stored)]
    arr.shift()
    await store.set(stored, arr)
  },

  map: <T>(stored: ArrayStoreClass<T>, predicator: (item: T, index: number, items: T[]) => T) =>
    store.set(stored, map(store.get(stored), predicator)),

  filter: <T>(stored: ArrayStoreClass<T>, predicator: (item: T, index: number, items: T[]) => boolean) =>
    store.set(stored, filter(store.get(stored), predicator)),

  getByKey: <T extends object>(stored: ObjectStoreClass<T>, key: string, defaultValue?: any) =>
    get(store.get(stored), key, defaultValue),

  setByKey: async <T extends object>(stored: ObjectStoreClass<T>, key: string, value: any) => {
    const obj = { ...store.get(stored) }
    set(obj, key, value)
    await store.set(stored, obj)
  },

  extend: <T extends object>(stored: ObjectStoreClass<T>, object: T) => store.set(
    stored,
    { ...store.get(stored), ...object }
  )

}

export default store
