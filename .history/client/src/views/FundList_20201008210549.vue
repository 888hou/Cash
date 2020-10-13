<template>
    <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="日期"
      width="180">
      <!-- <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template> -->
    </el-table-column>
    </el-table>
</template>

<script>
export default {
    name: "fundList",
    data(){
        return {
            tableData:[]
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
                this.tableData = res.data;
            })
            .catch(err => console.log(err));
        }
    }
}
</script>

<style scoped>

</style>