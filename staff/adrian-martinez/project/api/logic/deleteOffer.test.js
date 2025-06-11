import mongoose from "mongoose"
import deleteOffer from "./deleteOffer.js"

mongoose.connect("mongodb://localhost:27017/FormativeLife")
    .then(() => {
        try{
            deleteOffer("663a3e1a0b6549c8120fc64a","6644b2576365affb427af80d")
            .then(() => console.log("Offer deleted"))
            .catch(error => console.error(error))
        }
        catch(error){
            console.error(error)
        }
    })