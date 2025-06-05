import mongoose from 'mongoose'
import removeWork from './removeWork.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            removeWork(
                '663b3fa28392558d89324990',
                '663b9e5242529d7ab03ccc83')
                .then(() => console.log('work deleted'))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })