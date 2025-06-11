import mongoose from 'mongoose'

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema

const user = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
        required: true
    },
    wallet: {
        type: Number,
        min: 0
    }
})

const player = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    }
})

const event = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    players: {
        type: [{ type: ObjectId, ref: 'Player' }],
        required: true
    },
    winner: {
        type: ObjectId,
        ref: 'Player'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        required: true,
        default: 'open'
    }
})

const bet = new Schema({
    event: {
        type: ObjectId,
        required: true,
        ref: 'Event'
    },
    player: {
        type: ObjectId,
        required: true,
        ref: 'Player'
    },
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    amount: {
        type: Number,
        min: 1
    }
})

const payment = new Schema({
    event: {
        type: ObjectId,
        required: true,
        ref: 'Event'
    },
    date: {
        type: Date,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    }
})

const User = model('User', user)
const Player = model('Player', player)
const Event = model('Event', event)
const Bet = model('Bet', bet)
const Payment = model('Payment', payment)

export {
    User,
    Player,
    Event,
    Bet,
    Payment
}