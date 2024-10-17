import registerStudent from './registerStudent.js'
import registerTeacher from './registerTeacher.js'
import loginUser from './loginUser.js'
import logoutUser from './logoutUser.js'
import getLoggedInUserId from './getLoggedInUserId.js'
import getLoggedInUserRole from './getLoggedInUserRole.js'
import retrieveUser from './retrieveUser.js'
import isUserLoggedIn from './isUserLoggedIn.js'
import createWork from './createWork.js'
import removeWork from './removeWork.js'
import retrieveWorks from './retrieveWorks.js'
import retrieveUsersWorks from './retrieveUsersWorks.js'
import updateWork from './updateWork.js'
import createComment from './createComment.js'
import removeComment from './removeComment.js'
import updateComment from './updateComment.js'
import retrieveComments from './retrieveComments.js'
import searchWorks from './searchWorks.js'
import createLesson from './createLesson.js'
import updateLesson from './updateLesson.js'
import removeLesson from './removeLesson.js'
import retrieveLessons from './retrieveLessons.js'
import giveLikeWork from './giveLikeWork.js'

const logic = {
    registerStudent,
    registerTeacher,
    loginUser,
    retrieveUser,
    logoutUser,
    getLoggedInUserId,
    getLoggedInUserRole,
    isUserLoggedIn,
    createWork,
    removeWork,
    retrieveWorks,
    retrieveUsersWorks,
    updateWork,
    createComment,
    removeComment,
    updateComment,
    retrieveComments,
    searchWorks,
    createLesson,
    updateLesson,
    removeLesson,
    retrieveLessons,
    giveLikeWork
}

export default logic