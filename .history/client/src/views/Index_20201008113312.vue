<template>

    <div class="index">
        <HeadNav></HeadNav>
        <router-view></router-view>
        Index
    </div>
</template>

<script>
import HeadNav from '../components/HeadNav';
export default {
    name: "index",
    components: {HeadNav}
};
</script> 