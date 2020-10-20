const dotenv = require('dotenv');
//使用dotenv导入env
dotenv.config('./env.local');

module.exports = {
    mongoURI : process.env.mongoURI,
    secretOrKey: process.env.secretOrKey,
    kefuMobile: process.env.kefuMobile,
}