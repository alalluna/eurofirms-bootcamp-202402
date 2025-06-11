import mongoose from "mongoose"
import deleteCareer from "./deleteCareer.js"

mongoose.connect("mongodb://localhost:27017/FormativeLife")
    .then(() => {
        try{
            deleteCareer("664388c6cd25fbbfb3101cac","66438c365125edae3eadfbe1")
            .then(() => console.log("Career deleted"))
            .catch(error => console.error(error))
        }
        catch(error){
            console.error(error)
        }
    })