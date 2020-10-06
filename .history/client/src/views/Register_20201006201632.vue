<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">在线后台管理系统</span>
                <el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="80px" class="registerForm">
                  <el-form-item label="用户名" prop="name">
                    <el-input v-model="registerUser.name"  placeholder="请输入用户名" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="registerUser.email"  placeholder="请输入电子邮件地址" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="registerUser.password" placeholder="请输入密码" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="password2">
                    <el-input type="password" v-model="registerUser.password2" placeholder="请再次输入密码" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="选择身份" prop="identity">
                    <el-select v-model="registerUser.identity" placeholder="请选择身份" autocomplete="off">
                      <el-option label="管理员" value="manager"> </el-option>
                      <el-option label="员工" value="employee"> </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button @click="submitForm('ruleForm')">注册</el-button>
                  </el-form-item>
                </el-form>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: "register",
    compoments: []
};
</script>
<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
</style>