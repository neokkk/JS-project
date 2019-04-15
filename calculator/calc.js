let resultValue = document.getElementById("result_btn").value;

function resultPrint(val) {
    resultValue = eval(val);
}

function clear() {
    resultValue = 0;
}

function calc(val) {

    if(resultValue === 0) {
        resultValue = "";
    }

    resultValue += val;
}

function init() {
    const inp_btn = document.querySelectorAll("input[type=button]"); 

    // 입력
    for(let i = 0; i < inp_btn.length; i++) {

        inp_btn[i].addEventListener("click", function() {
            if(this.value !== "clear" && this.value !== "=") {
                console.log(this.value);
                calc(this.value);
            }
        });
    }

    // 초기화
    document.querySelector(".clr_btn").addEventListener("click", function() {
        clear();
    });

    // 결과 출력
    document.querySelector(".op_btn").addEventListener("click", function() {
        try {
            resultPrint(resultValue);
        }
        catch (err) {
            resultValue = "입력 오류";
        }
    });
}

init();