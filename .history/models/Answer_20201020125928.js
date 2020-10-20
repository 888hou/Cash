const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const AnswerSchema = new Schema({
    uid:{
        type:String
    },
    qid:{
        type:String
    },
    openid:{
        type:String
    },
    name:{
        type:String,
        require:true
    },
    mobile:{
        type:String
    },
    qname:{
        type:String,
        require:true
    },
    answers:{
        type:Object,
        require:true
    },
    questions:{
        type:Array,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }

})

module.exports = Answer = mongoose.model("answer",AnswerSchema);