//  a synchrnous function to delete a post
async function deleteFormHandler(event) {
    // preventDefault method prevents the form from submitting
    event.preventDefault();

    // get the id of the post based on the url
    const id = window.location.toString().split('/')
    [window.location.toString().split('/').length - 1]; 

    // this variable will respond to the response from the server and will be used to send the response to the client by fetching the post of the user
    const response = await fetch(`/api/posts/${id}`, { // fetch the posts with the id
        // the method is DELETE
        method: 'delete',
    });

    // if the response is ok we send the response to the client and we redirect to the dashboard page
    if (response.ok) {
        document.location.replace('/dashboard/');
    } else {
        // if the response is not ok we send the response to the client
        alert(response.statusText);
    };
};

// add the event listener to the submit button with the class of delete-post-btn
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);