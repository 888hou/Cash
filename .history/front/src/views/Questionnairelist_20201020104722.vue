<template>
    <div class="suggestion">
      <van-collapse v-model="activeNames">
        <van-collapse-item :title="value.date.substring(0,10)+'['+value.type+']'" :name="value.id" v-for="value in questionnaireList" :key="value.id">
          <div>
            <p>问题：</p>
            {{value.name}}
          </div>
          <div v-if="value.remark">
            <p>反馈：</p>
            <p>{{value.remark}}</p>
            <!-- <van-rate v-model="value.rate" /> -->
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
    name: "questionnairelist",
    components: {
        HeadNav
    },
    data() {
      return {
        title:"问卷列表",
        loading: false,
        finished: true,
        questionnaireList:[],
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
      getProfile(){
        //获取数据
        this.$axios.get("/api/suggestion/list/")
        .then(res => {
            this.questionnaireList = res.data;
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