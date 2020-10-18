<template>
    <header class="head-nav">
        
    </header>
</template>

<script>
export default {
    name: "head-nav",
    computed:{
        user() {
            return this.$store.getters.user;
        }
    },
    methods:{
        showInfoList(){
            this.$router.push('/infoshow');
        },
        // setDialogInfo(cmdItem){
        //     //console.log(cmdItem);
        //     switch(cmdItem){
        //         case "info": 
        //             this.showInfoList();
        //             break;
        //         case "logout": 
        //             this.logout();
        //             break;
        //         default: 
        //             break;
        //     }
        // },

        // logout(){
        //     //清除Token
        //     localStorage.removeItem('eleToken');
        //     //设置Vuex store
        //     this.$store.dispatch('clearCurrentState');
        //     //跳转到Login
        //     this.$router.push('/login');

        // }
    }
};
</script>

<style scoped>
.head-nav {
    width: 100%;
    height: 60px;
    min-width: 600px;
    padding:5px;
    background:#324057;
    color:#fff;
    border-bottom: 1px solid #1f2d3d;
}
</style>