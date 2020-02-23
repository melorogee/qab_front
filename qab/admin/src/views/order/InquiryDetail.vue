<template>
    <div class="detail">
        <div class="detail__left">
            <div class="detail__title">问诊订单详情</div>
            <table>
                <tr><th>订单编号</th><td>{{detail.orderNo}}</td></tr>
                <tr><th>通话开始时间</th><td>{{detail.callEndTime}}</td></tr>
                <tr><th>通话结束时间</th><td>{{detail.callStartTime}}</td></tr>
                <tr><th>通话总时长</th><td>{{`00:${detail.callTime}:00`}}</td></tr>
                <tr><th>免费时长</th><td>{{detail.freeTime}}分钟</td></tr>
                <tr><th>问诊资费</th><td>{{detail.unitPrice}}元/分钟</td></tr>
                <tr><th>订单生产时间</th><td>{{detail.createTime}}</td></tr>
                <tr><th>费用合计</th><td>{{`￥${(detail.price*1).toFixed(2)}`}}</td></tr>
                <tr><th>订单状态</th><td>{{$map.orderStatusMap[detail.orderStatus]}}</td></tr>
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
                <div class="detail__item"><span>姓名</span>{{detail.userExpertName}}</div>
                <div class="detail__item"><span>联系方式</span>{{detail.userExpertPhone}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'InquiryDetail',
    data() {
        return {
            detail: {}
        }
    },
    created() {
        this.$api.inquiryDetail({idx: this.$route.query.idx}).then(res => {
            this.detail = res;
        })
    },
    
    methods: {
        inquiryReminder() {
            this.$api.inquiryReminder({idx: this.$route.query.idx}).then(() => {
                this.$message.success('催款通知成功');
                this.$router.push({ name: 'Inquiry' })
            })
        },
        inquiryClosed() {
            this.$api.inquiryClosed({idx: this.$route.query.idx}).then(() => {
                this.$message.success('关闭成功');
                this.$router.push({ name: 'Inquiry' })
            })
        }
    }
}
</script>