<template>
    <div class="detail">
        <div class="detail__left">
            <div class="detail__title">约叫订单详情</div>
            <table>
                <tr><th>订单编号</th><td>{{detail.orderNo}}</td></tr>
                <tr><th>预约时间</th><td>{{detail.appointmentTime}}</td></tr>
                <tr><th>下单时间</th><td>{{detail.createTime}}</td></tr>
                <tr><th>服务项目</th><td>{{detail.serviceItemsName}}</td></tr>
                <tr><th>上门地址</th><td>{{detail.addr}}</td></tr>
                <tr><th>接单时间</th><td>{{detail.orderTime}}</td></tr>
                <tr><th>服务费</th><td>￥{{detail.amount}}</td></tr>
                <tr><th>订单状态</th><td>待付款</td></tr>
                <tr><th>备注</th><td>{{detail.remark}}</td></tr>
                <tr><th>专家签到</th><td> <img style="max-width:100px;max-height:100px" v-for="(main, mainIndex) in detail.signInImgList" :key="mainIndex" :src="main" /> </td></tr>
                <tr><th>所在位置</th><td>{{detail.signInAddr}}</td></tr>

            </table>
            <el-button type="primary" @click="inquiryReminder">催款通知</el-button>
            <el-button type="danger" @click="inquiryClosed">关闭订单</el-button>
        </div>
        <div class="detail__right">
            <div class="detail__box">
                <div class="detail__title">付款方信息</div>
                <div class="detail__item"><span>企业名称</span>{{detail.enterpriseName}}</div>
                <div class="detail__item"><span>联系人</span>{{detail.enterpriseContacts}}</div>
                <div class="detail__item"><span>联系方式</span>{{detail.enterprisePhone}}</div>
            </div>
            <div class="detail__box">
                <div class="detail__title">专家/特种作业人员信息</div>
                <div class="detail__item"><span>姓名</span>{{detail.expertName}}</div>
                <div class="detail__item"><span>联系方式</span>{{detail.expertPhone}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CallDetail',
    data() {
        return {
            detail: {},
            test:{signInImgList:['https://img0.bdstatic.com/static/searchdetail/img/logo-2X_0c4ef02.png','https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2266738819,626045180&fm=26&gp=0.jpg']}
        }
    },
    created() {
        this.$api.callDetail({orderId: this.$route.query.orderId}).then(res => {
            this.detail = res;
        })
    },
    
    methods: {
        inquiryReminder() {
            this.$api.inquiryDunning({id: this.detail.idx}).then(() => {
                this.$message.success('催款通知成功');
                this.$router.push({ name: 'Call' })
            })
        },
        inquiryClosed() {
            this.$api.inquiryClose({id: this.detail.idx}).then(() => {
                this.$message.success('关闭成功');
                this.$router.push({ name: 'Call' })
            })
        }
    }
}
</script>