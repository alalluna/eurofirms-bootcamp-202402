import mongoose from 'mongoose'
import createWork from './createWork.js'

mongoose.connect('mongodb://localhost:27017/project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {

    console.log('MongoDB connected successfully')

    try {
        createWork(
            '664dff96494d6b4fe9941f96', // userId válido en tu base de datos
            'my first draw',
            'https://crehana-blog.imgix.net/media/filer_public/09/fc/09fcbec6-4e4a-4c04-94ed-4c4442a164c3/ejercicios-de-perspectiva_un-punto-fuga-3.jpg?auto=format&q=50', // URL de imagen válido
            'ilustration diving'
        ).then(() => {
            console.log('Work created successfully')
            mongoose.disconnect() // Desconectamos de la base de datos después de completar la prueba
        }).catch(error => {
            console.error('Error creating work:', error)
            mongoose.disconnect() // Desconectamos de la base de datos en caso de error también
        });
    } catch (error) {
        console.error('Error in try block:', error)
        mongoose.disconnect() // Aseguramos la desconexión de la base de datos en caso de error en el try
    }
}).catch(error => {
    console.error('MongoDB connection error:', error)
})