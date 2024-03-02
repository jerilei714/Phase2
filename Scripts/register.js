/* document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    const course = document.getElementById('course').value;
    const accountType = document.getElementById('accountType').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, name, password , email, course, accountType});
    localStorage.setItem('users', JSON.stringify(users));
    document.getElementById('message').textContent = "Registration successful!";
}); */

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const jsonObject = {};
    formData.forEach((value, key) => {
        jsonObject[key] = value;
    });
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonObject)
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Registration failed');
        }
    })
    .then(data => {
        document.getElementById('message').textContent = data;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').textContent = "Registration failed!";
    });
});
