
const urlParams = new URLSearchParams(window.location.search);
const studentUsername = urlParams.get('studentUsername');
let editingReservationIndex = null;
const authorizedUsername = sessionStorage.getItem('authorizedUsername');
const popup = document.querySelector('.popup')
const users = JSON.parse(localStorage.getItem('users'))
const user = users.find(user => user.username === studentUsername)
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

function populateTimeOptions() {
    const timeSelect = document.getElementById('time');
    const popupTimeSelect = document.getElementById('popup-time');
    while (popupTimeSelect.firstChild) {
        popupTimeSelect.removeChild(popupTimeSelect.firstChild);
    }
    Array.from(timeSelect.options).forEach(option => {
        const clonedOption = option.cloneNode(true);
        popupTimeSelect.appendChild(clonedOption);
    });
}


function openPopup(reservation, index) {
    editingReservationIndex = index;
    populateTimeOptions();
    document.getElementById('popup-lab').value = reservation.lab;
    document.getElementById('popup-seat').value = reservation.seat;
    document.getElementById('popup-date').value = reservation.date;
    document.getElementById('popup-time').value = reservation.time;
    popup.style.display = "block";
}

function submitEdit(event) {
    event.preventDefault();
    if (user && user.reservations && editingReservationIndex !== null && user.reservations[editingReservationIndex]) {
        const updatedLab = document.getElementById('popup-lab').value;
        const updatedSeat = document.getElementById('popup-seat').value;
        const updatedDate = document.getElementById('popup-date').value;
        const updatedTime = document.getElementById('popup-time').value;
        user.reservations[editingReservationIndex].lab = updatedLab;
        user.reservations[editingReservationIndex].seat = updatedSeat;
        user.reservations[editingReservationIndex].date = updatedDate;
        user.reservations[editingReservationIndex].time = updatedTime;
        localStorage.setItem('users', JSON.stringify(users));
        window.location.href = `editReservationsContent?studentUsername=${encodeURIComponent(user.username)}`;
        closeEditProfilePopup(); 
    }
}
function closeEditProfilePopup(){
    popup.style.display = "none";
}

user.reservations.forEach((reservation, index) => {
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
    const actionsCell = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
        openPopup(reservation, index);
    });
    actionsCell.appendChild(editButton);
    row.appendChild(actionsCell);
    tbody.appendChild(row);
});

