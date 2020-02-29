<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'trainexamList'">
            <el-button type="success" slot="mainButtons--left" icon="el-icon-add"  @click="addData" >考试报名</el-button>
            <template slot="educationType" slot-scope="scope">{{map[scope.row.educationType]}}</template>
            <template slot="orderStatus" slot-scope="scope">{{map1[scope.row.orderStatus]}}</template>

            <template slot="operat" slot-scope="scope">
                <el-button type="success" icon="el-icon-add" v-if="scope.row.orderStatus=='0'" @click="goPay(scope.row.idx)" >立即支付</el-button>

            </template>
        </SearchPage>

        <el-dialog
                title="支付订单"
                :visible.sync="dialogVisible"
                width="30%"
                >
            <span>
                    支付金额：{{`${this.tempAmount}`}}
                     <canvas id="qrccode-canvas"></canvas>
            </span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="checkPay">确 定</el-button>
              </span>
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
                {  label: '序号' , width: 130,type:'index' },
                { slot: 'educationType', label: '考试类型', width: 170 },
                { slot: 'enrollNumber', label: '人数', width: 130  },
                { slot: 'url', label: '考试名单' , width: 130 },
                { slot: 'deadline', label: '考试截止时间' , width: 130 },
                { slot: 'price', label: '报名费用（元）' , width: 130 },
                { slot: 'orderStatus', label: '状态' , width: 130 },

                { slot: 'operat', label: '操作', width: 130 }

            ],
            dialogVisible:false,
            tempAmount:'',
            payUrl:'',
        }
    },
    created() { },
    methods: {
        addData() {
            this.$router.push({name: 'ExamApply'});

        },



        delData(scope) {
            this.$api.planDelete({idxs: scope.row.idx}).then(() => {
                this.$message.success('删除成功');
                this.SearchPageInit();
            })
        },

        viewData(scope){
            this.$router.push(
                {name:'PlanView',
                    query: {
                        idxs: scope.row.idx
                    }}
            );
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
            console.log(canvas)
            QRCode.toCanvas(canvas, this.payUrl, (error) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log('success')
                }
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
                    alert("还未支付完成");
                }else{
                    alert("支付完成");
                    this.dialogVisible = false;
                    this.SearchPageInit();

                }
            })
        }




    }
}
</script>