//@login & register
const express = require("express");
const router = express.Router();
const passport = require("passport");
const Suggestion = require("../../models/Suggestion");
const Wuser = require("../../models/Wuser");
const qs = require('querystring');
const http =require('http');
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

    if(req.body.name) suggestionFields.name = req.body.name;
    if(req.body.mobile) suggestionFields.mobile = req.body.mobile;
    if(req.body.openid) {
        suggestionFields.openid = req.body.openid
        //自动创建用户
        Wuser.findOne({openid:suggestionFields.openid})
        .then((user)=>{
            //没有找到用户信息
            if(!user){
                //自动注册
                const newWuser = new Wuser ({
                    name: suggestionFields.name,
                    mobile: suggestionFields.mobile,
                    openid: suggestionFields.openid
                });
                newWuser.save()
                .catch(err => console.log(err));
                console.log("创建用户",newWuser);
            }
        })
        .catch(err => console.log(err));
        //自动创建结束
    };
    if(req.body.content) suggestionFields.content = req.body.content;
    suggestionFields.status = '等待处理';
    if(req.body.status) suggestionFields.status = req.body.status;
    //返回信息
    new Suggestion(suggestionFields).save().then(suggestion => {
        //发送短信
        var sms_contents = qs.stringify({
            content:"收到来自："+suggestionFields.mobile+"，"+suggestionFields.name+"；提出的问题，请及时回复。"+suggestionFields.content,
            mobile:'18633501596',
            token:'qhdfydx'
        });
        var sms_options = {
            host:'mas.qhdfy.com.cn',
            path:'/smsSingleSender/index.php',
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
                'Content-Length':sms_contents.length
            }
        };
        var sms_req = http.request(sms_options, function(sms_res){
            sms_res.setEncoding('utf8');
            sms_res.on('data',function(data){
                console.log("data:",data);   //一段html代码
            });
        });
        sms_req.write(sms_contents);
        sms_req.end();
        res.json(suggestion);
    });
});

// $route   GET api/suggestion/list
// @desc    获取用户提交的信息
// @access  public
router.get("/list/:openid",(req,res)=>{
    Suggestion.find({openid:req.params.openid}).sort({"date":-1})
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
    Suggestion.find().sort({"date":-1})
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
    if(req.body.rate) suggestionFields.rate = req.body.rate;
    if(req.body.status) suggestionFields.status = req.body.status;
    if(req.body.feedback) suggestionFields.feedback = req.body.feedback;
    if(req.body.remark) suggestionFields.remark = req.body.remark;
    if(suggestionFields.status == "完成"){
        suggestionFields.enddate = Date.now();
    }
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