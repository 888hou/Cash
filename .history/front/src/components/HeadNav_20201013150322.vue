<template>
    <header class="head-nav">
        <van-nav-bar
          :title="title"
          left-text=""
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
      lefttext:String,
      righttext:String,
      title:String,
      leftFunction:Function,
      rightFunction:Function
    },
    methods:{
        showInfoList(){
            this.$router.push('/infoshow');
        },
        onClickRight() {
          this.$toast('正在开发');
        },
        onClickLeft() {
          this.$router.go(-1);
        }
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