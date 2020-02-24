<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'callList'">

        </SearchPage>
    </div>
</template>
<script>
export default {
    name: 'EmployeeMgn',
    data() {
        return {
            searchForm: [
                {
                    type: 'input', label: '关键字', prop: 'keyword',
                }
            ],
            table: [
                { prop: 'enterpriseName', label: '企业名称' },
                { prop: 'expertName', label: '约叫对象' },
                { prop: 'createTime', label: '下单时间', width: 130 },
                { prop: 'serviceEndTime', label: '服务完成时间', width: 130 },
                { slot: 'amount', label: '金额' },
                { slot: 'status', label: '订单状态' },
                { slot: 'operat', label: '操作', width: 170 }
            ]
        }
    },
    created() {},
    
    methods: {
        inquiryReminder(scope) {
            this.$api.inquiryDunning({id: scope.row.idx}).then(() => {
                this.$message.success('催款通知成功');
                this.SearchPageInit();
            })
        },
        inquiryClosed(scope) {
            this.$api.inquiryClose({id: scope.row.idx}).then(() => {
                this.$message.success('关闭成功');
                this.SearchPageInit();
            })
        }
    }
}
</script>