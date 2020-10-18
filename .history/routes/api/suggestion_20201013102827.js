//@login & register
const express = require("express");
const router = express.Router();
const passport = require("passport");

const Suggestion = require("../../models/Suggestion");

// $route   GET api/suggestion/test
// @desc    返回请求的json数据
// @access  public
router.get("/test",(req,res)=>{
    res.json({msg:"Suggestion works",user:req.user});
});

// $route   POST api/suggestion/add
// @desc    创建信息接口
// @access  public
router.post("/add",(req,res)=>{
    const suggestionFields = {};
    if(req.body.openid) suggestionFields.openid = req.params.openid;
    if(req.body.realname) suggestionFields.realname = req.body.realname;
    if(req.body.mobile) suggestionFields.mobile = req.body.mobile;
    if(req.body.content) suggestionFields.content = req.body.content;
    suggestionFields.status = 'waiting';
    new Suggestion(suggestionFields).save().then(suggestion => {
        res.json(suggestion);
    });
});

// $route   GET api/suggestion/list
// @desc    获取用户提交的信息
// @access  public
router.get("/list/",(req,res)=>{
    Suggestion.find({openid:req.params.openid})
    .then(suggestion => {
        if(!suggestion){
            return res.status(404).json("没有任何内容");
        }
        res.json(suggestion);
    }).catch(err => res.status(404).json(err));
});

// $route   GET api/suggestion
// @desc    获取所有信息
// @access  private
router.get("/",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Suggestion.find()
    .then(suggestion => {
        if(!suggestion){
            return res.status(404).json("没有任何内容");
        }
        res.json(suggestion);
    }).catch(err => res.status(404).json(err));
});

// $route   GET api/suggestion/:id
// @desc    获取单个信息
// @access  private
router.get(
    "/:id",
    passport.authenticate("jwt",{session:false}),(req,res)=>{
    Suggestion.findOne({_id:req.params.id})
    .then(suggestion => {
        if(!suggestion){
            return res.status(404).json("没有任何内容");
        }
        res.json(suggestion);
    }).catch(err => res.status(404).json(err));
});


// $route   POST api/suggestion/edit
// @desc    编辑信息接口
// @access  private
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const suggestionFields = {};
    if(req.body.status) suggestionFields.status = req.body.status;
    if(req.body.feedback) suggestionFields.feedback = req.body.feedback;
    if(req.body.remark) suggestionFields.remark = req.body.remark;
    suggestionFields.enddate = Date.now();
    Suggestion.findOneAndUpdate(
        {_id:req.params.id},
        {$set:suggestionFields},
        {new:true}
        ).then(suggestion => res.json(suggestion));
});
// $route   GET api/suggestion/delete
// @desc    删除信息接口
// @access  private
router.get("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Suggestion.findByIdAndRemove(
        {_id:req.params.id}
        ).then(suggestion => {
            res.json(suggestion);            
        }).catch(err => res.status(404).json('删除失败'));
});

module.exports = router;