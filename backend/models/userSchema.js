import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },

    phoneNumber : {
        type : Number,
        required : true
    },

    email : {
        type : String,
        required : true
    }, 

    password : {
        type : String,
        required : true
    },

    isVerified : {
        type : Boolean,
        default : false
    },

    role : {
        type : String,
        default : "User"
    }
},{timestamps : true});

const userModel = mongoose.model("user", userSchema);

export default userModel;