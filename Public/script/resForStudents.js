const tbody = document.querySelector('.table-container tbody');

while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
}
fetch(`/users/students`)
    .then(response => response.json())
    .then(users => {
        console.log(users);
        const data = users.students;
        data.forEach(student => {
            const row = document.createElement('tr');
            const usernameCell = document.createElement('td');
            usernameCell.textContent = student.username;
            row.appendChild(usernameCell);
            const actionsCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Reserve For Student';
            editButton.addEventListener('click', function() {
                window.location.href = `reserveForStudent?studentUsername=${encodeURIComponent(student.username)}`;
            });
            actionsCell.appendChild(editButton);
            row.appendChild(actionsCell);
            tbody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching students:', error);
    });