<template>
    <div>
        <el-tabs>
            <el-tab-pane label="已组织">
                <SearchPage ref="thisplan" :searchForm="newSearchForm" :table="newTable" :setValue="{sp: 1}"  :api="'newExamList'">
                    <el-button type="primary" slot="mainButtons--left" icon="el-icon-plus" >新增</el-button>
                    <!--                    <template slot="operat" slot-scope="scope">-->

                    <!--                    </template>-->
                </SearchPage>
            </el-tab-pane>
            <el-tab-pane label="未组织">
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
                { prop: 'title', label: '培训主题' },
                { prop: 'educationType', label: '教育类型' },
                { prop: 'trainingType', label: '培训方式' },
                { prop: 'content', label: '培训内容' },
                { prop: 'effectInspectionMethod', label: '效果检验方式' }
            ],

            allSearchForm:[],
            allTable: [
                { prop: 'title', label: '培训主题' },
                { prop: 'educationType', label: '教育类型' },
                { prop: 'trainingType', label: '培训方式' },
                { prop: 'content', label: '培训内容' },
                { prop: 'effectInspectionMethod', label: '效果检验方式' }
            ],
        }
    },
    created() { },
    
    methods: {

    }
}
</script>