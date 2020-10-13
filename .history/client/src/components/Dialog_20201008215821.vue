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
            },
            format_type_list:["提现","提现手续费","充值","优惠卷","充值礼卷","转账"]
        }
    },
    props:{
        dialog:Object
    }
}
</script>

<style scoped>

</style>