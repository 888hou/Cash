<template>
    <div class="suggestion">
      <HeadNav :title="title"></HeadNav>
      <van-form @submit="onSubmit">
        <van-field
          type="hidden"
          v-model="suggestion.id"
        />
        <van-field
          v-model="suggestion.name"
          name="姓名"
          label="姓名"
          readonly
        />
        <van-field
          v-model="suggestion.mobile"
          type="mobile"
          name="电话"
          label="电话"
          readonly
        />
        <van-field
          v-model="suggestion.content"
          rows="1"
          autosize
          label="留言"
          type="textarea"
          readonly
        />
        <van-field
          v-model="suggestion.remark"
          rows="2"
          autosize
          label="评价反馈"
          type="textarea"
          maxlength="300"
          placeholder="请对此次服务进行评价"
          show-word-limit
          :rules="[{ required: true, message: '请对此次服务进行评价' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            评价反馈
          </van-button>
        </div>
      </van-form>
      <div style="margin: 16px;">
        <router-link to="/suggestion">
          <van-button round block type="warning">
            新建
          </van-button>
        </router-link>
      </div>
    </div>
</template>

<script>
import HeadNav from '../components/HeadNav';
export default {
    name: "suggestionlist",
    components: {
        HeadNav
    },
    data() {
      return {
        title:"历史投诉",
        suggestion:[]
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