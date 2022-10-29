const form = document.querySelector('.form')

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault()
        const login = form.email.value
        fetch('https://reqres.in/api/users')
            .then(users =>
                users.json()
            )
            .then(json =>
                json.data.forEach(single => {
                    if (login == single.email) {
                        localStorage.setItem('id', single.id)
                        location.href = 'todos.html'
                    }
                })
            )
    })
}