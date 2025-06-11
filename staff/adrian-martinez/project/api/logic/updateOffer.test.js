import mongoose from 'mongoose'
import updateOffer from './updateOffer.js'

mongoose.connect('mongodb://localhost:27017/FormativeLife')
    .then(() => {
        try {
            updateOffer('664284a5bccfbf18fbd343b9', '664a3a894fc02b93a4f146ba', "Desarrollador Frontend Junior sin experiencia", "x necesita contratar para un proyecto de 3 meses a...", 2500, null, 7-1-2024, null)
                .then(() => console.log('offer modified'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })