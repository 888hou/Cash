<template>
    <div class="dialog">
        <el-dialog
            title="添加资金信息"
            :visible.sync="dialog.show"
            :close-on-click-modal="false"
            :clost-on-press-escape="false"
            :modal-append-to-body="false"
        >
            
            <span slot="footer">
                <el-button>取 消</el-button>
                <el-button type="primary">确 定</el-button>
            </span>
        </el-dialog>
        
    </div>
</template>

<script>
export default {
    name:"dialog",
    data(){
        return {
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
    props:{
        dialog:Object
    }
}
</script>

<style scoped>

</style>