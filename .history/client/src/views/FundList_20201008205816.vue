<template>
    <div>
        
    </div>
</template>

<script>
export default {
    name: "fundList",
    data(){
        return tableData:[]
    },
    created() {
        this.getProfile();

    },
    methods:{
        getProfile(){
            //获取表格数据
            this.$axios.get("/api/profile")
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
        }
    }
}
</script>

<style scoped>

</style>