<template>
    <div class="report">
        <div class="report__top">
            <div class="report__item">
                <div class="report__value">{{finance.highCount.toFixed(0)}}</div>
                <div class="report__label">高风险隐患（个）</div>
            </div>

            <div class="report__item">
                <div class="report__value">{{finance.generalCount.toFixed(0)}}</div>
                <div class="report__label">一般风险隐患(个)</div>
            </div>

        </div>
        <div class="report__chart1">

            <div class="report__whole">
                <div class="report__title">企业累计安全隐患来源及数量统计</div>
                <div class="report__time">
                </div>
                <div class="report__box">
<!--                    <ve-bar :data="barData"-->
<!--                                  :settings="chartSettings"-->
<!--                    ></ve-bar>-->

                    <ve-histogram :data="barData"
                                  :settings="histogramChartSettings"
                    ></ve-histogram>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import VCharts from 'v-charts'
    Vue.use(VCharts)
    export default {
    data() {
        return { 
            value2: 'time',
            histogramChartSettings: {
                metrics: ['企业自查','订单服务','员工上报'],
                dimension: ['date'],

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

    },
    created() {
        this.getSourceOfIncome();
    },
    methods: {
        getSourceOfIncome(){
            this.$api.statistics().then(res => {
                this.finance = res;
                // this.barData.rows.push({ 'date': this.finance.date, '企业自查': this.finance.enterpriseCount, '订单服务': this.finance.orderCount, '员工上报': this.finance.employeeCount });
                this.barData.rows = res.list;
            })
        }
    }
}
</script>