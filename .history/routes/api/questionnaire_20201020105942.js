//@login & register
const express = require("express");
const router = express.Router();
const passport = require("passport");
const Questionnaire = require("../../models/Questionnaire");
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