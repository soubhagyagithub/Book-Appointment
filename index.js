// Function to display user data in the list
function displayUserData(userDetails) {
  const ul = document.getElementById('userList');
  const li = document.createElement('li');
  li.textContent = userDetails.name + ' - ' + userDetails.email + ' - ' + userDetails.phone;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => {
    axios.delete(`https://crudcrud.com/api/4f0c0eee8a214c18a0de7b5101d4595c/appointmentData/${userDetails._id}`)
      .then((res) => {
        console.log(`${userDetails.name} got deleted`);
        ul.removeChild(li);
      })
      .catch((err) => {
        console.log('Error while deleting the user ', err);
      });
  };

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.onclick = () => {
    // Populate form for editing
    populateFormForEdit(userDetails);

    // Create an update button to handle the edit action
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.onclick = () => {
      const updatedName = document.getElementById('username').value;
      const updatedEmail = document.getElementById('email').value;
      const updatedPhone = document.getElementById('phone').value;

      const updatedDetails = {
        name: updatedName,
        email: updatedEmail,
        phone: updatedPhone,
      };

      axios.put(`https://crudcrud.com/api/4f0c0eee8a214c18a0de7b5101d4595c/appointmentData/${userDetails._id}`, updatedDetails)
        .then((res) => {
          console.log(`${userDetails.name} updated successfully`);

          // Update the existing list item with the updated details
          li.textContent = `${updatedName} - ${updatedEmail} - ${updatedPhone}`;

          // Remove the update button
          li.removeChild(updateButton);
        })
        .catch((error) => {
          console.log('Error while updating the user ', error);
        });
    };

    // Append the update button to the list item
    li.appendChild(updateButton);

    // Remove the edit button
    li.removeChild(editButton);
  };

  li.appendChild(deleteButton);
  li.appendChild(editButton);
  ul.appendChild(li);
}

// Function to populate form for editing
function populateFormForEdit(userDetails) {
  document.getElementById('username').value = userDetails.name;
  document.getElementById('email').value = userDetails.email;
  document.getElementById('phone').value = userDetails.phone;
}

document.addEventListener("DOMContentLoaded", () => {
  // Fetch user data on page load
  axios.get("https://crudcrud.com/api/4f0c0eee8a214c18a0de7b5101d4595c/appointmentData")
    .then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        // Display each user's data
        displayUserData(res.data[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  const name = event.target.username.value;
  const email = event.target.email.value;
  const phone = event.target.phone.value;

  const userDetails = {
    name: name,
    email: email,
    phone: phone,
  };

  // Implement edit functionality or post new user
  axios.post("https://crudcrud.com/api/4f0c0eee8a214c18a0de7b5101d4595c/appointmentData", userDetails)
    .then((res) => {
      // Display the updated or new user data
      displayUserData(res.data);
    })
    .catch((err) => {
      document.body.innerHTML = document.body.innerHTML + '<h4>Something went wrong</h4>';
      console.log(err);
    });
}
