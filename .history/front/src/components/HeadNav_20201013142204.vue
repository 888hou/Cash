<template>
    <header class="head-nav">
        <van-nav-bar
          :title="headinfo.title"
          left-text="返回"
          right-text="我的"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
        />
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
    props:{
      headinfo:Object,
    },
    methods:{
        showInfoList(){
            this.$router.push('/infoshow');
        },
        onClickLeft() {
          Toast('返回');
        },
        onClickRight() {
          Toast('按钮');
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
        //     localStorage.removeItem('kfToken');
        //     //设置Vuex store
        //     this.$store.dispatch('clearCurrentState');
        //     //跳转到Login
        //     this.$router.push('/login');

        // }
    }
};
</script>

<style scoped>

</style>