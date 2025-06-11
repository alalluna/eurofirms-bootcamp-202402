import mongoose from 'mongoose'
import retrieveOffers from './retrieveOffers.js'

mongoose.connect('mongodb://localhost:27017/FormativeLife')
    .then(() => {
        try {
            retrieveOffers('664388c6cd25fbbfb3101cac')
                .then(offers => console.log('retrieved offers', offers))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })