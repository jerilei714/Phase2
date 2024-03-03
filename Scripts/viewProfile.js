/* const urlParams = new URLSearchParams(window.location.search);
const studentUsername = urlParams.get('username');
const username = document.getElementById('username');
const name = document.getElementById('name');
const password = document.getElementById('password');
const email = document.getElementById('email');
const course = document.getElementById('course');
const accountType = document.getElementById('accountType');
const authorizedUsername = sessionStorage.getItem('authorizedUsername');
const users = JSON.parse(localStorage.getItem('users'));
const searchUser = null;
const user = users.find(user => user.username === studentUsername)

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

const tbody = document.querySelector('.table-container tbody');
while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
}

function goToHomePage(){
    window.location.href='../';
}

const display_pfp = document.getElementById('pfpStudent')

if (user && user.profilePic) {
    const profilePictureBase64 = user.profilePicture; 
    display_pfp.src = profilePictureBase64; 
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
    const actionsCell = document.createElement('td');
    tbody.appendChild(row);
});

 */

const authorizedUsername = sessionStorage.getItem('authorizedUsername');


const username = document.getElementById('username');
const name = document.getElementById('name');
const email = document.getElementById('email');
const course = document.getElementById('course');
const accountType = document.getElementById('accountType');
const display_pfp = document.getElementById('pfpStudent');
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
        name.textContent = user.name;
        username.textContent = user.username;
        email.textContent = user.email;
        course.textContent = user.course;
        accountType.textContent = user.accountType;

        if (user.profilePic) {
            display_pfp.src = user.profilePic;
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
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    });

function goToHomePage() {
    window.location.href = '../';
}
