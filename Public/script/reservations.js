function formatTime(hour, minute) {
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    const amPm = hour < 12 ? 'AM' : 'PM';
    return `${hour12}:${minute < 10 ? '0' + minute : minute} ${amPm}`;
}

const tbody = document.querySelector('.table-container tbody');
while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
}

document.addEventListener('DOMContentLoaded', function () {
    const authorizedUsername = sessionStorage.getItem('authorizedUsername');
const popup = document.querySelector('.popup');
const timeSelect = document.getElementById('time');
const startTime = 6; 
const endTime = 16; 


function formatTndRequested(tndRequested) {
    const tndRequestDate = new Date(tndRequested);
    if (isNaN(tndRequestDate)) {
        return 'Invalid Date';
    }
    return tndRequestDate.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
    }).replace(',', '').replace(' ', ' '); 
}

fetch(`/reservations/userReservations/${authorizedUsername}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const reservations = data.userReservations;
        reservations.forEach((reservation, index) => {
            const row = document.createElement('tr');
            const details = [
                reservation.lab_id, 
                reservation.seat_number,
                reservation.reserve_date,
                reservation.reserve_time,
                formatTndRequested(reservation.tnd_requested)
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