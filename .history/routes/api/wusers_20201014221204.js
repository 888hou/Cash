//@login & register
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");
const Wuser = require("../../models/Wuser");
// $route   GET api/wusers/test
// @desc    返回请求的json数据
// @access  public
router.get("/test",(req,res)=>{
    res.json({msg:"login works"});
})

// $route   POST api/wusers/register
// @desc    返回请求的json数据
// @access  public
router.post("/register",(req,res)=>{
    console.log(req.body);
    //查询数据库中是否拥有邮箱
    Wuser.findOne({mobile:req.body.mobile})
        .then((user)=>{
            if(user){
                return res.status(400).json("手机号已注册");
            }else{

                const newUser = new User ({
                    name: req.body.name,
                    mobile: req.body.mobile,
                    avatar: req.body.avatar,
                    openid: req.body.openid
                });
                newUser.save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
})
// $route   POST api/wusers/login
// @desc    返回token jwt passport
// @access  public
router.post("/login",(req,res)=>{
    console.log(req.body);
    const mobile = req.body.mobile;
    const name = req.body.name;
    //查询数据库中是否拥有信息
    Wuser.findOne({mobile:req.body.mobile,name:req.body.name})
        .then((user)=>{
            if(!user)
            {
                return res.status(404).json("用户不存在");
            }
            const rule = {
                id:user.id,
                openid:user.openid,
                avatar:user.avatar,
                name:user.name,
                mobile:user.mobile
            };
            jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
                if(err){
                    throw err;
                }
                res.json({
                    success:true,
                    token:"Bearer "+token
                });
            });
        })
        .catch(err => console.log(err));
})
// $route   POST api/wusers/login/:openid
// @desc    返回token jwt passport
// @access  public
router.get("/login/:openid",(req,res)=>{
    if(!req.params.openid){
        return res.status(404).json("登录失败");
    }       
    let rule = {
        openid:req.params.openid
    };
    console.log("rule");
    console.log(rule);
    //查询数据库中是否拥有信息
    Wuser.findOne(rule)
         .then((user)=>{
             if(user){
                rule.name = user.name;
                rule.mobile = user.mobile;
                rule.id = user.id;
             }
             console.log("user");
             console.log(user);
             console.log(rule);
             jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token)=>{
                if(err){
                    throw err;
                }
                res.json({
                    success:true,
                    token:"Bearer "+token
                });
            });
         })
         .catch(err => console.log(err));


})
// $route   POST api/wusers
// @desc    返回current
// @access  Private
router.get("/",passport.authenticate("jwt",{session:false}),(req,res)=>{
    //查询数据库中是否拥有信息
    Wuser.find()
    .then((users)=>{
        if(users){
            res.json(users);
        }else{
            return res.status(404).json("用户不存在");
        }
    })
    .catch(err => console.log(err));
})


// $route   POST api/wusers/edit
// @desc    编辑信息接口
// @access  private
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const wusersFields = {};
    if(req.body.name) wusersFields.name = req.body.name;
    if(req.body.mobile) wusersFields.mobile = req.body.mobile;
    if(req.body.openid) wusersFields.openid = req.body.openid;
    if(req.body.remark) wusersFields.remark = req.body.remark;
    Wuser.findOneAndUpdate(
        {_id:req.params.id},
        {$set:wusersFields},
        {new:true}
        ).then(wusers => res.json(wusers));
});
// $route   GET api/wusers/delete
// @desc    删除信息接口
// @access  private
router.get("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Wuser.findByIdAndRemove(
        {_id:req.params.id}
        ).then((wuser) => {
            res.json(wuser);            
        }).catch(err => res.status(404).json('删除失败'));
});


// $route   POST api/wusers/current
// @desc    返回current
// @access  Private
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        mobile:req.user.mobile,
        openid:req.user.openid
    });
})
module.exports = router;