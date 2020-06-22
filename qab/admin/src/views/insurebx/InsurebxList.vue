<template>
    <div>
        <SearchPage
                ref="SearchPage"
                :searchForm="searchForm"
                :table="table"
                :api="'queryInsureList'"
                @multSelection="getMsg"
        >
            <!--            <el-button type="primary" slot="mainButtons&#45;&#45;left" icon="el-icon-edit-outline"  @click="addData" >发布计划</el-button>-->
            <!--            <el-button slot="mainButtons&#45;&#45;left" icon="el-icon-delete"  @click="delData('select')" >删除</el-button>-->
            <el-button
                    type="success"
                    slot="mainButtons--left"
                    icon="el-icon-upload"
                    @click="insureImport"
            >导入</el-button>
            <el-button
                    type="success"
                    slot="mainButtons--left"
                    icon="el-icon-upload"
                    @click="exportExcel"
            >导出</el-button>

            <template slot="typeSlot" slot-scope="scope">{{map[scope.row.type]}}</template>

            <!-- 出险人次 -->
            <template slot="cxrc" slot-scope="scope">
                <div v-for="(item, index) in scope.row.accidentList " :key="index">
                    <div style="line-height: 30px">
                        {{item.number}}
                        <span
                                v-if="index != scope.row.accidentList.length-1"
                                style="display:none"
                        >,</span>
                    </div>
                    <div
                            v-if="scope.row.accidentList.length -1 != index "
                            style="border-bottom:1px solid #EBEEF5;margin: 0 -10px;"
                    ></div>
                </div>
            </template>
            <!-- 赔付金额 -->
            <template slot="pfje" slot-scope="scope">
                <div v-for="(item, index) in scope.row.accidentList " :key="index">
                    <div style="line-height: 30px">
                        {{item.price}}
                        <span
                                v-if="index != scope.row.accidentList.length-1"
                                style="display:none"
                        >,</span>
                    </div>
                    <div
                            v-if="scope.row.accidentList.length -1 != index "
                            style="border-bottom:1px solid #EBEEF5;margin: 0 -10px;"
                    ></div>
                </div>
            </template>

            <template slot="operat" slot-scope="scope">
                <el-button type="text" @click="goEdit(scope)">编辑</el-button>
                <el-button type="text" @click="goDelete(scope)">删除</el-button>

                <!--                <i class="el-icon-delete" @click="delData(scope)"></i>-->
            </template>
        </SearchPage>

        <el-dialog title="编辑" :visible.sync="disDialog" width="40%">
            <el-form
                    :model="submitForm"
                    ref="disDialog"
                    label-width="150px"
                    class="hiddenBorder"
                    labelPosition="right"
            >
                <el-form-item label="企业名称" >
                    <el-col :span="20">
                        <el-input :disabled="true" v-model="submitForm.enterpriseName1" placeholder="请输入企业名称"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="规模">
                    <el-col :span="20">
                        <el-input :disabled="true" v-model="submitForm.scale1" placeholder="请输入规模"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="风险等级" >
                    <el-col :span="20">
                        <el-select
                                v-model="submitForm.riskLevelShow1"
                                :maxlength="60"
                                :placeholder="`请选择`"
                                @change="levelChangeType"
                        >
                            <el-option
                                    v-for="(option, index) in levelList"
                                    :key="index"
                                    :label="option.name"
                                    :value="option.value"
                            ></el-option>
                        </el-select>
                    </el-col>
                </el-form-item>

                <el-form-item label="签约日期">
                    <el-col :span="20">
                        <el-date-picker
                                type="datetime"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd"
                                v-model="submitForm.signingDate1"
                                maxlength="200"
                        />
                    </el-col>
                </el-form-item>

                <el-form-item label="保险有效开始日期">
                    <el-col :span="20">
                        <el-date-picker
                                type="datetime"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd"
                                v-model="submitForm.startDate1"
                                maxlength="200"
                        />
                    </el-col>
                </el-form-item>




                <el-form-item label="参保人数" >
                    <el-col :span="20">
                        <el-input v-model="submitForm.insuredNumber1" placeholder="请输入参保人数"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="保险金额" >
                    <el-col :span="20">
                        <el-input v-model="submitForm.insuredPrice1" placeholder="请输入保险金额"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="费率" >
                    <el-col :span="20">
                        <el-input v-model="submitForm.insuredRate1" placeholder="请输入费率"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="保费" >
                    <el-col :span="20">
                        <el-input v-model="submitForm.premiumPrice1" placeholder="请输入保费"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="出险人次和赔付金额" >
                    <div class="box" v-for="(data,index) in submitForm.bccidentList" :key="index">
                        <el-col :span="8">
                            <el-input placeholder="请输入出险人次" v-model="data.number1"></el-input>
                        </el-col>
                        <el-col :span="8" style="margin-left: 10px;">
                            <el-input placeholder="请输入赔付金额" v-model="data.price1"></el-input>
                        </el-col>
                        <el-button
                                v-if="index < 3"
                                type="primary"
                                style="margin-left: 10px;"
                                size="mini"
                                icon="el-icon-plus"
                                circle
                                @click="addBtn()"
                        ></el-button>
                        <el-button
                                v-if="index > 0"
                                size="mini"
                                icon="el-icon-minus"
                                circle
                                @click="delBtn(index)"
                        ></el-button>
                    </div>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
        <el-button @click="qxBtn">取消</el-button>
        <el-button type="primary" @click="confirmEdit">保存</el-button>
      </span>
        </el-dialog>
        <el-dialog title="导入" :visible.sync="expertDialog" width="30%">
            <Form
                    v-if="expertDialog"
                    ref="expertImportForm"
                    :form="['file']"
                    :isRequired="'all'"
                    :labelWidth="'100px'"
            />
            <span slot="footer" class="dialog-footer">
        <el-button @click="expertDialog = false">取消</el-button>
        <el-button type="primary" @click="expertImportSubmit">保存</el-button>
      </span>
        </el-dialog>
    </div>
</template>
<script>
    import FileSaver from "file-saver";

    import XLSX from "xlsx";
    export default {
        name: "InsurebxList",
        data() {
            return {
                levelList: [
                    { name: "低风险", value: 1 },
                    { name: "一般风险", value: 2 },
                    { name: "较大风险", value: 3 },
                    { name: "重大风险", value: 4 }
                ],
                disDialog: false,
                detailDialog: false,
                trainNumShow: false,
                distributewValue: { expertId: "" },
                searchForm: [
                    {
                        type: "input",
                        label: "关键字",
                        prop: "keyword"
                    }
                ],
                detailInfo: [],
                table: [
                    { prop: "enterpriseName", label: "企业名称" ,width: 250 },
                    { prop: "scale", label: "规模",width: 100  },
                    { prop: "riskLevelShow", label: "风险等级" ,width: 100},
                    { prop: "signingDate", label: "签约日期" ,width: 130},
                    { prop: 'startDate', label: '保险有效开始日期' ,width: 130},
                    { prop: 'endDate', label: '保险有效结束日期' ,width: 130},
                    { prop: "insuredNumber", label: "参保人数" },
                    { prop: "insuredPrice", label: "保险金额" },
                    { prop: "insuredRate", label: "费率" },
                    { prop: "premiumPrice", label: "保费" },
                    { slot: "cxrc", label: "出险人次", width: 150 },
                    { slot: "pfje", label: "赔付金额" },
                    { slot: "operat", label: "操作", width: 130 }
                ],
                deleteMap: [],

                expertList: [],
                otherTypeShow: false,
                otherList: [],
                detailId: "",
                expertDialog: false,
                submitForm: {
                    idx: "",
                    enterpriseName1: "",
                    scale1: "",
                    riskLevelShow1: "",
                    signingDate1: "",
                    insuredNumber1: "",
                    insuredPrice1: "",
                    insuredRate1: "",
                    premiumPrice1: "",
                    bccidentList:[],
                    startDate1:'',
                    endDate1:'',
                }
            };
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
                    this.$message.success("删除成功");
                    this.SearchPageInit();
                });
            },

            levelChangeType(value) {
                //风险下拉
                this.submitForm.riskLevelShow1 = value;
                this.submitForm.riskLevel1 = value;

            },

            insureImport() {
                // 专家导入
                this.expertDialog = false;
                this.$nextTick(() => {
                    this.expertDialog = true;
                });
                if (this.$refs.expertImportForm) {
                    this.$refs.expertImportForm.$refs.queryForm.resetFields();
                }
            },

            expertImportSubmit() {
                // 专家导入-保存
                this.$refs.expertImportForm.$refs.queryForm.validate(valid => {
                    if (valid) {
                        let para = new FormData();
                        for (let key in this.$refs.expertImportForm.queryForm) {
                            para.append(key, this.$refs.expertImportForm.queryForm[key]);
                        }
                        this.$api.insureImport(para).then(() => {
                            this.$message.success(`批量导入成功`);
                            this.expertDialog = false;
                            this.SearchPageInit();
                        });
                    }
                });
            },
            //新增输入框
            addBtn() {
                if(this.submitForm.bccidentList != null && this.submitForm.bccidentList.length != 4){
                    this.submitForm.bccidentList.push({ number1: "", price1: "" });
                }
            },
            //删除当前输入框
            delBtn(index) {
                this.submitForm.bccidentList.splice(index, 1);
            },

            exportExcel() {
                /* generate workbook object from table */
                var xlsxParam = { raw: true }; // 导出的内容只做解析，不进行格式转换
                var wb = XLSX.utils.table_to_book(
                    document.querySelector("#exportTab"),
                    xlsxParam
                );

                /* get binary string as output */
                var wbout = XLSX.write(wb, {
                    bookType: "xlsx",
                    bookSST: true,
                    type: "array"
                });
                try {
                    FileSaver.saveAs(
                        new Blob([wbout], { type: "application/octet-stream" }),
                        "参保企业.xlsx"
                    );
                } catch (e) {
                    // if (typeof console !== 'undefined') {
                    //     console.log(e, wbout)
                    // }
                }
                return wbout;
            },

            goEdit(data) {
                // 赋值
                // this.submitForm = data.row;
                 this.submitForm.id = data.row.idx;

                this.submitForm.enterpriseName1 = data.row.enterpriseName;
                this.submitForm.scale1 = data.row.scale;
                this.submitForm.riskLevelShow1 = data.row.riskLevel;
                this.submitForm.signingDate1 = data.row.signingDate;
                this.submitForm.insuredNumber1 = data.row.insuredNumber;
                this.submitForm.insuredPrice1 = data.row.insuredPrice;
                this.submitForm.insuredRate1 = data.row.insuredRate;
                this.submitForm.premiumPrice1 = data.row.premiumPrice;
                // this.submitForm.bccidentList = data.row.accidentList;
                this.submitForm.startDate1 = data.row.startDate;
                this.submitForm.endDate1 = data.row.endDate;

                if(null !=  data.row.accidentList){
                    for(let item of data.row.accidentList) {
                        this.submitForm.bccidentList.push({"number1":item.number,"price1":item.price})
                    }
                }else{
                    this.submitForm.bccidentList.push({"number1":0,"price1":0})
                }


                this.disDialog = false;
                this.$nextTick(() => {
                    this.disDialog = true;
                });
            },

            qxBtn() {
                //取消
                this.disDialog = false;
                this.submitForm.bccidentList = []
            },
            confirmEdit() {
                //保存
                let param = {}

                param.id = this.submitForm.id
                param.enterpriseName = this.submitForm.enterpriseName1
                param.scale = this.submitForm.scale1
                param.riskLevel = this.submitForm.riskLevelShow1
                param.signingDate = this.submitForm.signingDate1
                param.insuredNumber = this.submitForm.insuredNumber1
                param.insuredPrice = this.submitForm.insuredPrice1
                param.insuredRate = this.submitForm.insuredRate1
                param.premiumPrice = this.submitForm.premiumPrice1
                param.startDate = this.submitForm.startDate1
                param.endDate = this.submitForm.endDate1

                param.accidentList = []
                if(this.submitForm.bccidentList != null){
                    for(let item of this.submitForm.bccidentList) {
                        param.accidentList.push({"number":item.number1,"price":item.price1})
                    }
                }

                this.$api.confirmEdit(param).then(() => {
                    this.$message.success(`保存成功`);
                    this.disDialog = false;
                    this.submitForm.bccidentList = []
                    this.SearchPageInit();
                });
            }
        }
    };
</script>
<style>
    .box {
        margin-top: 10px;
        overflow: hidden;
    }
    .box:first-child {
        margin-top: 0;
    }
</style>