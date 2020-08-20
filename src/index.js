let addToy = false;
const toysurl = "http://localhost:3000/toys";
// document.addEventListener("DOMContentLoaded", () => {
//   fetchToys();
// })
const addLike = function(event) {
  event.preventDefault()
  debugger
  let likedToy = document.getElementById(event.target.id);
  let previousLikes = parseInt(likedToy.querySelector("span").innerText); // this isn't reading a number as in shouwing up as nill
  let updatedLikes = previousLikes + 1; // why is this not a number
  const likeConfig = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": updatedLikes
    })
  };
  let toyId = event.target.id;
  let url = `http://localhost:3000/toys/${toyId}`; 
  fetch(url, likeConfig)
    .then(resp => resp.json())
    .then((json) => {likedToy.querySelector('span').innerText = updatedLikes})
}
function renderToyDivCards(json) {
  console.log(json);
  const toyCollection = document.getElementById('toy-collection')
  json.map((toy) => {
    const toyCardDiv = document.createElement('div');
    toyCardDiv.setAttribute('id', toy.id);
    toyCardDiv.classList.add('card');
    const toyName = document.createElement('h2');
    toyName.textContent = toy.name;
    toyCardDiv.appendChild(toyName);
    const toyImage = document.createElement('img');
    toyImage.setAttribute('src', toy.image);
    toyImage.classList.add('toy-avatar');
    toyCardDiv.appendChild(toyImage);
    const toyLikes = document.createElement('p');
    toyLikes.innerHTML = `<span>${toy.likes}</span> likes`; // integer conversion is not displaying
    toyCardDiv.appendChild(toyLikes);
    const likeButton = document.createElement('button');
    likeButton.setAttribute('id', toy.id);
    likeButton.classList.add('like-button');
    likeButton.innerText = "like";
    likeButton.addEventListener('click', addLike);
    toyCardDiv.appendChild(likeButton);
    toyCollection.appendChild(toyCardDiv)
  }) 
}
function fetchToys() {
  return fetch(toysurl)
    .then((resp) => { 
      return resp.json();
    })
    // .then((json) => {
    //   return renderToyDivCards(json)
    // }) 
    .then(renderToyDivCards)
}
document.addEventListener("DOMContentLoaded", () => {
  fetchToys()
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