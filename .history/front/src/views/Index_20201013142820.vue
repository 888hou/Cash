<template>
    <div class="index">
        <HeadNav :headinfo="headinfo"></HeadNav>
        <div class="body-container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import HeadNav from '../components/HeadNav';
export default {
    name: "index",
    components: {
        HeadNav
    },
    data(){
        return {
            headinfo:{
                title:"客户服务中心"
            }
        }
    }
};
</script>

<style scoped>
.index {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>