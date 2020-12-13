const app = document.getElementById('root')

const container = document.createElement('div')
container.setAttribute('class', 'container')

app.appendChild(container)

var request = new XMLHttpRequest()
request.open('GET', 'https://gsconfessions.herokuapp.com/?format=json', true)
// request.open('GET', 'https://localhost:8000', true)
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      const card = document.createElement('div')
      card.setAttribute('class', 'card')

      const h1 = document.createElement('h1')
      h1.textContent = '<Name for whom this is>'

      const p = document.createElement('p')
      p.textContent = movie.title
      
      const span = document.createElement('i')
      span.setAttribute('class','fa fa-eye')
      span.textContent=(' 111')
      
      container.appendChild(card)
      card.appendChild(h1)
      card.appendChild(p)
      card.appendChild(span)
    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }
}

request.send()
