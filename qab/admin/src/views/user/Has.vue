<template>
    <div>
        <el-tabs>
            <el-tab-pane label="企业注册">
                <SearchPage ref="enterpriseUser" :searchForm="enterpriseUserSearchForm" :table="enterpriseUserTable" :setValue="{status: 2}" :api="'enterpriseUserList'">
                    <el-button type="primary" slot="mainButtons--left" icon="el-icon-plus" @click="enterpriseUserAdd">新增</el-button>
                    <template slot="operat" slot-scope="scope">
                        <el-button type="text" @click="enterpriseUserDetail(scope)">详情</el-button>
                        <!-- <el-button type="text" @click="enterpriseUserReview(scope.row, 2)">通过</el-button>
                        <el-button type="text" @click="enterpriseUserReview(scope.row, 1)">拒绝</el-button> -->
                        <el-button type="text" @click="enterpriseUserDelete(scope)">删除</el-button>
                    </template>
                </SearchPage>
            </el-tab-pane>
            <el-tab-pane label="专家/特殊工种注册">
               <SearchPage ref="expertUser" :searchForm="expertUserSearchForm" :table="expertUserTable" :setValue="{status: 2}" :api="'expertUserList'">
                    <el-button type="primary" slot="mainButtons--left" icon="el-icon-plus" @click="expertUserAdd">新增</el-button>
                    <template slot="operat" slot-scope="scope">
                        <el-button type="text" @click="expertUserDetail(scope)">详情</el-button>
                        <!-- <el-button type="text" @click="expertUserReview(scope.row, 2)">通过</el-button>
                        <el-button type="text" @click="expertUserReview(scope.row, 1)">拒绝</el-button> -->
                        <el-button type="text" @click="expertUserDelete(scope)">删除</el-button>
                    </template>
                </SearchPage>
            </el-tab-pane>
            <el-tab-pane label="监管部门">
                <SearchPage ref="superviseUser" :searchForm="superviseUserSearchForm" :table="superviseUserTable" :setValue="{status: 2}" :api="'superviseUserList'">
                    <el-button type="primary" slot="mainButtons--left" icon="el-icon-plus" @click="superviseUserAdd">新增</el-button>
                    <template slot="operat" slot-scope="scope">
                        <el-button type="text" @click="superviseUserEdit(scope)">编辑</el-button>
                        <el-button type="text" @click="superviseUserDelete(scope)">删除</el-button>
                    </template>
                </SearchPage>
            </el-tab-pane>
        </el-tabs><!-- // tabs end -->

        <el-dialog title="查看详情" :visible.sync="enterpriseUserDialog" width="60%">
            <table class="defaultTable">
                <tr><th>企业名称</th><td>{{enterpriseUserRow.name}}</td><th>统一社会信用代码</th><td>{{enterpriseUserRow.idCode}}</td></tr>
                <tr><th>行政地区</th><td>{{enterpriseUserRow.addr}}</td><th>详细地址</th><td>{{enterpriseUserRow.fullAddr}}</td></tr>
                <tr><th>营业执照</th><td><el-button type="primary" @click="showImg(enterpriseUserRow.businessLicenseUrl[0])">点击查看</el-button></td><th>行业类型</th><td>{{enterpriseUserRow.industryName}}</td></tr>
                <tr><th>联系人</th><td>{{enterpriseUserRow.contacts}}</td><th>联系电话</th><td>{{enterpriseUserRow.phone}}</td></tr>
            </table>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="enterpriseUserReview(enterpriseUserRow, 1)">拒绝通过</el-button>
                <el-button type="success" @click="enterpriseUserReview(enterpriseUserRow, 2)">审核通过</el-button>
            </span> -->
        </el-dialog>

        <el-dialog title="查看详情" :visible.sync="expertUserDialog" width="60%">
            <table class="defaultTable">
                <tr><th>专家名称</th><td>{{expertUserRow.name}}</td><th>身份证号码</th><td>{{expertUserRow.id}}</td></tr>
                <tr><th>行政地区</th><td>{{expertUserRow.addr}}</td><th>常住地址</th><td>{{expertUserRow.fullAddr}}</td></tr>
                <tr><th>专家类型</th><td>{{expertUserRow.expertTypeName}}</td><th>资质证书</th><td><el-button type="primary" @click="showImg(expertUserRow.certificateUrl[0])">点击查看</el-button></td></tr>
                <tr><th>行业类型</th><td>{{expertUserRow.industryName}}</td><th>联系电话</th><td>{{expertUserRow.phone}}</td></tr>
            </table>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="expertUserReview(expertUserRow, 1)">拒绝通过</el-button>
                <el-button type="success" @click="expertUserReview(expertUserRow, 2)">审核通过</el-button>
            </span> -->
        </el-dialog>

        <el-dialog title="确认审核" :visible.sync="expertUserDialogToReview" width="60%">
            <Form v-if="expertUserDialogToReview" ref="expertUserDialogToReview" :form="['serviceItemsList_dis', 'platformFee']" :setValue="expertUserDialogToReviewValue" :isRequired="'all'" :labelWidth="'100px'" />
            <!-- <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="expertUserDialogToReviewApi(expertUserRow, 1)">拒绝通过</el-button>
                <el-button type="success" @click="expertUserDialogToReviewApi(expertUserRow, 2)">审核通过</el-button>
            </span> -->
        </el-dialog>

        <el-dialog title="查看" :visible.sync="imgDialog" width="60%">
            <img :src="img" style="width: 100%;" />
        </el-dialog>


    </div>
</template>
<script>
export default {
    name: 'Has',
    data() {
        return {
            enterpriseUserSearchForm: [],
            enterpriseUserTable: ['enterpriseUser', 'industryName', 'contacts', 'phone', 'createTime', 'operat10'],
            expertUserSearchForm: [],
            expertUserTable: ['expertUser', 'id', 'industryName', 'phone', 'createTime', 'operat10'],
            superviseUserSearchForm: [],
            superviseUserTable: ['superviseUser', 'phone', 'industryName', 'department', 'fullAddr', 'createTime', 'operat10'],
            enterpriseUserDialog: false,
            enterpriseUserRow: {},
            expertUserDialog: false,
            expertUserRow: {},
            imgDialog: false,
            img: '',
            expertUserDialogToReview: false,
            expertUserDialogToReviewValue: {}
        }
    },
    created() {

    },
    
    methods: {
        enterpriseUserAdd() { // 行业新增
            this.$router.push({name: 'enterpriseUserCAdd'});
        },
        expertUserAdd() { // 行业新增
            this.$router.push({name: 'expertUserCAdd'});
        },
        superviseUserAdd() { // 行业新增
            this.$router.push({name: 'superviseUserCAdd'});
        },
        superviseUserEdit(scope) { // 行业新增
            this.$api.superviseUserDetail({id: scope.row.idx}).then(res => {
                let setValue = {
                    // 'superviseUser', 'phone', 'districtCode', 'industryId', 'department', 'fullAddr', 'password'
                    idx: res.idx,
                    name: res.name,
                    provinceCode: res.provinceCode,
                    cityCode: res.cityCode,
                    districtCode: res.districtCode,
                    'provinceCode,cityCode,districtCode': [ res.provinceCode, res.cityCode, res.districtCode],
                    industryId: res.industryId,
                    fullAddr: res.fullAddr,
                    password: res.password,
                    phone: res.phone,
                    department: res.department
                }
                this.$router.push({name: 'superviseUserCEdit', query: {setValue: JSON.stringify(setValue)}});
            })
            
        },
        enterpriseUserDetail(scope) {
            let para = { id: scope.row.idx };
            this.$api.enterpriseUserDetail(para).then(res => {
                this.enterpriseUserRow = res;
                this.enterpriseUserDialog = true;
            });
        },
        expertUserDetail(scope) {
            let para = { id: scope.row.idx };
            this.$api.expertUserDetail(para).then(res => {
                this.expertUserRow = res;
                this.expertUserDialog = true;
            });
        },
        enterpriseUserReview(row, status) {
            this.$confirm(status == 1 ? '是否确认拒绝用户的注册申请?' : '是否确认通过用户的注册申请', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let para = { id: row.idx, status: status };
                this.$api.enterpriseUserReview(para).then(() => {
                    this.$message.success(status == 1 ? '拒绝通过' : '审核通过');
                    this.enterpriseUserDialog = false;
                    this.$refs.enterpriseUser.getData();
                })
            })
        },
        expertUserReview(row) {
            let para = { id: row.idx };
            this.$api.getServiceItemsById(para).then(res => {
                this.expertUserDialogToReview = false; this.$nextTick(()=>{ this.expertUserDialogToReview = true; })
                this.expertUserDialogToReviewValue = {idx: row.idx, serviceItemsList: res.list, platformFee: res.flatformFee};
            })
        },
        expertUserDialogToReviewApi(row, status){
            this.$confirm(status == 1 ? '是否确认拒绝用户的注册申请?' : '是否确认通过用户的注册申请', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let para = {
                    "expertId": this.$refs.expertUserDialogToReview.queryForm.idx,
                    "list": this.$refs.expertUserDialogToReview.queryForm.serviceItemsList,
                    "platformFee": this.$refs.expertUserDialogToReview.queryForm.platformFee,
                    "status": status
                };
                this.$api.expertUserReview(para).then(() => {
                    this.$message.success(status == 1 ? '拒绝通过' : '审核通过');
                    this.expertUserDialog = false;
                    this.expertUserDialogToReview= false;
                    this.$refs.expertUser.getData();
                })
            })
        },
        enterpriseUserDelete(scope) {
            let para = { idList: [scope.row.idx] };
            this.$api.enterpriseUserDelete(para).then(() => {
                this.$message.success('删除成功');
                this.$refs.enterpriseUser.getData();
            })     
        },
        expertUserDelete(scope) {
            let para = { idList: [scope.row.idx] };
            this.$api.expertUserDelete(para).then(() => {
                this.$message.success('删除成功');
                this.$refs.expertUser.getData();
            })     
        },
        superviseUserDelete(scope) {
            let para = { idList: [scope.row.idx] };
            this.$api.superviseUserDelete(para).then(() => {
                this.$message.success('删除成功');
                this.$refs.superviseUser.getData();
            })     
        },
        showImg(img) {
            this.img = img;
            this.imgDialog = true;
        },
    }
}
</script>