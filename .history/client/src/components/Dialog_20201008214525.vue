<template>
    <div class="dialog">
        <el-dialog
            title="添加资金信息"
            :visible="true"
            :close-on-click-modal="false"
            width="30%"
            @close="">
            
            <span slot="footer">
                <el-button @click=" = false">取 消</el-button>
                <el-button type="primary" @click="">确 定</el-button>
            </span>
        </el-dialog>
        
    </div>
</template>

<script>
export default {
    name:"dialog"
}
</script>

<style scoped>

</style>