import mongoose from "mongoose";
import retrievePosts from "./retrievePosts.js";

mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        try {
            retrievePosts('661ce2138966a5e180a4154a')
                .then(posts => console.log('retrieved posts', posts))
                .catch(error => console.error(error))
        } catch (error) {
            console.error(error)
        }
    })