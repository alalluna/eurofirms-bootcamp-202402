import registerUser from './registerUser.js'
import authecticateUser from './authenticateUser.js'
import retrieveUser from './retrieveUser.js'
import createEvent from './createEvent.js'
import retrieveEvents from './retrieveEvents.js'
import retrieveEvent from './retrieveEvent.js'
import createBet from './createBet.js'
import removeBet from './removeBet.js'
import modifyBet from './modifyBet.js'
import retrieveBetsFromUser from './retrieveBetsFromUser.js'
import retrieveBet from './retrieveBet.js'
import saveEventWinner from './saveEventWinner.js'
import addCreditToWallet from './addCreditToWallet.js'
import substractCreditFromWallet from './substractCreditFromWallet.js'

const logic = {
    registerUser,
    authecticateUser,
    retrieveUser,
    createEvent,
    retrieveEvents,
    retrieveEvent,
    createBet,
    removeBet,
    modifyBet,
    retrieveBetsFromUser,
    retrieveBet,
    saveEventWinner,
    addCreditToWallet,
    substractCreditFromWallet
}

export default logic