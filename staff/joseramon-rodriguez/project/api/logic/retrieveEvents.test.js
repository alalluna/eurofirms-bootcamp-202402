import mongoose from 'mongoose'
import retrieveEvents from './retrieveEvents.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            retrieveEvents('663def289961e38f028c2289')
                .then((events) => console.log('events retrieved', events))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))