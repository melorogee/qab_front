<template>
    <div>
        <el-tabs>
            <el-tab-pane label="新员工考试">
                <SearchPage ref="thisplan" :searchForm="newSearchForm" :table="newTable" :setValue="{sp: 1}"  :api="'newExamList'">
<!--                    <el-button type="primary" slot="mainButtons&#45;&#45;left" icon="el-icon-plus" >新增</el-button>-->
                    <!--                    <template slot="operat" slot-scope="scope">-->

                    <!--                    </template>-->
                </SearchPage>
            </el-tab-pane>
            <el-tab-pane label="全员培训考试">
                <SearchPage ref="hisplan" :searchForm="allSearchForm" :table="allTable"  :api="'allExamList'">

                </SearchPage>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>
<script>
export default {
    name: 'Examnew',
    data() {
        return {
            newSearchForm:[],
            newTable: [
                { prop: 'title', label: '考试标题' },
                { prop: 'industryName', label: '行业名称' },
                { prop: 'dt', label: '组织日期' },
                { prop: 'trainingTitle', label: '培训内容' },
                { prop: 'content', label: '培训内容' },
                { prop: 'totalTime', label: '考试时间' }
            ],

            allSearchForm:[],
            allTable: [
                { prop: 'title', label: '考试标题' },
                { prop: 'industryName', label: '行业名称' },
                { prop: 'dt', label: '组织日期' },
                { prop: 'trainingTitle', label: '培训内容' },
                { prop: 'content', label: '培训内容' },
                { prop: 'totalTime', label: '考试时间' }
            ],
        }
    },
    created() { },
    
    methods: {

    }
}
</script>