//VARS
const collection = document.querySelector('#toy-collection');
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyForm = document.querySelector('.add-toy-form');

let addToy = false;

//DOC LOAD
document.addEventListener("DOMContentLoaded", () => {
  formToggle();
  fetchToys();
  submitToyData();
});


//FUNCTIONS
function formToggle (){
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
}

function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => json.forEach(toy => makeToyCard(toy)));
}

function makeToyCard(toy) {
    let toyCard = document.createElement('div');
    toyCard.classList.add('card');

    let toyH2 = document.createElement('h2');
    toyH2.id = `${toy.id}`;
    toyH2.innerText = toy.name;

    let toyImg = document.createElement('img');
    toyImg.classList.add('toy-avatar');
    toyImg.src = toy.image;

    let toyLikes = document.createElement('p');
    toyLikes.innerText = `${toy.likes} Likes`;
  
    let toyButton = document.createElement('button')
    toyButton.classList.add('like-btn');
    toyButton.innerText = 'Like <3';

    toyCard.append(toyH2, toyImg, toyLikes, toyButton);

    collection.appendChild(toyCard);
    clickToyLikes();
}

function submitToyData (){
  toyForm.addEventListener('submit', addNewToy)
}

function addNewToy(e){
  e.preventDefault();
  const name = document.querySelector('input[name=name]').value;
  const link = document.querySelector('input[name=image]').value;

  let formData = {
    name: name,
    image: link,
    likes: 0
  };

  let configObj = {
    method: 'POST', 
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch('http://localhost:3000/toys', configObj)
  .then(resp => resp.json())
  .then(json => fetchToys());
}

function clickToyLikes() {
  const likeButton = document.querySelectorAll('.like-btn');
  likeButton.forEach(btn => {
    btn.addEventListener('click', addToyLikes);
  });
}

function addToyLikes(e){
  let likes = parseInt(e.target.parentNode.children[2].innerText.split(' ')[0]) + 1
  let showLikes = e.target.parentNode.children[2]
  showLikes.innerText = `${likes} Likes`
  
  let toyId = e.target.parentNode.children[0].id

  let updateLikes = {
    likes: likes
  };

  let configObj = {
    method: 'PATCH', 
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(updateLikes)
  };

  fetch(`http://localhost:3000/toys/${toyId}`, configObj)
  .then(resp => resp.json())
  .then(json => showLikes.innerText = `${json.likes} Likes`)
}
