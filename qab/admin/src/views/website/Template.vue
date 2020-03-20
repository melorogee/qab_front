<template>
    <div>
        <SearchPage ref="expert" :searchForm="expertSearchForm" :table="expertTable" :api="'templateList'">
            <el-button type="success" slot="mainButtons--left" icon="el-icon-upload" @click="expertImport">导入</el-button>
            <template slot="operat" slot-scope="scope">
                <i class="el-icon-download"  @click="download(scope)"></i>

                <i class="el-icon-upload" @click="expertImport2(scope)"></i>
                <i class="el-icon-delete" @click="expertDelete(scope)"></i>

            </template>
        </SearchPage>

        <el-dialog title="导入" :visible.sync="expertImportDialog" width="30%">
            <Form v-if="expertImportDialog" ref="expertImportForm" :form="['industryId', 'file']" :isRequired="'all'" :labelWidth="'100px'" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="expertImportDialog = false">取消</el-button>
                <el-button type="primary" @click="expertImportSubmit">保存</el-button>
            </span>
        </el-dialog>

        <el-dialog title="更新" :visible.sync="expertImportDialog2" width="30%">
            <Form v-if="expertImportDialog2" ref="aa" :form="['industryId_dis', 'file']" :setValue="expertValue" :isRequired="'all'" :labelWidth="'100px'" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="expertImportDialog2 = false">取消</el-button>
                <el-button type="primary" @click="expertImportSubmit2">保存</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
export default {
    name: 'Template',
    data() {
        return {
            expertSearchForm: ['industryId'],
            expertTable: ['template', 'industryName',  'createTime', { slot: 'operat', label: '操作' , width: 100 } ],
            expertAddDialog: false,
            expertEditDialog: false,
            expertImportDialog2: false,
            expertValue: {},
            expertImportDialog: false,
        }
    },
    created() {

    },
    
    methods: {
        expertDelete(scope) { // 专家删除
            this.$api.templateDelete({idxs: scope.row.idx}).then(() => {
                this.$message.success('删除成功');
                this.$refs.expert.getData();
            })
        },


        download(scope) { // 下载
            window.open(scope.row.url);
        },
        expertImport() { // 专家导入
            this.expertImportDialog = false; this.$nextTick(()=>{ this.expertImportDialog = true; })
            if(this.$refs.expertImportForm){ this.$refs.expertImportForm.$refs.queryForm.resetFields(); }
        },
        expertImportSubmit() { // 专家导入-保存
            this.$refs.expertImportForm.$refs.queryForm.validate((valid) => {
                if (valid) {
                    let para = new FormData();
                    for(let key in this.$refs.expertImportForm.queryForm){
                        para.append(key, this.$refs.expertImportForm.queryForm[key]);
                    }
                    this.$api.templateImport(para).then(() => {
                        this.$message.success(`批量导入成功`);
                        this.expertImportDialog = false;
                        this.$refs.expert.getData();
                    })
                }
            });
        },
        expertImport2(scope) { // 专家导入
            this.expertValue = {
                idx: scope.row.idx,
                name: scope.row.name,
                industryId: scope.row.industryId,
                provinceCode: scope.row.provinceCode,
                cityCode: scope.row.cityCode,
                districtCode: scope.row.districtCode,
                educationType: scope.row.educationType,
                'provinceCode,cityCode,districtCode': [ scope.row.provinceCode, scope.row.cityCode, scope.row.districtCode]
            }
            this.expertImportDialog2 = false; this.$nextTick(()=>{ this.expertImportDialog2 = true; })
            if(this.$refs.aa){ this.$refs.aa.$refs.queryForm.resetFields(); }
        },
        expertImportSubmit2() {
            this.$refs.aa.$refs.queryForm.validate((valid) => {
                if (valid) {
                    let para = new FormData();
                    for(let key in this.$refs.aa.queryForm){
                        para.append(key, this.$refs.aa.queryForm[key]);
                    }
                    para.append('idx', this.expertValue.idx);
                    this.$api.templateUpdate(para).then(() => {
                        this.$message.success(`批量导入成功`);
                        this.expertImportDialog2 = false;
                        this.$refs.expert.getData();
                    })
                }
            });
        },
        expertUserSearchForm() { window.open(this.$api.expertUserSearchForm); }
    }
}
</script>