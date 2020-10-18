const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const QuestionSchema = new Schema({
    qid:{
        type:String
    },
    name:{
        type:String,
        require:true
    },
    type:{
        type:String
    },
    status:{
        type:String
    },
    remark:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    begindate:{
        type:Date
    },
    enddate:{
        type:Date
    }
})

module.exports = Question = mongoose.model("question",QuestionSchema);