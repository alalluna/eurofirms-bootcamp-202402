import mongoose from 'mongoose'
import updateWork from './updateWork.js'

mongoose.connect('mongodb://localhost:27017/project')

    .then(() => {
        try {
            updateWork('663b3fa28392558d89324990', '663b92272ea17028ca57c728', 'titulo uno', 'hemos cambiado este work')
                .then(() => console.log('this work has been updated'))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }


    })
    .catch(error => console.error(error))