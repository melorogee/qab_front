<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'adminCaseList'" >
            <el-button type="text" slot="mainButtons--left" class="searchPage__download" @click="templateDownload"><strong>点击下载：</strong><i class="el-icon-document-delete"></i>安全风险管控体系建设方案模版</el-button>

            <template slot="operat" slot-scope="scope">
                <i class="el-icon-upload" @click="uploadCase(scope)"></i>

                <i class="el-icon-download" v-if="scope.row.url != null" @click="download(scope)"></i>

                <i class="el-icon-delete" v-if="scope.row.url != null" @click="delData(scope)"></i>
            </template>
        </SearchPage>
        <el-dialog title="批量导入行业" :visible.sync="importDialog" width="30%">
            <Form v-if="importDialog" ref="importForm" :form="['file']" :isRequired="'all'" :labelWidth="'100px'" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="importDialog = false">取消</el-button>
                <el-button type="primary" @click="importSubmit">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'Onecase_admin',
        data() {
            return {
                searchForm: [
                    {
                        type: 'input', label: '关键字', prop: 'keyword',
                    }
                ],
                importDialog:false,
                table: [
                    { prop: 'enterpriseName', label: '企业' },

                    { prop: 'name', label: '方案' },
                    { prop: 'createTime', label: '上传时间'  },
                    // { slot: 'htmlContent', label: '详情', width: 380 },
                    // { prop: 'createTime', label: '发布时间' },
                    { slot: 'operat', label: '操作', width: 130 }
                ],
                deleteMap: [],
                userId:"",
                tempCompanyId:""
            }
        },

        created() {
            this.userId = sessionStorage.getItem('userId')

        },

        methods: {
            // importData() {
            //     this.$router.push({name: 'Onecase_companyImport'});
            // },

            download(scope) {
                window.open(scope.row.url); },

            templateDownload(){
                window.open("https://oss.cxzdjs.cn/42458f96f86b42f8b9cb0a7d0e9e7175.doc")
            },
            delData(scope) {
                this.$api.oncaseDelete({idxs: scope.row.idx}).then(() => {
                    this.$message.success('删除成功');
                    this.SearchPageInit();
                })
            },

            uploadCase(scope) { // 行业导入
                this.tempCompanyId=scope.row.enterpriseId
                this.importDialog = false; this.$nextTick(()=>{ this.importDialog = true; })
                if(this.$refs.importForm){ this.$refs.importForm.$refs.queryForm.resetFields(); }
            },
            importSubmit() { // 行业导入-保存
                this.$refs.importForm.$refs.queryForm.validate((valid) => {
                    if (valid) {
                        let para = new FormData();
                        for(let key in this.$refs.importForm.queryForm){
                            para.append(key, this.$refs.importForm.queryForm[key]);
                        }
                        para.append("enterpriseId" ,this.tempCompanyId)
                        this.$api.oneCaseImport(para).then(() => {
                            this.$message.success(`导入一案成功`);
                            this.importDialog = false;
                            this.SearchPageInit();
                        })
                    }
                });
            },

        }
    }
</script>