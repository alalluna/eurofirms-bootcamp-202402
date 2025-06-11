import mongoose from 'mongoose'
import retrieveUser from './retrieveUser.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            retrieveUser('663def289961e38f028c2289', '663def289961e38f028c2289')
                .then(user => console.log('user retrieved', user))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))