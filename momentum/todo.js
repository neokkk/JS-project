const todoForm = document.querySelector('.js_todoForm');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('.js_todolist');
let todoArr = [];

function deleteTodo(event){
    const btn = event.target;
    const li = btn.parentNode;
    todoList.removeChild(li);
    const cleanTodos = todoArr.filter(function(todo){
        return todo.id !== parseInt(li.id);
    });
    todoArr = cleanTodos;
}
function saveTodos(){
    localStorage.setItem("todos", JSON.stringify(todoArr));
}
function paintTodo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = todoArr.length + 1;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteTodo);
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    todoList.appendChild(li);
    const todoObj = {
        text: text,
        id: newId
    }
    todoArr.push(todoObj);
    saveTodos();
}
function handleSubmit(event){
    event.preventDefault();
    const currentValue = todoInput.value;
    paintTodo(currentValue);
    todoInput.value = "";
}
function loadTodos(){
    const todos = localStorage.getItem("todos");
    if(todos !== null){
        // todos
        const parsedTodos = JSON.parse(todos);
        parsedTodos.forEach((todo) => {
            paintTodo(todo.text);
        });
    }
}
function init(){
    loadTodos();
    todoForm.addEventListener("submit", handleSubmit);
}

init();