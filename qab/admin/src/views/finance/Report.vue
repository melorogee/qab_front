<template>
    <div class="report">
        <div class="report__top">
            <div class="report__item">
                <div class="report__value">{{finance.balance.toFixed(2)}}</div>
                <div class="report__label">账户余额(元)</div>
            </div>
            <div class="report__item">
                <div class="report__value">{{finance.yesterdayCredit.toFixed(2)}}</div>
                <div class="report__label">昨日入账(元)</div>
            </div>
            <div class="report__item">
                <div class="report__value">{{finance.yesterdayNetIncome.toFixed(2)}}</div>
                <div class="report__label">昨日净收益(元)</div>
            </div>
            <div class="report__item">
                <div class="report__value">{{finance.yesterdayWithdraw.toFixed(2)}}</div>
                <div class="report__label">昨日提现(元)</div>
            </div>
        </div>
        <div class="report__chart">
            <div class="report__left">
                <div class="report__title">累计结算情况一览</div>
                <div class="report__time">更新时间：2018-11-22 14:23:23</div>
                <div class="report__box">
                    <ve-ring :data="ringData" :settings="ringSetting" :legend="{left: 0}"></ve-ring>
                </div>
            </div>
            <div class="report__right">
                <div class="report__title">每月收入来源占比</div>
                <div class="report__time">
                    <el-date-picker v-model="value2" type="month" placeholder="选择月"></el-date-picker>
                </div>
                <div class="report__box">
                    <ve-bar :data="barData" :settings="chartSettings" :grid="{ right: '100px'}" :legend="{right: 0, orient: 'vertical'}"></ve-bar>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VeRing from 'v-charts/lib/ring.common'
import VeBar from 'v-charts/lib/bar.common'
export default {
    data() {
        return { 
            value2: '',
            chartSettings: {
                labelMap: {
                'PV': '访问用户',
                'Order': '下单用户'
                },
                legendName: {
                '访问用户': '访问用户 total: 10000'
                }
            },
            barData: {
                columns: ['date', '问诊', '约叫', '考试报名'],
                rows: []
            },
            ringSetting: {
                radius: [50, 100]
            },
            ringData: {
                columns: [],
                rows: []
            },
            finance: {},
            sourceOfIncome: {}
        }
    },
    components: {
        VeRing, VeBar
    },
    created() {
        this.$api.finance().then(res => {
            this.finance = res;
            this.ringData.columns = ['name', 'value']
            this.ringData.rows.push({ 'name': `已结算(${res.splitCount})`, 'value': res.splitCount });
            this.ringData.rows.push({ 'name': `待结算(${res.notSplitCount})`, 'value': res.notSplitCount });
        })
        let data = new Date();
        let y = data.getMonth()+1;
        this.value2 = `${data.getFullYear()}-${y < 10 ? '0'+y : y}`;
        this.getSourceOfIncome();
    },
    methods: {
        getSourceOfIncome(){
            this.$api.sourceOfIncome({date: this.value2}).then(res => {
                // this.sourceOfIncome = res;
                this.barData.rows.push({ 'date': this.value2, '问诊': res.inquiryAmount, '约叫': res.callAmount, '考试报名': res.signUpAmount });
            })
        }
    }
}
</script>