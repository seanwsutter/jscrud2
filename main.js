// js crud

let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

// submit button, prevent default behavior (refreshing page)
form.addEventListener('submit', (e)=>{  
  e.preventDefault();
  formValidation(); // invoke failure state function
}); 

let formValidation = () => {
  if (textInput.value === "") { // empty text field, add failure message in html
    console.log('failure');
    msg.innerHTML = "Tast cannot be blank"; // failure state
  } else {
    console.log('success');
    msg.innerHTML = "";
    acceptData(); // invoke success state function
    add.setAttribute("data-bs-dismiss","modal"); // set attribute function, attribute,value
    add.click(); // simulate button click for form to fade
    // (()=>{})(), IIFE function ()() Run once every success state 

    (()=>{
      add.setAttribute("data-bs-dismiss",""); // removed "modal"
    })()
  }
};
 
// data storage
let data = []; // created object to store data ({} to []) [{task1},{task2}]

// 'acceptData' function to accept data from inputs and store inside 'data' object
let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
};


// data["text"] = textInput.value; 
// data["date"] = dateInput.value;
// data["description"] = textarea.value;

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.description}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `);
  });

  resetForm();
};
/* 
let createTasks = () => { // NOTE add + so it wont replace previous tasks
  tasks.innerHTML += ` 
  <div>
    <span class="fw-bold">${data.text}</span> 
    <span class="small text-secondary">${data.date}</span> 
    <p>${data.description}</p>
     
    <span class="options"> 
      <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" 
      onClick="editTask(this)" class="fas fa-edit"></i>
      <i onClick="deleteTask(this)" class="fas fa-trash-alt"></i>
    </span>
  </div> 
  `; // replace text with ${data.text}, object.key, (this)
  resetForm(); // reset text input fields
};
*/
let deleteTask = (e) => {
  e.parentElement.parentElement.remove(); // delete parent div for task instead of icon
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement; // e.remove(); selectedTask?
  textInput.value = selectedTask.children[0].innerHTML; 
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);  
};
// reset form
let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
  createTasks();
})();

 


