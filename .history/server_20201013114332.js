const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

//引入 users.js
const users= require("./routes/api/users");
//引入 wusers.js
const wusers= require("./routes/api/wusers");
//引入 profiles.js
const profiles= require("./routes/api/profiles");
//引入 suggestion.js
const suggestion= require("./routes/api/suggestion");

//DB config
const db = require("./config/keys").mongoURI;
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


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

const port = process.env.PROT || 5000;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

