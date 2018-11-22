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

# Example

```js
import React from 'react'
import { store, withStore } from '@francoisv/react-store'

const email = store(String)

const View = withStore(email)(() => (
  <input
    value={ email.get() }
    onChange={ event => email.set(event.target.value )}
  />
))
```

# Todo app

```js
import React from 'react'
import { store, withStore } from '@francoisv/react-store'

const storeTodo = ({ name, done = false }) => store(Object, {
  name: store(String, name),
  done: store(Boolean, done),
})

const todos = store(Array, [storeTodo({ name: 'Buy milk' })])

const newTodo = store(String)

const Todo = ({ name, done }) => (
  <div>
    <input
      type="checkbox"
      checked={ done.get() }
      onChange={ done.toggle }
    />
    <input
      type="text"
      value={ name.get() }
      onChange={ event => name.set(event.target.value) }
    />
  </div>
)

const List = withStore(todos)(() => {
  <ul>
    { todos.get().map(todo => (
      <li key={ todo.name }>
        <Todo { ...todo } />
      </li>
    )) }
  </ul>
})

const Add = withStore(newTodo)(() => (
  <div>
    <input
      type="text"
      placeholder="Enter new todo"
      value={ newTodo.get() }
      onChange={ event => newTodo.set(event.target.value) }
    />
    <button onClick={ () => todos.push(storeTodo({ name: newTodo.get() })) }>
      Add
    </button>
  </div>
))

return (
  <div>
    <List />
    <Add />
  </div>
)

```

# Types

You can see [here](https://github.com/co2-git/react-ez-store/tree/master/src) the list of the different supported types.
