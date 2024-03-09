
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
                window.location.href= 'login';
            }
            profile.onclick = function(){
                window.location.href= 'profile';
            }
            editProfile.onclick = function(){
                window.location.href =  'profile?edit=true';
            };
            viewSlots.onclick = function(){
                window.location.href =  'viewSlots';
            };
            viewReservations.onclick = function(){
                window.location.href =  'reservations';
            };
            reserveSlot.onclick = function(){
                window.location.href =  'reserveSlots';
            };
            editReservation.onclick = function(){
                window.location.href =  'editReservations';
            };
            editStudentReservation.onclick = function(){
                window.location.href =  'editStudentReservations';
            };
            reserveForStudent.onclick = function(){
                window.location.href =  'reserveForStudent';
            };
            removeReservations.onclick = function(){
                window.location.href =  'deleteReservations';
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
                    window.location.href =  'profile';
                };
                editProfile.onclick = function(){
                    window.location.href =  'profile?edit=true';
                };
                viewSlots.onclick = function(){
                    window.location.href =  'viewSlots';
                };
                viewReservations.onclick = function(){
                    window.location.href =  'reservations';
                };
                reserveSlot.onclick = function(){
                    window.location.href =  'reserveSlots';
                };
                editReservation.onclick = function(){
                    window.location.href =  'editReservations';
                };
                editStudentReservation.onclick = function(){
                    window.location.href =  'editStudentReservations';
                };
                reserveForStudent.onclick = function(){
                    window.location.href =  'resForStudent';
                };
                removeReservations.onclick = function(){
                    window.location.href =  'deleteReservations';
                };
            })
            .catch(error => {
                console.error('Error fetching user data:', error);

            });
    }    
  }
  auth();

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