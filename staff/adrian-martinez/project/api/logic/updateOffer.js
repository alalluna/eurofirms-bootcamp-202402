import { User, Offer } from '../data/index.js'

import { validate, errors } from 'com'

const { SystemError, MatchError } = errors

function updateOffer(companyUserId, offerId, title, description, minSalary, maxSalary, publishDate, expirationDate) {
    validate.id(companyUserId, "companyId")
    validate.id(offerId, 'offerId')
    validate.text(title)
    validate.text(description)
    validate.salary(minSalary)
    validate.salary(maxSalary)

    return User.findById(companyUserId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new MatchError('user not found')

            return Offer.findById(offerId)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(offer => {
            if (!offer)
                throw new MatchError('offer not found')

            if (companyUserId !== offer.company.toString())
                throw new MatchError('offer does not belong user')

            offer.title = title;
            offer.description = description;
            offer.minSalary = minSalary;
            offer.maxSalary = maxSalary;
            offer.publishDate = publishDate;
            offer.expirationDate = expirationDate;

            return offer.save()
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(result => { })
}

export default updateOffer;