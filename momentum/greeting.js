const form = document.querySelector('.js_form');
const input = form.querySelector('input');
const greeting = document.querySelector('.js_greetings');

function saveName(text){
    localStorage.setItem("user_ls", text);
}
function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    console.log(currentValue);
    paintGreeting(currentValue);
    saveName(currentValue);
}
function askForUser(){
    form.classList.add("showing");
    form.addEventListener("submit", handleSubmit);
}
function paintGreeting(text){
    form.classList.remove("showing");
    greeting.classList.add("showing");
    greeting.innerText = `Hello ${text}`;
}
function loadName(){
    const currentUser = localStorage.getItem("user_ls");
    if(currentUser === null){
        // no user
        askForUser();
    } else {
        // user
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
}

init();