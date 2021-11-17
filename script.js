//Getting all required elements
const inputBox = document.querySelector(".inputField input")
const addBtn = document.querySelector(".inputField button")
const todoList = document.querySelector(".todoList")
const deleteAllBtn = document.querySelector(".footer button")

inputBox.onkeyup = () => {
    let userData =inputBox.value; //getting user entered data
    if(userData.trim() != 0){ //If user values aren't only spaces
        addBtn.classList.add("active"); //Activate the add button
    }else {
        addBtn.classList.remove("active"); //Deactivate the add button       
    }

}

showTasks(); //calling showTask function

//if user clicks on the add button
addBtn.onclick = () => {
    let userData = inputBox.value; //getting user input
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage

    if (getLocalStorage == null){ //if localStorageis null
    listArr = [] //creating blank array
    }else {
        listArr = JSON.parse(getLocalStorage); //transforming json striing into js object
    }
    listArr.push(userData) //pushing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)) //transforming js object into json string
    showTasks(); //calling showTask function
}


//Fuction to add task list inside ul
function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstoragd
    if(getLocalStorage == null){//if localstorage is null
        listArr = []; //creating blank array
    }else { 
        listArr = JSON.parse(getLocalStorage); //transferring json string into js object 
    }

    const pendingNumb = document.querySelector(".pendingNumb")
    pendingNumb.textContent = listArr.length; //passing the length value in pending number
    if(listArr.length > 0) { // if array length is greater than 0
        deleteAllBtn.classList.add("active") //Activate the clearall button
    }else {
        deleteAllBtn.classList.remove("active") //Deactivate the clearall button
    }
    let newLiTag = ''
    listArr.forEach((element, index) => {
        newLiTag += ` <li>${element}<span onclick="deleteTask(${index})" ><i class="fas fa-trash"></i></span></li>`;
    })
    todoList.innerHTML = newLiTag; // adding new li tag inside ul tag
    inputBox.value = ""; //Once task added leave the input field button blank
}

//Delete Task
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localstorage
    listArr = JSON.parse(getLocalStorage); 
    listArr.splice(index, 1); //Delete or Remove the particular index li
    //After removing the li again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)) //transforming js object into json string
    showTasks(); //calling showTask function
}

//delete all task function
deleteAllBtn.onclick = () => {
    listArr = [] //empty an array
    //After deleting all task, again update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr)) //transforming js object into json string
    showTasks(); //calling showTask function
}

