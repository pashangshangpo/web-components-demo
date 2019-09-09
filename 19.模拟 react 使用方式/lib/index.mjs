export const createEl = (html) => {
  const div = document.createElement('div')
  div.innerHTML = html

  return div.firstElementChild
}

export const renderMain = (id, options) => {
  const appEl = document.body.querySelector(id)
  let child = null

  options = {
    render() {},
    init() {},
    ...options,
    setState(state) {
      this.state = {
        ...this.state,
        ...state
      }

      if (child) {
        appEl.removeChild(child)
        
        child = createEl(options.render())
        appEl.appendChild(child)
      }
    }
  }

  options.init()

  child = createEl(options.render())
  appEl.appendChild(child)
}
