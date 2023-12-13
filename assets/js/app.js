const cl = console.log;

const todoForm = document.getElementById("todoForm")
const todoControl = document.getElementById("todo")
const todoContainer = document.getElementById("todoContainer")
const submitBtn = document.getElementById("submitBtn")
const updateBtn = document.getElementById("updateBtn")


let todoArray = [
    {
        todoItem : "CSS",
        todoId : "1"
    }
]


const onEdit = (ele) => {
    // cl(todoArray)
    let getEditId = ele.parentNode.parentNode.getAttribute("id");
    cl(getEditId)
    localStorage.setItem("editId", getEditId)

    let getObj = todoArray.find(todo => {
        return todo.todoId === getEditId
    })
    cl(getObj)
    todoControl.value = getObj.todoItem;
    submitBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
}

const onDelete = (ele) => {
    let getConfirm = confirm(`Are you sure, you want to delete`)
    cl(getConfirm)

if(getConfirm){
     // cl(`delete`, ele)
     let getDeletedId = ele.closest("li").id
     cl(getDeletedId)
 
     let getIndex = todoArray.findIndex(todo => {
         return todo.todoId === getDeletedId
     })
     cl(getIndex)
 
     todoArray.splice(getIndex, 1)
     localStorage.setItem("setTodoArray", JSON.stringify(todoArray))
     document.getElementById(getDeletedId).remove()
     Swal.fire({
        icon: 'success',
        title: 'New Todo Item is Removed',
        timer: 2000
      })
}else{
    return
}
   
}



const todoTemplating = (arr) => {
    let result = `<ul class="list-group alert-success">`;
    todoArray.forEach(ele => {
        result += `
                      <li class="list-group-item d-flex justify-content-between" id="${ele.todoId}">
                        <span>${ele.todoItem}</span>
                        <span>
                           <button class="btn btn-primary" onClick="onEdit(this)">Edit</button>
                           <button class="btn btn-danger" onClick="onDelete(this)">Delete</button>
                        </span>
                      </li>
                   `
    })
    result += `</ul>`
    todoContainer.innerHTML = result;
}

todoTemplating(todoArray)

if(localStorage.getItem("setTodoArray")){
     todoArray = JSON.parse(localStorage.getItem("setTodoArray"))
}


const onTodoClick = (eve) => {
    eve.preventDefault()
    let todoObj = {
        todoItem : todoControl.value,
        todoId : uuidv4()
    }
    todoArray.push(todoObj)
    cl(todoArray)
    todoTemplating();
    localStorage.setItem("setTodoArray", JSON.stringify(todoArray))
    eve.target.reset()
    Swal.fire({
        icon: 'success',
        title: 'New Todo Item is Added',
        timer: 2000
      })
}


const onUpdateClick = () => {
    let updateValue = todoControl.value;
    cl(updateValue)
    let updatedId = localStorage.getItem("editId")
    cl(updatedId)

    // todoArray.forEach(todo => {
    //     if(todo.todoId === updatedId){
    //         todo.todoItem = updateValue;
    //         todoForm.reset()
    //     }
    // })

    let getIndex = todoArray.findIndex(todo => {
        return todo.todoId === updatedId
    })
    cl(getIndex)
    todoArray[getIndex].todoItem = updateValue
    localStorage.setItem("setTodoArray", JSON.stringify(todoArray))
    let li = document.getElementById(updatedId)
    cl(li.firstElementChild)
    li.firstElementChild.innerHTML = updateValue
    todoForm.reset()
    updateBtn.classList.add("d-none")
    submitBtn.classList.remove("d-none")
}

todoForm.addEventListener("submit", onTodoClick)
updateBtn.addEventListener("click", onUpdateClick)


function uuidv4() { 
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) { 
        const r = Math.random() * 16 | 0,  
            v = c == 'x' ? r : (r & 0x3 | 0x8); 
        return v.toString(16); 
    }); 
}

