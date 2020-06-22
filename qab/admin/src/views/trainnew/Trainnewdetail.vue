<template>
    <div>
        <el-tabs>
            <el-tab-pane label="新员工培训">
                <SearchPage ref="thisplan" :searchForm="newSearchForm" :table="newTable" :setValue="{sp: 1}"  :api="'newTrainList'">
                    <el-button type="primary" slot="mainButtons--left" icon="el-icon-plus" >新增</el-button>
                        <template slot="operat" slot-scope="scope">
                            <el-button size="mini" type="primary" @click="goEdit(scope)" plain>详情</el-button>
                        </template>
                        <template slot="effectInspectionMethod" slot-scope="scope">
                            {{effectInspectionMethodMap[scope.row.effectInspectionMethod]}}
                        </template>

                        <template slot="trainingType" slot-scope="scope">
                            {{trainingTypeMap[scope.row.trainingType]}}
                        </template>

                        <template slot="educationType" slot-scope="scope">
                            {{educationTypeMap[scope.row.educationType]}}
                        </template>
                </SearchPage>
            </el-tab-pane>
            <el-tab-pane label="全员培训">
                <SearchPage ref="hisplan" :searchForm="allSearchForm" :table="allTable"  :api="'allTrainList'">
                    <template slot="effectInspectionMethod" slot-scope="scope">
                        {{effectInspectionMethodMap[scope.row.effectInspectionMethod]}}
                    </template>

                    <template slot="trainingType" slot-scope="scope">
                        {{trainingTypeMap[scope.row.trainingType]}}
                    </template>

                    <template slot="educationType" slot-scope="scope">
                        {{educationTypeMap[scope.row.educationType]}}
                    </template>
                </SearchPage>
            </el-tab-pane>

        </el-tabs>
    </div>
</template>
<script>
export default {
    name: 'Trainnewdetail',
    data() {
        return {
            newSearchForm:[],
            newTable: [
                { prop: 'title', label: '培训主题' },
                { slot: 'educationType', label: '教育类型' },
                { slot: 'trainingType', label: '培训方式' },
                { prop: 'content', label: '培训内容' },
                { slot: 'effectInspectionMethod', label: '效果检验方式' },
                { slot:'operat',label:'操作'}
            ],

            allSearchForm:[],
            allTable: [
                { prop: 'title', label: '培训主题' },
                { prop: 'month', label: '月份' },
                { slot: 'trainingType', label: '培训方式' },
                { prop: 'content', label: '培训内容' },
                { slot: 'effectInspectionMethod', label: '效果检验方式' }
            ],
            effectInspectionMethodMap:{1:"考核",2:"考试"},
            educationTypeMap:{1:"公司级",2:"车间级教育",3:"班组级教育"},
            trainingTypeMap:{1:"线上",2:"线下"},
        }
    },
    created() { },
    
    methods: {
        goEdit:function (scope) {
            this.$router.push({name: 'Trainnewdetail_sub', query:scope.row})
        }
    }
}
</script>