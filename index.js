// Move displayUserData function outside of handleFormSubmit
function displayUserData(userDetails) {
  const ul = document.getElementById('userList');
  const li = document.createElement('li');
  li.textContent = userDetails.name + ' - ' + userDetails.email + ' - ' + userDetails.phone;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => {
      localStorage.removeItem(userDetails.email);
      ul.removeChild(li);
  };

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.onclick = () => {
      document.getElementById('username').value = userDetails.name;
      document.getElementById('email').value = userDetails.email;
      document.getElementById('phone').value = userDetails.phone;
      localStorage.removeItem(userDetails.email);
      ul.removeChild(li);
  };

  li.appendChild(deleteButton);
  li.appendChild(editButton);
  ul.appendChild(li);

  document.getElementById('username').value = '';
  document.getElementById('email').value = '';
  document.getElementById('phone').value = '';
}

document.addEventListener("DOMContentLoaded", () => {
  axios.get("https://crudcrud.com/api/4f0c0eee8a214c18a0de7b5101d4595c/appointmentData")
      .then((res) => {
          console.log(res);
          for (let i = 0 ; i < res.data.length;i++){
            displayUserData(res.data[i])
          }
      })
      .catch((error) => {
          console.log(error);
      });
});

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
  axios.post("https://crudcrud.com/api/4f0c0eee8a214c18a0de7b5101d4595c/appointmentData", userDetails)
      .then((res) => {
          displayUserData(res.data);
      })
      .catch((err) => {
          document.body.innerHTML = document.body.innerHTML + '<h4>Something went wrong</h4>';
          console.log(err);
      });
}
