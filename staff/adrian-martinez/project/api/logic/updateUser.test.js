import mongoose from 'mongoose'
import updateInfoStudent from './updateInfoStudents'

//TODO
mongoose.connect('mongodb://127.0.0.1:27017/FormativeLife')
    .then(() => {
        try {
            updateInfoStudent('663de575fe9f442a3e1d1e64',28)
                .then(() => console.log('user modified'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })