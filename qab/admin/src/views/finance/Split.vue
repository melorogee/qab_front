<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'splitList'">
            <template slot="amount" slot-scope="scope">￥{{scope.row.amount}}</template>
            <template slot="platformFeeAmount" slot-scope="scope">￥{{scope.row.platformFeeAmount}}</template>
            <template slot="status" slot-scope="scope">{{scope.row.status == 1 ? '待结算' : '已结算'}}</template>
            <template slot="operat" slot-scope="scope">
                <el-button type="text" @click="splitDetail(scope)">结算</el-button>
            </template>
        </SearchPage>
    </div>
</template>
<script>
export default {
    name: 'Split',
    data() {
        return {
            searchForm: [
                {
                    type: 'input', label: '关键字', prop: 'orderNo',
                }
            ],
            table: [
                { prop: 'name', label: '专家/特殊作业人员' },
                { prop: 'orderNo', label: '订单编号' },
                { slot: 'amount', label: '收入金额' },
                { slot: 'platformFeeAmount', label: '平台服务费' },
                { slot: 'status', label: '状态' },
                { prop: 'createTime', label: '收款时间', width: 140 },
                { slot: 'operat', label: '操作', width: 70 }
            ]
        }
    },
    created() {},
    
    methods: {
        splitDetail(scope) {
            if(scope.row.type == 1){
                this.$router.push({name: 'SplitDetailWZ', query: {orderId: scope.row.orderId, type: 1} });
            }else{
                this.$router.push({name: 'SplitDetailYJ',  query: {orderId: scope.row.orderId, type: 1} });
            }
        },
    }
}
</script>