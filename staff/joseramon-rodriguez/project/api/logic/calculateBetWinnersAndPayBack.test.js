import mongoose from 'mongoose'
import calculateBetWinnersAndPayBack from './calculateBetWinnersAndPayBack.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            calculateBetWinnersAndPayBack()
                .then(() => console.log('calculate bet winners and pay back completed'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))