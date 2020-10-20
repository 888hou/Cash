//@login & register
const express = require("express");
const router = express.Router();
const passport = require("passport");
const Questionnaire = require("../../models/Questionnaire");
const Answer = require("../../models/Answer");
// $route   GET api/questionnaire/test
// @desc    返回请求的json数据
// @access  public
router.get("/test",(req,res)=>{
    res.json({msg:"Questionnaire works",user:req.user});
});

// $route   POST api/questionnaire/add
// @desc    创建信息接口
// @access  public
router.post("/add",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const questionnaireFields = {};
    if(req.body.name) questionnaireFields.name = req.body.name;
    if(req.body.type) questionnaireFields.type = req.body.type;
    if(req.body.status) questionnaireFields.status = req.body.status;
    if(req.body.begindate) questionnaireFields.begindate = req.body.begindate;
    if(req.body.enddate) questionnaireFields.enddate = req.body.enddate;
    if(req.body.remark) questionnaireFields.remark = req.body.remark;
    //返回信息
    new Questionnaire(questionnaireFields).save().then(questionnaire => {
        res.json(questionnaire);
    });
});

// $route   GET api/questionnaire
// @desc    获取所有信息
// @access  private
router.get("/",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Questionnaire.find().sort({"date":-1})
    .then(questionnaire => {
        if(!questionnaire){
            return res.status(404).json("没有任何内容");
        }
        res.json(questionnaire);
    }).catch(err => res.status(404).json(err));
});

// $route   GET api/questionnaire/list
// @desc    获取所有信息
// @access  private
router.get("/list",(req,res)=>{
    Questionnaire.find({'status':'发布'}).sort({"date":-1})
    .then(questionnaire => {
        if(!questionnaire){
            return res.status(404).json("没有任何内容");
        }
        res.json(questionnaire);
    }).catch(err => res.status(404).json(err));
});

// $route   POST api/questionnaire/user/add
// @desc    创建信息接口
// @access  public
router.post("/answer/add",(req,res)=>{
    const answerFields = {};
    if(req.body.uid) answerFields.uid = req.body.uid;
    if(req.body.name) answerFields.name = req.body.name;
    if(req.body.mobile) answerFields.mobile = req.body.mobile;
    if(req.body.openid) answerFields.openid = req.body.openid;
    if(req.body.qid) answerFields.qid = req.body.qid;
    if(req.body.qname) answerFields.qname = req.body.qname;
    if(req.body.questions) answerFields.questions = req.body.questions;
    if(req.body.answers) answerFields.answers = req.body.answers;
    //返回信息
    new Answer(answerFields).save().then(answer => {
        res.json(answer);
    });
});

// $route   POST api/questionnaire/user/add
// @desc    创建信息接口
// @access  public
router.get("/answerlist/:id",(req,res)=>{
    //返回信息
    Answer.find({qid:req.params.id}).sort({"date":-1})
    .then(answers => {
        if(!answers){
            return res.status(404).json("没有任何内容");
        }
        res.json(answers);
    }).catch(err => res.status(404).json(err));
});

// $route   GET api/questionnaire/:id
// @desc    获取单个信息
// @access  private
router.get(
    "/:id",
    (req,res)=>{
    Questionnaire.findOne({_id:req.params.id})
    .then(questionnaire => {
        if(!questionnaire){
            return res.status(404).json("没有任何内容");
        }
        res.json(questionnaire);
    }).catch(err => res.status(404).json(err));
});


// $route   POST api/questionnaire/edit
// @desc    编辑信息接口
// @access  private
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const questionnaireFields = {};
    if(req.body.name) questionnaireFields.name = req.body.name;
    if(req.body.type) questionnaireFields.type = req.body.type;
    if(req.body.status) questionnaireFields.status = req.body.status;
    if(req.body.begindate) questionnaireFields.begindate = req.body.begindate;
    if(req.body.enddate) questionnaireFields.enddate = req.body.enddate;
    if(req.body.remark) questionnaireFields.remark = req.body.remark;
    Questionnaire.findOneAndUpdate(
        {_id:req.params.id},
        {$set:questionnaireFields},
        {new:true}
        ).then(questionnaire => {
            console.log(questionnaire);
            res.json(questionnaire);
        });
});
// $route   GET api/questionnaire/delete
// @desc    删除信息接口
// @access  private
router.get("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Questionnaire.findByIdAndRemove(
        {_id:req.params.id}
        ).then(questionnaire => {
            res.json(questionnaire);            
        }).catch(err => res.status(404).json('删除失败'));
});

module.exports = router;