const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollection = document.querySelector("#toy-collection");
const toyForm = document.querySelector(".add-toy-form");

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  loadEvents();
});

function loadEvents() {
  formToggle();
  fetchToys();

  submitFormData();
}

function formToggle() {
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

function submitFormData() {
  toyForm.addEventListener('submit', submitForm);
}

function submitForm(e) {
  e.preventDefault();
  const name  = toyForm.querySelector('input[name="name"]').value;
  const imgURL = toyForm.querySelector('input[name="image"]').value;
  
  let formData = {
    name: name,
    image: imgURL,
    likes: 0
  }

  let configObj = {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch('http://localhost:3000/toys', configObj)
    .then(resp => resp.json())
    .then(json => addToyCard(json));

  // reset
  // toyForm.elements[0].value = '';
  // toyForm.elements[1].value = '';
}

function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => json.forEach(toy => addToyCard(toy)));
}

function addToyCard(toy) {
  const toyCard = document.createElement('div')

  toyCard.classList.add('card');
  toyCard.setAttribute('likes', toy.likes);
  toyCard.setAttribute('toyId', toy.id);

  toyCollection.appendChild(toyCard);

  let toyName = document.createElement('h2');
  toyCard.appendChild(toyName);
  toyName.innerText = `${toy.name}`;

  let toyImage = document.createElement('img');
  toyCard.appendChild(toyImage);
  toyImage.classList.add('toy-avatar');
  toyImage.src = toy.image;

  let likeP = document.createElement('p');
  toyCard.appendChild(likeP);
  likeP.innerText = `${toy.likes} Likes `;

  let likeButton = document.createElement("button");
  likeButton.classList.add('like-btn');
  likeButton.innerHTML = "Like &#x2764";
  toyCard.appendChild(likeButton);

  likeButton.addEventListener('click', likeCount);
};

function likeCount(e) { 
  const toyCard = e.target.parentNode
  let likeP = toyCard.querySelector('p')
  let toy_id = toyCard.attributes.toyId.value;
  let likes = parseInt(toyCard.attributes.likes.value, 10) + 1;

  fetch(`http://localhost:3000/toys/${toy_id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      likes: likes
    }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then(response => response.json())
  .then(json => likeP.innerText = `${json.likes} Likes `)
  .then(toyCard.setAttribute('likes', likes))
}