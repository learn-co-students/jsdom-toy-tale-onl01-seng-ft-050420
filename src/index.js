let addToy = false;
let toyDiv = document.getElementById("toy-collection")
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.add-toy-form')

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

toyForm.addEventListener('submit', function(e){
  e.preventDefault();
  let toyName = e.target.children.name.value
  let toyImage = e.target.children.image.value 
  newToy(toyName,toyImage)
})

const configObject = {
  method: "POST",
  headers: 
  {
    "Content-Type": "application/json",
    Accept: "application/json"
  } 
}

function toyData(toyName,toyImage){
  configObject.body = JSON.stringify({
    name: toyName,
    image: toyImage
  })
  return fetch("http:localhost:3000/toys", configObject)
};

function newToy(toyName,toyUrl){
  return fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: toyName, image: toyUrl, likes: 0})
  })
  .then(res => res.json())
}


fetch("http://localhost:3000/toys")
  .then(function(resp){ 
    return resp.json()})
  .then(function(json){
    json.forEach(createToy)
  }) 
  
function likeToy(e){
  const likeButtons = document.querySelectorAll(".like-btn")
  let likes = e.likes 

  for(const likeButton of likeButtons){
    likeButton.addEventListener("click",function(){
      console.log("hello")
      likes += 1;
    })
  }

  fetch("http://localhost:3000/toys/:id", {
    method: "PATCH",
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": likes 
    })
  })
}

function editToy(e){
  let editButton = e.target 
  console.log('edit')
  if (editButton.innerText === "Edit") {
    editButton.innerText = "Save"
    // toyName.innerHTML = `<input type="text" value="${toyName.innerText}">`
  } else {
    editButton.innerText  = "Edit"
    toyName.innerHTML = `<input type="text" value="${toyName.innerText}">`
  }

  

  
}

function createToy(toy){
  toyDiv.innerHTML += `<div id="${toy.id}" class="card"><h2>${toy.name}</h2>
  <img class="toy-avatar" src="${toy.image}"/>
  <p>${toy.likes}</p></div>`

  let likeButton = document.createElement("button")
  likeButton.classList.add("like-btn")
  likeButton.innerText = "Like <3"
  
  let idDiv = document.getElementById(`${toy.id}`)
  idDiv.appendChild(likeButton)

  // likeButton.addEventListener("click",likeToy)

  let editButton = document.createElement("button")
  editButton.classList.add("edit-btn")
  editButton.innerText = "Edit"

  editButton.addEventListener('click', editToy)
  
  idDiv.appendChild(editButton)
  idDiv.addEventListener('click', function(){
    console.log('hello')
  })

}