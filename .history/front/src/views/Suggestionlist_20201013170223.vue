<template>
    <div class="suggestion">
      <HeadNav :title="title"></HeadNav>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in allSuggestionList" :key="item" :title="item.mobile" />
      </van-list>
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
        loading: false,
        finished: false,
        suggestionList:[],
        allSuggestionList:[]
      };
    },
    computed: {
      user(){
          return this.$store.getters.user;
      }
    },
    methods: {
      onLoad() {

      },
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
      getProfile(){
        //获取表格数据
        this.$axios.get("/api/suggestion/list/"+this.user.openid)
        .then(res => {
            this.allSuggestionList = res.data;
        })
        .catch(err => console.log(err));
      },
    },
    created() {
      this.getProfile();
    },
};
</script>
<style scoped>

</style>