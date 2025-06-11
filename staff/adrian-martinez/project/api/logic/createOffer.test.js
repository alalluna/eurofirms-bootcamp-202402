import mongoose from 'mongoose'
import createOffer from './createOffer.js'

mongoose.connect('mongodb://127.0.0.1:27017/FormativeLife')
    .then(() => {
        try {
            createOffer("663a3e1a0b6549c8120fc64a", "Desarrollador Full Stack Junior sin experiencia", "Google es un empresa puntera en el desarrollo web y experiencia de usuario. Estamos ubicados en Coruña. ¿Tienes gusto por el diseño web?, te estamos esperando!!. Te ofrecemos formación, buen ambiente laboral y un salario atractivo.", 5000, null, "2024-06-12", null)
                .then(() => console.log('Offer created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })