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
                <el-button type="text" @click="goEdit(scope)" >编辑</el-button>
                <el-button type="text" @click="goDelete(scope)" >删除</el-button>

                <!--                <i class="el-icon-delete" @click="delData(scope)"></i>-->
            </template>
        </SearchPage>

        <el-dialog title="编辑" :visible.sync="disDialog" width="30%">
            <el-form :model="distributewValue"  ref="disDialog" label-width="100px" class="hiddenBorder">

<!--                <el-form-item label="派单项目" prop="type">-->
<!--                    <el-select  v-model="distributewValue.type"  :maxlength="60" :placeholder="`请选择`" @change="selectChangeType">-->
<!--                        <el-option v-for="(option, index) in typeList"-->
<!--                                   :key="index"-->
<!--                                   :label="option.name"-->
<!--                                   :value="option.value"></el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->

<!--                <el-form-item label="服务类型" prop="serviceTypeId" v-if="otherTypeShow">-->
<!--                    <el-select  v-model="distributewValue.serviceTypeId"  :maxlength="60" :placeholder="`请选择`" @change="selectChangeOther">-->
<!--                        <el-option v-for="(option, index) in otherList"-->
<!--                                   :key="index"-->
<!--                                   :label="option.name"-->
<!--                                   :value="option.idx">-->

<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->

<!--                <el-form-item label="培训人数" prop="trainingNumber" v-if="trainNumShow">-->
<!--                    <el-input v-model="distributewValue.trainingNumber" placeholder="请输入培训人数"></el-input>-->

<!--                </el-form-item>-->

<!--                <el-form-item label="派单至专家" prop="serviceTypeId">-->
<!--                    <el-select  v-model="distributewValue.expertId"  :maxlength="60" :placeholder="`请选择`" @change="selectChangeExpert" >-->
<!--                        <el-option v-for="(option, index) in expertList"-->
<!--                                   :key="index"-->
<!--                                   :label="option.name"-->
<!--                                   :value="option.idx">-->

<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->

<!--                <el-form-item label="服务截止日期" prop="deadline">-->
<!--                    <el-date-picker  type="datetime"-->
<!--                                    placeholder="选择日期"-->
<!--                                    value-format="yyyy-MM-dd"-->
<!--                                    format="yyyy-MM-dd" v-model="distributewValue.deadline" maxlength="200" />-->
<!--                </el-form-item>-->
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="disDialog = false">取消</el-button>
                <el-button type="primary" @click="confirmEdit">保存</el-button>
            </span>
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
    name: 'InsurebxList',
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
                { slot: 'operat', label: '操作', width: 130 }
            ],
            deleteMap: [],

            expertList:[],
            otherTypeShow:false,
            otherList:[],
            detailId:'',
            expertDialog:false,
            editForm:{idx:"",enterpriseName:"",scale:"",riskLevelShow:"",signingDate:"",insuredNumber:"",
                insuredPrice:"",insuredRate:"",premiumPrice:"",accidentList:[]}
        }
    },
    created() {
        // this.initOtherList();
    },
    methods: {
        // initOtherList(){
        //     this.$api.initOtherList().then((data) => {
        //         console.log(data)
        //         this.otherList = data
        //     })
        // },
        goDelete(scope) {
            let para = { idxs: scope.row.idx };
            this.$api.deleteInsure(para).then(() => {
                this.$message.success('删除成功');
                this.SearchPageInit();
            })
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
        },


        goEdit(data){
            // 赋值
            this.editForm = data.row,
                this.editForm.id = data.row.idx,
            console.log(this.editForm)
            this.disDialog = false; this.$nextTick(()=>{ this.disDialog = true; })
        },

        confirmEdit(){
            let para = this.editForm;
            this.$api.confirmEdit(para).then(() => {
                this.$message.success(`保存成功`);
                this.disDialog = false;
                this.SearchPageInit();
            })
        }


    }
}
</script>