import mongoose from 'mongoose'
import removeComment from './removeComment.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            removeComment('663b3fda2232f627631e110f', '6641df22d846fe2b1acfe60c', '6645f85584f28c2afff4a74b')
                .then(() => console.log('comment deleted'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })