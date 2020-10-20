//@login & register
const express = require("express");
const router = express.Router();
const passport = require("passport");
const Question = require("../../models/Question");
// $route   GET api/question/test
// @desc    返回请求的json数据
// @access  public
router.get("/test",(req,res)=>{
    res.json({msg:"Question works",user:req.user});
});

// $route   POST api/question/add
// @desc    创建信息接口
// @access  public
router.post("/add",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const questionFields = {};
    if(req.body.qid) questionFields.qid = req.body.qid;
    if(req.body.order) questionFields.order = req.body.order;
    if(req.body.name) questionFields.name = req.body.name;
    if(req.body.type) questionFields.type = req.body.type;
    if(req.body.require) questionFields.require = req.body.require;
    if(req.body.answer) questionFields.answer = req.body.answer;
    if(req.body.remark) questionFields.remark = req.body.remark;
    //返回信息
    new Question(questionFields).save().then(question => {
        res.json(question);
    });
});

// $route   GET api/question
// @desc    获取所有信息
// @access  private
router.get(
    "/id/:id",
    passport.authenticate("jwt",{session:false}),(req,res)=>{
    Question.findOne({_id:req.params.id})
    .then(question => {
        if(!question){
            return res.status(404).json("没有任何内容");
        }
        res.json(question);
    }).catch(err => res.status(404).json(err));
});

// $route   GET api/question/:id
// @desc    获取单个信息
// @access  private
router.get(
    "/:qid",
    (req,res)=>{
    Question.find({qid:req.params.qid}).sort({"order":1})
    .then(question => {
        if(!question){
            return res.status(404).json("没有任何内容");
        }
        res.json(question);
    }).catch(err => res.status(404).json(err));
});


// $route   POST api/question/edit
// @desc    编辑信息接口
// @access  private
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const questionFields = {};
    if(req.body.qid) questionFields.qid = req.body.qid;
    if(req.body.order) questionFields.order = req.body.order;
    if(req.body.name) questionFields.name = req.body.name;
    if(req.body.type) questionFields.type = req.body.type;
    if(req.body.require) questionFields.require = req.body.require;
    if(req.body.answer) questionFields.answer = req.body.answer;
    if(req.body.remark) questionFields.remark = req.body.remark;
    Question.findOneAndUpdate(
        {_id:req.params.id},
        {$set:questionFields},
        {new:true}
        ).then(question => {
            console.log(question);
            res.json(question);
        });
});
// $route   GET api/question/delete
// @desc    删除信息接口
// @access  private
router.get("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Question.findByIdAndRemove(
        {_id:req.params.id}
        ).then(question => {
            res.json(question);            
        }).catch(err => res.status(404).json('删除失败'));
});

module.exports = router;