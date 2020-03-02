<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'archivesList'">
            <el-button type="success" slot="mainButtons--left" icon="el-icon-download" @click="importData">导出EXCEL</el-button>
            <template slot="archivesEduType" slot-scope="scope">{{map[scope.row.educationType]}}</template>
            <template slot="isPass" slot-scope="scope">{{map1[scope.row.isPass]}}</template>
        </SearchPage>
    </div>
</template>
<script>
export default {
    name: 'Archives',
    data() {
        return {
            map: {
                1: '新员工培训',
                2: '老员工培训',
                3: '已结算'
            },
            map1: {
                0: '不合格',
                1: '合格'
            },
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