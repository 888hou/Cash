const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const QuestionSchema = new Schema({
    qid:{
        type:String
    },
    openid:{
        type:String,
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
    questions:{
        type:Array
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = Answer = mongoose.model("answer",AnswerSchema);