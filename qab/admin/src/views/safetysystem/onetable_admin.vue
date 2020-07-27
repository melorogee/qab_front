<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'troubleshootList'" >
<!--            <el-button type="success" slot="mainButtons&#45;&#45;left" icon="el-icon-download" @click="exportOnetable">导出</el-button>-->


            <!--            <template slot="operat" slot-scope="scope">-->
<!--                <i v-if="scope.row.hazardLevel == '0'"  @click="processStatus(scope,'1')">正常</i>-->
<!--                 <el-divider direction="vertical" v-if="scope.row.hazardLevel == '0'"></el-divider>-->
<!--                <i v-if="scope.row.hazardLevel == '0'"  @click="processStatus(scope,'2')">异常</i>-->

<!--&lt;!&ndash;                <i  @click="processStatus(scope,'1')">正常</i>&ndash;&gt;-->
<!--&lt;!&ndash;                <el-divider direction="vertical" ></el-divider>&ndash;&gt;-->
<!--&lt;!&ndash;                <i @click="processStatus(scope,'2')">异常</i>&ndash;&gt;-->

<!--            </template>-->

            <template slot="educationalMeasures" slot-scope="scope">
                <div>
                {{scope.row.educationalMeasures}}（当前状态：{{state[scope.row.educationalStatus]}}）
                </div>
                <el-button size="mini" type="primary"  @click="normal(1,scope)">正常</el-button>
                <el-button @click="unnormal(1,scope)" size="mini" type="danger">异常</el-button>
            </template>

            <template slot="technicalMeasures" slot-scope="scope">
                <div>
                {{scope.row.technicalMeasures}}（当前状态：{{state[scope.row.technicalStatus]}}）
                </div>
                <el-button size="mini" type="primary"  @click="normal(2,scope)">正常</el-button>
                <el-button @click="unnormal(2,scope)" size="mini" type="danger">异常</el-button>
            </template>

            <template slot="managementMeasures" slot-scope="scope">
                <div>
                {{scope.row.managementMeasures}}（当前状态：{{state[scope.row.managementStatus]}}）
                </div>
                <el-button size="mini" type="primary"  @click="normal(3,scope)">正常</el-button>
                <el-button @click="unnormal(3,scope)" size="mini" type="danger">异常</el-button>
            </template>

            <template slot="protectiveMeasures" slot-scope="scope">
                <div>
                {{scope.row.protectiveMeasures}}（当前状态：{{state[scope.row.protectiveStatus]}}）
                </div>
                <el-button size="mini" type="primary"  @click="normal(4,scope)">正常</el-button>
                <el-button @click="unnormal(4,scope)" size="mini" type="danger">异常</el-button>
            </template>

            <template slot="hazardLevel" slot-scope="scope">
                {{hmap[scope.row.hazardLevel]}}
            </template>
        </SearchPage>

    </div>
</template>
<script>
    // import Template from "../website/Template";
    export default {
        name: 'Onetable_admin',
        // components: {Template},
        data() {
            return {
                state:{
                    "0":"未评估","1":"正常","2":"异常"
                },
                searchForm: ['servedCompany'],
                importDialog:false,
                table: [
                    { prop: 'riskName', label: '风险名称' },
                    { prop: 'riskLevel', label: '风险等级'  },
                    // { prop: 'type', label: '管控措施类型'  },
                    { slot: 'hazardLevel', label: '隐患等级' },

                    // { prop: 'content', label: '管控内容'  },
                    // { slot: 'htmlContent', label: '详情', width: 380 },
                    { slot: 'educationalMeasures', label: '教育措施', width: 380 },
                    { slot: 'technicalMeasures', label: '工程技术措施', width: 380 },
                    { slot: 'managementMeasures', label: '管理措施', width: 380 },
                    { slot: 'protectiveMeasures', label: '个体防护措施', width: 380 },

                    // { prop: 'createTime', label: '发布时间' },
                    { slot: 'operat', label: '问题描述', width: 130 }
                ],
                deleteMap: [],
                userId:"",
                hmap:{'0':'无隐患','1':'无隐患','2':'一般隐患','3':'较大隐患','4':'重大隐患'}
            }
        },

        created() {
            this.userId = sessionStorage.getItem('userId')

        },

        methods: {
            // importData() {
            //     this.$router.push({name: 'Onecase_companyImport'});
            // },

            processStatus(scope,status) {
                this.$api.processStatus({status: status,riskId:scope.row.riskId}).then(() => {
                    this.$message.success('设置成功');
                    this.SearchPageInit();
                })
            },

            normal(type,scope){
                let param = {idx:scope.row.riskId}
                if(type == 1){
                    param.educationalStatus = 1
                }else if(type == 2){
                    param.technicalStatus = 1
                }else if(type == 3){
                    param.managementStatus = 1
                }else if(type == 4){
                    param.protectiveStatus = 1
                }

                //封装参数
                this.$api.normal(param).then(() => {
                    this.$message.success('设置成功');
                    this.SearchPageInit();
                })
            },

            unnormal(type,scope){
                let param = {idx:scope.row.riskId}
                if(type == 1){
                    param.educationalStatus = 2
                }else if(type == 2){
                    param.technicalStatus = 2
                }else if(type == 3){
                    param.managementStatus = 2
                }else if(type == 4){
                    param.protectiveStatus = 2
                }

                //封装参数
                this.$api.normal(param).then(() => {
                    this.$message.success('设置成功');
                    this.SearchPageInit();
                })
            },
            //
            // exportOnetable() {
            //     window.open("/manage/riskAssessment/biaoExcel");
            //
            // },



        }
    }
</script>
