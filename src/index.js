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
        `<div data-id="${toy.id}" class="card">
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar">
          <p>${toy.likes}</p>
          <button class="like-btn"> Like <3</button>
          <button class="edit-btn"> Edit </button>
        </div>`
    })
    const editButtons = toyCollection.querySelectorAll('.edit-btn')
    editButtons.forEach( button => {
      button.addEventListener( 'click', editButtonClick );
    })
    likeButtonListeners()
});

function editButtonClick(e) {
  console.log("Button was clicked.")
  const header = e.target.parentElement.querySelector('h2')
  if (e.target.innerText === "Edit") {
    e.target.innerText = "Save";
    header.innerHTML = `<input type='text' value='${header.innerText}'>`
  } else {
    e.target.innerText = "Edit"
    header.innerHTML = header.firstChild.value
    // debugger
    updateToyName(header.innerText, header.parentElement.dataset.id);
  }
};

function updateToyName(name, id) {

  const config = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }, 
    body: JSON.stringify({
      name
    })
  }

  fetch(`http://localhost:3000/toys/${id}`, config)

}


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


function likeButtonListeners() {
  document.querySelectorAll(".like-btn").forEach (button => {
    button.addEventListener("click", e => {
      // debugger
      button.parentElement.children[2].innerText++
      fetch(`http://localhost:3000/toys/${button.parentElement.dataset.id}`, {
        method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "applciation/json"
      },
      body: JSON.stringify({
        likes: button.parentElement.children[2].innerText
      })
    })
  })
})
}







