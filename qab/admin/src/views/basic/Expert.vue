<template>
    <div>
        <SearchPage ref="expert" :searchForm="expertSearchForm" :table="expertTable" :api="'expertList'">
            <el-button type="primary" slot="mainButtons--left" icon="el-icon-plus" @click="expertAdd">添加</el-button>
            <el-button type="success" slot="mainButtons--left" icon="el-icon-upload" @click="expertImport">批量导入</el-button>
            <el-button type="text" slot="mainButtons--left" class="searchPage__download" @click="expertDownload"><strong>点击下载：</strong><i class="el-icon-document-delete"></i>专家类型模板</el-button>
            <template slot="operat" slot-scope="scope">
                <i class="el-icon-edit" @click="expertEdit(scope)"></i>
                <i class="el-icon-delete" @click="expertDelete(scope)"></i>
            </template>
        </SearchPage>

        <el-dialog title="新增专家" :visible.sync="expertAddDialog" width="30%">
            <Form v-if="expertAddDialog" ref="expertAddForm" :form="['expert']" :isRequired="'all'" :labelWidth="'100px'" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="expertAddDialog = false">取消</el-button>
                <el-button type="primary" @click="expertAddSubmit">保存</el-button>
            </span>
        </el-dialog>

        <el-dialog title="编辑专家" :visible.sync="expertEditDialog" width="30%">
            <Form v-if="expertEditDialog" ref="expertEditForm" :form="['expert']" :setValue="expertValue" :isRequired="'all'" :labelWidth="'100px'" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="expertEditDialog = false">取消</el-button>
                <el-button type="primary" @click="expertEditSubmit">保存</el-button>
            </span>
        </el-dialog>

        <el-dialog title="批量导入专家" :visible.sync="expertImportDialog" width="30%">
            <Form v-if="expertImportDialog" ref="expertImportForm" :form="[ 'file']" :isRequired="'all'" :labelWidth="'100px'" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="expertImportDialog = false">取消</el-button>
                <el-button type="primary" @click="expertImportSubmit">保存</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
export default {
    name: 'Expert',
    data() {
        return {
            expertSearchForm: [],
            expertTable: ['expert', 'operat'],
            expertAddDialog: false,
            expertEditDialog: false,
            expertValue: {},
            expertImportDialog: false,
        }
    },
    created() {

    },
    
    methods: {
        expertAdd() { // 专家新增
            this.expertAddDialog = false; this.$nextTick(()=>{ this.expertAddDialog = true; })
            if(this.$refs.expertAddForm){ this.$refs.expertAddForm.$refs.queryForm.resetFields(); }
        },
        expertEdit(scope) { // 专家编辑
            this.expertEditDialog = false; this.$nextTick(()=>{ this.expertEditDialog = true; })
            this.expertValue = {
                idx: scope.row.idx,
                name: scope.row.name,
                industryId: scope.row.industryId,
                provinceCode: scope.row.provinceCode,
                cityCode: scope.row.cityCode,
                districtCode: scope.row.districtCode,
                'provinceCode,cityCode,districtCode': [ scope.row.provinceCode, scope.row.cityCode, scope.row.districtCode]
            }
            if(this.$refs.expertEditDialog){ this.$refs.expertEditDialog.$refs.queryForm.resetFields(); }
        },
        expertAddSubmit() { // 专家新增-保存
            this.$refs.expertAddForm.$refs.queryForm.validate((valid) => {
                if (valid) {
                    let para = {...this.$refs.expertAddForm.queryForm};
                    this.$api.expertSave(para).then(() => {
                        this.$message.success(`新增专家成功`);
                        this.expertAddDialog = false;
                        this.$refs.expert.getData();
                    })
                }
            });
        },
        expertEditSubmit() { // 专家编辑-编辑
            this.$refs.expertEditForm.$refs.queryForm.validate((valid) => {
                if (valid) {
                    let para = {...this.$refs.expertEditForm.queryForm};
                    this.$api.expertUpdate(para).then(() => {
                        this.$message.success(`编辑专家成功`);
                        this.expertEditDialog = false;
                        this.$refs.expert.getData();
                    })
                }
            });
        },
        expertDelete(scope) { // 专家删除
            this.$api.expertDelete({idxs: scope.row.idx}).then(() => {
                this.$message.success('删除成功');
                this.$refs.expert.getData();
            })
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
                    this.$api.expertImport(para).then(() => {
                        this.$message.success(`批量导入专家成功`);
                        this.expertImportDialog = false;
                        this.$refs.expert.getData();
                    })
                }
            });
        },
        expertDownload() { window.open(this.$api.expertDownload); }
    }
}
</script>