import mongoose from 'mongoose'
import retrieveOffersFromCompany from './retrieveOffersFromCompany.js'

mongoose.connect('mongodb://localhost:27017/FormativeLife')
    .then(() => {
        try {
            debugger
            retrieveOffersFromCompany("663de575fe9f442a3e1d1e64","663a3e1a0b6549c8120fc64a")
                .then(offers => console.log('retrieved offers', offers))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })