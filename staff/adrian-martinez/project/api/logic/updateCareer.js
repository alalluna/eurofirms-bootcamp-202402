import { User, Career } from '../data/index.js'

import { validate, errors } from 'com'

const { SystemError, MatchError } = errors

function updateCareer(studentUserId, careerId, title, description, certification) {
    validate.id(studentUserId, 'userId')
    validate.id(careerId, 'careerId')
    validate.text(title)
    validate.text(description)
    validate.url(certification)

    return User.findById(studentUserId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new MatchError('user not found')

            return Career.findById(careerId)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(career => {
            if (!career)
                throw new MatchError('career not found')

            if (studentUserId !== career.student._id.toString())
                throw new MatchError('career does not belong user')

            career.title = title;
            career.description = description;
            career.certification = certification;

            return career.save()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(result => { })
}

export default updateCareer;