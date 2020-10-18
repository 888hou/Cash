<template>
    <div class="index">
        <HeadNav></HeadNav>
        <div class="rightContainer">
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