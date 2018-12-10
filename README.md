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

# Click counter example

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

More examples in the [wiki](https://github.com/co2-git/react-ez-store/wiki)

