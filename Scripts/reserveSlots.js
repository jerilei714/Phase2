/* document.addEventListener('DOMContentLoaded', function () {
    let selectedSeat = null;
    let currentLab = null;
    let defaultTotalSeats = 40; 
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;
    const authorizedUsername = sessionStorage.getItem('authorizedUsername');
    const users = JSON.parse(localStorage.getItem('users'))
    const user = users.find(user => user.username === authorizedUsername)
    let labs = JSON.parse(localStorage.getItem('labs')) || {};
    
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

    function saveLabs() {
        localStorage.setItem('labs', JSON.stringify(labs));
    }

    function generateSeats(seatContainer, seatCount) {
        seatContainer.innerHTML = '';
        for (let i = 1; i <= seatCount; i++) {
            const seat = document.createElement('div');
            const isReserved = labs[currentLab].reservedSeats.some(res => res.seat === i);
            seat.classList.add('seat');
            if (isReserved) {
                seat.classList.add('selected');
            }
            seat.innerText = i;
            seat.addEventListener('click', function () {
                showPopup(seat);
            });
            seatContainer.appendChild(seat);
        }
    }
    

    function viewAvailability () {    
        currentLab = document.getElementById('lab').value;
        if (!labs[currentLab]) {
            labs[currentLab] = { totalSeats: defaultTotalSeats, reservedSeats: [], availableSeats: defaultTotalSeats };
        }
        const curLab = labs[currentLab];
        const availabilityResults = document.getElementById('availability-results');
        availabilityResults.innerHTML = `<h3>${currentLab} Availability</h3><p class="Available">Available Seats: ${curLab.availableSeats}</p>`;
        const seatContainer = document.createElement('div');
        seatContainer.classList.add('seat-container');
        generateSeats(seatContainer, curLab.totalSeats); 
        availabilityResults.appendChild(seatContainer);
        availabilityResults.style.display = 'block'; 
    };

    window.reserve = function() {
        const date = document.getElementById('date').value;
        let time = document.getElementById('time').value;
        const seatNumber = parseInt(selectedSeat.innerText, 10);
        const curLab = labs[currentLab];
        selectedSeat.classList.add('selected');
        curLab.reservedSeats.push({
            seat: seatNumber, 
            username: user.username, 
            date: date, 
            time: time
        });
        curLab.availableSeats -= 1;
        if (user) {
            if (!user.reservations) {
                user.reservations = [];
            }
            user.reservations.push({
                lab: currentLab,
                seat: seatNumber,
                date: date,
                time: time 
            });
        }
        saveLabs();
        saveUsers();
        hideIt(); 
        document.querySelector('.Available').innerHTML = `Available Seats: ${curLab.availableSeats}`;
    };
    
    function saveUsers() {
        localStorage.setItem('users', JSON.stringify(users));
    }
    

    function showPopup(seat) {
        date = document.getElementById('date').value;
        time = document.getElementById('time').value;
        if (!seat.classList.contains('selected')) {
            selectedSeat = seat;
            const popup = document.querySelector('.popup-contents');
            document.querySelector('#popup-date').innerHTML = date; 
            document.querySelector('#userName').innerHTML = user.username; 
            document.querySelector('#popup-time').textContent = time; 
            document.querySelector('.seatNumber').innerHTML = seat.innerText; 
            popup.style.display = 'flex';
            const userNameElement = document.querySelector('#userName');
            userNameElement.addEventListener('click', function() {
                window.location.href = `viewProfile.hbs?username=${encodeURIComponent(user.username)}`;
            });
        }
    }
    
    document.getElementById('buttonForAvailibility').addEventListener('submit', function(event) {
        event.preventDefault();
        viewAvailability();
    });

    window.hideIt = function() {
        const popup = document.querySelector('.popup-contents');
        popup.style.display='none';
    };
   
});

 */

document.addEventListener('DOMContentLoaded', async function () {
    let selectedSeat = null;
    let currentLab = null;
    let defaultTotalSeats = 40;

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

    async function viewAvailability() {
        try {
            currentLab = document.getElementById('lab').value;
            const selectedDate = document.getElementById('date').value; // Get the selected date
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
            const reservedSeatsData = await reservedSeatsResponse.json();

            reservedSeatsData.forEach(reservation => {
                const seat = seatContainer.querySelector(`.seat:nth-child(${reservation.seat_number})`);
                if (seat) {
                    seat.classList.add('selected');
                }
            });
        } catch (error) {
            console.error('Error fetching available seats:', error);
        }
    }       
    
    async function generateSeats(seatContainer, seatCount, labId) {
        seatContainer.innerHTML = '';
    
        try {
            const reservedSeatsResponse = await fetch(`/reservedseats/lab/${labId}`);
            const reservedSeatsData = await reservedSeatsResponse.json();
    
            const currentTime = new Date();
    
            for (let i = 1; i <= seatCount; i++) {
                const seat = document.createElement('div');
                seat.classList.add('seat');
    
                const reservation = reservedSeatsData.find(seat => seat.seat_number === i);
                if (reservation) {
                    const reservationTime = new Date(reservation.time_reserved);
                    if (reservationTime < currentTime) {
                        await releaseReservation(reservation._id);
                    } else {
                        seat.classList.add('reserved');
                    }
                } else {
                    seat.addEventListener('click', function () {
                        showPopup(seat);
                    });
                }
    
                seat.innerText = i;
                seatContainer.appendChild(seat);
            }
        } catch (error) {
            console.error('Error fetching reserved seats data:', error);
        }
    }    
    
    async function releaseReservation(reservationId) {
        try {
            const response = await fetch(`/reservedseats/${reservationId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                console.error('Failed to release reservation');
            }
        } catch (error) {
            console.error('Error releasing reservation:', error);
        }
    }           
    
    function showPopup(seat) {
        date = document.getElementById('date').value;
        time = document.getElementById('time').value;
        if (!seat.classList.contains('selected')) {
            selectedSeat = seat;
            const popup = document.querySelector('.popup-contents');
            document.querySelector('#popup-date').innerHTML = date; 
            const authorizedUsername = sessionStorage.getItem('authorizedUsername');
        fetch(`/users/${authorizedUsername}`)
            .then(response => response.json())
            .then(user => {
            document.querySelector('#userName').innerHTML = user.username; 
            });
            document.querySelector('#popup-time').textContent = time; 
            document.querySelector('.seatNumber').innerHTML = seat.innerText; 
            popup.style.display = 'flex';
            const userNameElement = document.querySelector('#userName');
            userNameElement.addEventListener('click', function() {
                window.location.href = `viewProfile?username=${encodeURIComponent(user.username)}`;
            });
        }
    }

    document.getElementById('buttonForAvailibility').addEventListener('submit', function (event) {
        event.preventDefault();
        viewAvailability();
    });

    window.hideIt = function () {
        const popup = document.querySelector('.popup-contents');
        popup.style.display = 'none';
    };

    window.reserve = async function () {
        const currentLab = document.getElementById('lab').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const seatNumber = parseInt(selectedSeat.innerText, 10);
    
        try {
            const response = await fetch(`/users/${sessionStorage.getItem('authorizedUsername')}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const user = await response.json();
            const labName = document.getElementById('lab').options[document.getElementById('lab').selectedIndex].text;
            const reservationData = {
                lab_id: currentLab,
                lab_name: labName,
                user_id: user._id,
                seat_number: seatNumber,
                username: user.username,
                reserve_date: date,
                reserve_time: time,
                tnd_requested: new Date().toISOString()
            };
            const reservationResponse = await fetch('/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reservationData)
            });
            if (!reservationResponse.ok) {
                throw new Error('Failed to make reservation');
            }
            console.log('Reservation successful');
            alert('Reservation successful!');

            selectedSeat.classList.add('selected');
            selectedSeat.removeEventListener('click', showPopup);

            const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];
            selectedSeats.push(selectedSeat.innerText);
            localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
            location.reload();
        } catch (error) {
            console.error('Error making reservation:', error);
            alert('Error: Could not make reservation');
        }
    };    
});