
<template>
    <div>
        <el-steps :active="active" finish-status="success">
            <el-step title="提交报名信息"></el-step>
            <el-step title="订单支付"></el-step>
            <el-step title="报名完成"></el-step>
        </el-steps>

        <!-- step 1 -->
        <el-input v-if="active==1" v-model="applyNum" placeholder="报名人数"></el-input>
        <el-select v-if="active==1" v-model="type" placeholder="培训类型"  style="margin-top: 30px" >
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>

        <el-date-picker v-if="active==1"
                v-model="date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"

        >
        </el-date-picker>

        <input v-if="active==1" type="file" @change="getFile($event)">

        <!-- step 1 -->

        <!-- step2-->
        <el-container  v-if="active==2">
            <el-main>
                     支付金额：{{`${this.tempAmount}`}}
                     <canvas id="qrccode-canvas"></canvas>
            </el-main>
        </el-container>

        <!-- step3-->
        <el-container  v-if="active==3">
            支付已经完成
        </el-container>


        <el-button v-if="active==1" style="margin-top: 12px;" @click="addData">下一步</el-button>
        <el-button v-if="active==2" style="margin-top: 12px;" @click="checkPay">已经完成支付</el-button>

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

                type:'',
                date:'',
                dateTime:'',
                active: 1,
                applyNum:'',
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
                formData: new FormData(),
                tempIdx:'',
                tempAmount:'',
                payUrl:'',

            }
        },
        created() {

        },
        mounted() {

            // this.$nextTick(function () {
            //     // DOM操作
            //     canvas = document.getElementById('qrccode-canvas')
            // })
        },
        methods: {
            addData() {
                let that =this;
                this.formData.append('deadline', this.date);
                this.formData.append('educationType', this.type);
                this.formData.append('enrollNumber', this.applyNum);
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
                    this.createQrc();
                })
            },

            checkPay(){
                let para = { idx:this.tempIdx};
                this.$api.checkPay(para).then(res => {
                    if(res.orderStatus !='2'){
                        alert("还未支付完成");
                    }else{
                        this.active = 3;
                    }
                })
            },


            getFile(event) {
                let file = event.target.files[0]
                this.formData.append('file', file, file.name) // 通过append向form对象添加数据
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
            }

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