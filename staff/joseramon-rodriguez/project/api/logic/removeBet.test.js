import mongoose from 'mongoose'
import removeBet from './removeBet.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            removeBet('663def289961e38f028c2289', '663df5e05768098082bfdf46')
                .then(() => console.log('bet removed'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))