<template>
    <div>
        <SearchPage ref="SearchPage" :table="table" :api="'empList'">
            <el-button type="success" slot="mainButtons--left" icon="el-icon-download" @click="importData">导出EXCEL</el-button>

        </SearchPage>
    </div>
</template>
<script>
export default {
    name: 'employeeSuggest',
    data() {
        return {

            table: [
                { prop: 'no', label: '序号' , width: 170 },
                { prop: 'safety', label: '员工姓名', width: 170  },
                { prop: 'level', label: '建议', width: 270 },
                { prop: 'method', label: '状态', width: 170 },


            ]
        }
    },
    created() {},
    
    methods: {
        // inquiryReminder(scope) {
        //     this.$api.inquiryDunning({id: scope.row.idx}).then(() => {
        //         this.$message.success('催款通知成功');
        //         this.SearchPageInit();
        //     })
        // },
        // inquiryClosed(scope) {
        //     this.$api.inquiryClose({id: scope.row.idx}).then(() => {
        //         this.$message.success('关闭成功');
        //         this.SearchPageInit();
        //     })
        // }
        employeeAdd() { // 行业新增
            this.$router.push({name: 'employeeAdd'});
        },
    }
}
</script>