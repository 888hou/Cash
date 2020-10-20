<template>
    <div class="suggestion">
      <HeadNav :title="title"></HeadNav>
      <van-form @submit="onSubmit">
        <div class="questions" v-for="(value, index) in questionData" :key="index">
            <p>{{value.order}}、{{value.name}}<span v-if="value.remark">({{value.remark}})</span></p>
            <div class="answers" v-if="value.type == '填空题'">
                <van-field
                  v-model="answerData[value.id]"
                  :placeholder="value.remark"
                  :rules="[{ required: true}]"
                />
            </div>
            <div class="answers" v-if="value.type == '问答题'">
                <van-field
                  rows="2"
                  autosize
                  type="textarea"
                  maxlength="300"
                  show-word-limit
                  v-model="answerData[value.id]"
                  :placeholder="value.remark"
                  :rules="[{ required: true}]"
                />
            </div>
            <div class="answers" v-if="value.type == '单选题'">
                <el-radio class="answer" v-for="(value, index) in value.answer" :key="index" label="value">{{value}}</el-radio>
            </div>
            <div class="answers" v-if="value.type == '多选题'">
                <el-checkbox class="answer" v-for="(value, index) in value.answer" :key="index" label="value">{{value}}</el-checkbox>
            </div>
            <el-button class="btnAdd" type="danger" size="small" icon="view" v-if="user.identity == 'manager'" @click="onEdit(value)">修改题目</el-button>
        </div>
        
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
            提交
          </van-button>
        </div>
      </van-form>
    </div>
</template>

<script>
import HeadNav from '../components/HeadNav';
export default {
    name: "Questionnaire",
    components: {
        HeadNav
    },
    data() {
      return {
        title:"问卷填写",
        infoData:{},
        questionData:{},
        answerData:[],
        formData:{
          qid:''
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
        console.log('submit',this.formData );
        // this.suggestion.openid = this.user.openid;
        // this.$axios.post("/api/suggestion/add",this.suggestion)
        // .then((res) => {
        //   console.log(res);
        //   //注册成功
        //   this.$toast.success('反馈成功');
        //   this.suggestion.content = '';
        // });
      },
      getProfile(){
        //获取数据
        this.formData.qid = this.$route.params.id;
        this.$axios.get("/api/questionnaire/"+this.formData.qid)
        .then(res => {
            //console.log(res.data);
            this.infoData = res.data; 
        })
        .catch(err => console.log(err));
        this.$axios.get("/api/question/"+this.formData.qid)
        .then(res => {
            console.log(res.data);
            this.questionData = res.data; 
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