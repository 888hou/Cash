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
        finished: true,
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