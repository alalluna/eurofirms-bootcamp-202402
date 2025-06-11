import mongoose from 'mongoose'
import calculateBetWinnersAndPayBack from '../logic/calculateBetWinnersAndPayBack.js'
import 'dotenv/config'

const { MONGO_URL } = process.env

import cron from 'node-cron'

const now = new Date()

now.setMinutes(now.getMinutes() + 1)

const cronTime = `${now.getMinutes()} ${now.getHours()} * * *` // @daily to set cronTime to launch task every day at midnight

const task = () => {
    console.log('task executed at: ', new Date())
    payWinnersAndPayBack()
}

const scheduledTask = cron.schedule(cronTime, task, {
    scheduled: true
})

console.log('task scheduled at ' + now.getHours() + ':' + now.getMinutes())

scheduledTask.start()

const payWinnersAndPayBack = () => {
    mongoose.connect(MONGO_URL)
        .then(() => {
            return calculateBetWinnersAndPayBack()
                .then(() => console.log('calculate bet winners and pay back completed'))
                .catch(error => console.error(error))
        })
        .then(() => console.log('bets updated and winners paid back'))
        .catch(error => console.error(error))
        .finally(() => mongoose.disconnect())
}