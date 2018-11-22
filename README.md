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

```jsx
import React from 'react'
import store, { withStore } from '@francoisv/react-store'

const email = store(String)

const View = withStore(email)(() => (
  <input
    value={ email.get() }
    onChange={ event => email.set(event.target.value )}
  />
))
```

# Examples

## Todo App

```jsx
import React from 'react'
import store, { withStore } from '@francoisv/react-store'

let id = 0

// The stores

const todos = store(Array, [{ id, name: 'Buy milk' }])
const newTodo = store(String)
const editableTodo = props => ({ name: store(String, props.todo.name) } )

// The actions

const addTodo = name => todos.push({ id: ++id, name })

const saveTodo = (todoId, name) => {
  await todos.map(todo => {
    if (todo.id === todoId) {
      return { ...todo, name }
    }
    return todo
  })
}

const deleteTodo = async (todoId) => {
  await todos.filter(todo => todo.id !== todoId)
}

// The views

const Todo = withStore(editableTodo)(({ name, todo }) => (
  <form>
    <input
      value={ name.get() }
      onChange={ event => name.set(event.target.value) }
    />
    <button type="button" onClick={ () => saveTodo(todo.id, name.get()) }>
      Save
    </button>
    <button type="button" onClick={ () => deleteTodo(todo.id) }>
      Delete
    </button>
  </form>
))

const List = withStore(todos)(() => (
  <ul>
    {
      todos.get().map(todo => (
        <li key={ todo.id }>
          <Todo todo={ todo } />
        </li>
      ))
    }
  </ul>
))

const AddTodo = withStore(newTodo)(() => (
  <form>
    <input
      value={ newTodo.get() }
      onChange={ event => newTodo.set(event.target.value) }
    />
    <button type="button" onClick={ () => addTod(newTodo.get()) }>
      Add
    </button>
  </form>
))

return (
  <div>
    <List />
    <AddTodo />
  </div>
)
```

## Click counter

```jsx
import React from 'react'
import store, { withStore } from '@francoisv/react-store'

const counter = store(Number)

const ClickCounter = withStore(counter)(() => (
  <div>
    <div>Clicked { counter.get() } times</div>
    <button onClick={ counter.add }>Click</button>
  </div>
))
```

# Types

You can see [here](https://github.com/co2-git/react-ez-store/tree/master/src) the list of the different supported types.
