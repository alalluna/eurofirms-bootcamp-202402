import mongoose from 'mongoose'
import retrieveCareersFromStudent from './retrieveCareersFromStudent.js'

mongoose.connect('mongodb://localhost:27017/FormativeLife')
    .then(() => {

        try {
            
            retrieveCareersFromStudent("66471edc7630613cf48f9872","663a37d50452f33ab1ff9f0a")
                .then(careers => console.log('retrieved carrers', careers))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })