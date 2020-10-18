const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const QuestionSchema = new Schema({
    qid:{
        type:String,
        require:true
    },
    order:{
        type:Number
    },
    name:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    answer:{
        type:Array
    },
    remark:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = Question = mongoose.model("question",QuestionSchema);