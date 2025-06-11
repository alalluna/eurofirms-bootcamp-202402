fetch('http://localhost:8989/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Bahía Software', surnames: null, age: null, address: 'Calle Comercio, Nº1 - A Coruña', activity: 'Desarrollo de Backend', email: "admin@bahiaSoftware.com", password: "12345678" })
})
    .then(res => console.log('registered'))
    .catch(error => console.error(error))