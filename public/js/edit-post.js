//  a synchrnous function to edit a post
async function editFormHandler(event) {
    // preventDefault method prevents the form from submitting
    event.preventDefault();

    // variable for the title of the post using the name attribute of "post-title" the input and the value attribute of the input
    const title = document.querySelector('input[name="post-title"]').value;
    // variable for the content of the post using the name attribute of "post-content' the input and the value attribute of the input
    const post_content = document.querySelector('textarea[name="post-content"]').value;
    // variable for the id of the post using the url 
    const id = window.location.toString().split('/')
    [window.location.toString().split('/').length - 1];

    const response = await fetch(`/api/posts/${id}`, { // fetch the posts with the id
        // the method is PUT
        method: 'put',
        // body is the data we want to send to the server
        body: JSON.stringify({
            // the title of the post
            title,
            // the content of the post
            post_content
        }),
        // the headers are the headers we want to send to the server
        headers: {'Content-Type': 'application/json'}
    });

    // if the response is ok we send the response to the client and we redirect to the dashboard page
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        // if the response is not ok we send the response to the client
        alert(response.statusText);
    };
};

// add the event listener to the submit button with the class of edit-post-form
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);