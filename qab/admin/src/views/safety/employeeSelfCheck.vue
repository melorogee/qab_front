<template>
    <div>
        <SearchPage ref="SearchPage" :table="table" :api="'employeeReport'">
            <el-button type="success" slot="mainButtons--left" icon="el-icon-download"  @click="importData" >导出EXCEL</el-button>

        </SearchPage>
    </div>
</template>
<script>
export default {
    name: 'EmploySelfCheck',
    data() {
        return {

            table: [
                {  label: '序号' , width: 130,type:'index' },
                { prop: 'description', label: '隐患' },
                { prop: 'level', label: '隐患级别' },
                { prop: 'suggest', label: '整改措施' },
                { prop: 'location', label: '地点' },
                { prop: 'time', label: '发现时间' },
                { prop: 'createByName', label: '录入人'  },
                { prop: 'imgCount', label: '隐患图片'},
                { prop: 'responsible', label: '责任人'  },

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

        importData() { window.open(this.$api.employeeReportExport); }

    }
}
</script>