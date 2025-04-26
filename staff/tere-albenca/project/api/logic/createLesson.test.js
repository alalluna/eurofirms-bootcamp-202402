import mongoose from 'mongoose'
import createLesson from './createLesson.js'

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => {
        try {
            createLesson('663b3fda2232f627631e110f', 'se puede editar y borrar', 'https://cms-assets.tutsplus.com/cdn-cgi/image/width=1200/uploads/users/110/posts/20417/final_image/final.jpg',
                'you can watch the lesson in this link https://prezi.com/p/jmesjgpnrzpw/?present=1', 'https://www.youtube.com/watch?v=oEDQ79y5Eic&t=16s')
                .then(() => console.log('lesson created'))
                .catch(error => console.error(error))
        } catch (error) {
            console.log(error)
        }
    })