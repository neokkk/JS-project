const lottoNomi = new Array(45)
    .fill()
    .map(function(value, index){
    return index + 1;
});

let shupple = [];

while(lottoNomi.length > 0){
    let movement = lottoNomi.splice(Math.floor(Math.random() * lottoNomi.length), 1)[0];
    shupple.push(movement);
}
console.log(shupple);

let win = shupple.splice(0, 6);
let bonus = shupple[shupple.length - 1];

console.log(win.sort(function(a, b){
    return a - b;
}), bonus);


for(let i = 0; i < win.length; i++){
    setTimeout(function callback(){
        const result = document.getElementById('result');
        const balls = document.createElement('div');
        balls.textContent = win[i] ;
        paintBall(balls);
        result.appendChild(balls);
    }, 1000 * (i + 1));
}

setTimeout(function callback2(){
    const bonusResult = document.getElementById('bonusResult');
    const bonusBall = document.createElement('div');
    bonusBall.textContent = bonus;
    paintBall(bonusBall);
    bonusResult.appendChild(bonusBall);
}, 7000);

function paintBall(ball){
    ball.style.display = 'inline-block';
    ball.style.border = '1px solid gray';
    ball.style.borderRadius = '10px';
    ball.style.width = '20px';
    ball.style.height = '20px';
    ball.style.textAlign = 'center';
    ball.style.marginRight = '5px';
    let bgdColor;
    let text = Number(ball.textContent);
    if(text < 10)
        bdgColor = 'red';
    else if (text < 20)
        bdgColor = 'orange';
    else if (text < 30)
        bdgColor = 'yellow';
    else if (text < 40)
        bdgColor = 'blue';
    else
        bdgColor = 'green';

    ball.style.background = bdgColor;
}