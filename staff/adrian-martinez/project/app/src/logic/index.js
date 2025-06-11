import registerStudent from "./registerStudent"
import registerCompany from "./registerCompany"
import loginUser from "./loginUser"
import logoutUser from "./logoutUser"
import getLoggedInUserId from "./getLoggedInUserId" 
import getLoggedInUserRole from "./getLoggedInUserRole"
import isUserLoggedIn from "./isUserLoggedIn"
import retrieveUser from "./retrieveUser"
import retrieveUsers from "./retrieveUsers"
import retrieveCareersFromStudent from "./retrieveCareersFromStudent"
import retrieveOffersFromCompany from "./retrieveOffersFromCompany"
import createCareer from "./createCareer"
import deleteCareer from "./deleteCareer"
import createOffer from "./createOffer"
import deleteOffer from "./deleteOffer"
import updateCareer from "./updateCareer"
import updateOffer from "./updateOffer"

const logic = {
    registerStudent,
    registerCompany,
    loginUser,
    getLoggedInUserId,
    getLoggedInUserRole,
    isUserLoggedIn,
    retrieveUser,
    retrieveUsers,
    createCareer,
    retrieveCareersFromStudent,
    retrieveOffersFromCompany,
    deleteCareer,
    createOffer,
    deleteOffer,
    updateCareer,
    updateOffer,
    logoutUser
}

export default logic;