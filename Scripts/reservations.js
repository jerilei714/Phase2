/* 
const authorizedUsername = sessionStorage.getItem('authorizedUsername');
const users = JSON.parse(localStorage.getItem('users'))
const user = users.find(user => user.username === authorizedUsername)
const timeSelect = document.getElementById('time');
const startTime = 6; 
const endTime = 16; 
for (let hour = startTime; hour < endTime; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
        const start = formatTime(hour, minute);
        const endHour = minute === 30 ? hour + 1 : hour;
        const endMinute = minute === 30 ? 0 : 30;
        const end = formatTime(endHour, endMinute);
        const timeSlot = `${start} - ${end}`;
        const option = new Option(timeSlot, timeSlot);
        timeSelect.add(option);
    }
}
function formatTime(hour, minute) {
    const hour12 = hour % 12 === 0 ? 12 : hour % 12; 
    const amPm = hour < 12 ? 'AM' : 'PM';
    return `${hour12}:${minute < 10 ? '0' + minute : minute} ${amPm}`;
}

const tbody = document.querySelector('.table-container tbody');
while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
}

user.reservations.forEach(reservation => {
    const row = document.createElement('tr');
    const details = [
        reservation.lab, 
        reservation.seat, 
        reservation.date,
        reservation.time,
        "12:15AM 2-14-2024"
    ];
    details.forEach(detail => {
        const cell = document.createElement('td');
        cell.textContent = detail;
        row.appendChild(cell);
    });
    tbody.appendChild(row);
});

 */

document.addEventListener('DOMContentLoaded', function () {
    const authorizedUsername = sessionStorage.getItem('authorizedUsername');
    fetch(`/users/${authorizedUsername}`)
        .then(response => response.json())
        .then(user => {

            const reservations = user.reservations || [];
            const timeSelect = document.getElementById('time');
            const startTime = 6; 
            const endTime = 16; 
            for (let hour = startTime; hour < endTime; hour++) {
                for (let minute = 0; minute < 60; minute += 30) {
                    const start = formatTime(hour, minute);
                    const endHour = minute === 30 ? hour + 1 : hour;
                    const endMinute = minute === 30 ? 0 : 30;
                    const end = formatTime(endHour, endMinute);
                    const timeSlot = `${start} - ${end}`;
                    const option = new Option(timeSlot, timeSlot);
                    timeSelect.add(option);
                }
            }

            function formatTime(hour, minute) {
                const hour12 = hour % 12 === 0 ? 12 : hour % 12; 
                const amPm = hour < 12 ? 'AM' : 'PM';
                return `${hour12}:${minute < 10 ? '0' + minute : minute} ${amPm}`;
            }

            const tbody = document.querySelector('.table-container tbody');
            tbody.innerHTML = '';
            reservations.forEach(reservation => {
                const row = document.createElement('tr');
                const details = [
                    reservation.lab, 
                    reservation.seat, 
                    reservation.date,
                    reservation.time,
                    "12:15AM 2-14-2024" 
                ];
                details.forEach(detail => {
                    const cell = document.createElement('td');
                    cell.textContent = detail;
                    row.appendChild(cell);
                });
                tbody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching user reservations:', error);
        });
});
