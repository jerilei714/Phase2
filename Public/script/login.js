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


document.getElementById('loginForm').addEventListener('submit', function(event) {

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
        sessionStorage.setItem('authorized', true);
        sessionStorage.setItem('authorizedUsername', username);
        sessionStorage.setItem('AccountType', accountType);
        window.location.href = '/';
    })    
    .catch(error => {
        alert(error.message);
    });
});

