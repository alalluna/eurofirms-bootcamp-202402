import mongoose from 'mongoose'
import registerCompany from './registerCompany.js'

mongoose.connect('mongodb://localhost:27017/FormativeLife')
    .then(() => {
        try {
            registerCompany("BySideCar","Calle Real, Nº1 - A Coruña","Diseño Web",'admin@bysidecar.com','12345678')
                .then(() => console.log('Company registered'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })