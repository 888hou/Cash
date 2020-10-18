const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const QuestionnaireSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
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

module.exports = Questionnaire = mongoose.model("questionnaire",QuestionnaireSchema);