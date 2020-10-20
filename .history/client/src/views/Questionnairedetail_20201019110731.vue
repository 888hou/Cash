<template>
<div class="fillContainer">
    <el-button type="primary" size="small" icon="view" v-if="user.identity == 'manager'" @click="onAdd()">添加题目</el-button>
    <div class="container">
        <h1 class="title">在线管理系统</h1>
        <p class="lead">专注管理</p>
        <div class="questions">

        </div>
    </div>
    <el-button type="primary" size="small" icon="view" v-if="user.identity == 'manager'" @click="onAdd()">添加题目</el-button>
    <QuestionnaireDialog :dialog="dialog" :formData="formData" @updateQuestionnaire="getProfile()"></QuestionnaireDialog>
</div>
    
</template>

<script>
import QuestionnaireDialog from '../components/QuestionnaireDialog'
export default {
    name: "fundList",
    components : {QuestionnaireDialog},
    data(){
        return {
            search_data:{
                startTime:'',
                endTime:''
            },
            filterTableData:[],
            paginations:{
                page_index: 1,//当前页
                total:0,//总数
                page_size: 5,//默认显示多少条
                page_sizes:[5,10,15,20], //每页显示多少条
                layout:"total,sizes,prev,pager,next,jumper" //翻页属性

            },
            tableData:[],
            allTableData:[],
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
            this.$axios.get("/api/questionnaire")
            .then(res => {
                //console.log(res.data);
                this.allTableData = res.data;
                this.filterTableData = res.data;
                //设置分页数据
                this.setPaginations();
                
            })
            .catch(err => console.log(err));
        },
        setPaginations(){
            //分页属性设置
            this.paginations.total = this.allTableData.length;
            //设置页数
            this.paginations.page_index = 1;
            this.paginations.page_size = 5;
            //设置默认分页数据
            this.tableData = this.allTableData.filter((item,index)=>{
                return index < this.paginations.page_size;
            })
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
        onDetail(row){
            this.$router.push('/questionnairedetail/'+row._id);
        },
        onDelete(row,index){
            console.log(row);
            this.$axios.get(`/api/questionnaire/delete/${row._id}`)
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
        },
        handleSizeChange(page_size){
            //切换size
            this.paginations.page_index = 1;
            this.paginations.page_size = page_size;
            //设置默认分页数据
            this.tableData = this.allTableData.filter((item,index)=>{
                return index < this.paginations.page_size;
            })

        },
        handleCurrentChange(page){
            //获取当前页
            let index = this.paginations.page_size * (page - 1);
            //获取总数
            let nums = this.paginations.page_size * page;
            //容器
            let tables = [];
            for(let i = index ;i< nums ;i++){
                if(this.allTableData[i]){
                    tables.push(this.allTableData[i]);
                }
                this.tableData = tables;
            }
        },
        handleSearch(){
            //筛选
            if(!this.search_data.startTime || !this.search_data.endTime ){
                this.$message({
                    type:"warning",
                    message:"请选择开始结束时间"
                });
                this.getProfile();
                return;
            }
            const sTime = this.search_data.startTime.getTime();
            const eTime = this.search_data.endTime.getTime();

            this.allTableData = this.filterTableData.filter(item => {
                let date = new Date(item.date);
                let time = date.getTime();
                return time >= sTime && time <= eTime;
            });
            //分页数据
            this.setPaginations();
        }


    }
}
</script>

<style scoped>
.fillContainer {
    width:100%;
    height: 100%;
    padding:16px;
    box-sizing: border-box;
}
.btnRight {
    float:right;
}
.pagination {
    text-align: right;
    margin-top: 10px;
}
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-top: 100px;
  background-color: rgba(0, 0, 0, 0.7);
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