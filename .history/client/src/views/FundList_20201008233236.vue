<template>
<div class="fillContainer">
    <div>
        <el-form :inline="true" ref="add_data">
            <el-form-item label="按照事件筛选">
                <el-date-picker type="datetime" size="normal" placeholder="选择开始时间">
                </el-date-picker>
                -
                <el-date-picker type="datetime" size="normal" placeholder="选择结束时间">
                </el-date-picker>
            </el-form-item>
            
            <el-form-item class="btnRight">
                <el-button type="primary" size="small" icon="view" @click="onAddMoney()">添加</el-button>
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
                width="70">
            </el-table-column>
            <el-table-column
                prop="date"
                label="创建时间"
                align='center'
                width="250"
                sortable>
                <template slot-scope="scope">
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="type"
                label="收支类型"
                align='center'
                width="150">
            </el-table-column>
            <el-table-column
                prop="describe"
                label="收支描述"
                align='center'
                width="180">
            </el-table-column>
            <el-table-column
                prop="income"
                label="收入"
                align='center'
                width="170"> 
                <template slot-scope="scope">  
                    <span style="color:#00d053">+ {{ scope.row.income }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="expend"
                label="支出"
                align='center'
                width="170">
                <template slot-scope="scope">  
                    <span style="color:#f56767">- {{ scope.row.expend }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="cash"
                label="账户现金"
                align='center'
                width="170">
                <template slot-scope="scope">  
                    <span style="color:#4db3ff">{{ scope.row.cash }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="remark"
                label="备注"
                align='center'
                width="220">
            </el-table-column>
            <el-table-column
                prop="operation"
                align='center'
                label="操作"
                fixed="right"
                width="180">
                <template slot-scope='scope'>
                    <el-button 
                        type="warning" 
                        icon='edit' 
                        size="small"
                        @click='onEditMoney(scope.row)'
                    >编辑</el-button>
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
    <Dialog :dialog="dialog" :formData="formData" @update="getProfile()"></Dialog>
</div>
    
</template>

<script>
import Dialog from '../components/Dialog'
export default {
    name: "fundList",
    components : {Dialog},
    data(){
        return {
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
                type:"",
                describe:"",
                income:"",
                expend:"",
                cash:"",
                remark:"",
                id:""
            }
        }
    },
    created() {
        this.getProfile();

    },
    methods:{
        getProfile(){
            //获取表格数据
            this.$axios.get("/api/profiles")
            .then(res => {
                //console.log(res.data);
                this.allTableData = res.data;
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
                title:"修改资金信息",
                option:"edit"
            };
            this.formData = {
                type : row.type,
                describe :row.describe,
                income : row.income,
                expend: row.expend,
                cash : row.cash,
                remark: row.remark,
                id:row._id
            }
        },
        onDeleteMoney(row,index){
            console.log(row);
            this.$axios.get(`/api/profiles/delete/${row._id}`)
            .then(res => {
                this.$message("删除成功");
                this.getProfile();
            });
        },
        onAddMoney(){
            this.dialog = {
                show :true,
                title:"添加资金信息",
                option:"add"
            };
            this.formData = {
                type : "",
                describe :"",
                income : "",
                expend: "",
                cash : "",
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