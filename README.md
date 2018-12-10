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

# Usage

```jsx
import React from 'react'
import store, { withStore } from '@francoisv/react-store'

const counter = store.number(0)

const ClickCounter = withStore(counter)(() => (
  <div>
    <div>Clicked { store.get(counter) }</div>
    <button onClick={ () => store.increment(counter) }>Click</button>
  </div>
))
```

# Todos Example

First, let's get our dependencies:

```js
import React from 'react'
import store, { withStore } from '@francoisv/react-store'
```

Now let's create a store array for the todos. For the sake of simplicity, todos are plain strings.
We'll start with one todo in the list.

```js
const todos = store.Array('Buy milk')
```

Now let's just create a list component with it

```jsx
const TodosView = () => (
  <ul>
    { store.get(todos).map(todo => ( <li key={ todo }>{ todo }</li> )) }
  </ul>
)
```

We want the component to update whenever `todos` changes. For that, we'll use the HOC `withStore`

```jsx
const Todos = withStore(todos)(TodosView)
```

Let's add a form to add a new todo.

```jsx
const newTodo = store.string()

const AddTodo = withStore(newTodo)(() => (
  <form>
    <input
      value={ store.get(newTodo) }
      onChange={ event => store.set(newTodo, event.target.value) }
    />
    <button onClick={ () => store.push(todos, store.get(newTodo)) }>
      Add
    </button>
  </form>
))
```

Now let's create a way to delete todos when they are done. Let's add a checkbox next to each todo to do that.

```jsx
const Todo = props => (
  <div>
    <input
      type="checkbox"
      onChange={ () => store.filter(todos, todo => todo !== props.todo) }
    />
    { props.todo }
  </div>
)
```

We can now call each todo such as:

```jsx
{ store.get(todos).map(todo => ( <li key={ todo }><Todo todo={ todo } /></li> )) }
```

Let's say we want to edit the todo. Let's level our Todo component. We'll use the props to create a local store that will be passed in the props


```jsx
const Todo = withStore(props => ({ nextTodo: store.string() }))(props => {
  const onSave = () => store.map(
    todos,
    todo => {
      // if this current todo, change it with new value
      if (todo === props.todo) {
        return store.get(props.nextTodo)
      }
      return todo
    }
  )
  
  return (
    <div>
      <input
        type="checkbox"
        onChange={ () => store.filter(todos, todo => todo !== props.todo) }
      />
      <input
        value={ store.get(props.nextTodo) }
        onChange={ event => store.set(props.nextTodo, event.target.value) }
      />
      <button onClick={ onSave }>
        Change
      </button>
    </div>
  )
})
```

