## 在 react 中正确处理web components事件

错误的

```jsx
class App extends React.Component {
	handleSwitchChange = ({ detail }) => {
  	alert(detail.checked)
  }
  
  render() {
    return (
      <div>
        <xy-switch checked onchange={this.handleSwitchChange}></xy-switch>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector("#app"))
```

onchange不会被触发，onChange此是如此。

正确的

```jsx
class App extends React.Component {
  componentDidMount() {
    this.switchRef.addEventListener('change', this.handleSwitchChange)
  }

  componentWillUnmount() {
    this.switchRef.removeEventListener('change', this.handleSwitchChange)
  }

	handleSwitchChange = ({ detail }) => {
  	alert(detail.checked)
  }
  
  render() {
    return (
      <div>
        <xy-switch checked ref={ref => this.switchRef = ref}></xy-switch>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector("#app"))
```

## 参考

[在React中使用Web组件](https://coryrylan.com/blog/using-web-components-in-react)
