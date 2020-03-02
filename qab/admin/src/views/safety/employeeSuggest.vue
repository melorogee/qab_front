<template>
    <div>
        <SearchPage ref="SearchPage" :table="table" :api="'employeeSuggest'">
            <el-button type="success" slot="mainButtons--left" icon="el-icon-download"   @click="importData" >导出EXCEL</el-button>
            <template slot="status" slot-scope="scope">{{map[scope.row.status]}}</template>

        </SearchPage>
    </div>
</template>
<script>
export default {
    name: 'employeeSuggest',
    data() {
        return {
            map: {
                0:'未处理',
                1:'采纳',
                2:'未采纳'
            },
            table: [
                {  label: '序号' , width: 170,type:'index' },
                { prop: 'name', label: '员工姓名' },
                { prop: 'content', label: '建议'},
                { slot: 'status', label: '状态' },


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
        importData() { window.open(this.$api.employeeSuggestExport); }

    }
}
</script>