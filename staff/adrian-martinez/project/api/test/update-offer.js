fetch('http://localhost:8989/offers/665352dc2ee6e9aa167ca0ac', {
    method: 'PATCH',
    headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjUzNGYzZjJlZTZlOWFhMTY3Y2EwOTQiLCJyb2xlIjoiY29tcGFueSIsImlhdCI6MTcxNjc0MzgwOCwiZXhwIjoxNzE2NzQ1NjA4fQ.d7FR3z1zbo13-joMCXeuO9ZOrAJiZMNEuk8PbFmXrTU','Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Diseñador UX/UI (5 vacantes)', description: 'Se busca programadores con altos conocimientos en diseño de interfaces profesionales y experiencia de usuario crear sitios webs de importantes bancos.', minSalary: 4000, maxSalary: 6000, publishDate: "2024-05-03", expirationDate: "2024-05-20"})
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

        console.log('Offer updated')
    })
    .catch(error => console.error(error))