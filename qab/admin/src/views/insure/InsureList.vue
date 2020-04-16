<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'queryInsureList'" @multSelection="getMsg">
            <!--            <el-button type="primary" slot="mainButtons&#45;&#45;left" icon="el-icon-edit-outline"  @click="addData" >发布计划</el-button>-->
            <!--            <el-button slot="mainButtons&#45;&#45;left" icon="el-icon-delete"  @click="delData('select')" >删除</el-button>-->
            <el-button type="success" slot="mainButtons--left" icon="el-icon-upload" @click="insureImport">导入</el-button>
            <el-button type="success" slot="mainButtons--left" icon="el-icon-upload" @click="exportExcel">导出</el-button>

            <template slot="typeSlot" slot-scope="scope">
                {{map[scope.row.type]}}
            </template>


            <!-- 出险人次 -->
            <template slot="cxrc" slot-scope="scope">
                <div v-for="(item, index) in scope.row.accidentList " :key="index">
                    <div style="line-height: 30px">{{item.number}}<span v-if="index != scope.row.accidentList.length-1" style="display:none">,</span></div>
                    <div v-if="scope.row.accidentList.length -1 != index " style="border-bottom:1px solid #EBEEF5;margin: 0 -10px;"></div>
                </div>
            </template>
            <!-- 赔付金额 -->
            <template slot="pfje" slot-scope="scope">
                <div v-for="(item, index) in scope.row.accidentList " :key="index">
                    <div style="line-height: 30px">{{item.price}}<span v-if="index != scope.row.accidentList.length-1" style="display:none">,</span></div>
                    <div v-if="scope.row.accidentList.length -1 != index " style="border-bottom:1px solid #EBEEF5;margin: 0 -10px;"></div>
                </div>
            </template>


            <template slot="operat" slot-scope="scope">
                <el-button type="text" @click="distribute(scope)" v-if="scope.row.hasOrderCount > 0  && scope.row.hasOrderCount<4">继续派单</el-button>
                <el-button type="text" @click="distribute(scope)" v-if="scope.row.hasOrderCount == 0">派单</el-button>
                <el-button type="text" @click="detail(scope)" v-if="scope.row.hasOrderCount > 0">详情</el-button>

                <!--                <i class="el-icon-delete" @click="delData(scope)"></i>-->
            </template>
        </SearchPage>

        <el-dialog title="派单" :visible.sync="disDialog" width="30%">
            <el-form :model="distributewValue"  ref="disDialog" label-width="100px" class="hiddenBorder">

                <el-form-item label="派单项目" prop="type">
                    <el-select  v-model="distributewValue.type"  :maxlength="60" :placeholder="`请选择`" @change="selectChangeType">
                        <el-option v-for="(option, index) in typeList"
                                   :key="index"
                                   :label="option.name"
                                   :value="option.value"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="服务类型" prop="serviceTypeId" v-if="otherTypeShow">
                    <el-select  v-model="distributewValue.serviceTypeId"  :maxlength="60" :placeholder="`请选择`" @change="selectChangeOther">
                        <el-option v-for="(option, index) in otherList"
                                   :key="index"
                                   :label="option.name"
                                   :value="option.idx">

                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="培训人数" prop="trainingNumber" v-if="trainNumShow">
                    <el-input v-model="distributewValue.trainingNumber" placeholder="请输入培训人数"></el-input>

                </el-form-item>

                <el-form-item label="派单至专家" prop="serviceTypeId">
                    <el-select  v-model="distributewValue.expertId"  :maxlength="60" :placeholder="`请选择`" @change="selectChangeExpert" >
                        <el-option v-for="(option, index) in expertList"
                                   :key="index"
                                   :label="option.name"
                                   :value="option.idx">

                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="服务截止日期" prop="deadline">
                    <el-date-picker  type="datetime"
                                     placeholder="选择日期"
                                     value-format="yyyy-MM-dd"
                                     format="yyyy-MM-dd" v-model="distributewValue.deadline" maxlength="200" />
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="disDialog = false">取消</el-button>
                <el-button type="primary" @click="goDis">保存</el-button>
            </span>
        </el-dialog>




        <el-dialog title="查看详情" :visible.sync="detailDialog" width="60%">
            <div  v-for="(item, index) in detailInfo" :key="index">

                <table class="defaultTable" >
                    <tr><th>派单项目类型</th><td>{{typeMap[item.type]}}</td></tr>
                    <tr><th>专家名称</th><td>{{item.expertUserName}}</td></tr>
                    <tr v-if="item.type == 4"><th>服务类型</th><td>{{item.serviceTypeName}}</td></tr>

                    <tr><th>截止日期</th><td>{{item.deadlineDate}}</td></tr>

                </table>
                <br>
            </div>
        </el-dialog>

        <el-dialog title="导入" :visible.sync="expertDialog" width="30%">
            <Form v-if="expertDialog" ref="expertImportForm" :form="['file']" :isRequired="'all'" :labelWidth="'100px'" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="expertDialog = false">取消</el-button>
                <el-button type="primary" @click="expertImportSubmit">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>

    import FileSaver from 'file-saver'

    import XLSX from 'xlsx'


    export default {
        name: 'InsureList',
        data() {
            return {
                typeMap:{1:"安全风险评估",2:"隐患排查治理",3:"教育培训",4:"其他服务"},
                typeList:[{name:'安全风险评估',value:'1'},{name:'隐患排查治理',value:2},{name:'教育培训',value:3},{name:'其他服务',value:4}],
                disDialog:false,
                detailDialog:false,
                trainNumShow:false,
                distributewValue:{expertId:''},
                searchForm: [
                    {
                        type: 'input', label: '关键字', prop: 'keyword',
                    }
                ],
                detailInfo:[],
                table: [
                    { prop: 'enterpriseName', label: '企业名称' },
                    { prop: 'scale', label: '规模'  },
                    { prop: 'riskLevelShow', label: '风险等级' },
                    { prop: 'signingDate', label: '签约日期' },
                    { prop: 'insuredNumber', label: '参保人数' },
                    { prop: 'insuredPrice', label: '保险金额' },
                    { prop: 'insuredRate', label: '费率' },
                    { prop: 'premiumPrice', label: '保费' },
                    { slot: 'cxrc', label: '出险人次' ,width: 150 },
                    { slot: 'pfje', label: '赔付金额' },
                    { type: 'insureeva', label: '安全风险评估' },
                    { type: 'zhili', label: '隐患排查治理' },
                    { type: 'jypx', label: '教育培训' },
                    { type: 'qtfw', label: '其他服务' },
                    { slot: 'operat', label: '操作', width: 130 }
                ],
                deleteMap: [],

                expertList:[],
                otherTypeShow:false,
                otherList:[],
                detailId:'',
                expertDialog:false

            }
        },
        created() {
            this.initOtherList();
        },
        methods: {
            initOtherList(){
                this.$api.initOtherList().then((data) => {
                    // console.log(data)
                    this.otherList = data
                })
            },
            distribute(data) { // 专家新增
                this.distributewValue={expertId:''},
                    this.distributewValue.id=data.row.idx
                this.disDialog = false; this.$nextTick(()=>{ this.disDialog = true; })

            },

            detail(data){
                this.detailDialog = true;
                this.detailId = data.row.idx


                //详情
                this.$api.disDetail({idx: data.row.idx}).then((data) => {
                    this.detailInfo = data

                })
            },



            selectChangeType(value){

                if(value == 4){
                    this.otherTypeShow = true;
                    this.expertList = []

                }else if(value == 3){
                    this.trainNumShow=true;
                    this.queryExpert();

                }else{
                    this.otherTypeShow = false;
                    this.trainNumShow=false;
                    this.queryExpert();
                }
            },


            selectChangeOther(){
                this.queryExpert();
            },

            queryExpert(){
                this.distributewValue.expertId =''

                //查询专家
                this.$api.queryExpert({type: this.distributewValue.type,serviceTypeId:this.distributewValue.serviceTypeId}).then((data) => {
                    // console.log(data)
                    this.expertList = data

                })

            },

            selectChangeExpert(value){
                this.distributewValue.expertId = value
            },

            goDis() { // 分配
                let para =this.distributewValue;
                if(this.distributewValue.type == null || this.distributewValue.type == undefined || this.distributewValue.type == ''){
                    this.$message.warning(`请选择类型`);
                }else if(this.distributewValue.expertId == null || this.distributewValue.expertId == undefined || this.distributewValue.expertId == ''){
                    this.$message.warning(`请选择专家`);
                }else if(this.distributewValue.deadline == null || this.distributewValue.deadline == undefined || this.distributewValue.deadline == ''){
                    this.$message.warning(`请选择服务截止时间`);
                }
                else if(this.distributewValue.type == 4 && (this.distributewValue.serviceTypeId == null|| this.distributewValue.serviceTypeId == undefined || this.distributewValue.serviceTypeId == '')){
                    this.$message.warning(`请选择服务类型`);
                }else{

                    this.$api.goDis(para).then(() => {
                        this.$message.success(`分配成功`);
                        this.disDialog = false;
                        this.SearchPageInit();
                    })
                }
            },

            insureImport() { // 专家导入
                this.expertDialog = false; this.$nextTick(()=>{ this.expertDialog = true; })
                if(this.$refs.expertImportForm){ this.$refs.expertImportForm.$refs.queryForm.resetFields(); }
            },

            expertImportSubmit() { // 专家导入-保存
                this.$refs.expertImportForm.$refs.queryForm.validate((valid) => {
                    if (valid) {
                        let para = new FormData();
                        for(let key in this.$refs.expertImportForm.queryForm){
                            para.append(key, this.$refs.expertImportForm.queryForm[key]);
                        }
                        this.$api.insureImport(para).then(() => {
                            this.$message.success(`批量导入成功`);
                            this.expertDialog = false;
                            this.SearchPageInit();
                        })
                    }
                });
            },

            exportExcel () {
                /* generate workbook object from table */
                var xlsxParam = { raw: true } // 导出的内容只做解析，不进行格式转换
                var wb = XLSX.utils.table_to_book(document.querySelector('#exportTab'), xlsxParam)

                /* get binary string as output */
                var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
                try {
                    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '参保企业.xlsx')
                } catch (e) {
                    // if (typeof console !== 'undefined') {
                    //     console.log(e, wbout)
                    // }
                }
                return wbout
            }

        }
    }
</script>