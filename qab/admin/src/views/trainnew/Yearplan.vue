<template>
    <div>
        <el-tabs>
            <el-tab-pane label="本年度计划">
                <SearchPage ref="thisplan" :searchForm="thisplanSearchForm" :table="thisplanTable" :setValue="{sp: 1}"  :api="'thisplanList'">
                    <el-button type="primary" slot="mainButtons--left" icon="el-icon-plus" @click="goAdd()" >新增</el-button>
<!--                    <template slot="operat" slot-scope="scope">-->

<!--                    </template>-->
                </SearchPage>
            </el-tab-pane>
            <el-tab-pane label="历年计划">
                <SearchPage ref="hisplan" :searchForm="hisplanSearchForm" :table="hisplanTable"  :api="'hisplanList'">

                </SearchPage>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>
<script>
export default {
    name: 'Yearplan',
    data() {
        return {
            thisplanSearchForm:[],
            thisplanTable: [
                { prop: 'title', label: '培训主题' },
                { prop: 'year', label: '年' },
                { prop: 'month', label: '月份' },
                { prop: 'content', label: '培训内容' },
                { prop: 'effectInspectionMethod', label: '效果检验方式' }
            ],

            hisplanSearchForm:[],
            hisplanTable: [
                { prop: 'title', label: '培训主题' },
                { prop: 'month', label: '月份' },
                { prop: 'content', label: '培训内容' },
                { prop: 'effectInspectionMethod', label: '效果检验方式' }
            ],
            

        }
    },
    created() { },
    
    methods: {
        goAdd: function () {
            this.$router.push({name: 'YearplanAdd'});
        }
    }
}
</script>