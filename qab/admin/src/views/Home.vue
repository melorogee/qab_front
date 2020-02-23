<template>
    <div class="home">
        <div class="todo">
            <div class="todo__item">
                <h3>代办事项<span class="todo__badge">150</span></h3>
                <div class="todo__lists">
                    <div class="todo__lists__item">
                        <strong class="todo__lists__item--number">123456789</strong>
                        <em class="todo__lists__item--name">待开票</em>
                    </div>
                    <div class="todo__lists__item">
                        <strong class="todo__lists__item--number">123456789</strong>
                        <em class="todo__lists__item--name">待审核企业</em>
                    </div>
                    <div class="todo__lists__item">
                        <strong class="todo__lists__item--number">123456789</strong>
                        <em class="todo__lists__item--name">待审核专家</em>
                    </div>
                    <div class="todo__lists__item">
                        <strong class="todo__lists__item--number">123456789</strong>
                        <em class="todo__lists__item--name">企业考试报名</em>
                    </div>
                </div>
            </div><!-- // 代办事项 -->
            <div class="todo__add">添加账号</div>
            <div class="todo__upload">上传资料</div>
        </div><!-- // 代办事项 -->
        <div class="news">
            <h3>最新动态</h3>
            <div class="news__auto">
                <div class="news__item" v-for="{item, index} in news" :key="index">
                    <div class="news__img"><el-image :src="'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'" style="width: 70px; height: 70px"></el-image></div>
                    <div class="news__title">标题</div>
                    <div class="news__detail">2019-10-29 12:12 xxxxx</div>
                    <div class="news__button"><el-button>去处理</el-button></div>
                </div>
                <div class="news__add" @click="news.push([...news])">点击加载更多</div>
            </div>
        </div><!-- // 最新动态 -->
    </div>
</template>
<script>
export default {
    name: 'Home',
    data() {
        return {
            news: [1,2,3,4,5]
        }
    }
}
</script>