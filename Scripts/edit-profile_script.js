function submitEditProfile(event) {
    event.preventDefault();
    const authorizedUsername = sessionStorage.getItem('authorizedUsername');
    const users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(user => user.username === authorizedUsername);
    if (userIndex !== -1) {
        const newName = document.getElementById('edit-name').value;
        const newUsername = document.getElementById('edit-username').value;
        const newEmail = document.getElementById('edit-email').value;
        const newCourse = document.getElementById('edit-course').value;
        const newAccountType = document.getElementById('edit-accountType').value;
        const newPassword = document.getElementById('edit-password').value;
        users[userIndex].name = newName;
        users[userIndex].username = newUsername; 
        users[userIndex].email = newEmail;
        users[userIndex].course = newCourse;
        users[userIndex].accountType = newAccountType;
        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        sessionStorage.setItem('authorizedUsername', newUsername);
        sessionStorage.setItem('AccountType', newAccountType);
        window.location.href = 'profile'; 
    } else {
        console.error('User not found');
    }

    closeEditProfilePopup();
}

function openEditProfilePopup() {
    document.getElementById('edit-profile-popup').style.display = 'block';
}

function closeEditProfilePopup() {
    document.getElementById('edit-profile-popup').style.display = 'none';
}

document.getElementById('fileInput').onchange = function(event) {
    const [file] = event.target.files;
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64String = e.target.result;
            display_pfp.src = base64String;
            if (user && users) {
                user.profilePicture = base64String;
                const userIndex = users.findIndex(u => u.username === authorizedUsername);
                if (userIndex !== -1) {
                    users[userIndex] = user; 
                    localStorage.setItem('users', JSON.stringify(users)); 
                }
            }
        };
        reader.readAsDataURL(file); 
    }
    window.location.href='profile.hbs'
};



function checkEditParameter() {
    const edit = new URLSearchParams(window.location.search).get('edit'); 
    if (edit === 'true') {
        openEditProfilePopup();
    }
}
document.addEventListener('DOMContentLoaded', checkEditParameter);
