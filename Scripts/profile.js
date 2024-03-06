/* 
const username = document.getElementById('username');
const name = document.getElementById('name');
const password = document.getElementById('password');
const email = document.getElementById('email');
const course = document.getElementById('course');
const accountType = document.getElementById('accountType');
let authorizedUsername = sessionStorage.getItem('authorizedUsername');
const users = JSON.parse(localStorage.getItem('users'));
const labs = JSON.parse(localStorage.getItem('labs'));
const searchUser = null;
const user = users.find(user => user.username === authorizedUsername)

document.getElementById('edit-name').value = user.name;
document.getElementById('edit-username').value=user.username
document.getElementById('edit-email').value=user.email
document.getElementById('edit-course').value=user.course
document.getElementById('edit-accountType').value=user.accountType
document.getElementById('edit-password').value=user.password

name.innerHTML= user.name
username.innerHTML =user.username
email.innerHTML = user.email
course.innerHTML = user.course
accountType.innerHTML = user.accountType


function logout(){
    sessionStorage.removeItem('authorized');
    sessionStorage.removeItem('authorizedUsername');
    goToHomePage()
}

function goToHomePage(){
    window.location.href='../index.hbs';
}

function deleteUser() {
    const index = users.findIndex(user => user.username === authorizedUsername);
    if (index !== -1) {
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        logout(); 
    }
}

const display_pfp = document.getElementById('pfpSelf')

if (user && user.profilePicture) {
    const profilePictureBase64 = user.profilePicture; 
    display_pfp.src = profilePictureBase64; 
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


function reset(){
    sessionStorage.clear()
    localStorage.clear()
    goToHomePage()
}
 */

const username = document.getElementById('username');
const name = document.getElementById('name');
const password = document.getElementById('password');
const email = document.getElementById('email');
const course = document.getElementById('course');
const accountType = document.getElementById('accountType');
let authorizedUsername = sessionStorage.getItem('authorizedUsername');
const display_pfp = document.getElementById('pfpSelf');
const tbody = document.querySelector('.table-container tbody');

fetch(`/users/${authorizedUsername}`)
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch user data');
        }
    })
    .then(user => {
        name.innerHTML = user.name;
        username.innerHTML = user.username;
        email.innerHTML = user.email;
        course.innerHTML = user.course;
        accountType.innerHTML = user.accountType;
        description.innerHTML = user.description;
        
        if (user.profilePic) {
            display_pfp.src = user.profilePic;
        }
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    });

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
            row.appendChild(actionsCell);
            tbody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching user reservations:', error);
    });

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

    while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
    }


function logout() {
    sessionStorage.removeItem('authorized');
    sessionStorage.removeItem('authorizedUsername');
    goToHomePage();
}

function goToHomePage() {
    window.location.href = '../';
}

function deleteUser() {
    fetch(`/users/${authorizedUsername}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to delete user');
        }
    })
    .then(data => {
        console.log('User deleted:', data);
        logout();
    })
    .catch(error => {
        console.error('Error deleting user:', error);
    });
}

function reset() {
    sessionStorage.clear();
    localStorage.clear();
    goToHomePage();
}
