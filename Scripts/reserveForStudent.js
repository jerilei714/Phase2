document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const studentUsername = urlParams.get('studentUsername');
    let selectedSeat = null;
    let currentLab = null;
    let defaultTotalSeats = 40; 
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;
    const authorizedUsername = sessionStorage.getItem('authorizedUsername');
    const users = JSON.parse(localStorage.getItem('users'))
    const user = users.find(user => user.username === studentUsername)
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
        const userNameElement = document.querySelector('#userName');
        if (!seat.classList.contains('selected')) {
            selectedSeat = seat;
            const popup = document.querySelector('.popup-contents');
            document.querySelector('#popup-date').innerHTML = date; 
            document.querySelector('#userName').innerHTML = user.username; 
            document.querySelector('#popup-time').textContent = time; 
            document.querySelector('.seatNumber').innerHTML = seat.innerText; 
            popup.style.display = 'flex';
            userNameElement.addEventListener('click', function() {
                window.location.href = `viewProfile.hbs?username=${encodeURIComponent(studentUsername)}`;
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

