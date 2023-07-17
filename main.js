/* notes

Command K+C to comment highlighted text
stop page refreshing after clicking add
'()=>{}' for an ES6 function
invoke function placement important, js runs top to bottom


*/


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
    add.setAttribute("data-bs-dismiss","modal"); // set attribute function, data-bs-dismiss="modal", attribute.value
    add.click(); // simulate button click for form to fade
    // (()=>{})(), IIFE function ()() Run once every success state 

    (()=>{
      add.setAttribute("data-bs-dismiss",""); // removed "modal"
    })()
  }
};
/*

*/
 
// sucess state 
let data = {}; // created empty object to store data
// 'acceptData' function to fetch/accept data from inputs and store/upload to screen inside 'data' object
let acceptData = () => { // collects data
  data["text"] = textInput.value;
  data["date"] = dateInput.value;
  data["description"] = textarea.value;
  createTasks();
  // console.log(data);
}; 
// output result of 'data' to div id="tasks"
let createTasks = () => { // NOTE add + so it wont replace previous tasks
  tasks.innerHTML += ` 
  <div>
    <span class="fw-bold">${data.text}</span> 
    <span class="small text-secondary">${data.date}</span> 
    <p>${data.description}</p>
     
    <span class="options"> 
      <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" onClick="editTask(this" class="fas fa-edit"></i>
      <i onClick="deleteTask(this)" class="fas fa-trash-alt"></i>
    </span>
  </div> 
  `; // replace text with ${data.text}, object.key, (this)
  resetForm(); // reset text input fields
};

let deleteTask = (e)=>{ // 'e' for examplej
  e.parentElement.parentElement.remove(); // delete parent div for task instead of icon
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement; // e.remove(); selectedTask?
  // preserves first child, select 3 of 4 span class
  textInput.value = selectedTask.children[0].innerHTML; 
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;
  selectedTask.remove();
  
};


// reset form
let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};
// modal fade after submit
/* 

let createTasks = () => {
   tasks.innerHTML += "Updated Task"; // NOTE add + so it wont replace previous tasks 
}; 

<div>
<span class="fw-bold">Task 1</span> <!--bootstrap, fw=font-weight-->
<span class="small text-secondary">2023-7-15</span> <!--bootstrap, grey text-->
<p>do yard work</p>
  <span class="options"> <!--span.options, add buttons to icons-->
    <i class="fas fa-edit"></i>
    <i class="fas fa-trash-alt"></i>
</span>
</div> 


*/