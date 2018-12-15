const tbody = document.querySelector('#table tbody');
const dataset = [];

document.querySelector('#exec').addEventListener('click', function(){
    // 기존 데이터 초기화
    tbody.innerHTML = '';

    // 지뢰판 만들기
    const hor = parseInt(document.querySelector('#hor').value);
    const ver = parseInt(document.querySelector('#ver').value);
    const mine = parseInt(document.querySelector('#mine').value);

    // (1 ~ 100) 지뢰 위치 뽑기
    const mineSwipping = Array(hor * ver)
        .fill()
        .map(function(data, index){
            return index;
        });

    // 피셔-예이츠 셔플
    const shupple = [];

    while(mineSwipping.length > hor * ver - mine){
        const move = mineSwipping.splice(Math.floor(Math.random() * mineSwipping.length), 1)[0];
        shupple.push(move);
    };

    // 지뢰 테이블 만들기
    for(let i = 0; i < ver; i++){
        const arr = [];
        const tr = document.createElement('tr');
        dataset.push(arr);

        for(let j = 0; j < hor; j++){
            arr.push(1);
            const td = document.createElement('td');
            td.addEventListener('contextmenu', (e) => {
                e.preventDefault();

                const parentTr = e.currentTarget.parentNode;
                const parentTbody = e.currentTarget.parentNode.parentNode;
                const column = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                const row = Array.prototype.indexOf.call(parentTbody.children, parentTr);

                if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'x'){
                    e.currentTarget.textContent = '!';
                } else if(e.currentTarget.textContent === '!'){
                    e.currentTarget.textContent = '?';
                } else if(e.currentTarget.textContent === '?'){
                    if(dataset[row][column] === 1){
                        e.currentTarget.textContent = '';
                    } else if( dataset[row][column] === 'x'){
                        e.currentTarget.textContent = 'x';
                    }
                }
            });
            td.addEventListener('click', (e) => {
                // 클릭했을 때 주변 지뢰 갯수 출력
                const parentTr = e.currentTarget.parentNode;
                const parentTbody = e.currentTarget.parentNode.parentNode;
                const column = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                const row = Array.prototype.indexOf.call(parentTbody.children, parentTr);

                if(dataset[row][column] === 'x'){
                    e.currentTarget.textContent = '펑';
                } else {
                    let sideArr = [
                        dataset[row][column - 1],                               dataset[row][column + 1],
                        ];

                    // 윗 칸이 없는 경우 에러 처리
                    if(dataset[row - 1]){
                        sideArr = sideArr.concat([dataset[row - 1][column - 1], dataset[row - 1][column], dataset[row - 1][column + 1]]);
                    }
                    // 아랫 칸이 없는 경우 에러 처리
                    if(dataset[row + 1]){
                        sideArr = sideArr.concat([dataset[row + 1][column - 1], dataset[row + 1][column + 1], dataset[row + 1][column + 1]]);
                    }

                    e.currentTarget.textContent = sideArr.filter((value) => {
                        return value === 'x';
                    }).length;
                }
            });

            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    // 지뢰 심기
    for(let k = 0; k < shupple.length; k++){
        let column = Math.floor(shupple[k] / 10);
        let row = shupple[k] % 10;

        tbody.children[column].children[row].textContent = 'x';
        dataset[column][row] = 'x';
    }
    console.log(dataset);
});
