import mongoose from 'mongoose'
import createPlayer from './createPlayer.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            createPlayer('6637fb61f98ea3c57b76ed51', 'Player #1')
                .then(() => console.log('player created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))