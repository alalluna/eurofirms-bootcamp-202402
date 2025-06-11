fetch('http://localhost:8989/users/663fde69a4f8c5a8fada1fe5')
    .then(res => res.json())
    .then(user => console.log(user))
    .catch(error => console.error(error))