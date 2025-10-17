"use strict"
let todoList = [];

const YOUR_API_KEY = "$2a$10$4L4DIXkmhqFOuplpG0v5meSVGNPQQtFq4KAjROORHFduED5MEvo16";
const BIN_ID = "68f24e4143b1c97be96d2292";

let initList = function() {
  let savedList = window.localStorage.getItem("todos");
    if (savedList != null)
        todoList = JSON.parse(savedList);
    else

    todoList.push(
    {
        title: "Learn JS",
        description: "Create a demo application for my TODO's",
        place: "445",
        category: '',
        dueDate: new Date(2024,10,16)
    },
    {
        title: "Lecture test",
        description: "Quick test from the first three lectures",
        place: "F6",
        category: '',
        dueDate: new Date(2024,10,17)
    }
        // of course the lecture test mentioned above will not take place
    );
}

let req = new XMLHttpRequest();

req.onreadystatechange = () => {
  if (req.readyState == XMLHttpRequest.DONE) {
    console.log(req.responseText);
  }
};

req.open("GET", `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, true);
req.setRequestHeader("X-Master-Key", YOUR_API_KEY);
req.send();

// initList();

let updateJSONbin = function() {
    // ciało funkcji na podstawie https://jsonbin.io/api-reference/bins/update
    // UWAGA: ta funkcja zastepuje całą zawartość bina

    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
      if (req.readyState == XMLHttpRequest.DONE) {
        //console.log(req.responseText);
        todoList=req.response;
      }
    };

    req.open("PUT", `https://api.jsonbin.io/v3/b/${BIN_ID}`, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", YOUR_API_KEY);
    req.send('{"sample": "Hello World"}');
}

let updateTodoList = function() {
    let todoListDiv =
    document.getElementById("todoListView");

    //remove all elements
    while (todoListDiv.firstChild) {
        todoListDiv.removeChild(todoListDiv.firstChild);
    }

    //add all elements
    let filterInput = document.getElementById("inputSearch");   
    for (let todo in todoList) {
      if (
        (filterInput.value == "") ||
        (todoList[todo].title.includes(filterInput.value)) ||
        (todoList[todo].description.includes(filterInput.value))
      ) {
        let newElement = document.createElement("p");
        let newContent = document.createTextNode(todoList[todo].title + " " +
                                                todoList[todo].description);
        newElement.appendChild(newContent);
        todoListDiv.appendChild(newElement);
      }
    }

    let newDeleteButton = document.createElement("input");
        newDeleteButton.type = "button";
        newDeleteButton.value = "x";
        newDeleteButton.addEventListener("click",
            function() {
                deleteTodo(todo);
            });

    newElement.appendChild(newDeleteButton);
}

setInterval(updateTodoList, 1000);

let deleteTodo = function(index) {
    todoList.splice(index,1);
    updateJSONbin();
}

let addTodo = function() {
  //get the elements in the form
    let inputTitle = document.getElementById("inputTitle");
    let inputDescription = document.getElementById("inputDescription");
    let inputPlace = document.getElementById("inputPlace");
    let inputDate = document.getElementById("inputDate");
  //get the values from the form
    let newTitle = inputTitle.value;
    let newDescription = inputDescription.value;
    let newPlace = inputPlace.value;
    let newDate = new Date(inputDate.value);
  //create new item
    let newTodo = {
        title: newTitle,
        description: newDescription,
        place: newPlace,
        category: '',
        dueDate: newDate
    };
  //add item to the list
    todoList.push(newTodo);

    window.localStorage.setItem("todos", JSON.stringify(todoList));

    updateJSONbin();
}