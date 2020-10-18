<template>
    <div class="login">
        <section class="form_container">
            <van-nav-bar
              title="客户服务中心-用户登录"
            />
            <van-form @submit="onSubmit">
              <van-field
                v-model="username"
                name="手机号"
                label="电话"
                placeholder="填写电话号码"
                :rules="[{ required: true, message: '请填写手机号' }]"
              />
              <van-field
                v-model="realname"
                name="姓名"
                label="姓名"
                placeholder="填写真实姓名"
                :rules="[{ required: true, message: '请填写真实姓名' }]"
              />
              <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                  授权登录
                </van-button>
              </div>
            </van-form>
        </section>
    </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
export default {
    name: "Login",
    components: {},
    data(){
      return {
        loginUser:{
          username: '',
          realname: ''
        }
      }
    },
    methods: {
      onSubmit(values) {
        console.log('submit', values);
        this.$axios.post("/api/users/wlogin",this.loginUser)
        .then((res) => {
          //console.log(res);
          const {token} = res.data;
          localStorage.setItem("kfToken",token);
          //解析token
          const decoded = jwt_decode(token);
          //console.log(decoded);
          //token 存储到vuex
          this.$store.dispatch("setAuthenticated",!this.isEmpty(decoded));
          this.$store.dispatch("setUser",decoded);
          this.$router.push('/index');
          //注册成功
          // this.$message({
          //   message:"登录成功",
          //   type:'success'
          // });
        });
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) =>{
          if(valid) {
            
            
          }else{
            console.log('valid false');
            return false;
          }
        });
      },
      isEmpty(value) {
        return (
          value === undefined || 
          value === null ||
          (typeof value === "object" && Object.keys(value).length === 0) ||
          (typeof value === "string" && value.trim().length === 0)
        );
      }
    },
};
</script>
<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>