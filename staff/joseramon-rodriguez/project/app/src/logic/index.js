import getLoggedInUserId from './getLoggedInUserId'
import isUserLoggedIn from './isUserLoggedIn'
import registerUser from './registerUser'
import loginUser from './loginUser'
import logoutUser from './logoutUser'
import retrieveUser from './retrieveUser'
import retrieveEvents from './retrieveEvents'
import retrieveEvent from './retrieveEvent'
import createBet from './createBet'
import retrieveBetsFromUser from './retrieveBetsFromUser'
import retrieveBet from './retrieveBet'
import modifyBet from './modifyBet'
import removeBet from './removeBet'
import addCreditToWallet from './addCreditToWallet'
import substractCreditFromWallet from './substractCreditFromWallet'

const logic = {
    getLoggedInUserId,
    isUserLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
    retrieveUser,
    retrieveEvents,
    retrieveEvent,
    createBet,
    retrieveBetsFromUser,
    retrieveBet,
    modifyBet,
    removeBet,
    addCreditToWallet,
    substractCreditFromWallet
}

export default logic