<template>
    <div>
        <SearchPage ref="SearchPage" :table="table" :api="'empList'">
            <el-button type="success" slot="mainButtons--left" icon="el-icon-download" @click="importData">导出EXCEL</el-button>

        </SearchPage>
    </div>
</template>
<script>
export default {
    name: 'OrderService',
    data() {
        return {

            table: [
                { prop: 'no', label: '序号' , width: 70 },
                { prop: 'no1', label: '服务编号', width: 70  },
                { prop: 'desc', label: '隐患大类', width: 70 },
                { prop: 'method', label: '隐患分类', width: 70 },
                { slot: 'location', label: '隐患小类' , width: 70 },
                { slot: 'time', label: '隐患级别' , width: 70 },
                { slot: 'createBy', label: '可能造成的事故类型' , width: 70 },
                { slot: 'pic', label: '地点' , width: 70 },
                { slot: 'duty', label: '发现时间' , width: 70 },
                { slot: 'duty1', label: '录入人' , width: 70 },
                { slot: 'duty2', label: '隐患图片' , width: 70 },
                { slot: 'duty3', label: '整改建议' , width: 70 },
                { slot: 'duty4', label: '隐患状态' , width: 70 },
                { slot: 'duty5', label: '责任人' , width: 70 },

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