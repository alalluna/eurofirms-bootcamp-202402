import mongoose from 'mongoose'
import createBet from './createBet.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            createBet('663def289961e38f028c2289', '663a3eebd05e4fd1612066ff', '6639da427c96ad4fca6bfed3', 100)
                .then(() => console.log('bet created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))