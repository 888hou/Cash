const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const QuestionSchema = new Schema({
    qid:{
        type:String
    },
    order:{
        type:Number,
    },
    name:{
        type:String,
        require:true
    },
    type:{
        type:String
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