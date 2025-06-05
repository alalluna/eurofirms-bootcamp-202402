import mongoose from 'mongoose'
import retrieveLessons from './retrieveLessons.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            retrieveLessons('663b3fda2232f627631e110f')
                .then(lessons => console.log('lessons retrieved', lessons))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))