let word = '길동';

while(true){
    let answer = prompt(word);
    if(word[word.length - 1] === answer[0]){
        // 맞았을 때
        alert('딩동댕~');
        word = answer;
    } else {
        // 틀렸을 때
        alert('끝말잇기란 말이에요!');
    }
}
