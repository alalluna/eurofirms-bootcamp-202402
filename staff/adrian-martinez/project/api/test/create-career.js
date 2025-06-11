fetch('http://localhost:8989/career', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjNhMzdkNTA0NTJmMzNhYjFmZjlmMGEiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTcxNTkzNjQwMCwiZXhwIjoxNzE1OTM4MjAwfQ.tOF8_IkPlgRbV_NdqvnV0SZDZTMPKNv9sgySevqAfzA','Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Ciberseguridad', description: 'Con esta FP superior puedes hackear', certification: 'https://founderz.com/blog/wp-content/uploads/2023/03/5-amenazas-de-ciberseguridad-2023.jpg'})
})
    .then(res => {
        if(res.status === 500) {
            res.json()
            .then(error => console.log(error.message))

            return
        }

        if(res.status === 404){ 
            console.log('Path not found')

            return
        }

        if(res.status === 400){ 
            res.json()
            .then(error => console.log(error.message))

            return
        }

        console.log('Career registered')
    })
    .catch(error => console.error(error))