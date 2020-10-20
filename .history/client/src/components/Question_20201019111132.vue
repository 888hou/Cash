<template>
    <div class="dialog">
        <el-dialog
            :title="dialog.title"
            :visible.sync="dialog.show"
            :close-on-click-modal="false"
            :clost-on-press-escape="false"
            :modal-append-to-body="false"
        >
            <div class="form">
                <el-form 
                    ref="form" 
                    :model="formData"
                    :rules="form_rules"
                    label-width="120px" 
                    style="margin:10px;width:auto;">

                    <el-form-item label="状态:" >
                        <el-select v-model="formData.status" placeholder="状态">
                            <el-option
                             v-for="(status, index) in format_status_list"
                             :key="index" 
                             :label="status" :value="status"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop='name' label="名称:">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>

                    <el-form-item prop='mobile'  label="类型:">
                        <el-select v-model="formData.type" placeholder="状态">
                            <el-option
                             v-for="(type, index) in format_type_list"
                             :key="index" 
                             :label="type" :value="type"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop='begindate' label="开始日期:">
                        <el-date-picker type="datetime" v-model="formData.begindate"></el-date-picker>
                    </el-form-item>

                    <el-form-item prop='enddate' label="结束日期:">
                        <el-date-picker type="datetime" v-model="formData.enddate"></el-date-picker>
                    </el-form-item>

                     <el-form-item label="备注:">
                        <el-input v-model="formData.remark"></el-input>
                    </el-form-item>

                    <el-form-item  class="text_right">
                        <el-button @click="dialog.show = false">取 消</el-button>
                        <el-button type="primary" @click='onSubmit("form")'>提  交</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </el-dialog>
        
    </div>
</template>

<script>
export default {
    name:"questionnairedialog",
    data(){
        return {
            
            format_status_list:['创建','编辑','发布','结束'],
            format_type_list:['调查问卷','门诊满意度调查','住院满意度调查','员工满意度调查'],
            form_rules:{
                describe: [
                { required: true, message: "收支描述不能为空！", trigger: "blur" }
                ],
                income: [
                { required: true, message: "收入不能为空！", trigger: "blur" }
                ],
                expend: [
                { required: true, message: "支出不能为空！", trigger: "blur" }
                ],
                cash: [{ required: true, message: "账户现金不能为空！", trigger: "blur" }]
            }
        }
    },
    props:{
        dialog:Object,
        formData:Object
    },
    methods: {
        onSubmit(form){
            this.$refs[form].validate(valid =>{
                if(valid){
                    const url = this.dialog.option == "add" ? 'add' : `edit/${this.formData.id}`;
                    this.$axios.post(`/api/question/${url}`,this.formData)
                    .then(res => {
                        //添加成功
                        this.$message({
                            message:"数据添加成功",
                            type:"success"
                        });
                        //隐藏Dialog
                        this.dialog.show = false;
                        //注册刷新事件
                        this.$emit("updateQuestion");
                    });
                }
            })
        }
    },
}
</script>

<style scoped>

</style>