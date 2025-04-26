import mongoose from 'mongoose'
import giveLikeWork from './giveLikeWork.js'
import dotenv from 'dotenv'

dotenv.config()

const { PORT, MONGO_URL, JWT_SECRET } = process.env
mongoose.connect(`DB conected at ${MONGO_URL}`)

    .then(() => {
        try {
            giveLikeWork('66681bee6eca0b1ac6e132d5', '66fa63cf8af174980beb1644')
                .then(() => console.log('work liked'))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }


    })
    .catch(error => console.error(error))