react-store
===

Easily share data across different React components. Like Redux or mobx, but dead simpler!

# Install

```bash
# with yarn
yarn add @francoisv/react-store

# with npm
npm i -S @francoisv/react-store
```

# Usage

Use `Store` to define your data, based on their type - and use `withStore` to attach a `React` component to these stores.

```js
import React from 'react'
import { store, withStore } from '@francoisv/react-store'

// The stores
const todos = store(Array, ['Buy milk'])
const newName = store(String)

// List component
const List = withStore(todos)(() => (
  <div>
    { todos.get().map((todo, index) => (
      <div key={ index }>{ todo }</div>
    )) }
  </div>
))

// New todo
const NewTodo = withStore(newName)(() => (
  <input
    value={ newName.get() }
    onChange={ event => newName.set(event.target.value) }
  />
))

// Add todo
// We don't need withStore here because we don't want to reload the view
const AddButton = (
  <button onClick={ () => todos.push(newName.get()) }>
    Add
  </button>
)

// Tada!
const Todos = (
  <div>
    <List />
    <NewTodo />
    <AddButton />
  </div>
)
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
