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

# Todos

First, let's get our dependencies:

```js
import React from 'react'
import store, { withStore } from '@francoisv/react-store'
```

Now let's create a store array for the todos. For the sake of simplicity, todos are plain strings.
We'll start with one todo in the list.

```js
const todos = store.Array('Buy milk')
// with typescript
const todos = store.Array<string>('Buy milk')
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
