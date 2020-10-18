<template>
    <header class="head-nav">
        <van-nav-bar
          :title="title"
          :left-text="left_text"
          :right-text="right_text"
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
        headinfo:{
          title:'客户服务中心',
          left_text:'返回',
          right_text:'我的'
        },
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