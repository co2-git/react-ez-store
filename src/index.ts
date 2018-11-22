import Array from './Array'
import Boolean from './Boolean'
import Number from './Number'
import Object from './Object'
import String from './String'

export { default as withStore } from './withStore'

export default (type: Function, ...args: any[]) => {
  switch (type) {
    case Array: return new Array(...args)
    case Boolean: return new Boolean(...args)
    case Number: return new Number(...args)
    case Object: return new Object(...args)
    case String: return new String(...args)
  }
}
