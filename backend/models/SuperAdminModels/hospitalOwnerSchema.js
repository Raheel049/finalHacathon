import mongoose from "mongoose";

const hospitalOwner = new mongoose.Schema({
    hospitalName : {
        type : String,
        required : true
    },

    address : {
        type : String,
        required : true
    },

    contact : {
        type : String,
        required : true
    },

    ownerName : {
        type : String,
        required : true
    },

    ownerEmail : {
        type : String,
        required : true
    },

    password : {
        type : String,
        required : true
    },

    plane : {
        type : String,
        required : true,
        default : "Basic"
    },

    status : {
        type : String,
        default : "Inactive"
    }



}, {Timestamp : true});

const hospitalOwnerModel = mongoose.model("hospitalOwner", hospitalOwner)
export default hospitalOwnerModel;