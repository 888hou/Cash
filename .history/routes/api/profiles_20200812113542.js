//@login & register
const express = require("express");
const router = express.Router();
const passport = require("passport");

const Profile = require("../../models/Profile");

// $route   GET api/profiles/test
// @desc    返回请求的json数据
// @access  public
router.get("/test",(req,res)=>{
    res.json({msg:"Profile works"});
});

// $route   POST api/profiles/add
// @desc    创建信息接口
// @access  private
router.post("/add",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const profileFields = {};
    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.describe) profileFields.describe = req.body.describe;
    if(req.body.income) profileFields.income = req.body.income;
    if(req.body.expend) profileFields.expend = req.body.expend;
    if(req.body.cash) profileFields.cash = req.body.cash;
    if(req.body.remark) profileFields.remark = req.body.remark;
    new Profile(profileFields).save().then(profile => {
        res.json(profile);
    });
});

// $route   GET api/profiles
// @desc    返回请求的json数据
// @access  public
router.get("/",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile().find()
    .then(profile => {
        if(!profile){
            return res.status(404).json("没有任何内容");
        }
        res.json(profile);
    });
});


module.exports = router;