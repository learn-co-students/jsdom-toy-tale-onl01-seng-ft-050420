let addToy = false

document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.querySelector('#new-toy-btn')
  const toyFormContainer = document.querySelector('.container')
  addBtn.addEventListener('click', () => {
    addToy = !addToy
    if (addToy) {
      toyFormContainer.style.display = 'block'
      let toyForm = document.querySelector('.add-toy-form')
      toyForm.addEventListener('submit', function (e) {
        newToy(e.target.name.value, e.target.image.value)
      })
    } else {
      toyFormContainer.style.display = 'none'
    }
  })
})

function fetchToys() {
  fetch('http://localhost:3000/toys')
    .then((response) => {
      return response.json()
    })
    .then((toys) => {
      renderToys(toys)
    })
}

function renderToys(toys) {
  const collection = document.querySelector('#toy-collection')
  toys.forEach((toy) => {
    //uggghhhhh
    const card = document.createElement('div')
    card.className = 'card'
    const h2 = document.createElement('h2')
    h2.innerHTML = toy.name
    card.appendChild(h2)
    const img = document.createElement('img')
    img.src = toy.image
    img.className = 'toy-avatar'
    card.appendChild(img)
    const p = document.createElement('p')
    p.innerText = `${toy.likes} Likes`
    card.appendChild(p)
    collection.appendChild(card)
    const button = document.createElement('button')
    button.innerHTML = 'Like'
    button.className = 'like-btn'
    button.id = `${toy.id}`
    button.addEventListener('click', function (e) {
      addLike(e)
    })
    card.appendChild(button)
  })
}

function newToy(toyName, toyImg) {
  let formData = {
    name: toyName,
    image: toyImg,
    likes: '0',
  }
  let configObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(formData),
  }
  fetch('http://localhost:3000/toys', configObj)
    .then(function (response) {
      return response.json()
    })
    .then(function (object) {
      console.log(object)
    })
    .catch(function (error) {
      console.log(error.message)
    })
}

function addLike(event) {
  let toyLikes = event.target.previousElementSibling
  let oldLikes = parseInt(toyLikes.innerText.split(' ')[0])
  let newLikes = oldLikes + 1
  toyLikes.innerText = `${newLikes} Likes`
  let toyId = event.target.id // matches button id
  let configObj = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      likes: newLikes,
    }),
  }
  fetch(`http://localhost:3000/toys/${toyId}`, configObj)
}

document.addEventListener('DOMContentLoaded', function () {
  fetchToys()
})
