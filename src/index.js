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
  
  fetchToysInfo()
  
});


function fetchToysInfo() {
  return fetch('http://localhost:3000/toys')
.then(response => response.json())
.then(displayAllToys)
};


function displayAllToys(toys){
  for (let toy of toys) {
    displayToy(toy)
  };
};


function displayToy(toy) {
  let collection = document.getElementById("toy-collection");
  let div = document.createElement("div");
  div.setAttribute("class", "card");
  div.setAttribute("id", `toyId-${toy.id}`);
  let h2 = document.createElement("h2");
  h2.innerHTML = toy.name;
  div.appendChild(h2);
  let img = document.createElement("img");
  img.setAttribute("src", toy.image);
  img.setAttribute("class","toy-avatar")
  div.appendChild(img);
  let p = document.createElement("p");
  p.innerText = `${toy.likes} Likes`
  div.appendChild(p)
  let likeButton = document.createElement("button");
  likeButton.setAttribute("class", "like-btn");
  // button.addEventListener('click', () => {
  //   toy.likes = toy.likes + 1;
  //   p.textContent = `${toy.likes} likes`;
  //   increaseLikesNums(toy);
  // });
  div.appendChild(likeButton);
  collection.appendChild(div);
  let deleteButton = document.createElement("h4");
  deleteButton.setAttribute("class", "delete")
  deleteButton.id = `delete-${toy.id}`
  deleteButton.innerHTML = "Delete";
  div.appendChild(deleteButton);

  deleteButton.addEventListener("click", ()=>{
    deleteItem(toy.id)
    div.remove()})
};



//increase likes numbers
 const likeButtons = document.getElementsByClassName("like-btn")
 Array.from(likeButtons).forEach(x => x.addEventListener("click", increaseLikes()));


function increaseLikes(toy) {
  toy.likes = toy.likes + 1;
  let pTag = document.getElementsByTagName("p")
  Array.from(pTag).forEach(p=>p.textContent = `${toy.likes} likes`);
  increaseLikesNums(toy);
};


function increaseLikesNums(toy) {
  let formData = {
    likes: toy.likes
  };

  let configurationObject = {
    method:"patch",
    headers: { 
       "Content_Type": "application/json",
       "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  fetch(`http://localhost:3000/toys/${toy.id}`, configurationObject).
  then(resp=>resp.json).
  then(increaseLikes)

};



//fetch post request 
let formAddToy = document.getElementsByClassName('add-toy-form')[0];
formAddToy.addEventListener('submit', handaleInput);

function handaleInput(e){
  e.preventDefault();
  let nameInp = document.getElementsByName("name")[0];
  let imageInp = document.getElementsByName("image")[0];
  submitInfoForm(nameInp.value, imageInp.value);
  nameInp.value = "";
  imageInp.value="";
};

function submitInfoForm(name,image){
  let formInputs ={
    name: name,
    image: image,
    likes: 0
  };
  let configurationObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formInputs)
  };
  return fetch('http://localhost:3000/toys', configurationObject)
  .then(response => response.json())
  .then(displayToy)

}

// delete card 


function deleteItem(id){
  //debugger
  // remove from db
      let configObj = {
          method: 'DELETE',
          headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
          }
      }
  
      fetch(`http://localhost:3000/toys/${id}`, configObj)
      .then(res => res.json())
      .then(json => {
          alert(json.message)
      });
};

// function handleListClick(e){
//   if (e.target.className === "delete"){
//       let id = e.target.dataset.id
//        deleteItem(id)
//   }
// }

