## 使用react包装web components组件

```jsx
class Switch extends React.Component {
	static defaultProps = {
  	onChange() {}
  }
  
	componentDidMount() {
	  if (this.props.checked) {
    	this.switchRef.setAttribute('checked', '')
    }
    
    this.switchRef.addEventListener('change', this.handleSwitchChange)
  }
  
  componentWillReceiveProps(props) {
  	if (props.checked !== this.props.checked) {
    	 if (props.checked) {
       		this.switchRef.setAttribute('checked', '')
       } else {
       	 this.switchRef.removeAttribute('checked')
       }
    }
  }
  
  componentWillUnmount() {
    this.switchRef.removeEventListener('change', this.handleSwitchChange)
  }
  
  handleSwitchChange = (...arg) => {
  	this.props.onChange(...arg)
  }
  
  render() {
  	return (
    	<xy-switch ref={ref => this.switchRef = ref}></xy-switch>
    )
  }
}

class App extends React.Component {
	handleSwitchChange = ({ detail }) => {
  	alert(detail.checked)
  }
  
  render() {
    return (
      <div>
        <Switch checked onChange={this.handleSwitchChange} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector("#app"))
```
