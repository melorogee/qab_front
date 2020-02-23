<template>
    <div class="detail detail--w">
        <div class="detail__left">
            <div class="detail__title">问诊订单详情</div>
            <table>
                <tr><th>订单编号</th><td>{{detail.orderNo}}</td></tr>
                <tr><th>下单企业</th><td>{{detail.enterpriseName}}</td></tr>
                <tr><th>通话开始时间</th><td>{{detail.callStartTime}}</td></tr>
                <tr><th>通话结束时间</th><td>{{detail.callEndTime}}</td></tr>
                <tr><th>通话总时长</th><td>{{detail.callTime}}分钟</td></tr>
                <tr><th>免费时长</th><td>{{detail.freeTime}}</td></tr>
                <tr><th>问诊资费</th><td>￥{{detail.unitPrice}}</td></tr>
                <tr><th>订单生产时间</th><td>{{detail.createTime}}</td></tr>
                <tr><th>费用合计</th><td>￥{{detail.price}}</td></tr>
                <tr><th>订单状态</th><td>{{$map.orderStatusMap[detail.orderStatus]}}</td></tr>
            </table>
        </div>
        <div class="detail__right detail__right--w">
            <div class="detail__title">结算明细</div>
            <div class="detail__users">
                <img :src="detail.expertName" />
                <div class="detail__users__name">{{detail.expertName}}</div>
                <div class="detail__users__tel">{{detail.expertPhone}}</div>
            </div>
            <div class="detail__item"><span>总收入</span>￥{{detail.price}}</div>
            <div class="detail__item"><span>平台服务费比例</span>{{detail.platformFee*100}}%</div>
            <div class="detail__item"><span>结算至专家账户</span>￥{{detail.expertMoney}}</div>
            <div class="detail__btn">
                <el-button type="primary" @click="splitAccount">确认结算</el-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'SplitDetailWZ',
    data() {
        return {
            detail: {}
        }
    },
    created() {
        this.$api.splitGetByOrderId({orderId: this.$route.query.orderId, type: 1}).then(res => {
            this.detail = res.order;
        })
    },
    
    methods: {
        splitAccount(){
            this.$api.splitAccount({id: this.detail.idx}).then(() => {
                this.$message.success('结算成功');
                this.$router.push({ name: 'Split' })
            })
        }
    }
}
</script>
