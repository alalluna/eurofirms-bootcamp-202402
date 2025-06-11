fetch('http://localhost:8989/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Adrián', surnames: "Martínez Insua", age: 35, address: null, activity: null, email: "adrianmi.info@gmail.com", password: "12345678" })
})
    .then(res => console.log('registered'))
    .catch(error => console.error(error))