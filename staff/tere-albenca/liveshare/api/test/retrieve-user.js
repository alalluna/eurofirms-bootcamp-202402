fetch('http://localhost:8080/users/661543d3ae1b17b2e116c9b5')
    .then(res => res.json())
    .then(user => console.log(user))
    .catch(error => console.error(error))