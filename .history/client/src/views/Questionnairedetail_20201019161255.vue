<template>
    <div class="container">
        <el-button class="btnAdd" type="primary" size="small" icon="view" v-if="user.identity == 'manager'" @click="onAdd()">添加题目</el-button>
        <h1 class="title">{{infoData.name}}</h1>
        <p class="lead">{{infoData.remark}}</p>

        <div class="questions" v-for="(value, index) in questionData" :key="index">
            {{value.order}}、{{value.name}}
            <br>
            <el-button class="btnAdd" type="danger" size="small" icon="view" v-if="user.identity == 'manager'" @click="onEdit(value)">修改题目</el-button>
        </div>

        <el-button class="btnAdd" type="primary" size="small" icon="view" v-if="user.identity == 'manager'" @click="onAdd()">添加题目</el-button>
        <QuestionDialog :dialog="dialog" :formData="formData" @updateQuestion="getProfile()"></QuestionDialog>
    </div>
</template>

<script>
import QuestionDialog from '../components/QuestionDialog'
export default {
    name: "questionDialog",
    components : {QuestionDialog},
    data(){
        return {
            questionnaireid : '',
            infoData:{},
            questionData:[],
            dialog:{
                show:false,
                title:"",
                option:"edit"
            },
            formData:{
                qid:"",
                order:"",
                name:"",
                type:"",
                answer:"",
                remark:"",
                id:""
            }
        }
    },
    computed: {
        user(){
            return this.$store.getters.user;
        }
    },
    created() {
        this.getProfile();
    },
    methods:{
        getProfile(){
            //获取表格数据
            this.formData.qid = this.$route.params.id;
            this.$axios.get("/api/questionnaire/"+this.formData.qid)
            .then(res => {
                //console.log(res.data);
                this.infoData = res.data; 
            })
            this.$axios.get("/api/question/"+this.formData.qid)
            .then(res => {
                console.log(res.data);
                this.questionData = res.data; 
            })
            .catch(err => console.log(err));
        },
        onEdit(row){
            console.log(row)
            this.dialog = {
                show :true,
                title:"编辑",
                option:"edit"
            };
            this.formData = {
                qid:row.qid,
                order:row.order,
                name :row.name,
                type : row.type,
                answer:row.answer,
                remark: row.remark,
                id:row._id
            }
        },
        onDelete(id){
            this.$axios.get(`/api/question/delete/${id}`)
            .then(res => {
                this.$message("删除成功");
                this.getProfile();
            });
        },
        onAdd(){
            this.dialog = {
                show :true,
                title:"添加",
                option:"add"
            };
            this.formData = {
                qid:this.$route.params.id,
                order:"",
                name:"",
                type:"",
                answer:"",
                remark:"",
                id:""
            }
        }
    }
}
</script>

<style scoped>

.btnAdd {
    margin:20px 0 20px 0;
}
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  text-align: center;
}
.title {
  font-size: 30px;
}
.lead {
  margin-top: 50px;
  font-size: 22px;
}
.questions {
  width:85%;
  text-align: left;
  margin-left: 25px;
  margin-top: 15px;
}
</style>