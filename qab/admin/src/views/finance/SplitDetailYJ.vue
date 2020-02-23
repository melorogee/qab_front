<template>
    <div class="detail detail--w">
        <div class="detail__left">
            <div class="detail__title">约叫订单详情</div>
            <table>
                <tr><th>订单编号</th><td>{{detail.orderNo}}</td></tr>
                <tr><th>下单企业</th><td>{{detail.enterpriseName}}</td></tr>
                <tr><th>预约时间</th><td>{{detail.appointmentTime}}</td></tr>
                <tr><th>下单时间</th><td>{{detail.createTime}}</td></tr>
                <tr><th>服务项目</th><td>{{detail.serviceItemsName}}分钟</td></tr>
                <tr><th>上门地址</th><td>{{detail.addr}}</td></tr>
                <tr><th>接单时间</th><td>{{detail.orderTime}}</td></tr>
                <tr><th>服务完成时间</th><td>{{detail.serviceEndTime}}</td></tr>
                <tr><th>服务确认单</th><td>已提交</td></tr>
                <tr><th>服务费</th><td>￥{{detail.amount}}</td></tr>
                <tr><th>订单状态</th><td>{{$map.orderStatusMap[detail.orderStatus]}}</td></tr>
                <tr><th>备注</th><td>{{detail.remark}}</td></tr>
            </table>
        </div>
        <div class="detail__right detail__right--w">
            <div class="detail__title">结算明细</div>
            <div class="detail__users">
                <img :src="'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2493224900,2552084789&fm=26&gp=0.jpg' || detail.expertName" />
                <div class="detail__users__name">{{detail.expertName}}</div>
                <div class="detail__users__tel">{{detail.expertPhone}}</div>
            </div>
            <div class="detail__item"><span>总收入</span>￥{{detail.amount}}</div>
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
    name: 'SplitDetailYJ',
    data() {
        return {
            detail: {}
        }
    },
    created() {
        this.$api.splitGetByOrderId({orderId: this.$route.query.orderId, type: 2}).then(res => {
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