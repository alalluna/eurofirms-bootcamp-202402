import authenticateUser from './authenticateUser.js'
import createComment from './createComment.js'
import createLesson from './createLesson.js'
import createWork from './createWork.js'
import getUserDetailsByIds from './getUserDetailsByIds.js'
import giveLikeWork from './giveLikeWork.js'
import registerStudent from './registerStudent.js'
import registerTeacher from './registerTeacher.js'
import removeComment from './removeComment.js'
import removeLesson from './removeLesson.js'
import removeWork from './removeWork.js'
import retrieveComment from './retrieveComment.js'
import retrieveComments from './retrieveComments.js'
import retrieveLessons from './retrieveLessons.js'
import retrieveUser from './retrieveUser.js'
import retrieveUserWorks from './retrieveUserWorks.js'
import retrieveWorks from './retrieveWorks.js'
import searchWorks from './searchWorks.js'
import updateComment from './updateComment.js'
import updateLesson from './updateLesson.js'
import updateWork from './updateWork.js'

const logic = {
    authenticateUser,
    createComment,
    createLesson,
    createWork,
    getUserDetailsByIds,
    giveLikeWork, 
    registerStudent,
    registerTeacher,
    removeComment,
    removeLesson,
    removeWork,
    retrieveComment,
    retrieveComments,
    retrieveLessons,
    retrieveUser,
    retrieveUserWorks,
    retrieveWorks,
    searchWorks,
    updateComment,
    updateLesson,
    updateWork
    
}

export default logic