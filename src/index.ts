import StoreArray from './Array'
import StoreBoolean from './Boolean'
import StoreDate from './Date'
import StoreError from './Error'
import StoreNumber from './Number'
import StoreObject from './Object'
import StoreString from './String'

export { default as StoreArray } from './Array'
export { default as StoreBoolean } from './Boolean'
export { default as StoreDate } from './Date'
export { default as StoreError } from './Error'
export { default as StoreNumber } from './Number'
export { default as StoreObject } from './Object'
export { default as StoreString } from './String'
export { default as withStore } from './withStore'

export default (type: Function, ...args: any[]) => {
  switch (type) {
    case Array: return new StoreArray(...args)
    case Boolean: return new StoreBoolean(...args)
    case Date: return new StoreDate(...args)
    case Error: return new StoreError(...args)
    case Number: return new StoreNumber(...args)
    case Object: return new StoreObject(...args)
    case String: return new StoreString(...args)
  }
}
