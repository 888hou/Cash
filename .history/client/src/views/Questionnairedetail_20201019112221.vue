<template>
    <div class="container">
        <el-button class="btnAdd" type="primary" size="small" icon="view" v-if="user.identity == 'manager'" @click="onAdd()">添加题目</el-button>
        <h1 class="title">{{infoData.name}}</h1>
        <p class="lead">{{infoData.remark}}</p>
        <div class="questions">

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
                name:"",
                mobile:"",
                content:"",
                feedback:"",
                remark:"",
                status:"",
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
            this.questionnaireid = this.$route.params.id;
            this.$axios.get("/api/questionnaire/"+this.questionnaireid)
            .then(res => {
                //console.log(res.data);
                this.infoData = res.data; 
            })
            this.$axios.get("/api/question/"+this.questionnaireid)
            .then(res => {
                //console.log(res.data);
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
                name :row.name,
                status : row.status,
                type : row.type,
                begindate: row.begindate,
                enddate : row.enddate,
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
                name :"",
                status : "",
                type : "",
                begindate: "",
                enddate : "",
                remark: "",
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
</style>