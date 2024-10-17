import authenticateUser from './authenticateUser.js'
import createComment from './createComment.js'
import createWork from './createWork.js'
import registerStudent from './registerStudent.js'
import registerTeacher from './registerTeacher.js'
import removeComment from './removeComment.js'
import removeWork from './removeWork.js'
import retrieveComment from './retrieveComment.js'
import retrieveComments from './retrieveComments.js'
import retrieveWorks from './retrieveWorks.js'
import retrieveUser from './retrieveUser.js'
import retrieveUserWorks from './retrieveUserWorks.js'
import updateWork from './updateWork.js'
import searchWorks from './searchWorks.js'
import updateComment from './updateComment.js'
import createLesson from './createLesson.js'
import updateLesson from './updateLesson.js'
import removeLesson from './removeLesson.js'
import retrieveLessons from './retrieveLessons.js'
import giveLikeWork from './giveLikeWork.js'



const logic = {
    authenticateUser,
    createComment,
    createWork,
    registerStudent,
    registerTeacher,
    removeComment,
    removeWork,
    retrieveComment,
    retrieveComments,
    retrieveUser,
    retrieveWorks,
    retrieveUserWorks,
    searchWorks,
    updateWork,
    updateComment,
    createLesson,
    updateLesson,
    removeLesson,
    retrieveLessons,
    giveLikeWork

}

export default logic