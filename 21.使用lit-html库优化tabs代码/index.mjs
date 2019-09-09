import { html, render } from './node_modules/lit-html/lit-html.js'
import { stateUtil } from './lib/index.mjs'
import './components/Xtabs.mjs'

stateUtil({
  state: {
    loading: false,
    webs: [],
    books: [
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
  },
  init() {
    this.setState({
      loading: true
    })

    setTimeout(() => {
      this.setState({
        loading: false,
        webs: [
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
      })
    }, 1000)
  },
  render() {
    const { webs, books, loading } = this.state

    render(
      html`
        <div>
          <h2>这是一个同步 Tabs 组件</h2>
          <x-tabs .selected=${0}>
            ${
              books.map(({ title, content }) => html`
                <button slot="title">${title}</button>
                <section>${content}</section>
              `)
            }
          </x-tabs>
          <h2>这是一个异步 Tabs 组件</h2>
          <x-tabs .selected=${1} ?loading=${loading}>
            ${
              webs.map(({ title, content }) => html`
                <button slot="title">${title}</button>
                <section>${content}</section>
              `)
            }
          </x-tabs>
        </div>
      `,
      document.querySelector('#app'),
      {
        eventContext: this
      }
    )
  }
})
