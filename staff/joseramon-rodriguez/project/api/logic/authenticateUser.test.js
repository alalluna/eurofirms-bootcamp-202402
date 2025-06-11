import mongoose from 'mongoose'
import authenticateUser from './authenticateUser.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            authenticateUser('pep', '123123123')
                .then(userId => console.log('user authecticated', userId))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))