<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'statutesList'">
            <el-button type="primary" slot="mainButtons--left" icon="el-icon-plus" @click="addData">添加</el-button>
            <el-button type="success" slot="mainButtons--left" icon="el-icon-upload" @click="importData">批量导入</el-button>
            <template slot="operat" slot-scope="scope"><i class="el-icon-delete" @click="delData(scope)"></i></template>
        </SearchPage>
    </div>
</template>
<script>
export default {
    name: 'Statutes',
    data() {
        return {
            searchForm: [],
            table: [ 'statutes', 'area', 'industryName', 'positionTypeName', 'classHour', 'createTime', 'operat']
        }
    },
    created() {},
    
    methods: {
        addData() {
            this.$router.push({name: 'StatutesAdd'});
        },
        importData() {
            this.$router.push({name: 'StatutesImport'});
        },
        delData(scope) {
            this.$api.statutesDelete({idxs: scope.row.idx}).then(() => {
                this.$message.success('删除成功');
                this.SearchPageInit();
            })
        }
    }
}
</script>