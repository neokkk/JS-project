const tbody = document.createElement('tbody');

let dataset = [],
    endFlag = false,
    openedColNum = 0;


document.querySelector('#m_btn').addEventListener('click', () => {
    const hor = parseInt(document.querySelector('#m_hor').value),
          ver = parseInt(document.querySelector('#m_ver').value),
          mine = parseInt(document.querySelector('#m_ine').value);

    // (1 ~ 100) 지뢰 위치 뽑기
    const mineArr = new Array(width * height)
        .fill()
        .map((data, index) => index);

    console.log(mineArr);

    // 피셔-예이츠 셔플
    const shupple = [];

    while (mineArr.length > hor * ver - mine) {
        const tmp = mineArr.splice(Math.floor(Math.random() * mineArr.length), 1)[0];
        shupple.push(tmp);
    }

    // 지뢰 테이블 만들기
    for (let i = 0; i < ver; i++) {
        const arr = [];
        const tr = document.createElement('tr');

        for (let j = 0; j < hor; j++) {
            arr.push('O');
            
            const td = document.createElement('td');
            // 오른쪽 클릭
            td.addEventListener('contextmenu', e => {
                e.preventDefault();

                if (endFlag) return;

                
            })
        }
    }
});