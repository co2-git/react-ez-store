import * as React from 'react'

const withStore = (...stores: any) => (Component: any) =>
  class extends React.PureComponent<any, { updates: number }> {
    public static displayName = Component.displayName || Component.name

    public state = { updates: 0 }

    public mounted = false

    public constructor(props: any) {
      super(props)
      for (const store of stores) {
        store.elements.push(this)
      }
    }

    public componentDidMount() {
      this.mounted = true
    }

    public componentWillUnmount() {
      this.mounted = false
    }

    public update = () => {
      if (this.mounted) {
        this.setState({ updates: this.state.updates + 1 })
      }
    }

    public render() {
      return (
        <Component { ...this.props } updates={ this.state.updates } />
      )
    }
  }

export default withStore
