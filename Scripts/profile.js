
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
    window.location.href='../index.html';
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
