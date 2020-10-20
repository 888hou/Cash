<template>
    <div class="suggestion">
      <HeadNav :title="title"></HeadNav>
      <div class="header">
        <h2 class="title">{{infoData.name}}</h2>
        <p class="info">{{infoData.remark}}</p>
      </div>
      <van-form @submit="onSubmit">

        <div class="questions" v-for="(value, index) in questionData" :key="index">
            <p class="question">{{value.order}}、{{value.name}}<span v-if="value.remark">({{value.remark}})</span></p>
            <div class="answers" v-if="value.type == '填空题'">
                <van-field
                  class="answer"
                  v-model="answerData[value._id]"
                  :placeholder="value.remark"
                  :rules="[{ required: true, message: '请填写'}]"
                />
            </div>
            <div class="answers" v-if="value.type == '问答题'">
                <van-field
                  class="answer"
                  rows="2"
                  autosize
                  type="textarea"
                  maxlength="300"
                  show-word-limit
                  v-model="answerData[value._id]"
                  :placeholder="value.remark"
                  :rules="[{ required: true, message: '请填写'}]"
                />
            </div>
            <div class="answers" v-if="value.type == '单选题'">
              <van-field :rules="[{ required: true, message: '请选择'}]">
                <template #input>
                  <van-radio-group v-model="answerData[value._id]">
                    <van-radio class="answer" v-for="(value, index) in value.answer" :key="index" :name="value">{{value}}</van-radio>
                  </van-radio-group>
                </template>
              </van-field>
                <!-- <el-radio class="answer" v-for="(value, index) in value.answer" :key="index" label="value">{{value}}</el-radio> -->
            </div>
            <div class="answers" v-if="value.type == '多选题'">
              <van-field :rules="[{ required: true, message: '请选择'}]">
                <template #input>
                  <van-checkbox-group -group v-model="answerData[value._id]">
                    <van-checkbox class="answer" v-for="(value, index) in value.answer" :key="index" :name="value">{{value}}</van-checkbox>
                  </van-checkbox-group>
                </template>
              </van-field>
              <!-- <el-checkbox class="answer" v-for="(value, index) in value.answer" :key="index" label="value">{{value}}</el-checkbox> -->
            </div>
            <!-- <el-button class="btnAdd" type="danger" size="small" icon="view" v-if="user.identity == 'manager'" @click="onEdit(value)">修改题目</el-button> -->
        </div>
        
        <!-- <van-field
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
        /> -->
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
        answerData:{},
        formData:{
          qid:'',
          qname:'',
          uid:'',
          openid:'',
          name:'',
          mobile:'',
          questions:{},
          answers:{}
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
        //console.log('submit',this.user );
        //console.log('submit',this.answerData );
        //console.log('submit',this.questionData );
        if(this.user.id) this.formData.uid = this.user.id;
        if(this.user.name) this.formData.name = this.user.name;
        if(this.user.mobile) this.formData.mobile = this.user.mobile;
        if(this.user.openid) this.formData.openid = this.user.openid;
        if(this.infoData._id) this.formData.qid = this.infoData._id;
        if(this.infoData.name) this.formData.qname = this.infoData.name;
        if(this.questionData) this.formData.questions = this.questionData;
        if(this.answerData) this.formData.answers = this.answerData;

        console.log('submit',this.formData );
        this.$axios.post("/api/questionnaire/answer/add",this.formData)
        .then((res) => {
          console.log(res);
          //注册成功
          this.$toast.success('提交成功');
          this.answerData = {};
          //this.$route
          //this.answer.content = '';
        });
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
.header {
  margin: 15px;
}
.header > .title {
  text-align: center;
}
.header > .info {
  text-indent: 35px;
}
.questions {
  margin: 10px;
}
</style>