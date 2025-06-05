import mongoose from 'mongoose'
import createComment from './createComment.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            createComment('663b3fda2232f627631e110f', '66433bafd64a06b518b40f26', 'hello, it is a comment')
                .then(() => console.log('comment created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })