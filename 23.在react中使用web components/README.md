## 在 react 中使用 web components

```jsx
customElements.define('x-messsage', class extends HTMLElement {
  static get observedAttributes() {
    return ['text']
  }

  constructor() {
      super()

      this.attachShadow({ mode: 'open' })
  }

  attributeChangedCallback() {
    this.shadowRoot.innerHTML = `<h2>${this.getAttribute('text')}</h2>`
  }
})

class App extends React.Component {
  render() {
    return (
      <div>
        <x-messsage text="Say Hi"></x-messsage>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector("#app"))
```

## class && className

在 Web Components 中使用的是 class 而非 className。


正确的

```jsx
<x-messsage text="Say Hi" class="red"></x-messsage>
```

错误的

```jsx
<x-messsage text="Say Hi" className="red"></x-messsage>
```
