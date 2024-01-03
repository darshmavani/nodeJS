import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email: {
        type:String,
        require:true,
        unique:true
    },
    password: {
        require:true,
        type:String,
        select:false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export const User = mongoose.model("User" , schema);