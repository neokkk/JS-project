const holidays = [
	{
		"date": "2019-04-01",
		"event": "만우절"
	},
	{
		"date": "2019-04-05",
		"event": "식목일"
	},
	{
		"date": "2019-04-05",
		"event": "친구와 약속"
	},
	{
		"date": "2019-04-14",
		"event": "블랙데이"
	},
	{
		"date": "2019-04-30",
		"event": "과제 제출일"
	},
	{
		"date": "2019-05-05",
		"event": "어린이날"
	},
	{
		"date": "2019-05-05",
		"event": "친구와 약속"
	},
	{
		"date": "2019-05-08",
		"event": "어버이날"
	},
	{
		"date": "2019-05-15",
		"event": "스승의 날"
	},
	{
		"date": "2019-07-17",
		"event": "제헌절"
    },
    {
		"date": "2019-07-17",
		"event": "뿡빵"
    },
    {
		"date": "2019-07-17",
		"event": "뿡빵222"
    }
];

// 10 이하 숫자 0 붙이기 함수
const formatDate = date => {
    const dateString = date + '';

    if (dateString.length === 1) return `0${date}`;
    else return date;
}

// 달력 생성 객체
const Calendar = {
    today: new Date(),
    todayRemember: new Date(), // 오늘 날짜 기억해두기

    // 달력 출력 메서드
    printCalendar: function() {
        const table = document.querySelector('#calendarTbody');

        let firstDay = new Date(this.today.getFullYear(), this.today.getMonth(), 1); // 현재 달의 1일
        let lastDay = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0); // 현재 달의 마지막 일

        document.querySelector('#thisMonth').textContent = this.today.getFullYear() + '년 ' + (this.today.getMonth() + 1) + '월'; // 년도, 달 출력

        // 현재 달만 출력
        while (table.rows.length > 2) {
            table.deleteRow(table.rows.length - 1);
        }

        let tr = document.createElement('tr');
        let count = firstDay.getDay(); // 현재 달의 1일 이전 

        // 이전 달 채우기
        for (let i = count - 1; i >= 0; i--) {
            const td = document.createElement('td'),
                  span = document.createElement('span'),
                  div = document.createElement('div');

            span.innerText = new Date(this.today.getFullYear(), this.today.getMonth(), -i).getDate();
            span.style.opacity = '0.5';
            div.classList.add('info');
            div.style.opacity = '0.5';
            td.appendChild(span);
            td.appendChild(div);
            tr.appendChild(td);
        }

        table.appendChild(tr);

        // 이번 달 채우기
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const dateValidation = new Date(this.today.getFullYear(), this.today.getMonth(), i).toDateString();
            const dateString = `${this.today.getFullYear()}-${formatDate(this.today.getMonth() + 1)}-${formatDate(i)}`; // 날짜 포맷 변경

            const holiday = holidays.filter(v => v.date === dateString); // 기념일 검사
            console.log(holiday);

            const td = document.createElement('td'),
                  span = document.createElement('span'),
                  div = document.createElement('div');

            dateValidation === this.todayRemember.toDateString() ? td.classList.add('today') : td.classList.remove('today'); // 오늘 날짜 표시
            
            span.innerText = i;
            div.classList.add('info');
            div.innerHTML = holiday[0] ? holiday.map(h => h.event) : '';
            td.appendChild(span);
            td.appendChild(div);
            tr.appendChild(td);
            count++

            // 7일마다 열 바꿔주기
            if (count / 7 >= 1 && count % 7 === 1) {
                tr = table.insertRow();

                const newArr = Array.from(table.querySelectorAll('tr'));
                newArr[newArr.length - 1].appendChild(td);
            }
        }

        // 다음 달 채우기
        const lastCount = lastDay.getDay();

        if (lastCount < 6) {
            for (let i = 0; i < 6 - lastCount; i++) {
                const td = document.createElement('td'),
                      span = document.createElement('span'),
                      div = document.createElement('div');
                  
                span.innerText = i + 1;
                span.style.opacity = '0.5';
                div.classList.add('info');
                div.style.opacity = '0.5';
                td.appendChild(span);
                td.appendChild(div);
                tr.appendChild(td);
            }
        }

        // 클릭하면 일정 표시
        Array.prototype.forEach.call(document.querySelectorAll('.info'), info => {
            info.addEventListener('click', e => {
                if (e.target.innerText) {
                    console.log(e.target.innerText);
                    alert(e.target.innerText);
                }
            });
        });
    },

    // 이전 달 출력 메서드
    prevMonth: function() {
        this.today = new Date(this.today.getFullYear(), this.today.getMonth() - 1, this.today.getDate());
        
        this.resetMonth();
        this.printCalendar();
    },

    // 다음 달 출력 메서드
    nextMonth: function() {
        this.today = new Date(this.today.getFullYear(), this.today.getMonth() + 1, this.today.getDate());
        
        this.resetMonth();
        this.printCalendar();
    },

    // 달 변경 시 달력 리셋 메서드
    resetMonth: function() {
        const tableNode = document.getElementById("calendarTbody");
        const length = tableNode.childNodes.length;

        for(let i = 1; i < length; i++) {
            tableNode.removeChild(tableNode.childNodes[1]);
        }
    }
}

Calendar.printCalendar();

document.querySelector('#prevMonth').addEventListener('click', () => Calendar.prevMonth());
document.querySelector('#nextMonth').addEventListener('click', () => Calendar.nextMonth());