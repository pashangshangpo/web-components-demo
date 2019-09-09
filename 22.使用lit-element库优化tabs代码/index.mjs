import { LitElement, html } from 'https://unpkg.com/lit-element@2.1.0/lit-element.js?module'

import './components/Xtabs.mjs'

class MyMain extends LitElement {
  static get properties() {
    return {
      loading: {
        type: Boolean,
        reflect: true
      },
      webs: {
        type: Array,
        reflect: true
      },
      books: {
        type: Array,
        reflect: true
      }
    }
  }

  constructor() {
    super()

    this.loading = false
    this.webs = []
    this.books = [
      {
        title: 'CSS禅意花园',
        content: 'CSS禅意花园...'
      },
      {
        title: '遇见未知的CSS',
        content: '遇见未知的CSS...'
      },
      {
        title: 'CSS权威指南',
        content: 'CSS权威指南...'
      },
    ]
  }

  firstUpdated() {
    this.loading = true

    setTimeout(() => {
      this.loading = false
      this.webs = [
        {
          title: 'Html',
          content: 'Html Content'
        },
        {
          title: 'Css',
          content: 'Css Content'
        },
        {
          title: 'Javascript',
          content: 'Javascript Content'
        }
      ]
    }, 1000)
  }

  render() {
    return html`
      <div>
        <h2>这是一个同步 Tabs 组件</h2>
        <x-tabs .selected=${0}>
          ${
            this.books.map(({ title, content }) => html`
              <button slot="title">${title}</button>
              <section>${content}</section>
            `)
          }
        </x-tabs>
        <h2>这是一个异步 Tabs 组件</h2>
        <x-tabs .selected=${1} .loading=${this.loading}>
          ${
            this.webs.map(({ title, content }) => html`
              <button slot="title">${title}</button>
              <section>${content}</section>
            `)
          }
        </x-tabs>
      </div>
    `
  }
}

customElements.define('my-main', MyMain)
