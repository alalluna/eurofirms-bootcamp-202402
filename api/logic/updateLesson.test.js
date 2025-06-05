import mongoose from 'mongoose'
import updateLesson from './updateLesson.js'

mongoose.connect('mongodb://localhost:27017/project')

    .then(() => {
        try {
            updateLesson('663b3fda2232f627631e110f', '665dc447d447850b0d3b8c50', 'Lesson number one', 'https://cms-assets.tutsplus.com/cdn-cgi/image/width=1200/uploads/users/110/posts/20417/final_image/final.jpg', 'you can watch the lesson in this link', 'https://prezi.com/p/jmesjgpnrzpw/?present=1', 'https://www.youtube.com/watch?v=oEDQ79y5Eic&t=16s')
                .then(() => console.log('this lesson has been updated'))
                .catch(error => console.error(error))

        } catch (error) {
            console.error(error)
        }


    })
    .catch(error => console.error(error))