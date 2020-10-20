const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const dotenv = require('dotenv');


//引入 users.js
const users= require("./routes/api/users");
//引入 wusers.js
const wusers= require("./routes/api/wusers");
//引入 profiles.js
const profiles= require("./routes/api/profiles");
//引入 suggestion.js
const suggestion= require("./routes/api/suggestion");
//引入 questionnaire.js
const questionnaire= require("./routes/api/questionnaire");
//引入 question.js
const question= require("./routes/api/question");
//DB config
const db = require("./config/keys").mongoURI;
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//使用dotenv导入env
dotenv.config('./env');

//Connect to mongodb
mongoose.connect(db)
        .then(() => console.log("MongoDB Connected"))
        .catch(err => console.log(err));


//配置passport
// passport 初始化
app.use(passport.initialize());

require("./config/passport")(passport);

// app.get("/", (req ,res) => {
//     res.send("Hello World!");
// });

//使用routes 
app.use("/api/users",users);
app.use("/api/wusers",wusers);
app.use("/api/profiles",profiles);
app.use("/api/suggestion",suggestion);
app.use("/api/questionnaire",questionnaire);
app.use("/api/question",question);

const port = process.env.PROT || 6500;
//console.log(process.env);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

