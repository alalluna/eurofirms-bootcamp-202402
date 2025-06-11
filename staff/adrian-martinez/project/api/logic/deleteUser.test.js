import mongoose from 'mongoose'
import deleteUser from './deleteUser.js'

//TODO
mongoose.connect('mongodb://localhost:27017/FormativeLife')
    .then(() => {
        try {
            deleteUser('6655853b15cf0057799c511a')
                .then(() => console.log('user deleted'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })