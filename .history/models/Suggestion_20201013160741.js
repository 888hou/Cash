const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const SuggestionSchema = new Schema({
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

module.exports = Suggestion = mongoose.model("suggestion",SuggestionSchema);