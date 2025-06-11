import { Offer, User } from "../data/index.js"
import { validate, errors } from "com"

const { SystemError, MatchError } = errors;

function retrieveOffersFromCompany(targetUserId) {
    validate.id(targetUserId, "targetUserId")

    return User.findById(targetUserId)
        .catch(error => { throw new SystemError(error.message) })
        .then(targetUser => {
            if (!targetUser)
                throw new MatchError("target user not found")

            return Offer.find({ company: targetUserId }).select("-__v").populate("company", "-__v -password -role").lean()
                .then(offers => {
                    //Saneamiento de datos
                    offers.forEach(offer => {
                        if (offer.company._id) {
                            const id = offer.company._id.toString();
                            delete offer.company._id;

                            offer.company.id = id;
                        }
                        offer.id = offer._id.toString()

                        delete offer._id;
                    })
                    return offers;
                })
        })
}

export default retrieveOffersFromCompany;