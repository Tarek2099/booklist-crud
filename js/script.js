let submitForm = document.querySelector("#subform");
let inputText = document.querySelector("#input-text");
let btn = document.querySelector("#createTask");
let taskFiltering = document.getElementById("filtering");
let taskClear = document.getElementById("clearTask");
let ulList = document.getElementById("list");

// Event Listener
submitForm.addEventListener("submit", submitFunc);
ulList.addEventListener("click", removeFunc);
taskClear.addEventListener("click", clearFunc);
taskFiltering.addEventListener("keyup", filterFunc);
document.addEventListener("DOMContentLoaded", contentFunc);

//------------------ all functios start here---------------
function submitFunc(e) {
  if (inputText.value === " ") {
    alert("Input Your Text")
  } else {
    let li = document.createElement("li");
    li.id = "lists";
    li.appendChild(document.createTextNode(inputText.value + " "));
    ulList.appendChild(li);
    let button = document.createElement("button");
    button.setAttribute("href", "#");
    button.innerHTML = "Delete";
    li.appendChild(button);
    
    storeTaskInLocalStorage(inputText.value)
    inputText.value = " ";
  }
  e.preventDefault()
}


function removeFunc(e) {
  if (e.target.hasAttribute("href")) {
    if(confirm("Are you sure?")){
      let ele = e.target.parentElement;
      ele.remove();

      removeFromLS(ele);
    }
  }
}


function clearFunc(e) {
  while (ulList.firstChild) {
    ulList.removeChild(ulList.firstChild)
  }
  localStorage.clear()
}


function filterFunc(e) {
  let text = e.target.value.toLowerCase();
  document.querySelectorAll("li").forEach(task => {
    let item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  })
}


function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks))
}


function contentFunc(e) {
    let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(task => {
        let li = document.createElement("li");
        li.id = "lists";
        li.appendChild(document.createTextNode(task + " "));
        ulList.appendChild(li);
        let button = document.createElement("button");
        button.setAttribute("href", "#");
        button.innerHTML = "Delete";
    li.appendChild(button);
   
  })
}


function removeFromLS(taskitem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  let li = taskitem;
  li.removeChild(li.lastChild);
  tasks.forEach((task, index) => {
    
    if (li.textContent.trim() === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
//------------------ all functios end here---------------