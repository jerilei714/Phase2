document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const jsonObject = {};
    formData.forEach((value, key) => jsonObject[key] = value);

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
        } else if (response.status === 409) {
            throw new Error('Username already exists');
        } else {
            throw new Error('Registration failed');
        }
    })
    .then(data => {
        document.getElementById('message').textContent = data;
    })
    .catch(error => {
        console.error('Error:', error);
        if (error.message === 'Username already exists') {
            alert("Username already exists");
        } else {
            document.getElementById('message').textContent = error.message;
        }
    });
});
