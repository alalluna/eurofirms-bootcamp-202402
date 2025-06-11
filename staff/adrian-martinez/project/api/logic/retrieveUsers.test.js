import mongoose from 'mongoose'
import retrieveUsers from './retrieveUsers.js'

mongoose.connect('mongodb://localhost:27017/FormativeLife')
    .then(() => {
        try {
            retrieveUsers()
                .then(posts => console.log('retrieved users', posts))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })