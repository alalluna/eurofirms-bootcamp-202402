fetch('http://localhost:8989/offer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'Desarrollador Full Stack Junior sin experiencia', description: 'BySideCar es un empresa puntera en el desarrollo web y experiencia de usuario. Estamos ubicados en Coruña. ¿Tienes gusto por el diseño web?, te estamos esperando!!. Te ofrecemos formación, buen ambiente laboral y un salario atractivo.', minSalary: 1400, maxSalary: null, publishDate: "2024-06-12", expirationDate: null})
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

        console.log('registered')
    })
    .catch(error => console.error(error))