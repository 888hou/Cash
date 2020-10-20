<template>
    <div class="suggestion">
      <van-collapse v-model="activeNames">
        <van-collapse-item :title="'['+value.type+']'+value.name" :name="value.id" v-for="value in questionnaireList" :key="value.id">
          <div v-if="value.remark">
            <p>{{value.remark}}</p>
            <router-link :to="'/questionnaire/'+value.id">
              <van-button round block type="warning">
                开始调查
              </van-button>
            </router-link>
          </div>
        </van-collapse-item>
      </van-collapse>
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
        this.$axios.get("/api/questionnaire/list/")
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