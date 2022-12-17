const todoList = document.getElementsByClassName("todo-list")

const todoInput = document.getElementById("todo-input")
const todoButton = document.getElementById("todo-button")
const todoFilter = document.getElementById("todo-filter")

const getTodosFromStorage = () => {
    const storage = JSON.parse(localStorage.getItem("todos"))
    return (storage) ? storage : [];
}
const getDonesFromStorage = () => {
    const storage = JSON.parse(localStorage.getItem("dones"))
    return (storage) ? storage : [];
}
const todos = getTodosFromStorage()
const dones = getDonesFromStorage()

const createTodoItem = (text) => {
    const todoItem = document.createElement("div")
    todoItem.classList.add("todo-item","todo")
    const todoItemLi = document.createElement("li")
    todoItemLi.innerHTML = text
    const todoItemCheck = document.createElement("i")
    todoItemCheck.classList.add("fas","fa-square")
    todoItemCheck.setAttribute("onclick","checkTodo(this)")
    const todoItemRemove = document.createElement("i")
    todoItemRemove.classList.add("fas","fa-trash-alt")
    todoItemRemove.setAttribute("onclick","removeTodo(this)")

    todoItem.appendChild(todoItemLi)
    todoItem.appendChild(todoItemCheck)
    todoItem.appendChild(todoItemRemove)

    todoList[0].appendChild(todoItem)
}

const writeTodosToPage = () => {
    todos.forEach( (todo) => {
        createTodoItem(todo)
    });
}

window.addEventListener("load",() => {
    writeTodosToPage()
})

const saveTodosToStorage = (todo) => {
    todos.push(todo)
    localStorage.setItem("todos",JSON.stringify(todos))
    createTodoItem(todo)
}

todoButton.addEventListener("click",() => {
    const input = todoInput.value
    console.log(input)
    if(input){ 
        saveTodosToStorage(input)
        todoInput.value = ""
    }
})

const removeTodo = (target) => {
    const todoLiContent = target.parentNode.childNodes[0].innerHTML
    removeTodoFromStorage(todoLiContent)
    target.parentNode.remove()
}
const removeTodoFromStorage = (todoLiContent) => {
    const index = todos.indexOf(todoLiContent)
    if(index > -1){
        todos.splice(index,1)
        localStorage.setItem("todos",JSON.stringify(todos))
    }
}
const removeDoneFromStorage = (done) => {
    const index = dones.indexOf(done)
    if(index > -1){
        dones.splice(index,1)
        localStorage.setItem("dones",JSON.stringify(dones))
    }
}

const checkTodo = (target) => {
    const todo_content = target.parentNode
    moveTodoToDone(todo_content,target)
}

const moveTodoToDone = (todo_content,target) => {
    removeTodoFromStorage(todo_content)
    dones.push(todo_content)
    localStorage.setItem("dones",JSON.stringify(dones))
    makeitDone(target)
}

const makeitDone = (target) => {
    const done = target.parentNode.classList.add("done")
    target.parentNode.classList.remove("todo")
    target.parentNode.childNodes[2].setAttribute("onclick","removeDone(this)")
    target.className = ""
    target.classList.add("fas","fa-chech-square")
    target.setAttribute("onclick","uncheckDone(this)")
}

const makeitTodo = (target) => {
    const done = target.parentNode.classList.remove("done")
    target.parentNode.classList.add("todo")
    target.parentNode.childNodes[2].setAttribute("onclick","removeTodo(this)")
    target.className = ""
    target.classList.add("fas","fa-square")
    target.setAttribute("onclick","checkTodo(this)")
}

const uncheckDone = (target) => {
    const done = target.parentNode.childNodes[0].innerHTML
    moveDoneToTodos(done,target)
}

moveDoneToTodos = (done, target) => {
    removeDoneFromStorage(done)
    todos.push(done)
    localStorage.setItem("todos",JSON.stringify(todos))
    makeitTodo(target)
}