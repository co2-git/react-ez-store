react-ez-store
===

Easily share data across different React components. Like Redux or mobx, but dead simpler!

# Install

```bash
# with yarn
yarn add @francoisrv/react-ez-store

# with npm
npm i -S @francoisrv/react-ez-store
```

# Usage

Use `Store` to define your data based on their type - and use `withStore` to attach a component to the stores.

```js
import React from 'react'
import { Store, withStore } from '@francoisrv/react-ez-store/Array'

// The stores
const todosStore = new Store.Array([{ name: 'Buy milk' }])
const newName = new Store.String('')

// The Component, wrapped in withStore
const Todos = withStore(todosStore, newName)(() => (
  <div>
    { /* list of todos */ }
    { todosStore.get().map(todo => (
      <div key={ todo.name }>{ todo.name }</div>
    ))}
    { /* state value for controlled input */ }
    <input
      value={ newName.get() }
      onChange={ event => newName.set(event.target.value) }
    />
    { /* add todo */ }
    <button onClick={ () => todosStore.push({ name: newName.get() }) }>
      Add
    </button>
  </div>
))
```

# Types

## String

```js
const store = new Store.String('a')

store.get() // "a"
store.set('b') // "b"
store.reset() // "a"
```

## Number

```js
const store = new Store.Number(1)

store.get() // 1
store.set(2) // 2
store.add() // 3
store.add(2) // 5
store.subtract() // 4
store.subtract(3) // 1
store.divide(2) // 0.5
store.multiply(3) // 1.5
store.reset() // 1
```

## Boolean

```js
const store = new Store.Boolean(true)

store.get() // true
store.set(false) // false
store.toggle() // true
store.reset() // true
```

## Array

```js
const store = new Store.Array([1])

store.get() // [1]
store.set([2]) // [2]
store.push(3, 4, 5) // [2, 3, 4, 5]
store.pop() // [2, 3, 4]
store.shift() // [3, 4]
store.map(n => n + 1) // [4, 5]
store.filter(n => n > 4) // [5]
store.reset() // [1]
```

## Object

```js
const store = new Store.Object({ foo: 1 })

store.get() // { foo: 1 }
store.set({ bar: 2 }) // { bar: 2 }
store.assign({ store: 3 }) // { bar: 2, store: 3 }
store.reset() // { foo: 1 }
```
