import mongoose from "mongoose"
import retrieveUser from "./retrieveUser.js";
mongoose.connect("mongodb://127.0.0.1:27017/FormativeLife")
    .then(() => {
        try{
            retrieveUser()
            .then(user => console.log("user retrieved", user))
            .catch(error => console.error(error))
        }
        catch(error){
            console.log(error);
        }
    })