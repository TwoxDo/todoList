
window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list = document.querySelector("#tasks");
    const logout = document.querySelector(".logout")
    const id = localStorage.getItem('id')


    //fetch user  data
    const main = () => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(data => data.json())
            .then(todos => {
                todos.map(todo => {

                    if (todo.userId == id) {
                        const task = document.createElement('div');
                        task.classList.add('task');
                        const task_content = document.createElement('div');
                        task_content.classList.add('content');
                        task.appendChild(task_content);
                        const task_input = document.createElement('input');
                        task_input.classList.add('text');
                        task_input.type = 'text';
                        task_input.value = todo.title;
                        task_input.setAttribute('readonly', 'readonly');
                        task_content.appendChild(task_input);
                        const task_actions = document.createElement('div');
                        task_actions.classList.add('actions');
                        const task_edit = document.createElement('button');
                        task_edit.classList.add('btn');
                        task_edit.innerText = 'Edit';
                        const task_status = document.createElement('button');
                        task_status.classList.add('btn');
                        if (todo.completed === true) {
                            task_status.innerText = 'complete';
                        } else {
                            task_status.innerText = 'incomplete';
                        }
                        task_actions.appendChild(task_status);
                        task_status.addEventListener('click', (e) => {
                            if (task_status.innerText.toLowerCase() == "complete") {
                                task_status.innerText = "incomplete";

                                fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
                                    method: 'PATCH',
                                    body: JSON.stringify({
                                        completed: false,
                                    }),

                                    headers: {
                                        'Content-type': 'application/json; charset=UTF-8',
                                    },
                                })
                                    .then((response) => response.json())
                                    .then((json) => console.log(json));
                            }
                            else {
                                task_status.innerText = "complete";
                                fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
                                    method: 'PATCH',
                                    body: JSON.stringify({
                                        completed: true,
                                    }),

                                    headers: {
                                        'Content-type': 'application/json; charset=UTF-8',
                                    },
                                })
                                    .then((response) => response.json())
                                    .then((json) => console.log(json));
                            }
                        });
                        const task_delete = document.createElement('button');
                        task_delete.classList.add('btn');
                        task_delete.innerText = 'Delete';
                        task_actions.appendChild(task_edit);
                        task_actions.appendChild(task_delete);
                        task.appendChild(task_actions);
                        list.appendChild(task);
                        input.value = '';

                        task_edit.addEventListener('click', (e) => {
                            if (task_edit.innerText.toLowerCase() == "edit") {
                                task_edit.innerText = "Save";
                                task_input.removeAttribute("readonly");
                                task_input.focus();
                            } else {
                                task_edit.innerText = "Edit";
                                task_input.setAttribute("readonly", "readonly");
                            }
                        });
                        task_delete.addEventListener('click', (e) => {
                            list.removeChild(task);

                        });
                    }
                })
            })
    }

    main()


    //logout
    logout.addEventListener('click', (e) => {
        localStorage.clear()
        location.href = 'login.html'

    })
    

    const postt = (newTodo) => {

        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify({
                title: newTodo,
                userId: id,
                id: Math.floor(Math.random() * 999) + 201,
                completed: false


            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => console.log(json));
    }
    //add new todo
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const thetodo = input.value;
        const task = document.createElement('div');
        task.classList.add('task');
        const task_content = document.createElement('div');
        task_content.classList.add('content');
        task.appendChild(task_content);
        const task_input = document.createElement('input');
        task_input.classList.add('text');
        task_input.type = 'text';
        task_input.value = thetodo;
        task_input.setAttribute('readonly', 'readonly');
        task_content.appendChild(task_input);
        const task_actions = document.createElement('div');
        task_actions.classList.add('actions');
        const task_edit = document.createElement('button');
        task_edit.classList.add('btn');
        task_edit.innerText = 'Edit';
        const task_delete = document.createElement('button');
        task_delete.classList.add('btn');
        task_delete.innerText = 'Delete';
        const task_status = document.createElement('button');
        task_status.classList.add('btn');
        task_status.innerText = 'incomplete';

        task_actions.appendChild(task_status);
        postt(thetodo)
        task_status.addEventListener('click', (e) => {
            if (task_status.innerText.toLowerCase() == "complete") {
                task_status.innerText = "incomplete";
                fetch(`https://jsonplaceholder.typicode.com/todos/201`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        completed: false
                        ,
                    }),

                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then((response) => response.json())
                    .then((json) => console.log(json));
            }
            else {
                task_status.innerText = "complete";
                fetch(`https://jsonplaceholder.typicode.com/todos/201`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        completed: true
                        ,
                    }),

                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then((response) => response.json())
                    .then((json) => console.log(json));
            }
        });
        task_actions.appendChild(task_edit);
        task_actions.appendChild(task_delete);
        task.appendChild(task_actions);
        list.appendChild(task);
        input.value = '';
        task_edit.addEventListener('click', (e) => {
            if (task_edit.innerText.toLowerCase() == "edit") {
                task_edit.innerText = "Save";
                task_input.removeAttribute("readonly");
                task_input.focus();
            } else {
                task_edit.innerText = "Edit";
                task_input.setAttribute("readonly", "readonly");
            }
        });
        task_delete.addEventListener('click', (e) => {
            list.removeChild(task);
        });
    });
});