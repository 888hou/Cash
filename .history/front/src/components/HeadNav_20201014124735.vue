<template>
    <header class="head-nav">
        <van-nav-bar
          :title="title"
          left-text=""
          right-text=""
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
          console.log("正在开发");
          //this.$toast('正在开发');
        },
        onClickLeft() {
          this.$router.go(-1);
        }
    }
};
</script>

<style scoped>

</style>