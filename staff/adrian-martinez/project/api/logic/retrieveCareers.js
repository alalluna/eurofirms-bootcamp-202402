import { Career, User } from '../data/index.js'

import { validate, errors } from 'com'

const { SystemError, MatchError } = errors

function retrieveCareers(userId) {
    validate.id(userId, 'userId')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new MatchError('User not found')

            if(user.role !== 'company')
                throw new MatchError('User is not a company')

            return Career.find().select('-__v').populate('student', 'name surnames age').lean()
                .then(careers => {
                    //saneamiento de datos
                    careers.forEach(career => {
                        if(career.student._id){
                            const id = career.student._id.toString();
                            delete career.student._id;

                            career.student.id = id;
                        }
                    })
                    return careers;
                })
        })
}

export default retrieveCareers;