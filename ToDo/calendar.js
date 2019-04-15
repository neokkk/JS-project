const mainDate = document.querySelector('#main_date');
const pastDate = document.querySelector('#past_date');
const nextDate = document.querySelector('#next_date');

let today = new Date();
let leftClickCount = 0,
    rightClickCount = 0;

function clearTodos() {
    
}

function nextDateHandler() {
    rightClickCount++;
    today.setDate(today.getDate() + rightClickCount);
    
    countDate();
    rightClickCount = 0;
    clearTodos();
}

function pastDateHandler() {
    leftClickCount++;
    today.setDate(today.getDate() - leftClickCount);
    
    countDate();
    leftClickCount = 0;
    clearTodos();
}

function countDate() {
    // 현재 달 / 일
    mainDate.innerText = today.getMonth() + 1 + ' / ' + today.getDate();
}

function init() {
    
    countDate();
    
    pastDate.addEventListener('click', pastDateHandler); // 왼쪽 화살표
    nextDate.addEventListener('click', nextDateHandler); // 오른쪽 화살표
}

init();