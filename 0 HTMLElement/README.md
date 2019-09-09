### HTMLElement

所有html继承自HTMLElement

### x

自定义元素的原型是HTMLUnknownElement

### x-xx

中间为-的是自定义组件，直接继承自HTMLElement

### html元素

html元素要么原型直接为HTMLElement，要么间接继承至HTMLElement，如 div 的原型链如下

```
HTMLDivElement > HTMLElement > Element > Node > EventTarget > Object > null
```
