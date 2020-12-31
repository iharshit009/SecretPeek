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
    console.log(data)
    data.forEach((movie,index) => {
      const card = document.createElement('div')
      card.setAttribute('id', index)
      card.setAttribute('class', 'card')
      card.setAttribute('ondblclick', 'setLikeDislike(this)')

      const h1 = document.createElement('h1')
      h1.textContent = '<Name for whom this is>'

      const p = document.createElement('p')
      p.textContent = movie.title

      const cardBut = document.createElement('div')
      cardBut.setAttribute('class', 'card-buttons')
      
      const span = document.createElement('i')
      span.setAttribute('class','fa fa-eye icon')
      span.textContent=(' 111')
      const span2 = document.createElement('i')
      span2.setAttribute('class','fa fa-heart icon heart-icon')
      span2.textContent=('')
      span2.setAttribute('onclick', 'setIconLikeDislike(this)')
      var t = document.createElement('div')
      t.setAttribute('class','date')
      var timestamp = Date.now();
      var d = new Date(timestamp);
      t.textContent=(d)
      cardBut.appendChild(span)
      cardBut.appendChild(span2)

      container.appendChild(card)
      card.appendChild(h1)
      card.appendChild(p)
      card.appendChild(t)
      card.appendChild(cardBut)
      
    })
  } else {
    const errorMessage = document.createElement('marquee')
    errorMessage.textContent = `Gah, it's not working!`
    app.appendChild(errorMessage)
  }
}

request.send()

function setLikeDislike(obj){
  var t1 = document.getElementById(obj.id).childNodes;
  var t2 = t1[3].childNodes;
  t2[1].classList.toggle("liked");
}

function setIconLikeDislike(obj){ 
  obj.classList.toggle("liked");
}