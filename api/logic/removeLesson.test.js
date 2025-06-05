import mongoose from 'mongoose'
import removeLesson from './removeLesson.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            removeLesson(
                '663b3fda2232f627631e110f',
                '665df182aa731aea5f72d17d')
                .then(() => console.log('lesson deleted'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })