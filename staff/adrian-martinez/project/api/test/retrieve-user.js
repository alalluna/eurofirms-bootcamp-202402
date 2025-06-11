fetch('http://127.0.0.1:8989/users/663fdeb2a4f8c5a8fada1fe8', {
    headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjNmZGViMmE0ZjhjNWE4ZmFkYTFmZTgiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTcxNjczOTEyNiwiZXhwIjoxNzE2NzQwOTI2fQ.V7zbOnuCyekkWKtNN06kArhPG6bgespcrWacf5YOX_4'
    } 
})
    .then(res => res.json())
    .then(user => console.log(user))
    .catch(error => console.error(error))