import mongoose from 'mongoose'
import saveEventWinner from './saveEventWinner.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            saveEventWinner('1a cruzada del sur', 'torneo clasificatorio para ibericon de la conferencia sur', [
                "Ace",
                "Rudy",
                "Jon Sao"
            ], '2025-05-09 16:37', '2025-06-09 16:37', 'Ace')
                .then(() => console.log('event winner saved'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))