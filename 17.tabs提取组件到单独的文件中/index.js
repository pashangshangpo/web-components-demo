document.querySelector('#btn').addEventListener('click', function() {
  const xTab = document.createElement('x-tabs')
  
  document.body.appendChild(xTab)

  xTab.setAttribute('loading', true)

  setTimeout(() => {
    const data = [
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
    
    xTab.innerHTML = data.map(({ title, content }) => (`
      <button slot="title">${title}</button>
      <section>${content}</section>
    `)).join('')

    xTab.setAttribute('selected', 1)
    xTab.removeAttribute('loading')
  }, 1000)

  this.parentNode.removeChild(this)
})
