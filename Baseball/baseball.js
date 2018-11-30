// 레이아웃 설정
const body = document.body;
const result = document.querySelector('h1');
const resultSub = document.querySelector('h2');
const form = document.querySelector('form');
const btn = document.querySelector('button');
const input = document.querySelector('input');


// 내부 데이터 변경
let numNomi;
let numArr;

// 1 ~ 9 까지 랜덤한 값 4개 뽑기
function makeRandomAnswer(){
    numNomi = [1,2,3,4,5,6,7,8,9];
    numArr = [];

    for(let i = 0; i < 4; i++){
        let numPick = numNomi.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        numArr.push(numPick);
    }
    console.log(numArr);
}
// 함수 호출
makeRandomAnswer();

let count = 0;

// 제출 이벤트
form.addEventListener('submit', function(e){ // 엔터 쳐도 입력됨
    e.preventDefault();

    let inputValue = input.value;
    // 문자열로 변경하기
    let numAnswer = numArr.join('');

    console.log(numAnswer);

    if(numAnswer === inputValue){ // 답이 맞으면
        result.textContent = '홈런!!!!';
        input.value = '';
        input.focus();
        makeRandomAnswer();
        count = 0;
    } else if(inputValue === ''){
        alert('값을 입력하세요.');
    } else { // 답이 틀리면
        let strike = 0;
        let ball = 0;
        count++;

        if(count < 10){
            for(let i = 0; i < 3; i++){ // 같은 자리인지 확인
                if(numArr[i] === Number(inputValue[i]))
                    strike++;
                else if(numArr.indexOf(Number(inputValue[i])) > -1) // 숫자가 겹치는지 확인
                    ball++;
            }
            result.textContent = strike + ' 스트라이크 ' + ball + ' 볼';
            resultSub.textContent =  (10 - count) + '번 남았습니다.';
            input.value = '';
            input.focus();
        } else {
            result.textContent = '실패! 답은? ' + numAnswer;
            resultSub.textContent = '';
            input.value = '';
            input.focus();
            makeRandomAnswer();
            count = 0;
        }
    }
});