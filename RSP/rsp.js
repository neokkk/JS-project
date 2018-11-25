/*
    1. 랜덤하게 가위바위보 이미지 변경
    2. 특정 버튼을 누르면 변경 함수 정지
    3. 내가 클릭한 버튼이 이기면 "승", 비기면 "비김", 지면 "짐" 출력
*/

let left = "-2px";
let 딕셔너리 = {
    가위 : "-200px",
    보 : "-410px",
    바위 : "-2px"
}
let computers = "";

let timer;
function intervalMaker(){
    timer = setInterval(function(){
        if(left === 딕셔너리.가위){
            left = 딕셔너리.바위;
            computers = "바위";
        } else if(left === 딕셔너리.바위){
            left = 딕셔너리.보;
            computers = "보";
        } else {
            left = 딕셔너리.가위;
            computers = "가위";
        }
    document.querySelector("#imgs").style.background = "url('https://steemitimages.com/p/TZjG7hXReeVthqpTJZmwvzsLcvMeG4TU4Gjdfy25sdQwXU7K6zuqecJBKbc7QxeKMeHk6T8sTT6nuETAPqcsjt2yXm6ZUTM9vD6NSEpFn1QmXztjsZftdrR9Us1JZnjLZDu7H2zrEcUZGz?format=match&mode=fit') " + left + " -5px";
    }, 100);
}
timer = intervalMaker();

document.querySelectorAll(".btn").forEach(function(e){
     e.addEventListener("click", function(){
            clearInterval(timer);
            setTimeout(function(){
                intervalMaker();
            }, 1000);

            let myClick = e.innerText;
            let result = document.querySelector(".result");

            if(computers === "바위"){
                if(myClick === "바위")
                    result.innerText = "비김";
                else if(myClick === "가위")
                    result.innerText = "이김";
                else result.innerText = "짐";
            } else if(computers === "가위"){
                if(myClick === "가위")
                    result.innerText = "비김";
                else if(myClick === "바위")
                    result.innerText = "이김";
                else result.innerText = "짐";
            } else {
                if(myClick === "보")
                    result.innerText = "비김";
                else if(myClick === "바위")
                    result.innerText = "짐";
                else result.innerText = "이김";
            }
        });
    });
