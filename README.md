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
import store, { withStore } from '@francoisv/react-store'

const email = store(String)

const View = withStore(email)(() => (
  <input
    value={ email.get() }
    onChange={ event => email.set(event.target.value )}
  />
))

```

# Types

You can see [here](https://github.com/co2-git/react-ez-store/tree/master/src) the list of the different supported types.
