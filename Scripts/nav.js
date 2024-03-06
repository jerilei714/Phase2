function getCurrentPath() {
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.includes('/View/') ? '../' : './'; // Adjust base URL
    return baseUrl;
}

function loadNav() {
    const navHtml = `
    <link rel="stylesheet" href="./styles/nav_style.css"> 
    <link rel="stylesheet" href="../styles/nav_style.css"> 

        <nav>
    <div class = "nav-left">
        <div class="logo">
            <img src="../Images/logo.png" alt="logo">
            <div class="logo-text"><a href = "../">DLSU Laboratory Reservation System</a></div>
        </div>
    </div>
    <div class = "nav-right">
        <ul>
            <li class="reservation" id="reservation">
                <div class="dropdown">
                    <button class="dropbtn">Reserve</button>
                    <div class="dropdown-content" id="reservationDropDown">
                        <a id = "reserveSlot">Reserve Slot</a>
                        <a id = "reserveForStudent">Reserve for a Student</a>
                        <a id = "removeReservations">Remove Reservation</a>
                    </div>
                </div>
            </li>
            <li class="edit" id="edit">
                <div class="dropdown">
                    <button class="dropbtn" id="EditDropdown">Edit</button>
                    <div class="dropdown-content">
                        <a id ="editReservation">Edit Reservation</a>
                        <a id ="editStudentReservation">Edit Student Reservations</a>
                    </div>
                </div>
            </li>
            <li class="view">
                <div class="dropdown">
                    <button class="dropbtn">View</button>
                    <div class="dropdown-content">
                        <a id="viewSlotAvailability">View Slot Availability</a>
                        <a id="viewReservations">View Reservation</a>
                    </div>
                </div>
            </li>
        </ul>
        <div class="search-bar">
            <input type="text" placeholder="Search for users">
        </div>
        <img class="search-image" src="../Images/search.png"> </img>
        <div class="user-actions">
            <div class="profile-info">
                <img id = "pfp" src="../Images/Default_pfp.jpg" alt="pfp">
            </div>
            <div class="dropdown">
                <button class="dropbtn">Welcome, <span class="username"></span></button>
                <div class="dropdown-content">
                    <img id="dropdownpfp" src="../Images/Default_pfp.jpg" alt="Pfp">
                    <a id = "viewProfile">Profile</a>
                    <a id="editProfile" href="./View/profile?edit=true">Edit Profile</a>
                </div>
            </div>
        </div>
    </div>
</nav>
    `;
    
    document.getElementById('nav').innerHTML = navHtml;
    auth(); 
}

  function auth() {
    let profile = document.getElementById('viewProfile')
    let editProfile = document.getElementById('editProfile')
    let deleteProfile = document.getElementById('deleteProfile')
    let viewSlots = document.getElementById('viewSlotAvailability')
    let viewReservations = document.getElementById('viewReservations')
    let reserveSlot = document.getElementById('reserveSlot')
    let editReservation = document.getElementById('editReservation')
    let reserveForStudent = document.getElementById('reserveForStudent')
    let removeReservations = document.getElementById('removeReservations')
    let editStudentReservation = document.getElementById('editStudentReservation')
    let reservationDropdown = document.querySelector('.reservation')
    let EditDropdown = document.querySelector('.edit')
    let viewSlotAvailability = document.getElementById('viewSlotAvailability')
    
      if (!sessionStorage.getItem('authorized')) {
            let profileArea = document.querySelector('.user-actions');
            let unauthorized = '<button id="signInButton">Sign-in</button>';
            profileArea.innerHTML = unauthorized;
            let signInButton = document.getElementById("signInButton");
            reservationDropdown.style.display = "none"
            EditDropdown.style.display = "none"
            document.getElementById('viewReservations').style.display="none"
            viewSlotAvailability.textContent="View Current Slot Availability"
            signInButton.onclick = function (){
                window.location.href=getCurrentPath() + 'login';
            }
            profile.onclick = function(){
                window.location.href=getCurrentPath() + 'profile';
            }
            editProfile.onclick = function(){
                window.location.href = getCurrentPath() + 'profile?edit=true';
            };
            viewSlots.onclick = function(){
                window.location.href = getCurrentPath() + 'viewSlots';
            };
            viewReservations.onclick = function(){
                window.location.href = getCurrentPath() + 'reservations';
            };
            reserveSlot.onclick = function(){
                window.location.href = getCurrentPath() + 'reserveSlots';
            };
            editReservation.onclick = function(){
                window.location.href = getCurrentPath() + 'editReservations';
            };
            editStudentReservation.onclick = function(){
                window.location.href = getCurrentPath() + 'editStudentReservations';
            };
            reserveForStudent.onclick = function(){
                window.location.href = getCurrentPath() + 'reserveForStudent';
            };
            removeReservations.onclick = function(){
                window.location.href = getCurrentPath() + 'deleteReservations';
            };

      } else {
        const authorizedUsername = sessionStorage.getItem('authorizedUsername');
        fetch(`/users/${authorizedUsername}`)
            .then(response => response.json())
            .then(user => {
                const display_pfp = document.getElementById('pfp');
                const dropdownpfp = document.getElementById('dropdownpfp');
                if (user.profilePic) {
                    display_pfp.src = user.profilePic; 
                    dropdownpfp.src = user.profilePic;
                }
                
                let usernameDisplay = document.querySelector('.username');
                if (usernameDisplay) {
                    usernameDisplay.textContent = authorizedUsername;
                }
    
                if (sessionStorage.getItem('AccountType') === "Student") {
                    document.getElementById('reserveForStudent').style.display = "none";
                    document.getElementById('removeReservations').style.display = "none";
                    editStudentReservation.style.display = "none";
                } else if (sessionStorage.getItem('AccountType') === "Lab Facilitator") {
                    editReservation.style.display = "none";
                    document.getElementById('reserveSlot').style.display = "none";
                    document.getElementById('viewReservations').style.display = "none";
                }
                
                profile.onclick = function(){
                    window.location.href = getCurrentPath() + 'profile';
                };
                editProfile.onclick = function(){
                    window.location.href = getCurrentPath() + 'profile?edit=true';
                };
                viewSlots.onclick = function(){
                    window.location.href = getCurrentPath() + 'viewSlots';
                };
                viewReservations.onclick = function(){
                    window.location.href = getCurrentPath() + 'reservations';
                };
                reserveSlot.onclick = function(){
                    window.location.href = getCurrentPath() + 'reserveSlots';
                };
                editReservation.onclick = function(){
                    window.location.href = getCurrentPath() + 'editReservations';
                };
                editStudentReservation.onclick = function(){
                    window.location.href = getCurrentPath() + 'editStudentReservations';
                };
                reserveForStudent.onclick = function(){
                    window.location.href = getCurrentPath() + 'resForStudent';
                };
                removeReservations.onclick = function(){
                    window.location.href = getCurrentPath() + 'deleteReservations';
                };
            })
            .catch(error => {
                console.error('Error fetching user data:', error);

            });
    }    
  }
  loadNav();

/* 
          const labsData = {
            "GK304A": {
              "totalSeats": 40,
              "reservedSeats": [
                {"seat": 1, "username": "Jenny", "date": "2024-02-15", "time": "6:00 AM - 6:30 AM"},
                {"seat": 3, "username": "Jenny", "date": "2024-02-15", "time": "6:00 AM - 6:30 AM"},
                {"seat": 6, "username": "Jenny", "date": "2024-02-15", "time": "6:00 AM - 6:30 AM"},
                {"seat": 8, "username": "Jenny", "date": "2024-02-15", "time": "6:00 AM - 6:30 AM"},
                {"seat": 20, "username": "Mark", "date": "2024-02-16", "time": "6:00 AM - 6:30 AM"},
                {"seat": 21, "username": "Mark", "date": "2024-02-16", "time": "6:00 AM - 6:30 AM"},
                {"seat": 28, "username": "Mark", "date": "2024-02-16", "time": "6:00 AM - 6:30 AM"},
                {"seat": 29, "username": "Mark", "date": "2024-02-16", "time": "6:00 AM - 6:30 AM"},
                {"seat": 35, "username": "Mark", "date": "2024-02-16", "time": "6:00 AM - 6:30 AM"},
                {"seat": 38, "username": "Mark", "date": "2024-02-16", "time": "6:00 AM - 6:30 AM"},
                {"seat": 33, "username": "Sara", "date": "2024-03-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 18, "username": "Tom", "date": "2024-04-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 23, "username": "Tom", "date": "2024-04-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 40, "username": "Anna", "date": "2024-02-03", "time": "6:00 AM - 6:30 AM"},
                {"seat": 17, "username": "Anna", "date": "2024-02-03", "time": "6:00 AM - 6:30 AM"}
              ],
              "availableSeats": 25
            },
            "GK304B": {
              "totalSeats": 40,
              "reservedSeats": [
                {"seat": 36, "username": "Jenny", "date": "2024-02-15", "time": "6:00 AM - 6:30 AM"},
                {"seat": 35, "username": "Jenny", "date": "2024-02-15", "time": "6:00 AM - 6:30 AM"},
                {"seat": 37, "username": "Jenny", "date": "2024-02-15", "time": "6:00 AM - 6:30 AM"},
                {"seat": 38, "username": "Jenny", "date": "2024-02-15", "time": "6:00 AM - 6:30 AM"},
                {"seat": 20, "username": "Sara", "date": "2024-03-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 21, "username": "Sara", "date": "2024-03-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 11, "username": "Sara", "date": "2024-03-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 14, "username": "Sara", "date": "2024-03-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 4, "username": "Tom", "date": "2024-04-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 5, "username": "Tom", "date": "2024-04-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 26, "username": "Tom", "date": "2024-04-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 31, "username": "Tom", "date": "2024-04-12", "time": "6:00 AM - 6:30 AM"}
              ],
              "availableSeats": 28
            },
            "GK305A": {
              "totalSeats": 40,
              "reservedSeats": [
                {"seat": 11, "username": "Mark", "date": "2024-02-16", "time": "6:00 AM - 6:30 AM"},
                {"seat": 40, "username": "Mark", "date": "2024-02-16", "time": "6:00 AM - 6:30 AM"},
                {"seat": 33, "username": "Mark", "date": "2024-02-16", "time": "6:00 AM - 6:30 AM"},
                {"seat": 13, "username": "Sara", "date": "2024-03-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 12, "username": "Sara", "date": "2024-03-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 14, "username": "Sara", "date": "2024-03-12", "time": "6:00 AM - 6:30 AM"}
              ],
              "availableSeats": 34
            },
            "GK305B": {
              "totalSeats": 40,
              "reservedSeats": [
                {"seat": 1, "username": "Mark", "date": "2024-02-16", "time": "6:00 AM - 6:30 AM"},
                {"seat": 40, "username": "Mark", "date": "2024-02-16", "time": "6:00 AM - 6:30 AM"},
                {"seat": 4, "username": "Sara", "date": "2024-03-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 35, "username": "Sara", "date": "2024-03-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 20, "username": "Tom", "date": "2024-04-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 21, "username": "Tom", "date": "2024-04-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 14, "username": "Tom", "date": "2024-04-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 11, "username": "Tom", "date": "2024-04-12", "time": "6:00 AM - 6:30 AM"}
              ],
              "availableSeats": 32
            },
            "GK306A": {
              "totalSeats": 40,
              "reservedSeats": [
                {"seat": 4, "username": "Mark", "date": "2024-02-16", "time": "6:00 AM - 6:30 AM"},
                {"seat": 11, "username": "Sara", "date": "2024-03-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 38, "username": "Sara", "date": "2024-03-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 23, "username": "Sara", "date": "2024-03-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 2, "username": "Tom", "date": "2024-04-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 20, "username": "Tom", "date": "2024-04-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 29, "username": "Tom", "date": "2024-04-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 39, "username": "Tom", "date": "2024-04-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 6, "username": "Anna", "date": "2024-03-22", "time": "6:00 AM - 6:30 AM"},
                {"seat": 35, "username": "Anna", "date": "2024-03-22", "time": "6:00 AM - 6:30 AM"},
                {"seat": 18, "username": "Anna", "date": "2024-03-22", "time": "6:00 AM - 6:30 AM"}
              ],
              "availableSeats": 29
            },
            "GK306B": {
              "totalSeats": 40,
              "reservedSeats": [
                {"seat": 8, "username": "Mark", "date": "2024-02-16", "time": "6:00 AM - 6:30 AM"},
                {"seat": 33, "username": "Sara", "date": "2024-03-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 37, "username": "Sara", "date": "2024-03-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 12, "username": "Sara", "date": "2024-03-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 3, "username": "Tom", "date": "2024-04-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 21, "username": "Tom", "date": "2024-04-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 6, "username": "Tom", "date": "2024-04-12", "time": "6:00 AM - 6:30 AM"},
                {"seat": 35, "username": "Anna", "date": "2024-03-22", "time": "6:00 AM - 6:30 AM"},
                {"seat": 31, "username": "Anna", "date": "2024-03-22", "time": "6:00 AM - 6:30 AM"}
              ],
              "availableSeats": 31
            }
          };
          localStorage.setItem('labs', JSON.stringify(labsData));
          localStorage.setItem('users', JSON.stringify(usersData));
 */