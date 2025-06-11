import { User, Career } from "../data/index.js";
import { errors, validate } from "com";

const { SystemError, MatchError } = errors;

function deleteCareer(studentUserId, careerId){

    validate.id(studentUserId, "studentUserId");
    //validate.id(careerId, "careerId");

    return User.findById(studentUserId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if(!user){
                throw new Error("The student no exist.")
            }

            return Career.findById(careerId)
                .catch(error => { throw new SystemError(error.message)})
        })
        .then(career => {
            if(!career){
                throw new MatchError("The career no exist");
            }

            if(studentUserId !== career.student._id.toString()){

                throw new MatchError("The career is not yours");
            }
                
            //TODO Borrar sujects también (postbootcamp)
            return Career.deleteOne({ _id: career._id })
                .catch( error => {
                    throw new SystemError(error.message);
                })
            })
        .then( careerDeleted => {})
}

export default deleteCareer;