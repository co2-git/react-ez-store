import isEqual from 'lodash.isequal'
import isArray from 'lodash.isarray'
import map from 'lodash.map'
import filter from 'lodash.filter'
import get from 'lodash.get'
import set from 'lodash.set'

export { default as withStore } from './withStore'

class ArrayStoreClass<T> {
  public original: T[]
  public value: T[]
  public constructor(array: T[] = []) {
    this.original = [...array]
    this.value = [...array]
  }
}

class BooleanStoreClass {
  public original: boolean
  public value: boolean
  public constructor(bool: any = false) {
    const toBool = Boolean(bool)
    this.original = toBool
    this.value = toBool
  }
}

class DateStoreClass {
  public original: Date
  public value: Date
  public constructor(date: Date = new Date()) {
    this.original = date
    this.value = date
  }
}

class ErrorStoreClass {
  public original: Error
  public value: Error
  public constructor(error: Error = new Error()) {
    this.original = error
    this.value = error
  }
}

class NumberStoreClass {
  public original: number
  public value: number
  public constructor(num: any = 0) {
    this.original = Number(num)
    this.value = Number(num)
  }
}

class ObjectStoreClass<T extends object> {
  public original: T
  public value: T
  public constructor(obj: T = {} as T) {
    this.original = { ...Object(obj) }
    this.value = { ...Object(obj) }
  }
}

class StringStoreClass {
  public original: string
  public value: string
  public constructor(str: any = '' as string) {
    this.original = str.toString()
    this.value = str.toString()
  }
}

type StoreType =
  | ArrayStoreClass<any>
  | BooleanStoreClass
  | DateStoreClass
  | ErrorStoreClass
  | NumberStoreClass
  | ObjectStoreClass<any>
  | StringStoreClass

interface Store {
  Array: <T>(array?: T[]) => ArrayStoreClass<T>
  Boolean: (bool?: any) => BooleanStoreClass
  Date: (date?: Date) => DateStoreClass
  Error: (error?: Error) => ErrorStoreClass
  Number: (num?: any) => NumberStoreClass
  Object: <T extends object>(obj?: T) => ObjectStoreClass<T>
  String: (str?: any) => StringStoreClass

  array: Store["Array"]
  boolean: Store["Boolean"]
  bool: Store["Boolean"]
  date: Store["Date"]
  error: Store["Error"]
  err: Store["Error"]
  number: Store["Number"]
  object: Store["Object"]
  string: Store["String"]

  get:
    | (<T>(stored: ArrayStoreClass<T>) => T[])
    | ((stored: BooleanStoreClass) => boolean)
    | ((stored: DateStoreClass) => Date)
    | ((stored: ErrorStoreClass) => Error)
    | ((stored: NumberStoreClass) => number)
    | ((stored: StringStoreClass) => string)
    | (<T extends object>(stored: ObjectStoreClass<T>) => T)

  is: (stored: StoreType, value: any) => boolean

  set: (stored: StoreType, setter: any) => Promise<void>

  reset: (stored: StoreType) => Promise<void>

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

  getByKey: <T>(stored: ObjectStoreClass<T>, key: string, defaultValue?: any) => any

  setByKey: <T>(stored: ObjectStoreClass<T>, key: string, value: any) => Promise<void>

  extend: <T>(stored: ObjectStoreClass<T>, object: T) => Promise<void>

}

const store: Store = {
  Array: <T>(array?: T[]) => new ArrayStoreClass<T>(array),
  Boolean: (bool?: any) => new BooleanStoreClass(bool),
  Date: (date?: Date) => new DateStoreClass(date),
  Error: (error?: Error) => new ErrorStoreClass(error),
  Number: (num?: any) => new NumberStoreClass(num),
  Object: <T extends object>(obj?: T) => new ObjectStoreClass<T>(obj),
  String: (str?: any) => new StringStoreClass(str),

  get: (stored: StoreType) => {
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

  is: (stored: StoreType, value: any) => isEqual(store.get(stored), value),

  set: async (stored: StoreType, setter: any) => {
    if (stored instanceof ArrayStoreClass && !isArray(setter)) {
      throw new Error('Can only set arrays. Use push if you want to add an item')
    }
    stored.value = setter
  },

  reset: async (stored: StoreType) => {
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

  getByKey: <T>(stored: ObjectStoreClass<T>, key: string, defaultValue?: any) =>
    get(store.get(stored), key, defaultValue),

  setByKey: <T>(stored: ObjectStoreClass<T>, key: string, value: any) =>
    set(store.get(stored), key, value),

  extend: <T>(stored: ObjectStoreClass<T>, object: T) => store.set(
    stored,
    { ...store.get(stored), ...object }
  )

}

store.array = store.Array
store.boolean = store.Boolean
store.bool = store.Boolean
store.number = store.Number
store.string = store.String
store.date = store.Date
store.error = store.Error
store.err = store.Error
store.object = store.Object

export default store
