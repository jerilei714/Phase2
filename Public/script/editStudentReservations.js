const tbody = document.querySelector('.table-container tbody');
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

while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
}

fetch(`/users/students`)
    .then(response => response.json())
    .then(users => {
        console.log(users);
        users.students.forEach(student => {
            fetch(`/reservations/byUsername/${student.username}`)
                .then(response => response.json())
                .then(reservations => {
                    const totalReservedSeats = reservations.userReservations.length;
                    const row = document.createElement('tr');
                    const usernameCell = document.createElement('td');
                    usernameCell.textContent = student.username;
                    row.appendChild(usernameCell);
                    const reservedSeatsCell = document.createElement('td');
                    reservedSeatsCell.textContent = totalReservedSeats;
                    row.appendChild(reservedSeatsCell);
                    const actionsCell = document.createElement('td');
                    const editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.addEventListener('click', function() {
                        window.location.href = `editReservationsContent?studentUsername=${encodeURIComponent(student.username)}`;
                    });
                    actionsCell.appendChild(editButton);
                    row.appendChild(actionsCell);
                    tbody.appendChild(row);
                })
                .catch(error => {
                    console.error('Error fetching reservations:', error);
                });
        });
    })
    .catch(error => {
        console.error('Error fetching students:', error);
    });