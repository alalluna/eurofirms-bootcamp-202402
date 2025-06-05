import mongoose from 'mongoose'
import updateComment from './updateComment.js'

mongoose.connect('mongodb://localhost:27017/project')

    .then(() => {
        try {
            updateComment('663b3fda2232f627631e110f', '6641df22d846fe2b1acfe60c', '66460d4f66a348c61eeb019c', 'It is an awesome example of conic perspective with serene view')
                .then(() => console.log('this comment has been updated'))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }


    })
    .catch(error => console.error(error))