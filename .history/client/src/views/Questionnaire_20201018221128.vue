<template>
<div class="fillContainer">
    <div>
        <el-form :inline="true" ref="add_data" :model="search_data">
            <el-form-item label="按照时间筛选">
                <el-date-picker type="datetime" v-model="search_data.startTime" size="small" placeholder="选择开始时间">
                </el-date-picker>
                --
                <el-date-picker type="datetime"  v-model="search_data.endTime" size="small" placeholder="选择结束时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" icon="search" @click="handleSearch()">筛选</el-button>
            </el-form-item>
            <el-form-item class="btnRight">
                <el-button type="primary" size="small" icon="view" v-if="user.identity == 'manager'" @click="onAddMoney()">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table_container">
        <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        max-height="450"
        border
        style="width: 100%">
            <el-table-column
                type="index"
                label="序号"
                align='center'
                width="50">
            </el-table-column>
            <el-table-column
                prop="date"
                label="创建日期"
                align='center'
                width="130"
                sortable>
                <template slot-scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.date.substring(0,10) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                align='center'
                width="120">
            </el-table-column>
            <el-table-column
                prop="name"
                label="名称"
                align='center'
                width="120">
            </el-table-column>
            <el-table-column
                prop="type"
                label="类型"
                align='center'
                width="140">
            </el-table-column>
            <el-table-column
                prop="begindate"
                label="开始日期"
                align='center'
                width="240"> 
                <template v-if="scope.row.begindate" slot-scope="scope">  
                    <span style="color:#4db3ff">问题内容： {{ scope.row.begindate.substring(0,10) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="enddate"
                label="结束日期"
                align='center'
                width="240">
                <template v-if="scope.row.enddate" slot-scope="scope">  
                    <span style="color:#00d053">反馈结果：{{ scope.row.enddate.substring(0,10) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="remark"
                label="备注"
                align='center'
                width="150">
            </el-table-column>
            <el-table-column
                prop="operation"
                align='center'
                label="操作"
                fixed="right"
                width="180"
                v-if="user.identity == 'manager'"
                >
                <template slot-scope='scope'>
                    <el-button 
                        type="warning" 
                        icon='edit' 
                        size="small"
                        @click='onEditMoney(scope.row)'
                    >反馈</el-button>
                    <el-button 
                        type="danger" 
                        icon='delete' 
                        size="small"
                        @click='onDeleteMoney(scope.row,scope.$index)'
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row>
            <el-col :span="24" >
                <div class="pagination">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="paginations.page_index"
                        :page-sizes="paginations.page_sizes"
                        :page-size="paginations.page_size"
                        :layout="paginations.layout"
                        :total="paginations.total">
                    </el-pagination>
                    
                </div>
            </el-col>
        </el-row>
        
    </div>
    <QuestionnaireDialog :dialog="dialog" :formData="formData" @update="getProfile()"></QuestionnaireDialog>
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
        onEditMoney(row){
            console.log(row)
            this.dialog = {
                show :true,
                title:"反馈信息",
                option:"edit"
            };
            this.formData = {
                name :row.name,
                status : row.stattus,
                type : row.type,
                begindate: row.begindate,
                enddate : row.enddate,
                remark: row.remark,
                id:row._id
            }
        },
        onDeleteMoney(row,index){
            console.log(row);
            this.$axios.get(`/api/questionnaire/delete/${row._id}`)
            .then(res => {
                this.$message("删除成功");
                this.getProfile();
            });
        },
        onAddMoney(){
            this.dialog = {
                show :true,
                title:"添加反馈信息",
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
</style>