let toyCollection = document.querySelector('#toy-collection')
let toyForm = document.querySelector('#add-toy-form')

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyFormContainer = document.querySelector('#container')
  fetchToys()
  addBtn.addEventListener('click', () => {
    toyFormContainer.classList.toggle('d-none')
  })
})

toyForm.addEventListener('submit', submitToyForm)

function submitToyForm(e) {
  e.preventDefault()
  let name = toyForm.querySelector('input[name="name"]').value
  let img = toyForm.querySelector('input[name="image"]').value
  let toy = {
    name: name,
    image: img,
    likes: 0
  }
  createToy(toy)
}

function fetchToys() {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(toyLoop)
}

function createToy(toy) {
  const config = {
    method: 'POST',
    body: JSON.stringify(toy),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Set-Cookie': 'flavor=choco; SameSite=None; Secure'
    }
  }
  return fetch('http://localhost:3000/toys', config)
    .then(res => res.json())
    .then(makeCard)
}

function patchToyLikes(id, likes) {
  const config = {
    method: 'PATCH',
    body: JSON.stringify({likes: likes}),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  return fetch('http://localhost:3000/toys/' + id, config)
    .then(res => res.json())
}

function toyLoop(toys) {
  toys.forEach(makeCard)
}

function makeCard(toy) {
  let card = document.createElement('div')
  let cardTitle = document.createElement('h2')
  let cardImg = document.createElement('img')
  let cardLikeCount = document.createElement('p')
  let cardLikeBtn = document.createElement('button')
  card.classList.add('card')
  cardImg.classList.add('toy-avatar')
  cardLikeBtn.classList.add('like-btn')
  card.setAttribute('likes', toy.likes)
  card.setAttribute('toyId', toy.id)
  cardImg.src = toy.image
  cardTitle.innerText = toy.name
  cardLikeCount.innerText = `${toy.likes} Likes`
  cardLikeBtn.innerHTML = 'Like &#x2764;'
  card.append(cardTitle, cardImg, cardLikeCount, cardLikeBtn)
  toyCollection.appendChild(card)
  cardLikeBtn.addEventListener('click', likeToy)
  
}

function likeToy(e) {
  let toy = e.target.parentNode
  let cardLikeCount = toy.querySelector('p')
  let likes = parseInt(toy.attributes.likes.value, 10) + 1
  let id = toy.attributes.toyId.value
  patchToyLikes(id, likes).then(() => {
    cardLikeCount.innerText = `${likes} Likes`
    toy.setAttribute('likes', likes)
  })
}
