<template>
    <div>
        
    </div>
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