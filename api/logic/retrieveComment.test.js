import mongoose from 'mongoose'
import retrieveComment from './retrieveComment.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            retrieveComment('663b3fda2232f627631e110f', '66433bafd64a06b518b40f26', '6645b7f0c594a4114505af4b')
                .then(res => console.log(res))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }
    }
    ).catch(error => console.error(error))