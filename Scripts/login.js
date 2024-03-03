/* document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        alert('Login successful!');
        window.location.href='../index.html'
        sessionStorage.setItem('authorized', true);
        sessionStorage.setItem('authorizedUsername', username);
        sessionStorage.setItem('AccountType', user.accountType);
    } else {
        alert('Invalid username or password.')
    }
});
const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, name, password , email, course, accountType});
    localStorage.setItem('users', JSON.stringify(users));

function togglePasswordVisibility() {
    var passwordInput = document.getElementById("password");
    var togglePassword = document.querySelector(".toggle-password");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "Show";
    }
} */

function togglePasswordVisibility() {
    var passwordInput = document.getElementById("password");
    var togglePassword = document.querySelector(".toggle-password");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "Show";
    }
}

document.querySelector('.toggle-password').addEventListener('click', function() {
    togglePasswordVisibility();
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Invalid username or password');
        }
    })
    .then(data => {
        const { username, accountType } = data;
        alert('Login successful!');
        sessionStorage.setItem('authorized', true);
        sessionStorage.setItem('authorizedUsername', username);
        sessionStorage.setItem('AccountType', accountType);
        window.location.href = '../';
    })    
    .catch(error => {
        alert(error.message);
    });
});

