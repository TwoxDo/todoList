const form = document.querySelector('.form')
if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault()
        const details = {
            email: form.email.value,
            password: form.password.value
        }
        fetch('https://reqres.in/api/register', {
            method: 'POST',
            body: JSON.stringify(details),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })


            .then(response => {
                if (response.ok) {
                    location.href = 'login.html'
                    return response.json();
                }
                console.log('You should register with the API register email which is (email) => eve.holt@reqres.in and you can use any password for it')
                throw new Error('Request failed!');

            })

    })
}

