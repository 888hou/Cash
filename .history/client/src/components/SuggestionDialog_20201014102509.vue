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

                    <el-form-item label="解决状态:" >
                        <el-select v-model="formData.status" placeholder="处理状态">
                            <el-option
                             v-for="(status, index) in format_status_list"
                             :key="index" 
                             :label="status.label" :value="status.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop='name' label="姓名:">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>

                    <el-form-item prop='mobile'  label="电话:">
                        <el-input v-model="formData.mobile"></el-input>
                    </el-form-item>

                    <el-form-item prop='content' label="问题:">
                        <el-input v-model="formData.content"></el-input>
                    </el-form-item>

                    <el-form-item prop='remark' label="备注:">
                        <el-input v-model="formData.remark"></el-input>
                    </el-form-item>

                     <el-form-item label="反馈:">
                        <el-input type="textarea" v-model="formData.feedback"></el-input>
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
    name:"suggestiondialog",
    data(){
        return {
            
            format_status_list:[
                    {label:'等待处理',value:'等待处理'},
                    {label:'完成',value:'完成'},
                    {label:'处理中',value:'处理中'},
                    {label:'其他',value:'其他'}
                ],
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
                    this.$axios.post(`/api/profiles/${url}`,this.formData)
                    .then(res => {
                        //添加成功
                        this.$message({
                            message:"数据添加成功",
                            type:"success"
                        });
                        //隐藏Dialog
                        this.dialog.show = false;
                        //注册刷新事件
                        this.$emit("update");
                    });
                }
            })
        }
    },
}
</script>

<style scoped>

</style>