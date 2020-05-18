<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'onelist'" >
            <el-button type="success" slot="mainButtons--left" icon="el-icon-upload" @click="importData">导出</el-button>

            <template slot="technicalMeasures" slot-scope="scope">
                <div style="display:flex; align-items: center;">
                    <el-input  v-model="scope.row.technicalMeasures" >
                     </el-input>
                    <i class="el-icon-circle-check"  @click="updateById(scope,'1')"></i>
                </div>
            </template>

            <template slot="managementMeasures" slot-scope="scope">
                <div style="display:flex; align-items: center;">
                    <el-input  v-model="scope.row.managementMeasures" >
                    </el-input>
                    <i class="el-icon-circle-check"  @click="updateById(scope,'2')"></i>
                </div>
            </template>
            <template slot="educationalMeasures" slot-scope="scope">
                <div style="display:flex; align-items: center;">
                    <el-input  v-model="scope.row.educationalMeasures" >
                    </el-input>
                    <i class="el-icon-circle-check"  @click="updateById(scope,'3')"></i>
                </div>
            </template>

            <template slot="protectiveMeasures" slot-scope="scope">
                <div style="display:flex; align-items: center;">
                    <el-input  v-model="scope.row.protectiveMeasures" >
                    </el-input>
                    <i class="el-icon-circle-check"  @click="updateById(scope,'4')"></i>
                </div>
            </template>




        </SearchPage>

    </div>
</template>
<script>
    export default {
        name: 'Onelist_admin',
        data() {
            return {

                searchForm: [],
                importDialog:false,
                table: [
                    { prop: 'enterpriseName', label: '企业名称' ,width:'200px'},

                    { prop: 'hazardArea', label: '单元' },
                    { prop: 'hazardName', label: '风险点名称'  },
                    { prop: 'hazardType', label: '类型'  },
                    { prop: 'name', label: '危险源/检查标准'  },
                    { prop: 'accidentType', label: '可能发生事故类型'  },
                    { prop: 'possibilityLevel', label: '可能性'  },
                    { prop: 'exposureFrequencyLevel', label: '频次'  },
                    { prop: 'consequenceSeverityLevel', label: '严重性'  },
                    { prop: 'riskScore', label: '风险值'  },
                    { prop: 'riskLevel', label: '风险等级'  },
                    { slot: 'technicalMeasures', label: '工程技术措施' ,width:'200px' },
                    { slot: 'managementMeasures', label: '管理措施'  ,width:'200px' },
                    { slot: 'educationalMeasures', label: '教育措施'  ,width:'200px' },
                    { slot: 'protectiveMeasures', label: '个体防护措施'  ,width:'200px' },
                    { prop: 'controlLevel', label: '管控层级'  },
                    { prop: 'hazardLevel', label: '隐患等级'  },


                    // { slot: 'htmlContent', label: '详情', width: 380 },
                    // { prop: 'createTime', label: '发布时间' },
                    // { slot: 'operat', label: '问题描述', width: 130 }
                ],
                deleteMap: [],
                userId:""
            }
        },

        created() {
            this.userId = sessionStorage.getItem('userId')

        },

        methods: {


            updateById(scope,type) {
                let param = {idx:scope.row.idx}
                if(type ==  '1'){
                    param.technicalMeasures= scope.row.technicalMeasures;
                }else if(type ==  '2'){
                    param.managementMeasures = scope.row.managementMeasures
                }else if(type ==  '3'){
                    param.educationalMeasures = scope.row.educationalMeasures
                }else if(type == '4'){
                    param.protectiveMeasures = scope.row.protectiveMeasures
                }
                this.$api.updateById(param).then(() => {
                    this.$message.success('更新成功');
                    this.SearchPageInit();
                })

            },

            importData() { window.open(this.$api.exportList); }



        }
    }
</script>