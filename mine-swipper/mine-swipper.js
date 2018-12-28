const dataObject = {
    openedColumn : -1,
    questionary : -2,
    flag : -3,
    flag_mine : -4,
    question_mine : -5,
    mine : 1,
    normalColumn : 0
};
const tbody = document.querySelector('#table tbody');
let openedColumnNum = 0;
let endFlag = false;
let dataset = [];


document.querySelector('#exec').addEventListener('click', function(){
    // 기존 데이터 초기화
    tbody.innerHTML = '';
    document.querySelector("#result").textContent = '';
    dataset = [];
    endFlag = false;
    openedColumnNum = 0;

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
    }

    // 지뢰 테이블 만들기
    for(let i = 0; i < ver; i++){
        const arr = [];
        const tr = document.createElement('tr');
        dataset.push(arr);

        for(let j = 0; j < hor; j++){
            arr.push(dataObject.normalColumn);
            const td = document.createElement('td');
            // 오른쪽 클릭
            td.addEventListener('contextmenu', (e) => {
                e.preventDefault();

                if(endFlag){
                    return;
                }

                const parentTr = e.currentTarget.parentNode;
                const parentTbody = e.currentTarget.parentNode.parentNode;
                const column = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                const row = Array.prototype.indexOf.call(parentTbody.children, parentTr);

                if(e.currentTarget.textContent === '' || e.currentTarget.textContent === 'x'){
                    e.currentTarget.textContent = '!';
                    e.currentTarget.classList.add('flag');

                    if(dataset[row][column] === dataObject.mine){
                        dataset[row][column] = dataObject.flag_mine;
                    } else {
                        dataset[row][column] = dataObject.flag;
                    }

                } else if(e.currentTarget.textContent === '!'){
                    e.currentTarget.textContent = '?';
                    e.currentTarget.classList.remove('flag');
                    e.currentTarget.classList.add('question');

                    if(dataset[row][column] === dataObject.flag_mine){
                        dataset[row][column] = dataObject.question_mine;
                    } else {
                        dataset[row][column] = dataObject.questionary;
                    }

                } else if(e.currentTarget.textContent === '?'){
                    e.currentTarget.classList.remove('question');

                    if(dataset[row][column] ===  dataObject.question_mine){
                        e.currentTarget.textContent = 'x';
                        dataset[row][column] = dataObject.mine;
                    } else {
                        e.currentTarget.textContent = '';
                        dataset[row][column] = dataObject.normalColumn;
                    }

                }
            });

            // 왼쪽 클릭
            td.addEventListener('click', (e) => {
                if(endFlag){
                    return;
                }

                // 클릭했을 때 주변 지뢰 갯수 출력
                const parentTr = e.currentTarget.parentNode;
                const parentTbody = e.currentTarget.parentNode.parentNode;
                const column = Array.prototype.indexOf.call(parentTr.children, e.currentTarget);
                const row = Array.prototype.indexOf.call(parentTbody.children, parentTr);

                if([dataObject.openedColumn, dataObject.flag, dataObject.flag_mine, dataObject.question_mine, dataObject.questionary].includes(dataset[row][column])){
                    return;
                }

                // 클릭했을 때 배경 색 바꾸기
                e.currentTarget.classList.add('opened');
                openedColumnNum++;

                // 지뢰 클릭했을 때
                if(dataset[row][column] === dataObject.mine){
                    e.currentTarget.textContent = '펑';
                    document.querySelector("#result").textContent = '실패';
                    endFlag = true;
                } else { // 지뢰가 아닐 경우
                    let sideArr = [
                            dataset[row][column - 1], dataset[row][column + 1],
                        ];

                    // 윗 칸이 없는 경우 에러 처리
                    if(dataset[row - 1]){
                        sideArr = sideArr.concat([dataset[row - 1][column - 1], dataset[row - 1][column], dataset[row - 1][column + 1]]);
                    }
                    // 아랫 칸이 없는 경우 에러 처리
                    if(dataset[row + 1]){
                        sideArr = sideArr.concat([dataset[row + 1][column - 1], dataset[row + 1][column + 1], dataset[row + 1][column + 1]]);
                    }

                    // 주변 지뢰 갯수
                    const sideMineNum = sideArr.filter((value) => {
                        return [dataObject.mine, dataObject.flag_mine, dataObject.question_mine].includes(value);
                    }).length;

                    // 거짓인 값 : false, '', 0, null, undefined, NaN
                    e.currentTarget.textContent = sideMineNum || '';
                    dataset[row][column] = dataObject.openedColumn;

                    // 주변 지뢰 갯수가 0개면
                    if(sideMineNum === 0){
                        // 주변 8칸 동시 오픈 (재귀 함수)
                        let sideColumn = [];
                        if(tbody.children[row - 1]){
                            sideColumn = sideColumn.concat([
                                tbody.children[row - 1].children[column - 1],
                                tbody.children[row - 1].children[column],
                                tbody.children[row - 1].children[column + 1]
                            ]);
                        }
                        sideColumn = sideColumn.concat([
                            tbody.children[row].children[column - 1],
                            tbody.children[row].children[column + 1]
                        ]);

                        if(tbody.children[row + 1]) {
                            sideColumn = sideColumn.concat([
                                tbody.children[row + 1].children[column - 1],
                                tbody.children[row + 1].children[column],
                                tbody.children[row + 1].children[column + 1]
                            ]);
                        }
                        sideColumn.filter((value) => !!value).forEach((mine) => {
                            const parentTr = mine.parentNode;
                            const parentTbody = mine.parentNode.parentNode;
                            const column = Array.prototype.indexOf.call(parentTr.children, mine);
                            const row = Array.prototype.indexOf.call(parentTbody.children, parentTr);

                            if(dataset[row][column] !== dataObject.openedColumn){
                                mine.click();
                            }
                        });
                    }
                }

                if(openedColumnNum === hor * ver - mine){
                    endFlag = true;
                    document.querySelector('#result').textContent = '승리!';
                }
            });

            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }

    // 지뢰 심기
    for(let i = 0; i < shupple.length; i++){
        let column = Math.floor(shupple[i] / ver);
        let row = shupple[i] % ver;

        tbody.children[row].children[column].textContent = 'x';
        dataset[row][column] = dataObject.mine;
    }
});
