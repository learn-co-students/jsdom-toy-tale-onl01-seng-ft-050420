let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

let form = document.querySelector(".add-toy-form");

form.addEventListener("submit",(e) =>{
e.preventDefault()
let name = document.querySelectorAll(".input-text")[0].value
let image = document.querySelectorAll(".input-text")[1].value
fetch('http://localhost:3000/toys', {
  method: "POST",
  headers: {
    "Content-Type": "Application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    name: name,
    image: image,
    likes:0
  })
})
.then(function(response){
  return response.json()
})
.then(function(object){
  createToy(object)
})
})

function createToy(toy){
  let div = document.createElement('div')
  div.className = "card"
  let h2 = document.createElement('h2')
  h2.textContent = toy.name
  let image = document.createElement('img')
  image.setAttribute('src', toy.image)
  image.className = "toy-avatar"
  let p = document.createElement('p')
  p.textContent = `${toy.likes} likes`
    let like = document.createElement('button')
  like.className = "like-btn"
  like.setAttribute('id',toy.id)
  like.textContent = "like"
  like.addEventListener('click', (e) => {
    addLike(e)
  })


  let toyCollection = document.querySelector("#toy-collection")
  toyCollection.appendChild(div)
  div.append(h2, image, p, like)
}

function addLike(e){
  e.preventDefault()
  let oneMore = parseInt(e.target.previousElementSibling.innerText) + 1

  fetch(`http://localhost:3000/toys/${e.target.id}`,{
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
    body: JSON.stringify({
      "likes": oneMore
    })
  })
  .then(function(response){
    return response.json()
  })
  .then(function(object){
    e.target.previousElementSibling.innerText= `${object.likes} likes`
  })
}

