const tbody = document.querySelector('.table-container tbody');
const users = JSON.parse(localStorage.getItem('users')) || [];

while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
}

users.forEach(user => {
    if (user.accountType === "Student") {
        const row = document.createElement('tr');

        const usernameCell = document.createElement('td');
        usernameCell.textContent = user.username; 
        row.appendChild(usernameCell);

        const actionsCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Reserve For Student';
        editButton.addEventListener('click', function() {
            window.location.href = `reserveForStudent.hbs?studentUsername=${encodeURIComponent(user.username)}`;
        });

        actionsCell.appendChild(editButton);
        row.appendChild(actionsCell);
        
        tbody.appendChild(row);
    }
});
