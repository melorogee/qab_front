<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'inquiryList'">
            <template slot="callTime" slot-scope="scope">{{`00:${scope.row.callTime}:00`}}</template>
            <template slot="price" slot-scope="scope">{{`￥${(scope.row.price*1).toFixed(2)}`}}</template>
            <template slot="orderStatus" slot-scope="scope">{{$map.orderStatusMap[scope.row.orderStatus]}}</template>
            <template slot="operat" slot-scope="scope">
                <el-button type="text" @click="$router.push({ name: 'InquiryDetail', query: { idx: scope.row.idx }})">查看详情</el-button>
                <el-button type="text" @click="inquiryReminder(scope)">催款通知</el-button>
                <!-- <el-button type="text" @click="inquiryClosed(scope)">关闭</el-button> -->
                <el-button type="text" @click="inquiryDelete(scope)">删除</el-button>
            </template>
        </SearchPage>
    </div>
</template>
<script>
export default {
    name: 'Inquiry',
    data() {
        return {
            searchForm: [
                {
                    type: 'input', label: '关键字', prop: 'keyword',
                }
            ],
            table: [
                { prop: 'enterpriseName', label: '企业名称' },
                { prop: 'userExpertName', label: '问诊对象' },
                { prop: 'callStartTime', label: '通话开始时间', width: 150 },
                { slot: 'callTime', label: '通话时长' },
                { slot: 'price', label: '金额' },
                { slot: 'orderStatus', label: '订单状态' },
                { prop: 'createTime', label: '订单产生时间', width: 150 },
                { slot: 'operat', label: '操作', width: 220 }
            ]
        }
    },
    created() {},
    
    methods: {
        inquiryReminder(scope) {
            this.$api.inquiryReminder({idx: scope.row.idx}).then(() => {
                this.$message.success('催款通知成功');
                this.SearchPageInit();
            })
        },
        inquiryDelete(scope) {
            this.$api.inquiryDelete({idxs: scope.row.idx}).then(() => {
                this.$message.success('删除成功');
                this.SearchPageInit();
            })
        },
        inquiryClosed(scope) {
            this.$api.inquiryClosed({idx: scope.row.idx}).then(() => {
                this.$message.success('关闭成功');
                this.SearchPageInit();
            })
        }
    }
}
</script>