<template>
    <el-row class="menu_page">
        <el-col>
            <el-menu
            class="el-menu-vertical-demo"
            background-color="#324057"
            text-color="#fff"
            active-text-color="#4091ff">
            <router-link to="/home">
                <el-menu-item index="0">
                    <i class="fa fa-margin fa-server"></i>
                    <span slot="title">首页</span>
                </el-menu-item>
            </router-link>
            <el-submenu index="1">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
                </template>
                <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
            </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>
<script>
export default {
    name: "left-menu",
}
</script>

<style scoped>

</style>