document.addEventListener('DOMContentLoaded', function() {
  fetch('/api/user-info')
.then(response => response.json())
.then(data => {
  if (data.authorized) {
      sessionStorage.setItem('authorized', 'true');
      sessionStorage.setItem('authorizedUsername', data.username);
      sessionStorage.setItem('accountType', data.accountType);
      auth()
  } else {
      console.log('User will not be remembered');
      auth()
  }
})
.catch(error => console.error('Error fetching user info:', error));
});

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
  document.querySelector('.search-image').onclick = function(){
    let searchBar = document.getElementById('search-bar');
    if(searchBar.value != "")
    window.location.href = `viewProfile?username=${encodeURIComponent(searchBar.value)}`;
  }


  document.addEventListener('DOMContentLoaded', function(){
    console.log('DOMContentLoaded'); 
    let searchBar = document.getElementById('search-bar');
    if (searchBar) {
      searchBar.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            if(searchBar.value !="")
            window.location.href = `viewProfile?username=${encodeURIComponent(searchBar.value)}`;
          event.preventDefault();
        }
      });
    } else {
      console.log('Search bar not found'); 
    }
  });
  



