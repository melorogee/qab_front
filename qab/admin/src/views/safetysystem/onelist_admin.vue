<template>
    <div>


        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'onelist'" >

            <el-button type="success" slot="mainButtons--left" icon="el-icon-upload" @click="importData">导出</el-button>


            <template slot="hazardArea" slot-scope="scope">
                <div style="display:flex; align-items: center;" v-if="edit && editRow ==scope.row.idx">
                    <el-input  v-model="scope.row.hazardArea" >
                    </el-input>
                </div>
                <div style="display:flex; align-items: center;" v-if=" editRow !=scope.row.idx">
                    {{scope.row.hazardArea}}
                </div>
            </template>


            <template slot="hazardName" slot-scope="scope">
                <div style="display:flex; align-items: center;" v-if="edit && editRow ==scope.row.idx">
                    <el-input  v-model="scope.row.hazardName" >
                    </el-input>
                </div>
                <div style="display:flex; align-items: center;" v-if=" editRow !=scope.row.idx">
                    {{scope.row.hazardName}}
                </div>
            </template>

            <template slot="name" slot-scope="scope">
                <div style="display:flex; align-items: center;" v-if="edit && editRow ==scope.row.idx">
                    <el-input  v-model="scope.row.name" >
                    </el-input>
                </div>
                <div style="display:flex; align-items: center;" v-if=" editRow !=scope.row.idx">
                    {{scope.row.name}}
                </div>
            </template>



            <template slot="technicalMeasures" slot-scope="scope">
                <div style="display:flex; align-items: center;" v-if="edit && editRow ==scope.row.idx">
                    <el-input type="textarea"  v-model="scope.row.technicalMeasures" >
                     </el-input>
                </div>
                <div style="display:flex; align-items: center;" v-if=" editRow !=scope.row.idx">
                    {{scope.row.technicalMeasures}}
                </div>
            </template>

            <template slot="managementMeasures" slot-scope="scope">


                <div style="display:flex; align-items: center;" v-if="edit && editRow ==scope.row.idx">
                    <el-input type="textarea" v-model="scope.row.managementMeasures" >
                    </el-input>
                </div>

                <div style="display:flex; align-items: center;" v-if=" editRow !=scope.row.idx">
                    {{scope.row.managementMeasures}}
                </div>
            </template>
            <template slot="educationalMeasures" slot-scope="scope">
                <div style="display:flex; align-items: center;" v-if="edit && editRow ==scope.row.idx">
                    <el-input type="textarea" v-model="scope.row.educationalMeasures" >
                    </el-input>
                </div>
                <div style="display:flex; align-items: center;" v-if=" editRow !=scope.row.idx">
                    {{scope.row.educationalMeasures}}
                </div>
            </template>

            <template slot="protectiveMeasures" slot-scope="scope">
                <div style="display:flex; align-items: center;" v-if="edit && editRow ==scope.row.idx">
                    <el-input type="textarea"  v-model="scope.row.protectiveMeasures" >
                    </el-input>
                </div>
                <div style="display:flex; align-items: center;" v-if=" editRow !=scope.row.idx">
                    {{scope.row.protectiveMeasures}}
                </div>
            </template>


            <template slot="controlLevel" slot-scope="scope">
                <div style="display:flex; align-items: center;" v-if="edit && editRow ==scope.row.idx">

                    <el-select  v-model="scope.row.controlLevel"  :maxlength="60" :placeholder="`请选择`"  >
                        <el-option v-for="(option, index) in controlList"
                                   :key="index"
                                   :label="option.name"
                                   :value="option.name">

                        </el-option>
                    </el-select>

                </div>
                <div style="display:flex; align-items: center;" v-if=" editRow !=scope.row.idx">
                    {{scope.row.controlLevel}}
                </div>
            </template>

            <template slot="operat" slot-scope="scope">
                <i v-if="edit && editRow ==scope.row.idx"  @click="updateById(scope)">保存</i>
<!--                <el-divider direction="vertical" ></el-divider>-->
                <i v-if="!edit"  @click="goEdit(scope)">编辑</i>
                <el-divider direction="vertical" ></el-divider>
                <i   @click="goDelete(scope)">删除</i>


            </template>


        </SearchPage>

    </div>
</template>
<script>
    export default {
        name: 'Onelist_admin',
        data() {
            return {

                searchForm: ['servedCompany'],
                importDialog:false,
                edit:false,
                editRow:'',
                table: [
                    { prop: 'enterpriseName', label: '企业名称' ,width:'200px'},

                    { slot: 'hazardArea', label: '单元' ,width:'100px'},
                    { slot: 'hazardName', label: '风险点名称' ,width:'150px' },
                    { prop: 'hazardType', label: '类型' ,width:'150px' },
                    { slot: 'name', label: '危险源/检查标准' ,width:'150px' },
                    { prop: 'accidentType', label: '可能发生事故类型'  ,width:'150px'},
                    { prop: 'possibilityLevel', label: '可能性' ,width:'150px' },
                    { prop: 'exposureFrequencyLevel', label: '频次' ,width:'150px' },
                    { prop: 'consequenceSeverityLevel', label: '严重性' ,width:'150px' },
                    { prop: 'riskScore', label: '风险值' ,width:'150px' },
                    { prop: 'riskLevelStr', label: '风险等级' ,width:'150px' },
                    { slot: 'technicalMeasures', label: '工程技术措施' ,width:'200px' },
                    { slot: 'managementMeasures', label: '管理措施'  ,width:'200px' },
                    { slot: 'educationalMeasures', label: '教育措施'  ,width:'200px' },
                    { slot: 'protectiveMeasures', label: '个体防护措施'  ,width:'200px' },
                    { slot: 'controlLevel', label: '管控层级' ,width:'150px' },
                    { prop: 'hazardLevelStr', label: '隐患等级' ,width:'150px' },


                    // { slot: 'htmlContent', label: '详情', width: 380 },
                    // { prop: 'createTime', label: '发布时间' },
                    { slot: 'operat', label: '操作', width: 130 }
                ],
                deleteMap: [],
                userId:"",
                companyList:[],
                selectedCompany:"",
                controlList : [ {  name: '岗位' }, {  name: '班组' }, {  name: '车间' }, {  name: '公司' }],

        }
        },

        created() {
            this.userId = sessionStorage.getItem('userId')
        },

        methods: {


            updateById(scope) {
                let param = scope.row
                // if(type ==  '1'){
                //     param.technicalMeasures= scope.row.technicalMeasures;
                // }else if(type ==  '2'){
                //     param.managementMeasures = scope.row.managementMeasures
                // }else if(type ==  '3'){
                //     param.educationalMeasures = scope.row.educationalMeasures
                // }else if(type == '4'){
                //     param.protectiveMeasures = scope.row.protectiveMeasures
                // }
                this.$api.updateById(param).then(() => {
                    this.$message.success('更新成功');
                    this.edit=false,
                        this.editRow='',
                    this.SearchPageInit();

                })

            },

            importData() { window.open(this.$api.exportList); },
            goEdit(scope) {
                // console.log(scope)
                this.edit=true
                this.editRow=scope.row.idx
            },

            goDelete(scope){
                this.$api.deleteRisk({riskId: scope.row.idx}).then(() => {
                    this.$message.success('删除成功');
                    this.SearchPageInit();

                })
            }




        }
    }
</script>
