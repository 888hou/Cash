const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const QuestionnaireSchema = new Schema({
    openid:{
        type:String
    },
    name:{
        type:String,
        require:true
    },
    mobile:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    },
    status:{
        type:String
    },
    remark:{
        type:String
    },
    feedback:{
        type:String
    },
    username:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    enddate:{
        type:Date
    }
})

module.exports = Questionnaire = mongoose.model("questionnair",QuestionnairSchema);