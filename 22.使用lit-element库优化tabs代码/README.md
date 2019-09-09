# lit-html 问题

## 问题1

使用者传参方式和组件实现者可能做法不一致, 例如：

```jsx
.selected=${1}

selected="1"
```

第一种方式，更新selected值，attributeChangedCallback并不会触发，需要使用 set 方法检测。
因此使用时需要同时监听 set 和 attributeChangedCallback。

## 问题2

参数被优先于列表渲染

```jsx
<x-tabs .selected=${1} ?loading=${loading}>
  ${
    webs.map(({ title, content }) => html`
      <button slot="title">${title}</button>
      <section>${content}</section>
    `)
  }
</x-tabs>
```

假如在selected更新后，我想获取 webs 列表元素是获取不到的，因为selected的 set 优先被执行了，而此时列表还没有被渲染出来。
