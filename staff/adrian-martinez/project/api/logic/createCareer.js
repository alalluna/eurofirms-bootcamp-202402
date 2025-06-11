import { User, Career} from "../data/index.js"
import { errors , validate} from "com"

const { SystemError, MatchError } = errors;

function createCareer(studentUserId, title, description, certification) {
    
    validate.id(studentUserId, "userId");
    validate.text(title);
    validate.text(description);
    validate.url(certification);

    return User.findById(studentUserId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new MatchError('user not found')

            const career = {
                student: user._id,
                title,
                description,
                certification 
            }

            return Career.create(career)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(career => { })
}

export default createCareer;