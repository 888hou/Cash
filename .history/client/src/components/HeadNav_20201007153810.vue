<template>
    <header class="head-nav">
        <el-row>
            <el-col :span="6" class="logo-container">
                <img src="../assets/logo.png" class="logo">
                <span class="title">在线后台管理系统</span>
            </el-col>
            <el-col :span="6" class="user">
                <div class="userinfo">
                    <img src="user.avatar" class="avatar" alt="">
                    <div class="welcome">
                        <p class="name comename">欢迎</p>
                        <p class="name avatarname">HouAng</p>
                    </div>
                    <span class="username">
                        <!-- 下拉箭头 -->
                    </span>
                </div>
            </el-col>
        </el-row>
    </header>
</template>

<script>
export default {
    name: "head-nav"
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