// 문제 10개 내기
while(true){

    let num1 = Math.ceil(Math.random() * 9);
    let num2 = Math.ceil(Math.random() * 9);
    let result = num1 * num2;
    let counter = 0;
    let condition = true;

    while(condition){

        let answer = prompt(num1 + ' 곱하기 ' + num2 + '은(는)? ');

        if(result === Number(answer)){
            alert('딩동댕');
            counter++;
            condition = false;
        } else {
            alert('땡!');
        }
    }
}

console.log('맞은 갯수 : ' + counter);