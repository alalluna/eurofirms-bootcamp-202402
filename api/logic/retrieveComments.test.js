import mongoose from 'mongoose'
import retrieveComments from './retrieveComments.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            retrieveComments('663b3fda2232f627631e110f', '66433bafd64a06b518b40f26')
                .then(res => console.log(res))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    }
    ).catch(error => console.error(error))