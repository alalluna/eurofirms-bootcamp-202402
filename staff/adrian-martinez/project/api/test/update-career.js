fetch('http://localhost:8989/careers/665342212ee6e9aa167ca06e', {
    method: 'PATCH',
    headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjNmZGViMmE0ZjhjNWE4ZmFkYTFmZTgiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTcxNjc0Mjc2OSwiZXhwIjoxNzE2NzQ0NTY5fQ.2zAQS6PJ6o7w0Q7_vPyv2euhN6aJ6ze2rvRrMh5OlAA','Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'FP de robótica avanzada', description: 'En robótica aprendí como hacer software de calidad y complejo para que un hardware con forma de robot acate todas tus órdenes sin lanzar errores o excepciones.', certification: 'https://bmfschool.com/wp-content/uploads/2022/01/para-que-sirve-robotica-1.jpg'})
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

        console.log('Career updated')
    })
    .catch(error => console.error(error))