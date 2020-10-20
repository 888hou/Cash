const dotenv = require('dotenv');
//使用dotenv导入env
dotenv.config('./env');

module.exports = {
    port : process.env.port,
    kefuMobile: process.env.kefuMobile
}