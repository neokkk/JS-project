const tbody = document.querySelector('#table tbody');

document.querySelector('#exec').addEventListener('click', function(){
    // 지뢰판 만들기
    const hor = parseInt(document.querySelector('#hor').value);
    const ver = parseInt(document.querySelector('#ver').value);
    const mine = parseInt(document.querySelector('#mine').value);
    console.log(hor, ver, mine);

    // (1 ~ 100)지뢰 위치 뽑기
    const mineSwipping = Array(hor * ver)
        .fill()
        .map(function(data, index){
            return index;
        });
    const shupple = [];

    while(mineSwipping.length > 80){
        const move = mineSwipping.splice(Math.floor(Math.random() * mineSwipping.length), 1)[0];
        shupple.push(move);
    };

    console.log(shupple);

    const dataset = [];

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
                const column = Array.prototype.indexOf.call(parentTr.children, td);
                const row = Array.prototype.indexOf.call(parentTbody.children, tr);
                console.log(ParentTr, parentTbody, td, column, row);
            });
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }

    // 지뢰 심기
    for(let k = 0; k < shupple.length; k++){
        let column = Math.floor(shupple[k] / 10);
        let row = shupple[k] % 10;
        console.log(column, row);

        tbody.children[column].children[row].textContent = 'x';
        dataset[column][row] = 'x';
    }
    console.log(dataset);
});
