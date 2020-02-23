<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'urlCode'">
            <el-button type="primary" slot="mainButtons--left" icon="el-icon-plus" @click="addData">添加</el-button>
            <template slot="img" slot-scope="scope">
                 <el-image :src="scope.src || 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'" style="width: 100px; height: 100px"></el-image>
            </template>
            <template slot="operat" slot-scope="scope">
                <i class="el-icon-edit" @click="delData(scope)"></i>
                <i class="el-icon-delete" @click="delData(scope)"></i>
            </template>
        </SearchPage>
    </div>
</template>
<script>
export default {
    name: 'Legal',
    data() {
        return {
            searchForm: [],
            table: [
                { slot: 'img', label: 'banner缩略图',},
                { prop: 'a', label: '标题' },
                { prop: 'time', label: '发布时间', width: 130 },
                { slot: 'operat', label: '操作', width: 70 }
            ]
        }
    },
    created() {},
    
    methods: {
        addData() {
            this.$router.push({name: 'LegalAdd'});
        },
        importData() {
            this.$router.push({name: 'LegalImport'});
        },
        delData() {
            this.SearchPageInit();
        }
    }
}
</script>