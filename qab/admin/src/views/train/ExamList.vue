<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'trainexamList'">
            <el-button type="primary" slot="mainButtons--left" icon="el-icon-edit"  @click="addData" >考试报名</el-button>
            <template slot="educationType" slot-scope="scope">{{map[scope.row.educationType]}}</template>
            <template slot="name" slot-scope="scope"><span style="color:#409EFF;cursor:pointer" @click='downloadUrl(scope)'>{{scope.row.fileName}}</span></template>
            <template slot="orderStatus" slot-scope="scope">{{map1[scope.row.orderStatus]}}</template>
            <template slot="operat" slot-scope="scope">
                <span v-if="scope.row.orderStatus=='0'" @click="goPay(scope.row.idx)" style="color:#409EFF;cursor:pointer">立即支付</span>
                <span v-else>--</span>
            </template>
        </SearchPage>
        <el-dialog
            :visible.sync="dialogVisible"
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
                <div class="payPrice">支付金额：￥{{`${this.tempAmount}`}}</div>
                <div class="payFooter">
                    <span @click="cancel"><i class="el-icon-error" style="color:#909399" /> 暂不支付</span>
                    <span @click="checkPay"><i class="el-icon-success" style="color:#67c23a" /> 我已支付</span>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    var QRCode = require('qrcode')
    var canvas = ''
export default {
    name: 'ExamList',
    data() {
        return {
            searchForm: [],
            map: {
                1:'新员工三级培训',
                2:'继续教育',
                3:'取证教育'
            },
            map1: {
                0:'未支付',
                1:'支付中',
                2:'支付完成',
                3:'支付失败',
                4:'已取消'
            },
            table: [
                { slot: 'educationType', label: '考试类型' },
                { prop: 'enrollNumber', label: '人数', width: 130 },
                { slot: 'name', label: '考试名单' },
                { prop: 'deadline', label: '考试截止时间', width: 200 },
                { prop: 'price', label: '报名费用（元）', width: 180 },
                { slot: 'orderStatus', label: '状态', width: 180 },
                { slot: 'operat', label: '操作', width: 130 }
            ],
            dialogVisible:false,
            tempAmount:'',
            payUrl:'',
        }
    },
    created() {
        this.SearchPageInit();
    },
    watch:{
        $route(){
            //跳转到该页面后需要进行的操作
            this.SearchPageInit();

        }
    },

    methods: {
        addData() {
            this.$router.push({name: 'ExamApply'});

        },
        downloadUrl(scope){
            window.open(scope.row.url);
        },
        goPay(id){
            this.dialogVisible=true;
            let para = { orderId:id,type:3};
            this.$api.getPayUrl(para).then(res => {
                this.payUrl = res.codeUrl;
                this.tempAmount=res.amount;
                this.tempIdx=id;
                this.createQrc();
            })
        },
        createQrc: function () {
            canvas = document.getElementById('qrccode-canvas');
            QRCode.toCanvas(canvas, this.payUrl, () => {
                // if (error) {
                //     console.log(error)
                // } else {
                //     console.log('success')
                // }
            })
        },
        cancel:function(){
            this.dialogVisible = false,
                this.tempAmount='0',
                this.payUrl='0',
                this.tempIdx=''
        },
        checkPay:function () {
            let para = { idx:this.tempIdx};
            this.$api.checkPay(para).then(res => {
                if(res.orderStatus !='2'){
                    this.$message.error("还未支付完成");
                }else{
                    this.$message.success("支付完成");
                    this.dialogVisible = false;
                    this.SearchPageInit();

                }
            })
        }
    }
}
</script>