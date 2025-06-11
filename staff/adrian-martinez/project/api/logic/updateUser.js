import { User } from "../data/index.js"
import { errors, validate } from "com"

const { SystemError, MatchError } = errors;

//Pasarle como parámetro los text de los todos los inputs que tengamos, aunque solo cambiamos un campo
//TODO
function updateUser(userId, age){
    validate.id(userId, "userId");
    validate.age(age);

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if(!user) throw new MatchError("user not found")

            user.age = age;

            return user.save()
                .catch(error => { throw new SystemError( error.message) })
        })
        .then(result => { })
}

export default updateUser;