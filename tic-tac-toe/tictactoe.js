/*
    1. 3x3 배열을 만든다.
    2. 칸을 클릭한다.
    3. 빈칸인지 확인한다.(칸이 비워져있는가?)
    4. 채워져 있으면 클릭으로 이동, 비워져 있으면 표시한다. (x / o)
    5. 세 칸이 한 줄이 되었는가?
    6. 되었으면 종료, 아니면 턴을 넘긴다.
*/

const body = document.body;
const table = document.createElement('table');
const cols = [];
const rows = [];
let turn = 'X';

// 클릭 이벤트의 콜백 함수
const callback = (e) => {
    const trIndex = rows.indexOf(e.target.parentNode);
    const tdIndex = cols[trIndex].indexOf(e.target);
    console.log('몇 줄?', trIndex);
    console.log('몇 칸?', tdIndex);

    // 칸이 이미 채워져 있는가? (3)
    if(cols[trIndex][tdIndex].textContent !== ''){ // 빈칸이 아니면
        console.log('빈칸이 아닙니다.');
    } else { // 빈칸이면
        console.log('빈칸입니다.');
        cols[trIndex][tdIndex].textContent = turn;

        // 세 칸이 한 줄이 되었는가? (5)
        let boolean = false;

        // 가로줄 검사
        if(
            cols[trIndex][0].textContent === turn &&
            cols[trIndex][1].textContent === turn &&
            cols[trIndex][2].textContent === turn
        ){
            boolean = true;
        }
        // 세로줄 검사
        if(
            cols[0][tdIndex].textContent === turn &&
            cols[1][tdIndex].textContent === turn &&
            cols[2][tdIndex].textContent === turn
        ){
            boolean = true;
        }
        // 대각선 검사
        if(
            cols[0][0].textContent === turn &&
            cols[1][1].textContent === turn &&
            cols[2][2].textContent === turn
        ){
            boolean = true;
        }
        if(
            cols[0][2].textContent === turn &&
            cols[1][1].textContent === turn &&
            cols[2][0].textContent === turn
        ){
            boolean = true;
        }

        // 한 줄이 되었으면
        if(boolean){
            alert(turn + '님의 승리!');
            // 초기화
            turn = 'X';
            cols.forEach((r) => {
                r.forEach((c) => {
                    c.textContent = '';
                });
            });
        } else { // 안 되었으면
            if(turn === 'X') // (4)
                turn = 'O';
            else
                turn = 'X';
        };
    }
};

// 3x3 배열 만들기 (1)
for(let i = 1; i <= 3; i++){
    const tr = document.createElement('tr');
    rows.push(tr);
    cols.push([]);
    for(let j = 1; j <= 3; j++){
        const td = document.createElement('td');

        // 각 칸들의 클릭 이벤트 (2)
        td.addEventListener('click', callback);
        cols[i - 1].push(td);
        tr.appendChild(td);
    }
    table.appendChild(tr);
}
body.appendChild(table);
