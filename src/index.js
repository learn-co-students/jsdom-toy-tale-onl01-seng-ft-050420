let addToy = false;
const toyFormContainer = document.querySelector(".container");
const div_toyCollection = document.querySelector("#toy-collection")
const addBtn = document.querySelector("#new-toy-btn");


function renderToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name

  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  div_toyCollection.append(divCard)
}

function getToys() {
  return fetch('http://localhost:3000/toys')
    .then(res => res.json())
}

function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"

      },
      body: JSON.stringify({
        "likes": more
      })
    })
    .then(res => res.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}


function postToyData(toy_data){
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      "name": toy_data.name.value,
      "url": toy_data.image.value,
      "likes": 0
    })
  })
  .then(res => res.json())
  .then(data => {
    let newToy = renderToys(data);
    div_toyCollection.append(newToy)

  })
}




document.addEventListener("DOMContentLoaded", () => {
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", function(e){
          e.preventDefault()
          postToyData(e.target)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


getToys().then(toys => {
  toys.forEach(toy => {
    //function to render toys goes here or something
    renderToys(toy)
  })
})