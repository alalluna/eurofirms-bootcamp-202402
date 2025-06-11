import mongoose from 'mongoose'
import addCreditToWallet from './addCreditToWallet.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            addCreditToWallet('6637fb82f98ea3c57b76ed55', 10000)
                .then(() => console.log('added credit to user wallet'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))