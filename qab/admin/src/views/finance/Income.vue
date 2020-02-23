<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'incomeList'">
            <template slot="price" slot-scope="scope">￥{{scope.row.price}}</template>
            <template slot="orderStatus" slot-scope="scope">{{map[scope.row.orderStatus]}}</template>
        </SearchPage>
    </div>
</template>
<script>
export default {
    name: 'Income',
    data() {
        return {
            map: {
                0:'未支付',
                1:'支付中',
                2:'支付完成',
                3:'支付失败'
            },
            searchForm: [
                {
                    type: 'input', label: '关键字', prop: 'orderNo',
                }
            ],
            table: [
                { prop: 'enterpriseName', label: '报名企业' },
                { prop: 'enrollNumber', label: '考试人数' },
                { prop: 'orderNo', label: '订单编号' },
                { slot: 'price', label: '报名总费用(元)' },
                { slot: 'orderStatus', label: '支付状态' },
                { prop: 'createTime', label: '下单时间', width: 140 },
                { prop: 'updateTime', label: '支付时间', width: 140 },
            ]
        }
    },
    created() {},
    
    methods: {
       
    }
}
</script>