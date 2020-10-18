const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const QuestionSchema = new Schema({
    qid:{
        type:String
    },
    openid:{
        type:Number,
    },
    name:{
        type:String,
        require:true
    },
    mobile:{
        type:String
    },
    qname:{
        type:String
    },
    answers:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = Question = mongoose.model("question",QuestionSchema);