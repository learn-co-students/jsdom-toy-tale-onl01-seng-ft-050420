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
    json.forEach(toy => toyDiv.innerHTML += `<div class="card"><h2>${toy.name}</h2>
    <img src=${toy.image}/>
    <p>${toy.likes}</p>
    <button class="like-btn">Like <3</button></div>`)
  })

// fetch("http://localhost:3000/toys", {
//   method: "POST",
//   headers: 
//     {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     }
   
//     body: JSON.stringify({
//       "name": "Jessie",
//       "image": "https://vignette.wikia.nocookie.net/p__/images/8/88/Jessie_Toy_Story_3.png/revision/latest?cb=20161023024601&path-prefix=protagonist",
//       "likes": 0
//     })
//   });  
  
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