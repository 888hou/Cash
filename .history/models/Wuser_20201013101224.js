const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    openid:{
        type:String,
        required:true
    },
    realname:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = User = mongoose.model("users",UserSchema);