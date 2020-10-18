<template>
    <div class="suggestion">
      <HeadNav :title="title"></HeadNav>
      <van-form @submit="onSubmit">
        <van-field
          v-model="suggestion.realname"
          name="姓名"
          label="姓名"
          placeholder="姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <van-field
          v-model="suggestion.mobile"
          type="mobile"
          name="电话"
          label="电话"
          placeholder="电话号码"
          :rules="[{ required: true, message: '请填写电话号码' }]"
        />
        <van-field
          v-model="suggestion.content"
          rows="2"
          autosize
          label="留言"
          type="textarea"
          maxlength="300"
          placeholder="请输入问题描述"
          show-word-limit
          :rules="[{ required: true, message: '请输入问题描述' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            提交反馈
          </van-button>
        </div>
      </van-form>
    </div>
</template>

<script>
import HeadNav from '../components/HeadNav';
export default {
    name: "suggestion",
    components: {
        HeadNav
    },
    data() {
      return {
        title:"投诉建议",
        suggestion:{
          openid:'',
          realname:'',
          mobile:'',
          content:''
        }
      };
    },
    methods: {
      onSubmit(values) {
        console.log('submit',this.suggestion );
        this.$axios.post("/api/suggestion/add",this.suggestion)
            .then((res) => {
              console.log(res);
              let openid= this.$router.params.openid
              console.log(openid);
              console.log(this.$router);
              //注册成功
              this.$toast.success('反馈成功');
              this.suggestion.realname = '';
              this.suggestion.mobile = '';
              this.suggestion.content = '';
            });
      },
      onClickLeft() {
        
        this.$router.go(-1);
        console.log('return click');
      }
    },
    created() {
      // console.log(this.$route.params);
      // this.suggestion.openid = this.$route.params.openid;
    },

};
</script>
<style scoped>

</style>