import mongoose from 'mongoose'
import registerTeacher from './registerTeacher.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            registerTeacher('Super', 'teacher', 'superteacher@gmail.com', '123123123')
                .then(() => console.log('teacher registered'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))