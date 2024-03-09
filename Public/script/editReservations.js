let editingReservationIndex = null;
const authorizedUsername = sessionStorage.getItem('authorizedUsername');
const popup = document.querySelector('.popup');
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
            ];
            
            const formattedTndRequested = formatTndRequested(reservation.tnd_requested);
            details.push(formattedTndRequested);

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
    })
    .catch(error => {
        console.error('Error fetching user reservations:', error);
    });


function formatTime(hour, minute) {
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    const amPm = hour < 12 ? 'AM' : 'PM';
    return `${hour12}:${minute < 10 ? '0' + minute : minute} ${amPm}`;
}

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

const tbody = document.querySelector('.table-container tbody');
while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
}

function populateTimeOptions() {
    const popupTimeSelect = document.getElementById('popup-time');
    Array.from(timeSelect.options).forEach(option => {
        const clonedOption = option.cloneNode(true);
        popupTimeSelect.appendChild(clonedOption);
    });
}

let currentEditingReservation = {};

function openPopup(reservation, index) {
    console.log(reservation);
    editingReservationIndex = index;
    populateTimeOptions();
    document.getElementById('popup-lab').value = reservation.lab_id || '';
    document.getElementById('popup-seat').value = reservation.seat_number || '';
    document.getElementById('popup-date').value = reservation.reserve_date || '';
    document.getElementById('popup-time').value = reservation.reserve_time || '';
    popup.style.display = "block";

    currentEditingReservation = {
        _id: reservation._id,
        lab_id: reservation.lab_id,
        seat_number: reservation.seat_number,
        reserve_date: reservation.reserve_date,
        reserve_time: reservation.reserve_time,
        username: authorizedUsername
    };
}

function decrementLastHexChar(hexString) {
    let lastChar = hexString[hexString.length - 1];
    let rest = hexString.slice(0, -1);
    let lastNum = parseInt(lastChar, 16) - 1;
    if (lastNum < 0) {
        lastNum = 15;
        rest = decrementLastHexChar(rest);
    }
    lastChar = lastNum.toString(16);
    return rest + lastChar;
}

function submitEdit(event) {
    event.preventDefault();
    const originalId = currentEditingReservation._id;
    const decrementedId = decrementLastHexChar(originalId);

    const updatedLab = document.getElementById('popup-lab').value;
    const updatedSeat = document.getElementById('popup-seat').value;
    const updatedDate = document.getElementById('popup-date').value;
    const updatedTime = document.getElementById('popup-time').value;

    const updatedReservationDetails = {
        lab_id: updatedLab,
        lab_name: updatedLab,
        seat_number: updatedSeat,
        reserve_date: updatedDate,
        reserve_time: updatedTime
    };

    fetch(`/reservations/update/${decrementedId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedReservationDetails)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Reservation updated successfully');

            const reservedSeatDetails = {
                lab_id: updatedLab,
                seat_number: updatedSeat,
                reserve_date: updatedDate,
                reserve_time: updatedTime
            };

            return fetch(`/reservedseats/updateByReservationId/${decrementedId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reservedSeatDetails)
            });
        } else {
            throw new Error('Failed to update reservation');
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Reserved seat updated successfully');
            closeEditProfilePopup();
        } else {
            console.error('Failed to update reserved seat');
        }
    })
    .catch(error => {
        console.error('Error updating reservation or reserved seat:', error);
    });
}

function closeEditProfilePopup() {
    popup.style.display = "none";
}