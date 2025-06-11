import mongoose from 'mongoose'
import substractCreditFromWallet from './substractCreditFromWallet.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            substractCreditFromWallet('6637fb82f98ea3c57b76ed55', 9000)
                .then(() => console.log('substracted credit from user wallet'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))