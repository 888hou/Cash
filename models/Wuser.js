const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const WuserSchema = new Schema({
    openid:{
        type:String,
        required:true
    },
    name:{
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

module.exports = Wuser = mongoose.model("wusers",WuserSchema);