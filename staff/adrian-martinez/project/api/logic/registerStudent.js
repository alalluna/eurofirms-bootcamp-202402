import { User } from "../data/index.js"
import { errors, validate } from "com"

const { SystemError, DuplicityError } = errors;

function registerStudent(name, surnames, age, email, password){    
    validate.name(name);
    validate.surnames(surnames);
    validate.age(age);
    validate.email(email);
    validate.password(password);

    //Esta variable no va cambiar en esta función al ser el registro de la compañía, por eso no necesita que el usuario le pase este dato
    const role = "student";
    return User.findOne({ email })

        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if(user) throw new DuplicityError("student already exists")

            user = { name, surnames, role, age, email, password }

            return User.create(user)
                .catch(error => { throw new SystemError(error.message) })     
        })
        .then(user => { })
}

export default registerStudent;
