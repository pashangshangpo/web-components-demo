import './components/Xtabs.mjs'
import { renderMain } from './lib/index.mjs'

renderMain('#app', {
  state: {
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
    setTimeout(() => {
      this.setState({
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
    const { webs, books } = this.state

    return `
      <div>
        <h2>这是一个同步 Tabs 组件</h2>
        ${
          books.length <= 0 ? '找不到相关数据' : (`
            <x-tabs selected="0">
                ${
                  books.map(({ title, content }) => (`
                    <button slot="title">${title}</button>
                    <section>${content}</section>
                  `)).join('')
                }
            </x-tabs>
          `)
        }
        <h2>这是一个异步 Tabs 组件</h2>
        ${
          webs.length <= 0 ? '' : (`
            <x-tabs selected="1">
                ${
                  webs.map(({ title, content }) => (`
                    <button slot="title">${title}</button>
                    <section>${content}</section>
                  `)).join('')
                }
            </x-tabs>
          `)
        }
      </div>
    `
  }
})
