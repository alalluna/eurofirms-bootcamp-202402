import { User, Offer } from "../data/index.js";
import { errors, validate } from "com";

const { SystemError, MatchError } = errors;

function deleteOffer(companyUserId, offerCompanyId){

    validate.id(companyUserId, "companyUserId");
    //validate.id(offerCompanyId, "offerCompanyId");

    return User.findById(companyUserId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if(!user){
                throw new Error("The company no exist.")
            }

            return Offer.findById(offerCompanyId)
                .catch(error => { throw new SystemError(error.message)})
        })
        .then(offer => {
            if(!offer){
                throw new MatchError("The offer no exist");
            }

            if(companyUserId !== offer.company._id.toString()){

                throw new MatchError("The offer is not yours");
            }
                
            return Offer.deleteOne({ _id: offer._id })
                .catch( error => {
                    throw new SystemError(error.message);
                })
            })
        .then( offerDeleted => {})
}

export default deleteOffer;