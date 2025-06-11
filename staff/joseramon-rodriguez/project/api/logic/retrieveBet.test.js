import mongoose from 'mongoose'
import retrieveBet from './retrieveBet.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            retrieveBet('6637fb61f98ea3c57b76ed51', '663e102d0b70c05a89e95249')
                .then(bet => console.log('bet retrieved', bet))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })
    .catch(error => console.error(error))