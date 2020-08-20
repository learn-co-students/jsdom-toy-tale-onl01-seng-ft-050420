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
  return fetch('http://localhost:3000/toys')
    .then(function(response) {
      return response.json();
    })
    .then(function(json){
      for (const toy in json){
      let new_node = document.createElement('div');
      new_node.setAttribute("class", "card");
      document.querySelector("#toy-collection").appendChild(new_node)
      }
    })
});
