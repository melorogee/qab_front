<template>
    <div>
        <el-tabs>
            <el-tab-pane label="新员工培训" :lazy="true">
                <div class="report">
                    <div class="report__top">
                        <div class="report__item">
                            <div class="report__value">{{data1.trainingCount}}</div>
                            <div class="report__label">本年度累计培训人数</div>
                        </div>

                        <div class="report__item">
                            <div class="report__value">{{data1.totalCount}}</div>
                            <div class="report__label">本年度累计考试人数</div>
                        </div>
                        <div class="report__item">
                            <div class="report__value">{{data1.passCount}}</div>
                            <div class="report__label">本年度累计考试通过人数</div>
                        </div>
                        <div class="report__item">
                            <div class="report__value">{{data1.passPercent}}</div>
                            <div class="report__label">本年度考试通过率</div>
                        </div>

                    </div>
                    <div class="report__chart1" v-if="data1.monthList != null">

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



                    <div class="report__chart1" >
                        <div class="report__whole">
                            <div class="report__title">历年考试统计</div>
                            <el-table :data="data1.yearStasList" style="width: 100%;height: 100%;overflow-y:auto;">
                                <el-table-column prop="year" label="年份" width="180"></el-table-column>
                                <el-table-column prop="trainingCount" label="累计培训人数" width="180"></el-table-column>
                                <el-table-column prop="totalCount" label="累计考试人数" width="180"></el-table-column>
                                <el-table-column prop="passCount" label="累计通过人数" width="180"></el-table-column>
                                <el-table-column prop="passPercent" label="考试通过率" width="180"></el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="全员培训" :lazy="true">
                <div class="report">
                    <div class="report__top">
                        <div class="report__item">
                            <div class="report__value">{{data2.trainingCount}}</div>
                            <div class="report__label">本年度累计培训人数</div>
                        </div>

                        <div class="report__item">
                            <div class="report__value">{{data2.totalCount}}</div>
                            <div class="report__label">本年度累计考试人数</div>
                        </div>
                        <div class="report__item">
                            <div class="report__value">{{data2.passCount}}</div>
                            <div class="report__label">本年度累计考试通过人数</div>
                        </div>
                        <div class="report__item">
                            <div class="report__value">{{data2.passPercent}}</div>
                            <div class="report__label">本年度考试通过率</div>
                        </div>

                    </div>
                    <div class="report__chart1" v-if="data2.monthList != null">

                        <div class="report__whole">
                            <div class="report__title">企业累计安全隐患来源及数量统计</div>
                            <div class="report__time">
                            </div>
                            <div class="report__box">
                                <!--                    <ve-bar :data="barData"-->
                                <!--                                  :settings="chartSettings"-->
                                <!--                    ></ve-bar>-->

                                <ve-histogram :data="barData2"
                                              :settings="histogramChartSettings2"
                                ></ve-histogram>

                            </div>
                        </div>
                    </div>



                    <div class="report__chart1" >
                        <div class="report__whole">
                            <div class="report__title">历年考试统计</div>
                            <el-table :data="data2.yearStasList" style="width: 100%;height: 100%;overflow-y:auto;">
                                <el-table-column prop="year" label="年份" width="180"></el-table-column>
                                <el-table-column prop="trainingCount" label="累计培训人数" width="180"></el-table-column>
                                <el-table-column prop="totalCount" label="累计考试人数" width="180"></el-table-column>
                                <el-table-column prop="passCount" label="累计通过人数" width="180"></el-table-column>
                                <el-table-column prop="passPercent" label="考试通过率" width="180"></el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>
<script>
    import Vue from 'vue'
    import VCharts from 'v-charts'
    Vue.use(VCharts)
export default {
    name: 'TrainnewData',
    data() {
        return {
            data1:{},
            data2:{},
            value2: 'time',
            histogramChartSettings: {
                metrics: ['考试通过人数','考试未通过人数'],
                dimension: ['date'],

            },

            barData: {
                columns: ['date', '考试通过人数', '考试未通过人数'],
                rows: []
            },

            histogramChartSettings2: {
                metrics: ['考试通过人数','考试未通过人数'],
                dimension: ['date'],

            },

            barData2: {
                columns: ['date', '考试通过人数', '考试未通过人数'],
                rows: []
            },

        }
    },
    created() {
        this.getSourceOfIncome();
    },
    methods: {
        getSourceOfIncome(){
            this.$api.trainnewData1().then(res => {
                this.data1 = res
                if(this.data1.monthList != null){
                    this.barData.rows=[]

                    for (let i = 0; i < this.data1.monthList.length; i++) {

                        this.barData.rows.push({ 'date': this.data1.monthList[i], '考试通过人数': this.data1.monthPassList[i], '考试未通过人数': this.data1.monthUnPassList[i]
                        });

                    }
                }

            })


            this.$api.trainnewData2().then(res => {
                this.data2 = res
                if(this.data2.monthList != null){
                    this.barData2.rows=[]

                    for (let i = 0; i < this.data2.monthList.length; i++) {
                        this.barData2.rows.push({ 'date': this.data2.monthList[i], '考试通过人数': this.data2.monthPassList[i], '考试未通过人数': this.data2.monthUnPassList[i]
                        });
                    }

                }

            })
        }
    }
}
</script>