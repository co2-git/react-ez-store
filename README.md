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

## Encapsulate store

Sometimes, you want to encapsulate a store so it can be created for a local scope.
You can use functions for that. The object you declared will be in the props

```jsx
import React from 'react'
import store, { withStore } from '@francoisv/react-store'

const users
```

# Examples

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

## Auth

```jsx
import React from 'react'
import store, { withStore } from '@francoisv/react-store'

const token = store(String, localStorage.getItem('TOKEN'))

const App = withStore(token)(() => (
  <div>
    { !token.get() && <Login /> }
    { !!token.get() && <button onClick={ token.reset }>Sign out</button> }
  </div>
))
```

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
    <button type="button" onClick={ () => addTodo(newTodo.get()) }>
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

## With back-end

```jsx
import React from 'react'
import store, { withStore } from '@francoisv/react-store'

const FETCHING = 0
const DONE = 1

const todos = store(Array)
const fetchStatus = store(Number)
const fetchError = store(Error)

const getTodos = async () => {
  try {
    await fetchStatus.set(FETCHING)
    const response = await fetch('http://examle.com/todos')
    const todos = await response.json()
    await todos.push(...todos)
    await fetchStatus.set(DONE)
  } catch (error) {
    await fetchError.set(error)
  }
}

const List = withStore(todos, fetchStatus, fetchError)(() => {
  if (fetchError.isError()) {
    return <div>{ fetchError.get().message }</div>
  }
  if (fetchStatus.get() === FETCHING) {
    return <div>Loading...</div>
  }
  if (fetchStatus.get() === DONE) {
    return (
      <ul>
        { todos.get().map(todo => <li key={ todo.id }>{ todo.name }</li>) }
      </ul>
    )
  }
  /* If here is reached, means that we need to call the request */
  setTimeout(getTodos)
  return <div>Loading...</div>
})
```

# Types

You can see [here](https://github.com/co2-git/react-ez-store/tree/master/src) the list of the different supported types.
