import mongoose from 'mongoose'
import modifyBet from './modifyBet.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            modifyBet('663a5d2e5dbf549cc2e801c5', '663df6505bafcafe9640bbd3', 666)
                .then(() => console.log('bet modified'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))