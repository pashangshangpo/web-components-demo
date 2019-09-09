import { html, render } from '../node_modules/lit-html/lit-html.js'

customElements.define('x-tabs', class extends HTMLElement {
  static get observedAttributes() {
    return ['selected', 'loading']
  }

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })
    this.render()
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

  set selected(index) {
    this.setAttribute('selected', index)
  }

  set selectedIndex(index) {
    setTimeout(() => {
      if (this.headerChildren.length <= 0) {
        return
      }
  
      if (this.preIndex !== -1) {
        this.headerChildren[this.preIndex].removeAttribute('aria-selected')
        this.bodyChildren[this.preIndex].removeAttribute('aria-selected')
      }
  
      this.preIndex = index
      this.headerChildren[index].setAttribute('aria-selected', 'true')
      this.bodyChildren[index].setAttribute('aria-selected', 'true')
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'selected') {
      this.selectedIndex = Number(newValue)
    } else if (name === 'loading') {
      this.selectedIndex = Number(this.getAttribute('selected'))
    }

    this.render()
  }

  handleTitleClick = (e) => {
    if (e.target.slot === 'title') {
      this.setAttribute('selected', this.headerChildren.indexOf(e.target))
    }
  }

  render() {
    render(
      html`
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
        <div id="loading" ?hidden=${!this.hasAttribute('loading')}>正在加载中...</div>
        <header id="header">
          <slot @click=${this.handleTitleClick} name="title"></slot>
        </header>
        <main id="body">
          <slot></slot>
        </main>
      `,
      this.shadowRoot,
      {
        eventContext: this
      }
    )
  }
})

export default () => document.createElement('x-tabs')
