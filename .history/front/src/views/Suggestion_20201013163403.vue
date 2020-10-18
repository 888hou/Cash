<template>
    <div class="suggestion">
      <HeadNav :title="title"></HeadNav>
      <van-form @submit="onSubmit">
        <van-field
          v-model="suggestion.name"
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
      <div style="margin: 16px;">
        <router-link>
          <van-button round block type="warning">
            反馈历史
          </van-button>
        </router-link>
      </div>
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
          name:'',
          mobile:'',
          content:''
        }
      };
    },
    computed: {
      user(){
          return this.$store.getters.user;
      }
    },
    methods: {
      onSubmit(values) {
        console.log('submit',this.suggestion );
        this.suggestion.openid = this.user.openid;
        this.$axios.post("/api/suggestion/add",this.suggestion)
        .then((res) => {
          console.log(res);
          //注册成功
          this.$toast.success('反馈成功');
          this.suggestion.content = '';
        });
      },
    },
    created() {
      // console.log(this.$route.params);
      if(this.user.openid) this.suggestion.openid = this.user.openid;
      if(this.user.name) this.suggestion.name = this.user.name;
      if(this.user.mobile) this.suggestion.mobile = this.user.mobile;
    },
};
</script>
<style scoped>

</style>