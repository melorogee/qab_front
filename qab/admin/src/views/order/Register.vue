<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'registerList'">
            <template slot="price" slot-scope="scope">{{`￥${(scope.row.price*1).toFixed(2)}`}}</template>
            <template slot="orderStatus" slot-scope="scope">{{$map.orderStatusMap[scope.row.orderStatus]}}</template>
            <template slot="operat" slot-scope="scope">
                <el-button type="text" @click="$router.push({ name: 'RegisterDetail', query: { idx: scope.row.idx }})">查看详情</el-button>
                <el-button type="text" @click="registerClosed(scope)">关闭</el-button>
                <el-button type="text" @click="registerDelete(scope)">删除</el-button>
            </template>
        </SearchPage>
    </div>
</template>
<script>
export default {
    name: 'Register',
    data() {
        return {
            searchForm: [
                {
                    type: 'input', label: '关键字', prop: 'keyword',
                }
            ],
            table: [
                { prop: 'enterpriseName', label: '报名企业' },
                { prop: 'enrollNumber', label: '考试人数' },
                { prop: 'orderNo', label: '订单编号' },
                { slot: 'price', label: '报名总费用(元)' },
                { slot: 'orderStatus', label: '支付状态' },
                { prop: 'createTime', label: '下单时间', width: 150 },
                { slot: 'operat', label: '操作', width: 150 }
            ]
        }
    },
    created() {},
    
    methods: {
        registerReminder(scope) {
            this.$api.registerReminder({idx: scope.row.idx}).then(() => {
                this.$message.success('催款通知成功');
                this.SearchPageInit();
            })
        },
        registerDelete(scope) {
            this.$api.registerDelete({idxs: scope.row.idx}).then(() => {
                this.$message.success('删除成功');
                this.SearchPageInit();
            })
        },
        registerClosed(scope) {
            this.$api.registerClosed({idx: scope.row.idx}).then(() => {
                this.$message.success('关闭成功');
                this.SearchPageInit();
            })
        }
    }
}
</script>