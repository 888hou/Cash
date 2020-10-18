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

                    <el-form-item prop='name' label="姓名:">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>

                    <el-form-item prop='mobile'  label="电话:">
                        <el-input v-model="formData.mobile"></el-input>
                    </el-form-item>

                    <el-form-item prop='openid' label="微信ID:">
                        <el-input v-model="formData.openid"></el-input>
                    </el-form-item>

                    <el-form-item prop='remark' label="备注:">
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
    name:"suggestiondialog",
    data(){
        return {
            
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
                    this.$axios.post(`/api/wusers/${url}`,this.formData)
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