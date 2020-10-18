<template>
    <div class="login">
        <section class="form_container">
            <van-nav-bar
              title="客户服务中心-用户登录"
            />
            <van-form @submit="onSubmit">
              <van-field
                v-model="loginUser.mobile"
                name="手机号"
                label="电话"
                placeholder="填写电话号码"
                :rules="[{ required: true, message: '请填写手机号' }]"
              />
              <van-field
                v-model="loginUser.name"
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
          name: '',
          openid: '',
          mobile: ''
        }
      }
    },
    methods: {
      onSubmit(values) {
        console.log('submit', values);
        this.$axios.post("/api/users/login",this.loginUser)
        .then((res) => {
          const {token} = res.data;
          localStorage.setItem("kfToken",token);
          //解析token
          const decoded = jwt_decode(token);
          this.$store.dispatch("setAuthenticated",!this.isEmpty(decoded));
          this.$store.dispatch("setUser",decoded);
          this.$router.push('/index');
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
    created(){
      console.log(this.$route.params.openid); 
      if(!this.isEmpty(this.$route.params.openid)){
        console.log(this.$route.params.openid); 
        this.loginUser.openid = this.$route.params.openid;
        this.$axios.get("/api/wusers/login/"+this.loginUser.openid)
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
          if(!this.isEmpty(this.$route.params.route)){
            this.$router.push("/"+this.$route.params.route);
          }else{
            this.$router.push("/index");
          }
        });
      }
    }
};
</script>
<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>