<template>
    <div class="infoshow">
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
                  修改信息
                </van-button>
              </div>
            </van-form>
        </section>
    </div>
</template>

<script>
export default {
    name: "infoshow",
    computed:{
        user(){
            return this.$store.getters.user;
        }
    },
    data(){
      return {
        loginUser:{
          name: '',
          openid: '',
          mobile: ''
        }
      }
    },
    
};
</script> 
<style scoped>
.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* padding: 16px; */
}
</style>