import mongoose from 'mongoose'
import searchWorks from './searchWorks.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            searchWorks('663b3fda2232f627631e110f', 'exercise')
                .then(works => console.log('works finded', works))
                .catch(error => console.log(error))
        } catch (error) {
            console.error(error)
        }
    })