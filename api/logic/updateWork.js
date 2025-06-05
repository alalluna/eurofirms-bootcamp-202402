import { User, Work } from '../data/index.js'
import { errors, validate } from 'com'

const { SystemError, MatchError } = errors

function updateWork(userId, workId, title, text) {
    validate.id(userId, 'userId')
    validate.id(workId, 'workId')
    validate.text(title, 'title')
    validate.text(text, 'text')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new MatchError('user not found')

            return Work.findById(workId)
                .then(work => {
                    if (!work)
                        throw new MatchError('work not found')

                    // Permitir actualización si el usuario es el autor o un teacher
                    if (userId !== work.author.toString() && user.role !== 'teacher')
                        throw new MatchError('user not authorized to edit this work')

                    work.title = title
                    work.text = text
                    return work.save()
                })
                .catch(error => { throw new SystemError(error.message) })
                .then(() => { })
        })
}

export default updateWork
