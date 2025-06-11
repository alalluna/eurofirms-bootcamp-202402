import events from './events.json'  assert { type: 'json' }
import 'dotenv/config'
import mongoose from 'mongoose'
import logic from '../logic/index.js'
const { MONGO_URL } = process.env

mongoose.connect(MONGO_URL)
    .then(() => {
        const saves = events.map(event => {
            const { name, description, players, startDate, endDate, winner } = event

            if (winner)
                return logic.saveEventWinner(name, description, players, startDate, endDate, winner)
            else
                return

        })
        return Promise.all(saves)

    })
    .then(() => console.log('events saved'))
    .catch(error => { console.log(error) })
    .finally(() => mongoose.disconnect())