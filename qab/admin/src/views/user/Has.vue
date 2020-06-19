<template>
    <div>
        <el-tabs>
            <el-tab-pane label="企业注册">
                <SearchPage ref="enterpriseUser" :searchForm="enterpriseUserSearchForm" :table="enterpriseUserTable" :setValue="{status: 2}" :api="'enterpriseUserList'">
                    <el-button type="primary" slot="mainButtons--left" icon="el-icon-plus" @click="enterpriseUserAdd">新增</el-button>
                    <template slot="operat" slot-scope="scope">
                        <el-button type="text" @click="enterpriseUserDetail(scope)">详情</el-button>
                        <el-button type="text" @click="enterpriseUserEdit(scope)">编辑</el-button>

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
                        <el-button type="text" @click="expertUserEdit(scope)">编辑</el-button>

                        <!-- <el-button type="text" @click="expertUserReview(scope.row, 2)">通过</el-button>
                        <el-button type="text" @click="expertUserReview(scope.row, 1)">拒绝</el-button> -->
                        <el-button type="text" @click="expertUserDelete(scope)">删除</el-button>
                    </template>
                </SearchPage>
            </el-tab-pane>
            <el-tab-pane label="机构">
                <SearchPage ref="orgUser"  :table="orgTable" :setValue="{status: 2}" :api="'orgList'">
                    <el-button type="primary" slot="mainButtons--left" icon="el-icon-plus" @click="orgAdd">新增</el-button>
                    <template slot="orgOperat" slot-scope="scope">
                        <el-button type="text" @click="orgDetail(scope)">详情</el-button>
                        <el-button type="text" @click="orgUserEdit(scope)">编辑</el-button>

                        <!-- <el-button type="text" @click="expertUserReview(scope.row, 2)">通过</el-button>
                        <el-button type="text" @click="expertUserReview(scope.row, 1)">拒绝</el-button> -->
                        <el-button type="text" @click="orgDelete(scope)">删除</el-button>
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
                <tr><th>证书编号</th><td>{{expertUserRow.certificateNo}}</td><th>证书有效期</th><td>{{expertUserRow.certificateExpire}}</td></tr>

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


        <el-dialog title="查看详情" :visible.sync="orgUserDialog" width="60%">
            <table class="defaultTable">
                <tr><th>机构名称</th><td>{{orgUserRow.name}}</td><th>联系人</th><td>{{orgUserRow.contact}}</td></tr>
                <tr><th>联系方式</th><td>{{orgUserRow.phone}}</td><th>机构类别</th><td>{{orgUserRow.category}}</td></tr>
                <tr><th>业务范围</th><td>{{orgUserRow.businessScope}}</td><th>机构地址</th><td>{{orgUserRow.fullAddr}}</td></tr>
            </table>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="expertUserReview(expertUserRow, 1)">拒绝通过</el-button>
                <el-button type="success" @click="expertUserReview(expertUserRow, 2)">审核通过</el-button>
            </span> -->
        </el-dialog>



        <el-dialog title="编辑" :visible.sync="editDialog" width="30%">
            <Form v-if="editDialog" ref="userEditForm" :form="[ 'businessLicenseUrl', 'districtCode_user', 'fullAddr', 'industryId', 'contacts' ]" :setValue="userValue" :isRequired="'all'" :labelWidth="'100px'" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialog = false">取消</el-button>
                <el-button type="primary" @click="userEditSubmit">保存</el-button>
            </span>
        </el-dialog>

        <el-dialog title="编辑" :visible.sync="editDialog1" width="30%">
            <Form v-if="editDialog1" ref="userEditForm1"
                  :form="['expertUser',  'certificateUrl', 'districtCode_user', 'fullAddr','industryId', 'type', 'qualifications', 'phone', 'certificateNumber','certificateValidityPeriod']" :setValue="userValue1" :isRequired="'all'" :labelWidth="'100px'" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialog1 = false">取消</el-button>
                <el-button type="primary" @click="userEditSubmit1">保存</el-button>
            </span>
        </el-dialog>


        <el-dialog title="编辑" :visible.sync="editDialog2" width="30%">
            <Form v-if="editDialog2" ref="userEditForm2"
                  :form="['orgName', 'orgContact', 'orgContactNum', 'orgType1','orgType', 'districtCode', 'orgAddress','orgBusiness','qualificationUrl']" :setValue="userValue2" :isRequired="'all'" :labelWidth="'100px'" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialog2 = false">取消</el-button>
                <el-button type="primary" @click="userEditSubmit2">保存</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
export default {
    name: 'Has',
    data() {
        return {

            userValue:{},
            userValue1:{},
            userValue2:{},

            editDialog:false,
            editDialog1:false,
            editDialog2:false,

            enterpriseUserSearchForm: [],
            enterpriseUserTable: ['enterpriseUser', 'industryName', 'contacts', 'phone', 'createTime', 'operat10'],
            expertUserSearchForm: [],
            expertUserTable: ['expertUser', 'id', 'industryName', 'phone', 'createTime', 'operat10'],
            superviseUserSearchForm: [],
            superviseUserTable: ['superviseUser', 'phone', 'industryName', 'department', 'fullAddr', 'createTime', 'operat10'],
            enterpriseUserDialog: false,
            enterpriseUserRow: {},
            expertUserDialog: false,
            orgUserDialog: false,

            expertUserRow: {},
            orgUserRow: {},
            imgDialog: false,
            img: '',
            expertUserDialogToReview: false,
            expertUserDialogToReviewValue: {},
            orgTable: [
                { prop: 'name', label: '机构名称' },
                { prop: 'contact', label: '联系人' },
                { prop: 'phone', label: '联系方式' },
                { prop: 'category', label: '机构类别' },
                { prop: 'businessScope', label: '业务范围'},
                { prop: 'fullAddr', label: '机构地址' },
                { prop: 'createTime', label: '注册提交时间' },

                { slot: 'orgOperat', label: '操作', width: 130 }
            ],
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
        orgAdd() { // 行业新增
            this.$router.push({name: 'orgAdd'});
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
                    'provinceCode,cityCode,districtCode': [ res.provinceCode, res.cityCode, res.districtCode,res.townshipCode],
                    industryId: res.industryId,
                    fullAddr: res.fullAddr,
                    password: res.password,
                    townshipCode: res.townshipCode,
                    phone: res.phone,
                    department: res.department,
                    districtCode_user:res.districtCode,
                    superviseLevel:res.level,
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

        orgDetail(scope) {
            let para = { idx: scope.row.idx };
            this.$api.orgDetail(para).then(res => {
                this.orgUserRow = res;
                this.orgUserDialog = true;
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
        orgDelete(scope) {
            let para = { idxs: scope.row.idx };
            this.$api.orgDelete(para).then(() => {
                this.$message.success('删除成功');
                this.$refs.orgUser.getData();
            })
        },
        showImg(img) {
            this.img = img;
            this.imgDialog = true;
        },


        enterpriseUserEdit(scope) {
            let para = { id: scope.row.idx };
            // this.userValue= scope.row;
            this.$api.enterpriseUserDetail(para).then(res => {
                this.userValue = res;
                this.editDialog = true;

            });
        },

        userEditSubmit(){
            this.$refs.userEditForm.$refs.queryForm.validate((valid) => {
                if (valid) {
                    let para = {...this.$refs.userEditForm.queryForm};
                    para.businessLicenseUrl = para.businessLicenseUrl.toString()

                    this.$api.enterpriseUpdate(para).then(() => {
                        this.$message.success(`编辑企业账户成功`);
                        this.editDialog = false;
                        this.$refs.enterpriseUser.getData();
                    })
                }
            });
        }  ,


        expertUserEdit(scope) {
            let para = { id: scope.row.idx };
            this.$api.expertUserDetail(para).then(res => {
                res.certificateUrl = res.certificateUrl.toString()
                res.list = null
                this.userValue1 = res;
                this.editDialog1 = true;
                this.userValue1.certificateNumber = res.certificateNo
                this.userValue1.certificateValidityPeriod = res.certificateExpire
            });
        },


        userEditSubmit1(){
            this.$refs.userEditForm1.$refs.queryForm.validate((valid) => {
                if (valid) {
                    let para = {...this.$refs.userEditForm1.queryForm};
                    // para.businessLicenseUrl = para.businessLicenseUrl.toString()
                    this.$api.expertUpdate(para).then(() => {
                        this.$message.success(`编辑专家/特征作业人员账户成功`);
                        this.editDialog = false;
                        this.$refs.enterpriseUser.getData();
                    })
                }
            });
        },



        orgUserEdit(scope) {
            let para = { idx: scope.row.idx };
            this.$api.orgDetail(para).then(res => {
                this.userValue2 = res;
                this.editDialog2 = true;

            });
        },

        userEditSubmit2(){
            this.$refs.userEditForm2.$refs.queryForm.validate((valid) => {
                if (valid) {
                    // let para = {...this.$refs.userEditForm2.queryForm};
                    // para.businessLicenseUrl = para.businessLicenseUrl.toString()
                    this.$message.warning("暂不支持")
                    // this.$api.orgUpdate(para).then(() => {
                    //     this.$message.success(`编辑专家/特征作业人员账户成功`);
                    //     this.editDialog = false;
                    //     this.$refs.enterpriseUser.getData();
                    // })
                }
            });
        },


}
}
</script>