// a synchrnous function to signup
async function signupFormHandler(event) {
  // preventDefault method prevents the form from submitting and reloading the page until the form is submitted
  event.preventDefault();

  // variable for the username with the id of "username-signup" we get the value of the input and trim() removes the white space from the beginning and end of the string
  const username = document.querySelector('#username-signup').value.trim();
  // variable for the email with the id of "email-signup" we get the value of the input and trim() removes the white space from the beginning and end of the string
  const email = document.querySelector('#email-signup').value.trim();
  // variable for the password with the id of "password-signup" we get the value of the input and trim() removes the white space from the beginning and end of the string
  const password = document.querySelector('#password-signup').value.trim();

  // if the username, email and password are not empty
  if (username && email && password) {
    const response = await fetch('/api/users', { // fetch the users with the username, email and password provided to signup
      // the method is POST to create a new user
      method: 'post',
      // body is the data we want to send to the server
      body: JSON.stringify({
        // the username of the user
        username,
        // the email of the user
        email,
        // the password of the user
        password
      }),
      // the headers are the headers we want to send to the server
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // check the response status
    if (response.ok) {
      //  if the response is ok we send the response to the client and we redirect to the dashboard page
      document.location.replace('/dashboard');
    } else {
      // if the response is not ok we send the response to the client
      alert(response.statusText);
    };
  };
};

// add the event listener to the submit button with the class of signup-form
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);