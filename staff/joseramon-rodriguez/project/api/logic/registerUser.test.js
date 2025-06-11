import mongoose from 'mongoose'
import registerUser from './registerUser.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            registerUser('pep', 'pepe@pepe.com', '123123123', '1111-11-11', 1000)
                .then(() => console.log('user registered'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))