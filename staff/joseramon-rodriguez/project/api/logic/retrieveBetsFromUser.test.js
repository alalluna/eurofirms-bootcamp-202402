import mongoose from 'mongoose'
import retrieveBetsFromUser from './retrieveBetsFromUser.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            retrieveBetsFromUser('663def289961e38f028c2289', '663def289961e38f028c2289')
                .then((events) => console.log('events retrieved', events))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))