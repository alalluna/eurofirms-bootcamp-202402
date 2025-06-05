import mongoose from 'mongoose'
import registerStudent from './registerStudent.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            registerStudent('Goku', 'mono', 'goku@nomo.com', '123123123')
                .then(() => console.log('student registered'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))