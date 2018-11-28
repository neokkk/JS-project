let num1 = Math.ceil(Math.random() * 9);
let num2 = Math.ceil(Math.random() * 9);
let result = num1 * num2;

const body = document.body;
const div = document.createElement('div');
const form = document.createElement('form');
const input = document.createElement('input');
const btn = document.createElement('button');
const resultDiv = document.createElement('div');

div.textContent = String(num1) + ' 곱하기 ' + String(num2) + ' 는?';
body.append(div);

body.append(form);
input.type = 'number';
form.append(input);
btn.textContent = '입력!';
form.append(btn);
body.append(resultDiv);

form.addEventListener('submit', function(e){
    e.preventDefault();
    if(result === Number(input.value)){
        resultDiv.textContent = '당동댕';
        randomNumbers();
    } else {
        resultDiv.textContent = '땡';
        randomNumbers();
    }
});

function randomNumbers(){
    num1 = Math.ceil(Math.random() * 9);
    num2 = Math.ceil(Math.random() * 9);
    result = num1 * num2;
    div.textContent = String(num1) + ' 곱하기 ' + String(num2) + ' 는?';
    input.value = '';
    input.focus();
}


// 내가 작성한 코드

// 문제 10개 내기

// let count = 0;
// let counter = 0;
// while(count < 10){
//
//     let num1 = Math.ceil(Math.random() * 9);
//     let num2 = Math.ceil(Math.random() * 9);
//     let result = num1 * num2;
//     let condition = true;
//
//     while(condition){
//
//         let answer = prompt(num1 + ' 곱하기 ' + num2 + '은(는)? ');
//
//         if(result === Number(answer)){
//             alert('딩동댕');
//             counter++;
//             condition = false;
//         } else {
//             alert('땡!');
//             condition = false;
//         }
//         count++;
//     }
// }
//
// document.body.appendChild("<div>" + counter + "</div>")