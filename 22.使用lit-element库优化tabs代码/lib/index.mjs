export const createEl = (html) => {
  const div = document.createElement('div')
  div.innerHTML = html

  return div.firstElementChild
}

export const stateUtil = (options) => {
  options = {
    render() {},
    init() {},
    ...options,
    setState(state) {
      this.state = {
        ...this.state,
        ...state
      }

      options.render()
    }
  }

  options.init()
  options.render()
}
