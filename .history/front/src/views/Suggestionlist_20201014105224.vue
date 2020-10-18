<template>
    <div class="suggestion">
      <HeadNav :title="title"></HeadNav>
      <van-collapse v-model="activeNames">
        <van-collapse-item :title="value.date.substring(0,10)+'['+value.status+']'" :name="value.id" v-for="value in suggestionList" :key="value.id">
          <div>
            <p>问题：</p>
            {{value.content}}
          </div>
          <div v-if="value.feedback">
            <p>反馈：</p>
            <p>{{value.feedback}}</p>
            <van-rate v-model="value.rate" />
          </div>
          
        </van-collapse-item>
      </van-collapse>
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
        allSuggestionList:[],
        activeNames:[],
        rate_value:5
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
            this.suggestionList = res.data;
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