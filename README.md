react-store
===

React store

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

const todos = store.Array('Buy milk')

const AddTodo = withStore({ name: store.String })((props) => (
  <form>
    <input
      value={ store.get(props.name) }
      onChange={ (event) => store.set(props.name, event.target.value) }
    />
    <button onClick={ () => store.push(todos, props.name) }>
      Add
    </button>
  </form>
))

const Todo = withStore(props => ({ todo }))((props) => (
  <div>
    <input type="checkbox" onChange={ () => store.filter(todos, todo !== props.todo) } />
    <input
      value={ store.get(props.todo) }
      onChange={ event => store.set(props.todo, event.target.value) }
    />
  </div>
))

const List = withStore(todos)(() => (
  <ul>
    { store.get(todos).map(todo => (
      <li key={ todo }>
        <Todo todo={ todo } />
      </li>
    )) }
  </ul>
))

return (
  <div>
    <AddTodo />
    <ul>
      { store.get(todos).map(todo => (
        <li key={ todo }>
          <Todo todo={ todo } />
        </li>
      )) }
    </ul>
  </div>
)
```

## Encapsulate store

Pass functions to derive store from props or to create a local scope.

```jsx
import React from 'react'
import store, { withStore } from '@francoisv/react-store'

const connector = props => ({ open: store.Boolean(props.active) })

const View = withStore(connector)(({ open }) => (
  <input
    checked={ store.get(open)) }
    onChange={ () => store.toggle(open) }
  />
))
```

# Examples

## Click counter

```jsx
import React from 'react'
import store, { withStore } from '@francoisv/react-store'

const counter = store.Number

const ClickCounter = withStore(counter)(() => (
  <div>
    <div>Clicked { store.get(counter) } times</div>
    <button onClick={ () => store.increment(counter) }>Click</button>
  </div>
))
```

## Auth

```jsx
import React from 'react'
import store, { withStore } from '@francoisv/react-store'

const token = store.String(localStorage.getItem('TOKEN'))

const App = withStore(token)(() => {
  const tokenValue = store.get(token)

  return (
    <div>
      { !tokenValue && <Login /> }
      { !!tokenValue && (
        <button onClick={ () => store.reset(token) }>
          Sign out
        </button>
      ) }
    </div>
  )
})
```

## Todo App

```jsx
import React from 'react'
import store, { withStore } from '@francoisv/react-store'

let id = 0

// The stores

const todos = store.Array([{ id, name: 'Buy milk' }])
const newTodo = store.String
const editableTodo = props => ({ name: String.store(props.todo.name) } )

// The actions

const addTodo = name => store.push(todos, { id: ++id, name })

const saveTodo = (todoId, name) => {
  await store.map(todos, todo => {
    if (todo.id === todoId) {
      return { ...todo, name }
    }
    return todo
  })
}

const deleteTodo = async (todoId) => {
  await store.filter(todos, todo => todo.id !== todoId)
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
