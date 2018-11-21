class Store {
  public elements: { update: () => void }[] = []

  public update = async () => {
    for (const element of this.elements) {
      await element.update()
    }
  }
}

export default Store
