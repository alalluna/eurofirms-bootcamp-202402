import retrieveUserWorks from './retrieveUserWorks.js'
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            retrieveUserWorks('663b3fda2232f627631e110f', '6663b3fa28392558d89324990')
                .then(works => console.log('retrieved works', works))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })