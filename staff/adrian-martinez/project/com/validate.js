import errors from './errors.js'

const { ContentError, MatchError } = errors

function validateName(name) {
    if (typeof name !== 'string') throw new TypeError('name is not string')

    if (name.length < 1)
        throw new RangeError('name is lower than 1 character')

    var nameIsBlank = true

    for (var i = 0; i < name.length && nameIsBlank; i++) {
        var char = name[i]

        if (char !== ' ')
            nameIsBlank = false
    }

    if (nameIsBlank)
        throw new ContentError('name is blank')
}

function validateSurnames(surnames){
    if(typeof surnames !== "string") throw new TypeError("surname is not string");
    if(surnames.length > 45) throw new TypeError("Error. surname no es válido. Los apellidos no deben ser tan largo");
    if(surnames.length < 6) throw new TypeError("Error. surname no es válido. Debes poner tus dos apellidos");
}

function validateAge(age){
    if(typeof age !== "number") throw new TypeError("age is not a number");
    if(age < 16) throw new TypeError("Error. age inválida. El estudiante no debe tener menos de 16 años.");
    if(age >= 67) throw new TypeError("Error. age inválida. El estudiante no debe estar en edad de jubilarse.");
}

function validateEmail(email){
    if(typeof email !== "string") throw new TypeError("email is not string");
    if(email.length > 30) throw new RangeError("Error. El email es demasiado largo");
    if(email.length < 7) throw new RangeError("Error. El email es demasiado corto");
    if(email === " ") throw new ContentError("Error. El email no debe estar vacío");
    
    if(!email.includes("@")) throw new ContentError("Error. El email tiene que llevar una @");
}

function validatePassword(password){
    if(typeof password !== "string") throw new TypeError("password is not string");
    if(password.length < 7 || password.length > 16) throw new RangeError("Error. El password tiene que tener entre 8 y 16 caracteres")
}

function validateDireccion(address){
    if(typeof address !== "string") throw new TypeError("address is not string");
    if(address.length < 30) throw new RangeError("Error. address no es válido. La dirección es demasiado corta");
}

function validateActividad(activity){
    if(typeof activity !== "string") throw new TypeError("activity is not string");
    if(activity.length > 80) throw new RangeError("Error. El activity es demasiado largo")
    if(activity.length < 10) throw new RangeError("Error. El activity es demasiado corto")
        
}

function validateText(text){
    if(typeof text !== "string") throw new TypeError("text is not string");
}

function validateSalary(salary){
    if(typeof salary !== "number") throw new TypeError("salary is not a number");
    if(salary < 1200 ) throw new RangeError("Error. salary is invalid. El salario mínimo es muy bajo");
    if(salary > 10000 ) throw new RangeError("Error. salary is invalid. El salario máximo es muy alto para ser mensual");
}

function validateId(id, explain = "id") {

    if(typeof id !== "string") throw new TypeError(explain +" is not string")

    if(id.length !== 24) throw new RangeError(explain +" is not string")

    if (id.includes(' ')) throw new ContentError(explain +" has spaces")

    if (!id.length) throw new ContentError(explain +" is empty")
}

function validateUrl(url, explain = 'url') {
    if (typeof url !== 'string') throw new TypeError(`${explain} is not a string`)

    if (!url.length) throw new ContentError(`${explain} is empty`)

    if (!url.startsWith('http')) throw new ContentError(`${explain} is not an http address`)
}

function validateToken(token, explain = 'token') {
    if (typeof token !== 'string') throw new TypeError(`${explain} is not a string`)

    if (!token.length) throw new ContentError(`${explain} is empty`)

    const [, payload64,] = token.split('.')
    const payloadJSON = atob(payload64)
    const payload = JSON.parse(payloadJSON)

    const { exp } = payload

    const now = Date.now() / 1000

    if (exp < now) throw new MatchError(`${explain} expired`)
}

const validate = {
    name: validateName,
    surnames: validateSurnames,
    age: validateAge,
    email: validateEmail,
    password: validatePassword,
    direccion: validateDireccion,
    actividad: validateActividad,
    url: validateUrl,
    token: validateToken,
    id: validateId,
    text: validateText,
    salary: validateSalary
}

export default validate