  // a synchrnous function to create a post
async function newFormHandler(event) {
  // preventDefault method prevents the form from submitting
    event.preventDefault();
  
    // get the form data which is the title and content of the post by using the name attribute of the input and the value attribute of the input
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('textarea[name="post-content"]').value;
  
    // this variable will respond to the response from the server and will be used to send the response to the client by fetching the post of the user
    const response = await fetch(`/api/posts`, { // fetch the posts
      // the method is POST
      method: 'POST',
      // body is the data we want to send to the server
      body: JSON.stringify({
        // the title of the post
        title,
        // the content of the post
        post_content
      }),
      // the headers are the headers we want to send to the server
      headers: { 'Content-Type': 'application/json' }
    });
  
    // if the response is ok we send the response to the client and we redirect to the dashboard page
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      // if the response is not ok we send the response to the client
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);