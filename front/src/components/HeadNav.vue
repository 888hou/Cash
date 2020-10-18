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
        onClickRight() {
          this.$router.push('/infoshow');
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