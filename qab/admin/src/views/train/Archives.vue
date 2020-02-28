<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'archivesList'">
            <el-button type="success" slot="mainButtons--left" icon="el-icon-download" @click="importData">导出EXCEL</el-button>
            <template slot="archivesEduType" slot-scope="scope">{{scope.row.educationType == 1 ? '新员工培训' : scope.row.educationType == 2 ? '老员工培训' : '已结算'}}</template>
            <template slot="isPass" slot-scope="scope">{{scope.row.isPass == 0 ? '不合格' : '合格'}}</template>
        </SearchPage>
    </div>
</template>
<script>
export default {
    name: 'Archives',
    data() {
        return {
            searchForm: [],
            table: ['index', 'archives', 'departmentName', 'positionName', 'hiredate', 'archivesEduType', 'finishClassHour', 'score', 'isPass']
        }
    },
    created() { },
    methods: {
        addData() {
            this.$router.push({name: 'MaterialsAdd'});
        },

        delData(scope) {
            this.$api.materialsDelete({idxs: scope.row.idx}).then(() => {
                this.$message.success('删除成功');
                this.SearchPageInit();
            })
        },
        importData() { window.open(this.$api.exportArchives); }

    }
}
</script>