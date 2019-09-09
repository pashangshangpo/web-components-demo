customElements.define('x-tabs', class extends HTMLElement {
  static get observedAttributes() {
    return ['selected', 'loading']
  }

  constructor() {
    super()

    const shadowRoot = this.attachShadow({ mode: 'open' })

    shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          min-width: 300px;
          height: 300px;
          padding: 12px;
          background: green;
        }
        
        #header {
          display: flex;
        }

        #header ::slotted(*) {
          flex: 1;
        }

        #header ::slotted([aria-selected="true"]) {
          background: red;
        }

        #body ::slotted(:not([aria-selected="true"])) {
          display: none;
        }
      </style>
      <div>
        <div id="loading">正在加载中...</div>
        <header id="header">
          <slot name="title"></slot>
        </header>
        <main id="body">
          <slot></slot>
        </main>
      </div>
    `
  }

  preIndex = -1

  get headerSlot() {
    return this.shadowRoot.querySelector('#header slot')
  }

  get bodySlot() {
    return this.shadowRoot.querySelector('#body slot')
  }

  get headerChildren() {
    return this.headerSlot.assignedNodes()
  }

  get bodyChildren() {
    return this.bodySlot.assignedNodes().filter(el => el.nodeType === Node.ELEMENT_NODE)
  }

  set selectedIndex(index) {
    if (this.preIndex !== -1) {
      this.headerChildren[this.preIndex].removeAttribute('aria-selected')
      this.bodyChildren[this.preIndex].removeAttribute('aria-selected')
    }

    this.preIndex = index
    this.headerChildren[index].setAttribute('aria-selected', 'true')
    this.bodyChildren[index].setAttribute('aria-selected', 'true')
  }

  connectedCallback() {
    this.headerSlot.addEventListener('click', this.handleTitleClick)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'selected') {
      this.selectedIndex = Number(newValue)
    }
    else if (name === 'loading' && newValue === null) {
      this.shadowRoot.querySelector('#loading').hidden = true
    }
  }

  disconnectedCallback() {
    this.headerSlot.removeEventListener('click', this.handleTitleClick)
  }

  handleTitleClick = (e) => {
    if (e.target.slot === 'title') {
      this.setAttribute('selected', this.headerChildren.indexOf(e.target))
    }
  }
})

export const create = () => document.createElement('x-tabs')
