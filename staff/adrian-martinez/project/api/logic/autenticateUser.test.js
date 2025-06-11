import mongoose from 'mongoose'
import autenticateUser from './autenticateUser.js'

mongoose.connect('mongodb://localhost:27017/FormativeLife')
    .then(() => {
        try {
            autenticateUser('admin@dualcode.es', '12345678')
                .then(userId => console.log('user logged in', userId))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })