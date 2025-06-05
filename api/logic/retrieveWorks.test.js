import mongoose from 'mongoose'
import retrieveWorks from './retrieveWorks.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            retrieveWorks('663b3fa28392558d89324990')
                .then(works => console.log('retrieved works', works))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))