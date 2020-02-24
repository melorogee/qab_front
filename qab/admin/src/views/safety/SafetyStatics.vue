<template>
    <div class="report">
        <div class="report__top">
            <div class="report__item">
                <div class="report__value">{{finance.balance.toFixed(2)}}</div>
                <div class="report__label">高风险隐患（个）</div>
            </div>
            <div class="report__item">
                <div class="report__value">{{finance.yesterdayCredit.toFixed(2)}}</div>
                <div class="report__label">较大风险隐患(个)</div>
            </div>
            <div class="report__item">
                <div class="report__value">{{finance.yesterdayNetIncome.toFixed(2)}}</div>
                <div class="report__label">一般风险隐患(个)</div>
            </div>
            <div class="report__item">
                <div class="report__value">{{finance.yesterdayWithdraw.toFixed(2)}}</div>
                <div class="report__label">较低风险隐患(个)</div>
            </div>
        </div>
        <div class="report__chart1">

            <div class="report__whole">
                <div class="report__title">企业累计安全隐患来源及数量统计</div>
                <div class="report__time">
<!--                    <el-date-picker v-model="value2" type="month" placeholder="选择月"></el-date-picker>-->
                </div>
                <div class="report__box">
                    <ve-histogram :data="barData"
                                  :settings="chartSettings" orient="horizontal" :grid="{ right: '100px',orient: 'vertical'}" :legend="{right: 0, orient: 'vertical'}"
                    ></ve-histogram>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import VeHistogram from 'v-charts/lib/bar.common'
export default {
    data() {
        return { 
            value2: '',
            chartSettings: {

            },
            barData: {
                columns: ['date', '企业自查', '订单服务', '员工上报'],
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
        VeHistogram
    },
    created() {
        this.$api.finance().then(res => {
            this.finance = res;
            this.ringData.columns = ['name', 'value']
            this.ringData.rows.push({ 'name': `已结算(${res.splitCount})`, 'value': res.splitCount });
            this.ringData.rows.push({ 'name': `待结算(${res.notSplitCount})`, 'value': res.notSplitCount });
        })
        // let data = new Date();
        // let y = data.getMonth()+1;
        // this.value2 = `${data.getFullYear()}-${y < 10 ? '0'+y : y}`;
        this.getSourceOfIncome();
    },
    methods: {
        getSourceOfIncome(){
            this.$api.sourceOfIncome({date: this.value2}).then(res => {
                // this.sourceOfIncome = res;
                this.barData.rows.push({ 'date': this.value2, '企业自查': res.inquiryAmount, '订单服务': res.callAmount, '员工上报': res.signUpAmount });
            })
        }
    }
}
</script>