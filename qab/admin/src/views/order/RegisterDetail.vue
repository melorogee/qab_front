<template>
    <div class="detail">
        <div class="detail__left">
            <div class="detail__title">报考订单详情</div>
            <table>
                <tr><th>订单编号</th><td>{{detail.orderNo}}</td></tr>
                <tr><th>考试人数</th><td>{{detail.enrollNumber}}</td></tr>
                <tr><th>下单时间</th><td>{{detail.createTime}}</td></tr>
                <tr><th>地区</th><td>{{detail.provinceName}} {{detail.cityName}} {{detail.districtName}}</td></tr>
                <tr><th>行业类型</th><td>{{detail.industryName}}</td></tr>
                <tr><th>教育类型</th><td>{{$map.educationTypes[detail.educationType]}}</td></tr>
                <tr><th>员工报名表</th><td>{{detail.url == '' ? '未上传' : '已上传'}}</td></tr>
                <tr><th>报考费用合计</th><td>{{`￥${(detail.price*1).toFixed(2)}`}}</td></tr>
                <tr><th>订单状态</th><td>{{$map.orderStatusMap[detail.orderStatus]}}</td></tr>
            </table>
        </div>
        <div class="detail__right">
            <div class="detail__box">
                <div class="detail__title">付款方信息</div>
                <div class="detail__item"><span>企业名称</span>{{detail.enterpriseName}}</div>
                <div class="detail__item"><span>联系人</span>{{detail.enterpriseContacts}}</div>
                <div class="detail__item"><span>联系方式</span>{{detail.enterprisePhone}}</div>
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