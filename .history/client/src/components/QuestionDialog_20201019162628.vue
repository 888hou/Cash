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

                    <el-form-item prop='qid' label="问卷ID:">
                        <el-input readonly v-model="formData.qid"></el-input>
                    </el-form-item>
                    <el-form-item prop='order' label="题号:">
                        <el-input v-model="formData.order"></el-input>
                    </el-form-item>
                    <el-form-item prop='name' label="题干:">
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
                    <el-form-item v-for="(value, index) in format_answer_empty_list" :key="index" prop='answer' label="答案:">
                        <el-input v-model="formData.answer[index]"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="提示:">
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
    name:"questiondialog",
    data(){
        return {
            selected_type:'填空题',
            format_type_list:['单项选择题','多项选择题','填空题','问答题'],
            format_answer_empty_list:['','','',''],
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