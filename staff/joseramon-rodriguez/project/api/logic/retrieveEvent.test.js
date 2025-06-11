import mongoose from 'mongoose'
import retrieveEvent from './retrieveEvent.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            retrieveEvent('663def289961e38f028c2289', '6644b9f932f9f3eb64885855')
                .then((event) => console.log('event retrieved', event))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))