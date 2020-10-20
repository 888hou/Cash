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
    },
    mobile:{
        type:String,
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