async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('input[name="#email-login"]').value.trim();
    const password = document.querySelector('input[name="#password-login"]').value.trim();

    if (email && password) {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);