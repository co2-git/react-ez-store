import * as React from 'react'
import forIn from 'lodash.forin'

import Store from './Store'

type StoreList = { [key: string]: Store | StoreList }

export type StoreType =
  | Store
  | ((props: any) => StoreList)

const withStore = (...stores: StoreType[]) => (Component: any) =>
  class WithStoreWrapper extends React.PureComponent<any, { updates: number }> {
    public static displayName = Component.displayName || Component.name

    public state = { updates: 0 }

    public unmounted = false

    public stateProps: StoreList = {}

    public stores: Store[] = []

    public constructor(props: any) {
      super(props)
      for (const store of stores) {
        if (store instanceof Store) {
          store.elements.push(this)
          this.stores.push(store)
        } else if (typeof store === 'function') {
          const state = store(this.props)
          this.getStoresFromState(state)
        }
      }
    }

    public getStoresFromState = (state: StoreList) => {
      forIn(state, store => {
        if (store instanceof Store) {
          store.elements.push(this)
          this.stores.push(store)
        } else if (typeof store === 'object') {
          this.getStoresFromState(store)
        }
      })
    }

    public componentWillUnmount() {
      this.unmounted = false
      for (const store of this.stores) {
        store.clean()
      }
    }

    public update = () => {
      if (!this.unmounted) {
        this.setState({ updates: this.state.updates + 1 })
      }
    }

    public render() {
      return (
        <Component
          { ...this.props }
          { ...this.stateProps }
          updates={ this.state.updates }
        />
      )
    }
  }

export default withStore
