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
                <el-button type="primary" size="small" icon="view" v-if="user.identity == 'manager'" @click="onExport()">导出</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div class="table_container">
        <el-table
        id="out-table"
        v-if="tableData.length > 0"
        :data="tableData"
        max-height="450"
        border
        style="width: 100%">
            <el-table-column type="expand">
            <template Scoped slot-scope="props">
                <el-form label-position="left"  class="answeritem">
                <el-form-item v-for="(answer, index) in props.row.questions" :key="index" :label="answer.order +'、'+answer.name">
                    <!-- <p class="answer">{{ answer.order }}、{{ answer.name }}</p> -->
                    <span class="answer">{{ answer.input }}</span>
                </el-form-item>
                </el-form>
            </template>
            </el-table-column>
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
                width="250"
                sortable>
                <template slot-scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.date.substring(0,16) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="mobile"
                label="电话"
                align='center'
                width="120">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                align='center'
                width="120">
            </el-table-column>
            <el-table-column
                prop="qname"
                label="问卷"
                align='center'
                width="200">
            </el-table-column>
            <template slot-scope="rows">
                <el-table-column  v-for="(item,index) in rows.row.questions" :label="item.name" :key="index" :property="item.input"
                        width="180">
                    <template slot-scope="scope">
                        <el-input  v-model="scope.column.property" ></el-input>
                    </template>
                </el-table-column>
            </template>
            <!-- <el-table-column
                v-for="(answer, index) in questions"
                :key="index"
                :prop="'questions'+index"
                :label="answer.name"
                align='center'
                width="140">
                <template v-if="answer" slot-scope="scope">  
                    <span style="color:#4db3ff">{{ scope.answer.name +":"+ scope.answer.input }}</span>
                </template>
            </el-table-column> -->
            <!-- <el-table-column
                prop="begindate"
                label="开始日期"
                align='center'
                width="240"> 
                <template v-if="scope.row.begindate" slot-scope="scope">  
                    <span style="color:#4db3ff">{{ scope.row.begindate.substring(0,16) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="enddate"
                label="结束日期"
                align='center'
                width="240">
                <template v-if="scope.row.enddate" slot-scope="scope">  
                    <span style="color:#00d053">{{ scope.row.enddate.substring(0,16) }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="remark"
                label="备注"
                align='center'
                width="150">
            </el-table-column> -->
            
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
</div>
    
</template>

<script>
// 引入导出Excel表格依赖
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
    name: "questionnairelist",
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
                page_size: 50,//默认显示多少条
                page_sizes:[15,25,50,100], //每页显示多少条
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
            this.$axios.get("/api/questionnaire/answerlist/"+this.$route.params.id)
            .then(res => {
                //console.log(res.data);
                //开始处理数据
                var tempData = res.data;
                var returnData = [];
                tempData.forEach((item,index) => {
                    item.questions.forEach((question,qindex) => {
                        tempData[index][question.name] = question.input
                    })
                    tempData[index]['时间'] = item.date
                    tempData[index]['ID'] = item._id
                    tempData[index]['姓名'] = item.name
                    tempData[index]['电话'] = item.mobile
                    tempData[index]['表单'] = item.qname
                })
                console.log(tempData);
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
        onCount(row){
            this.$router.push('/questionnairelist/'+row._id);
        },
        onDelete(row,index){
            console.log(row);
            this.$axios.get(`/api/questionnaire/delete/${row._id}`)
            .then(res => {
                this.$message("删除成功");
                this.getProfile();
            });
        },
        //定义导出Excel表格事件
        onExport() {
            /* 从表生成工作簿对象 */
            var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
            /* 获取二进制字符串作为输出 */
            var wbout = XLSX.write(wb, {
                bookType: "xlsx",
                bookSST: true,
                type: "array"
            });
            try {
                FileSaver.saveAs(
                //Blob 对象表示一个不可变、原始数据的类文件对象。
                //Blob 表示的不一定是JavaScript原生格式的数据。
                //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
                //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
                new Blob([wbout], { type: "application/octet-stream" }),
                //设置导出文件名称
                "导出数据.xlsx"
                );
            } catch (e) {
                if (typeof console !== "undefined") console.log(e, wbout);
            }
            return wbout;
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
.answeritem {
font-size: 0;
}
.answeritem label {
width: 90px;
color: #99a9bf;
}
.answeritem .el-form-item {
margin-right: 0;
margin-bottom: 0;
width: 85%;
}
.answer {
    border : 1px solid #666;
    background-color:#ccc;
    color:rgb(0, 50, 214);
}
</style>