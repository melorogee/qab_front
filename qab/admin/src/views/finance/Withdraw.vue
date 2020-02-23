<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :setValue="{status: 1}" :api="'withdrawList'">
            <template slot="amount" slot-scope="scope">￥{{scope.row.amount}}</template>
            <template slot="platformFeeAmount" slot-scope="scope">￥{{scope.row.platformFeeAmount}}</template>
            <template slot="status" slot-scope="scope">{{status[scope.row.status]}}</template>
            <template slot="operat" slot-scope="scope">
                <el-button type="text" @click="ok(scope)">完成</el-button>
                <el-button type="text" @click="no(scope)">失败</el-button>
            </template>
        </SearchPage>
        <el-dialog title="确认审核" :visible.sync="noDialog" width="30%">
            <Form v-if="noDialog" ref="noFrom" :form="[{
                label: '失败原因',
                type: 'textarea',
                prop: 'remark'
            }]" :setValue="noDialogValue" :isRequired="'all'" :labelWidth="'100px'" />
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="noDialog=false">取消</el-button>
                <el-button type="success" @click="save">确认</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'Withdraw',
    data() {
        return {
            noDialog: false,
            noDialogValue: {},
            status: {
                1: '未审核',
                2: '审核成功打款',
                3: '审核失败'
            },
            searchForm: [
                {
                    type: 'select', label: '状态', prop: 'status', clearable: true,
                    list: [
                        { idx: 1, name: '未审核'},
                        { idx: 2, name: '审核成功打款'},
                        { idx: 3, name: '审核失败'},
                    ]
                },
                {
                    type: 'input', label: '关键字', prop: 'keyword',
                }
            ],
            table: [
                { prop: 'userName', label: '提现用户' },
                { prop: 'amount', label: '提现金额(元)' },
                { prop: 'userName', label: '收款账户' },
                { prop: 'bankCardNo', label: '收款卡号' },
                { prop: 'bankName', label: '开户银行名称' },
                { prop: 'createTime', label: '申请时间', width: 140 },
                { slot: 'status', label: '状态' },
                { slot: 'operat', label: '操作', width: 120 }
            ]
        }
    },
    created() {},
    
    methods: {
        ok(scope) {
            this.$confirm('是否确认已将提现金额打款到用户银行卡？', '标记完成', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.confirmPayment({id: scope.row.idx}).then(() => {
                    this.SearchPageInit();
                })
            })
        },
        no(scope){
            // console.log(scope)
            this.noDialog = false; this.$nextTick(()=>{ this.noDialog = true; })
            this.noDialogValue = {id: scope.row.idx};
        },
        save(){
            this.$refs.noFrom.$refs.queryForm.validate((valid) => {
                if (valid) {
                    this.$api.auditReject(this.$refs.noFrom.queryForm).then(() => {
                        this.$message.success('关闭成功');
                        this.SearchPageInit();
                    })
                }
            });
        }
    }
}
</script>