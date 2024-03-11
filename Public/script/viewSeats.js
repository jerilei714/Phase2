document.addEventListener('DOMContentLoaded', function () {
    let selectedSeat = null;
    let currentLab = null;
    let defaultTotalSeats = 40;
    let date = document.getElementById('date').value;
    let time = document.getElementById('StartTime').value;
    const authorizedUsername = sessionStorage.getItem('authorizedUsername');
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
        }
    }

    function formatTime(hour, minute) {
        const hour12 = hour % 12 === 0 ? 12 : hour % 12;
        const amPm = hour < 12 ? 'AM' : 'PM';
        return `${hour12}:${minute < 10 ? '0' + minute : minute} ${amPm}`;
    }

    function generateSeats(seatContainer, seatCount) {
        seatContainer.innerHTML = '';
        for (let i = 1; i <= seatCount; i++) {
            const seat = document.createElement('div');
            seat.classList.add('seat');
            seat.innerText = i;
            seat.addEventListener('click', function () {
                showPopup(seat);
            });
            seatContainer.appendChild(seat);
        }
    }

    async function viewAvailability() {
        try {
            currentLab = document.getElementById('lab').value;
            const selectedDate = document.getElementById('date').value;
            const response = await fetch(`/seats/available/${currentLab}`);
            if (!response.ok) {
                throw new Error('Failed to fetch available seats');
            }
            const availableSeatCount = await response.json();
            const availabilityResults = document.getElementById('availability-results');
            availabilityResults.innerHTML = `<h3>${currentLab} Availability</h3><p class="Available">Available Seats: ${availableSeatCount}</p>`;
            availabilityResults.style.display = 'block';
    
            const seatContainer = document.createElement('div');
            seatContainer.classList.add('seat-container');
            generateSeats(seatContainer, defaultTotalSeats);
            availabilityResults.appendChild(seatContainer);
            const reservedSeatsResponse = await fetch(`/reservedseats/lab/${currentLab}?date=${selectedDate}`);
            if (!reservedSeatsResponse.ok) {
                throw new Error('Failed to fetch reserved seats');
            }
            const reservedSeatsData = await reservedSeatsResponse.json();
    
            reservedSeatsData.forEach(reservation => {
                const seat = seatContainer.querySelector(`.seat:nth-child(${reservation.seat_number})`);
                if (seat) {
                    seat.classList.add('selected');
                    seat.dataset.reservationId = reservation._id;
                }
            });
        } catch (error) {
            console.error('Error fetching available seats:', error);
        }
    }    

    function showPopup(seat) {
        const popup = document.querySelector('.popup-contents');
        const reservationId = seat.dataset.reservationId;
        const decrementedId = decrementLastHexChar(reservationId);
    
        fetch(`/reservations/${decrementedId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch reservation details');
                }
                return response.json();
            })
            .then(reservation => {
                document.querySelector('#popup-date').innerHTML = reservation.reserve_date;
                document.querySelector('#popup-time').textContent = reservation.reserve_time;
                document.querySelector('.seatNumber').innerHTML = seat.innerText;
                document.querySelector('#date-reserved').innerHTML = new Date(reservation.tnd_requested).toLocaleDateString('en-GB').split('/').join(' - ');

                const userNameElement = document.querySelector('#userName');
                userNameElement.innerHTML = reservation.username;
                userNameElement.addEventListener('click', function() {
                    window.location.href = `viewProfile?username=${encodeURIComponent(reservation.username)}`;
                });
    
                popup.style.display = 'flex';
            })
            .catch(error => {
                console.error('Error fetching reservation details:', error);
            });
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

    function hidePopup() {
        const popup = document.querySelector('.popup-contents');
        popup.style.display = 'none';
    }

    document.getElementById('buttonForAvailibility').addEventListener('submit', function (event) {
        event.preventDefault();
        viewAvailability();
    });

    window.hideIt = function () {
        hidePopup();
    };
});
