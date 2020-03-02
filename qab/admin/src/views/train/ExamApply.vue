
<template>
    <div class="submitForm">
        <div class="applyParent">
            <div class="applyForm">
                <h3 class="submitForm__title">考试报名</h3>
                <p class="submitForm__msg" style="margin-bottom: 20px;">支付完成即报名成功</p>
                <el-steps :active="active" finish-status="success" style="margin: 20px 0 10px 0">
                    <el-step title="提交报名信息"></el-step>
                    <el-step title="订单支付"></el-step>
                    <el-step title="报名完成"></el-step>
                </el-steps>
                <!-- step 1 -->
                <div class="customForm" v-if="active==0">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="报名人数：" prop="applyNum">
                            <el-input v-model="ruleForm.applyNum" placeholder="请输入人数"></el-input>
                        </el-form-item>
                        <el-form-item label="培训类型：" prop="type">
                            <el-select v-model="ruleForm.type" placeholder="请选择培训类型">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="上传报名名单：" prop="file">
                            <div class="fileParent">
                                <el-input v-model="ruleForm.file" placeholder="请选择报名名单" disabled></el-input>
                                <div class="fileInput"><input type="file" @change="getFile($event)"></div>
                                <span>选择文件</span>
                            </div>
                        </el-form-item>
                        <el-form-item label="考试截止时间：" prop="date">
                            <el-date-picker
                                v-model="ruleForm.date"
                                type="date"
                                placeholder="请选择截止日期"
                                value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd"
                                :picker-options="pickerBeginDateBefore"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" style="margin-top: 12px;margin-left: 200px" @click="addData">提交</el-button>
                </div>
                <!-- step2-->
                <div style="padding:10px 60px 0 30px" v-if="active==2">
                    <div class="applyPrice">
                        应支付费用：￥ <span>{{`${this.tempAmount}`}}</span>
                    </div>
                    <div class="applyDetail">
                        <div class="title">您已报名正式考试，订单信息如下：</div>
                        <div>报名人数：<span>{{ruleForm.applyNum}}</span></div>
                        <div>培训类型：<span>{{map[ruleForm.type]}}</span></div>
                        <div>员工名单：<span>{{ruleForm.file}}</span></div>
                        <div>考试截止：<span>{{ruleForm.date}}</span></div>
                    </div>
                    <div class="applyBtn1">
                        <el-button type="warning" @click="payDialog">支付</el-button>
                    </div>
                    <el-dialog
                        :visible.sync="showDialog"
                        width="300px"
                        :show-close="false"
                        :destroy-on-close="true"
                        >
                        <div class="payContent">
                            <div class="payTitle">
                                <div>微信支付</div>
                                <div class="payTitleSub">请使用微信扫码支付</div>
                            </div>
                            <div class="qrccodeBox"><canvas id="qrccode-canvas"></canvas></div>
                            <div class="payFooter">
                                <span @click="cancel"><i class="el-icon-error" style="color:#909399" /> 暂不支付</span>
                                <span @click="checkPay"><i class="el-icon-success" style="color:#67c23a" /> 我已支付</span>
                            </div>
                        </div>
                    </el-dialog>
                </div>
                <!-- step3-->
                <div style="text-align:center" v-if="active==3">
                    <i class="el-icon-success" style="color:#00b238;font-size: 70px;margin:10px 0;" />
                    <div style="font-size:16px;color:#4a4d53;margin-bottom:5px;">您的订单已支付完成</div>
                    <div style="font-size:12px;color:#969696;margin-bottom:20px;">可在“我的考试”中跟踪订单，查看进度状态</div>
                    <el-button @click="backList" size="large">返回</el-button>
                </div>
            </div>
            <div class="applyInfo">
                <div class="infoTitle">报名须知</div>
                <div class="infoDetail">
                    <div class="title">报名费用标准</div>
                    <div class="content">
                        <div>以企业为单位，按照月度收取：</div>
                        <div>50人以下：500元；</div>
                        <div>50-100人：1000元；</div>
                        <div>100-200下：1500元；</div>
                        <div>200人以上：2000元；</div>
                    </div>
                    <div class="title">报名表模板下载</div>
                    <div class="infoDownload">
                        <i class="el-icon-document" /> <span @click="downLoadTemplate">{{templateName}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'  //引入axios
    var QRCode = require('qrcode')
    var canvas = ''

    export default {
        name: 'ExamApply',
        data() {
            return {
                active: 0,
                options: [{
                    value: '1',
                    label: '新员工三级培训'
                }, {
                    value: '2',
                    label: '继续教育'
                }, {
                    value: '3',
                    label: '取证教育'
                }],
                map: {
                    1:'新员工三级培训',
                    2:'继续教育',
                    3:'取证教育'
                },
                formData: new FormData(),
                tempIdx:'',
                tempAmount:'',
                payUrl:'',
                ruleForm: {
                    applyNum: '',
                    type: '',
                    file: '',
                    date: '',
                },
                rules: {
                    applyNum: [
                        { required: true, message: '请输入人数', trigger: 'blur' },
                    ],
                    type: [
                        { required: true, message: '请选择培训类型', trigger: 'change' }
                    ],
                    file: [
                        { required: true, message: '请上传报名名单', trigger: 'blur' },
                    ],
                    date: [
                        { type: 'date', required: true, message: '请选择截止日期', trigger: 'change' }
                    ],
                },
                showDialog: false,
                templateName: '',
                templateUrl: '',
                pickerBeginDateBefore: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的
                    }
                },
            }
        },
        created() {
            let this_ =this;
            axios.get(`/manage/examination/enroll/template/download/list`).then(function(res){
                this_.templateUrl = res.data.data[0].url;
                this_.templateName = res.data.data[0].name;
            });
        },
        mounted() {

        },
        methods: {
            downLoadTemplate() {
                
                window.open(this.templateUrl);
            },
            addData() {
                let that =this;
                this.formData.append('deadline', this.ruleForm.date);
                this.formData.append('educationType', this.ruleForm.type);
                this.formData.append('enrollNumber', this.ruleForm.applyNum);
                let config = {
                    headers: {'Content-Type': 'multipart/form-data'}
                }
                axios.post(`/manage/examination/enroll/import`,this.formData,config).then(function(res){
                    that.tempIdx = res.data.data.idx;
                    that.getStep2Info();
                });
            },

            getStep2Info(){
                this.active = 2;
                let para = { orderId:this.tempIdx,type:3};
                this.$api.getPayUrl(para).then(res => {
                    this.payUrl = res.codeUrl;
                    this.tempAmount=res.amount;
                })
            },

            checkPay(){
                let para = { idx:this.tempIdx};
                this.$api.checkPay(para).then(res => {
                    if(res.orderStatus !='2'){
                        this.$message.error("还未支付完成");
                    }else{
                        this.active = 3;
                    }
                })
            },

            getFile(event) {
                let file = event.target.files[0];
                if(file.name.indexOf('.xlsx')>0){
                    this.ruleForm.file = file.name;
                    this.formData.append('file', file, file.name) // 通过append向form对象添加数据
                }else{
                    this.$message.error("请上传xlsx格式文件");
                }

            },

            createQrc: function () {
                canvas = document.getElementById('qrccode-canvas');
                console.log(canvas)
                QRCode.toCanvas(canvas, this.payUrl, (error) => {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log('success')
                    }
                })
            },

            backStep(){
                this.active = 0;
            },

            payDialog(){
                this.showDialog = true;
                let para = { orderId:this.tempIdx,type:3};
                this.$api.getPayUrl(para).then(res => {
                    this.payUrl = res.codeUrl;
                    this.tempAmount=res.amount;
                    this.createQrc();
                })
            },

            cancel(){
                this.showDialog = false;
            },

            backList(){
                this.$router.push({name: 'ExamList'});
            },



    }
    }
</script>
<style>
    .btn-wrap {
        width: 260px;
        height: 260px;
        margin: 0 auto;
    }
    .btn-wrap textarea{
        width: 260px;
        height: 260px;
    }
</style>