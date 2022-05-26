// a synchrnous function to add a comment
async function commentFormHandler(event) {
    // preventDefault method prevents the form from submitting and reloading the page until the form is submitted
    event.preventDefault();

    // get the form data which is the body of the comment by using the name attribute "comment-body"... value is the value of the input...trim() removes the white space from the beginning and end of the string
    const content = document.querySelector('textarea[name="comment-body"]').value.trim()
    // get the id of the post that the comment is being added to... 
    const post_id = window.location.toString().split('/') // split the url into an array.
    [window.location.toString().split('/').length - 1]; // get the last element of the array which is the id of the post that the comment is being added to.


    // if the content is not empty
    if (content) {
        // this variable will respond to the response from the server and will be used to send the response to the client.
        const response = await fetch('/api/comments', { // fetch the comments
            // the method is POST
            method: 'post',
            // body is the data we want to send to the server
            body: JSON.stringify({
                // the id of the post that the comment is being added to
                post_id,
                // the content of the comment
                content
            }),
            // the headers are the headers we want to send to the server
            headers: {'Content-Type': 'application/json'}
            });

            // if the response is ok we send the response to the client and we reload the page
            if (response.ok) {
                document.location.reload();
            } else {
                // if the response is not ok we send the response to the client
                alert(response.statusText);
            };
        };
    };

    //  add the event listener to the submit button with the class of comment-form
    document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);