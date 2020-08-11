let addToy = false;
const toyCollection = document.getElementById("toy-collection")
const toyForm = document.querySelector(".add-toy-form")


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



fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(toys => {
    toys.forEach(toy => {
      toyCollection.innerHTML +=
        `<div class="card">
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar">
          <p>${toy.likes}</p>
          <button class="like-btn"> Like <3</button>
        </div>`
    })
});



toyForm.addEventListener('submit', e => {
  e.preventDefault();
  const inputData = document.querySelectorAll(".input-text")
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: inputData[0].value,
      image: inputData[1].value,
      likes: 0 
    })
  })
});

document.querySelectorAll(".like-btn").forEach (button => {
  button.addEventListener("click", e => {
    e.preventDefault();
    debugger
    button.parentElement.children[2].innerText++
    fetch(`http://localhost:3000/toys/${button.parentElement}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "applciation/json"
      },
      body: JSON.stringify({
        likes: e.target.likes++
      })
    })
  })
})





