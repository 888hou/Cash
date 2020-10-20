<template>
    <div class="home">
      <van-nav-bar
              title="移动客服"
            />
      <van-grid clickable :column-num="3">
        <van-grid-item icon="info" text="投诉建议" to="/suggestion" />
        <van-grid-item icon="search" text="历史投诉" url="/suggestionlist" />
        <van-grid-item icon="question" text="调查问卷" url="/questionnaire" />
        <!-- <van-grid-item icon="chat" text="客服对话" url="http://chat.mp.qhdfy.com.cn/index/index/wechat/business_id/1/groupid/0.html" /> -->
      </van-grid>
    </div>
</template>

<style scoped>
.home {
  width: 100%;
  height: 100%;
}
.container {

  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
</style>