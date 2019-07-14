const Calendar = {
    today : new Date(),

    // 달력 출력 메서드
    printCalendar: function() {
        const table = document.querySelector('#calendarTable tbody');

        let firstDay = new Date(this.today.getFullYear(), this.today.getMonth(), 1); // 현재 달의 1일
        let lastDay = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0); // 현재 달의 마지막 일

        document.querySelector('#thisMonth').textContent = this.today.getFullYear() + '년 ' + (this.today.getMonth() + 1) + '월'; // 년도, 달 출력

        while (table.rows.length > 2) {
            table.deleteRow(table.rows.length - 1);
        }

        let tr = document.createElement('tr');
        let count = 0;

        for (let i = 0; i < firstDay.getDay(); i++) {
            const td = document.createElement('td'),
                  span = document.createElement('span'),
                  div = document.createElement('div');

            span.innerText = new Date(this.today.getFullYear(), this.today.getMonth(), -count).getDate();
            div.classList.add('info');
            td.appendChild(span);
            td.appendChild(div);
            tr.appendChild(td);
            count++;
        }

        table.appendChild(tr);

        for (let i = 1; i <= lastDay.getDate(); i++) {
            const td = document.createElement('td'),
                  span = document.createElement('span'),
                  div = document.createElement('div');
                  
            span.innerText = i;
            div.classList.add('info');
            td.appendChild(span);
            td.appendChild(div);
            tr.appendChild(td);
            count++;

            if (count / 7 >= 1 && count % 7 === 1) {
                tr = table.insertRow();

                const newArr = Array.from(table.querySelectorAll('tr'));
                newArr[newArr.length - 1].appendChild(td);
            }
        }
    },

    prevMonth: function() {
        this.today = new Date(this.today.getFullYear(), this.today.getMonth() - 1, this.today.getDate());
        this.printCalendar();
    },

    nextMonth: function() {
        this.today = new Date(this.today.getFullYear(), this.today.getMonth() + 1, this.today.getDate());
        this.printCalendar();
    }
}

Calendar.printCalendar();

document.querySelector('#prevMonth').addEventListener('click', () => Calendar.prevMonth());
document.querySelector('#nextMonth').addEventListener('click', () => Calendar.nextMonth());

Array.prototype.forEach.call(document.querySelectorAll('td'), tds => {
    tds.addEventListener('click', e => {
        console.log(e.target);
    });
});