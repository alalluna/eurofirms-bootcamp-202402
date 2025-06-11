import mongoose from 'mongoose'
import createCareer from './createCareer.js'

mongoose.connect('mongodb://127.0.0.1:27017/FormativeLife')
    .then(() => {
        try {
            createCareer('664388c6cd25fbbfb3101cac', "FP Desarrollo de Aplicaciones Webs", "Curso en el que aprendes lo necesario para crear sitios web profesionales con una arquitectura cliente servidor", "https://media.licdn.com/dms/image/D4E2DAQE1i1ESBnV4Bw/profile-treasury-image-shrink_800_800/0/1695329775938?e=1716307200&v=beta&t=PV7HRa6P8WOG3FAVjVa2GaJ0juPBJ4tE88EozrjV6hM")
                .then(() => console.log('Career created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })