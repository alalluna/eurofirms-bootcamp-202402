import mongoose from 'mongoose'
import retrieveUser from './retrieveUser.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            retrieveUser('6638e0bb69b2a40c667637a1', '6638b615c96ce20cba815302')
                .then(user => console.log('user retrieved', user))
                .catch(error => console.log(error))
        } catch (error) {
            console.error(error)
        }
    })