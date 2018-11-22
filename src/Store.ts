class Store {
  public elements: { update: () => void, unmounted: boolean }[] = []

  public update = async () => {
    for (const element of this.elements) {
      await element.update()
    }
  }

  public clean = () => {
    this.elements= this.elements.filter(element => !element.unmounted)
  }
}

export default Store
