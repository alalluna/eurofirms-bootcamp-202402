import mongoose from 'mongoose'
import updateCareer from './updateCareer.js'

mongoose.connect('mongodb://localhost:27017/FormativeLife')
    .then(() => {
        try {
            updateCareer('663a37d50452f33ab1ff9f0a', '66471edc7630613cf48f9872', "Desarrollo Frontend", "Esta FP superior se centra más en la parte visual de un sitio web", "https://media1.tenor.com/m/WSnMZt-dXKUAAAAd/programming-programando.gif")
                .then(() => console.log('career modified'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })