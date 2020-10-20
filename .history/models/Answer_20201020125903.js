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
    if(this.user.id) this.formData.uid = this.user.id;
    if(this.user.name) this.formData.name = this.user.name;
    if(this.user.mobile) this.formData.mobile = this.user.mobile;
    if(this.user.openid) this.formData.openid = this.user.openid;
    if(this.infoData._id) this.formData.qid = this.infoData._id;
    if(this.infoData.name) this.formData.qname = this.infoData.name;
    if(this.questionData) this.formData.questions = this.questionData;
    if(this.answerData) this.formData.answers = this.answerData;
})

module.exports = Answer = mongoose.model("answer",AnswerSchema);