const searchBox = document.getElementById("searchBox");
const inputBox = document.getElementById("inputBox");
const addTodobtn = document.getElementById("addTodobtn");
const deleteTodobtn = document.getElementById("deleteTodobtn");
const displayTodo = document.getElementById("displayTodo");
const saveTodobtn = document.getElementById("saveTodobtn");
const search = document.getElementById("search");
const hidden = document.querySelector(".hidden")
showTodo();
let idvalue = '';


addTodobtn.addEventListener("click", function () {
    let inputvalue = inputBox.value;
    //now storing value to localStorage
    let todo = localStorage.getItem("todos");

    if (todo == null) {
        todoObj = [];
    }
    else {
        todoObj = JSON.parse(todo);
    }
    todoObj.push(inputBox.value)
    localStorage.setItem("todos", JSON.stringify(todoObj))
    inputBox.value = "";
    showTodo();
})

//showing todos on cards Todo
function showTodo() {
    let todo = localStorage.getItem("todos");

    if (todo == null) {
        todoObj = [];
    }
    else {
        todoObj = JSON.parse(todo);
    }
    let showtodos = "";
    todoObj.map((element, index) => {
        showtodos += `<div class="card mx-2 my-2" style="width: 18rem;">
        <div>
            <h5 class="card-title">Todo : ${index+1}</h5>
            <p class="card-text"> ${element}
            </p>
        </div>
        <div class="buttons">
            <button type="button" id=${index} class="btn btn-success" onclick="edit(this.id)"><i class="fa-solid fa-pen-to-square"></i>  Edit Todo</button>
            <button type="button" id=${index} class="btn btn-danger" onclick="deletefunc(this.id)"><i class="fa-solid fa-trash"></i>  Delete Todo</button>
        </div>
    </div>`
    })
    if(todoObj.length >=  1){
        displayTodo.innerHTML = showtodos;
    }
    else{
        displayTodo.innerHTML = `<h4>There is no Todo's to show ! Add new Todo's :)`;
    }
}

// Edit Todo
function edit(id) {
    let todo = localStorage.getItem("todos");
    todoObj = JSON.parse(todo);

    // console.log(id);
    inputBox.value = todoObj[id]
    addTodobtn.style.display = "none";
    saveTodobtn.style.display = "block"
    idvalue = id;
}   

// save edited todos again in todoObj
saveTodobtn.addEventListener("click", () => {
    console.log(inputBox.value);
    let newvalue = inputBox.value

    todoObj[idvalue] = newvalue;

    localStorage.setItem("todos", JSON.stringify(todoObj));
    showTodo();
    inputBox.value = "";
    saveTodobtn.style.display = "none"
    addTodobtn.style.display = "block";
})

// Delete Todo
function deletefunc(id) {
    todoObj.splice(id, 1)
    // if we do anything related todoObj array then we have to again set it in local Storage.
    localStorage.setItem("todos", JSON.stringify(todoObj));
    // and to show whats now inside the todoObj we have call showTodo() again;
    showTodo();
}

// delete all todo
deleteTodobtn.addEventListener("click", () => {
    let len = todoObj.length;
    todoObj.splice(0, len)
    localStorage.setItem("todos", JSON.stringify(todoObj))
    showTodo();
})

// searchBox functional
let todo = localStorage.getItem("todos");
searchBox.addEventListener("input", (e) => {
    let searchvalue = e.target.value.toLowerCase();
    let checkvalue = document.querySelectorAll(".card")
    Array.from(checkvalue).forEach((element) => {
       let para = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (para.includes(searchvalue)) {
            element.style.display = "block"
        }
        else {
            element.style.display = "none"
        }
    })
})
