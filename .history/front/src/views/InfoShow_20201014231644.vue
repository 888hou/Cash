<template>
    <div class="infoshow">
        <section class="form_container">
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
        title:"我的信息",
        loginUser:{
          name: '',
          mobile: ''
        }
      }
    },
    methods:{
      onSubmit(values) {
        console.log('submit', values);
        this.$axios.post("/api/wusers/edit/"+this.user.id,this.loginUser)
        .then((res) => {
          console.log(res);
          if(res){
            this.$router.push("/login/"+this.user.openid);
            this.$toast.success('修改成功');
          }else{
            this.$toast.fail('修改失败');
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
    created(){
      this.loginUser.name = this.user.name;
      this.loginUser.mobile = this.user.mobile;
    }
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