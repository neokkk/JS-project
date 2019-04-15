// 1. ADD를 누르면 글씨가 지워지면서 input창이 뜬다.
// 2. input창에 입력한 것을 엔터 치면 .main_bottom ul li에 추가됨
// 3. 엔터를 치자마자 input창이 지워지고 ADD 글씨가 뜸

const TODOS = "todos";

const ul = document.querySelector('.main_bottom ul');
const add_input = document.querySelector('#main_input');
const add_btn = document.querySelector('.main_left h4');
const mainForm = document.querySelector('#main_frm');

let todoArr = [];

// input 태그 보이기
document.querySelector('.main_left').addEventListener('click', function() {

    add_btn.style.display = 'none';
    this.style.cursor = 'default';
    add_input.style.display = 'block';
    add_input.autofocus = 'autofocus';
})

// 하이라이트 처리하기
ul.addEventListener('click', function(e){
    const lis = document.querySelectorAll('.main_bottom ul li');

    if(e.target !== e.currentTarget){

        lis.forEach( v => v.classList.remove('active') );
        e.target.classList.add('active');
    }
})

// todo 지우기
document.querySelector('.main_right').addEventListener('click', function(){
    
    const highlightedLi = document.querySelector('.active');
    
    ul.removeChild(highlightedLi);
    
    todoArr = todoArr.filter(
        todo => todo.id !== parseInt(highlightedLi.id)
    );
    
    saveTodos(todoArr);
})

// logalStorage에 값 저장하기
function saveTodos(arr){
    localStorage.setItem(TODOS, JSON.stringify(arr));
}

// 새 todo form 입력
function showTodos(text){

        const li = document.createElement('li');
        const newId = todoArr.length + 1;

        li.innerText = text;
        li.id = newId;
        ul.appendChild(li);

        const todoObj = {
            id: newId,
            text
        }

        todoArr.push(todoObj);
        saveTodos(todoArr);
}

function handleSubmit(e){

    e.preventDefault();

    showTodos(add_input.value);

    add_input.value = '';
    add_input.style.display = 'none';
    add_btn.style.display = 'block';
}

function loadTodos(){ // 기존에 존재하는 값이 있다면
    
    const todos = localStorage.getItem(TODOS);

    if(todos !== null){

        const parsedTodoArr = JSON.parse(todos);
        
        parsedTodoArr.forEach( v => showTodos(v.text) );
    }
}

function init(){

    loadTodos();
    mainForm.addEventListener('submit', handleSubmit);
    
}

init();