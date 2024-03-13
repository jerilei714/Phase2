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
        } else if (response.status === 410) {
            throw new Error('Username invalid');
        }else {
            throw new Error('Registration failed');
        }
    })
    .then(data => {
        alert(data)
        window.location.href = "login"
    })
    .catch(error => {
        console.error('Error:', error);
        if (error.message === 'Username already exists') {
            alert("Username already exists");
        }else if (error.message === 'Username invalid') {
            alert("Username invalid");
        } else {
            document.getElementById('message').textContent = error.message;
        }
    });
});
