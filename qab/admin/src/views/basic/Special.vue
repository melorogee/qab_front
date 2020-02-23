<template>
    <div>
        <SearchPage ref="special" :searchForm="specialSearchForm" :table="specialTable" :api="'specialList'">
            <el-button type="primary" slot="mainButtons--left" icon="el-icon-plus" @click="specialAdd">添加</el-button>
            <el-button type="success" slot="mainButtons--left" icon="el-icon-upload" @click="specialImport">批量导入</el-button>
            <el-button type="text" slot="mainButtons--left" class="searchPage__download" @click="specialDownload"><strong>点击下载：</strong><i class="el-icon-document-delete"></i>特殊作业人员类型模板</el-button>
            <template slot="operat" slot-scope="scope">
                <i class="el-icon-edit" @click="specialEdit(scope)"></i>
                <i class="el-icon-delete" @click="specialDelete(scope)"></i>
            </template>
        </SearchPage>

        <el-dialog title="新增特殊作业人员" :visible.sync="specialAddDialog" width="30%">
            <Form v-if="specialAddDialog" ref="specialAddForm" :form="['special', 'industryId']" :isRequired="'all'" :labelWidth="'150px'" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="specialAddDialog = false">取消</el-button>
                <el-button type="primary" @click="specialAddSubmit">保存</el-button>
            </span>
        </el-dialog>

        <el-dialog title="编辑特殊作业人员" :visible.sync="specialEditDialog" width="30%">
            <Form v-if="specialEditDialog" ref="specialEditForm" :form="['special', 'industryId']" :setValue="specialValue" :isRequired="'all'" :labelWidth="'150px'" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="specialEditDialog = false">取消</el-button>
                <el-button type="primary" @click="specialEditSubmit">保存</el-button>
            </span>
        </el-dialog>

        <el-dialog title="批量导入特殊作业人员" :visible.sync="specialImportDialog" width="30%">
            <Form v-if="specialImportDialog" ref="specialImportForm" :form="['industryId', 'file']" :isRequired="'all'" :labelWidth="'150px'" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="specialImportDialog = false">取消</el-button>
                <el-button type="primary" @click="specialImportSubmit">保存</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
export default {
    name: 'special',
    data() {
        return {
            specialSearchForm: ['industryId'],
            specialTable: ['special', 'industryName', 'operat'],
            specialAddDialog: false,
            specialEditDialog: false,
            specialValue: {},
            specialImportDialog: false,
        }
    },
    created() {

    },
    
    methods: {
        specialAdd() { // 专家新增
            this.specialAddDialog = false; this.$nextTick(()=>{ this.specialAddDialog = true; })
            if(this.$refs.specialAddForm){ this.$refs.specialAddForm.$refs.queryForm.resetFields(); }
        },
        specialEdit(scope) { // 专家编辑
            this.specialEditDialog = false; this.$nextTick(()=>{ this.specialEditDialog = true; })
            this.specialValue = {
                idx: scope.row.idx,
                name: scope.row.name,
                industryId: scope.row.industryId,
                provinceCode: scope.row.provinceCode,
                cityCode: scope.row.cityCode,
                districtCode: scope.row.districtCode,
                'provinceCode,cityCode,districtCode': [ scope.row.provinceCode, scope.row.cityCode, scope.row.districtCode]
            }
            if(this.$refs.specialEditDialog){ this.$refs.specialEditDialog.$refs.queryForm.resetFields(); }
        },
        specialAddSubmit() { // 专家新增-保存
            this.$refs.specialAddForm.$refs.queryForm.validate((valid) => {
                if (valid) {
                    let para = {...this.$refs.specialAddForm.queryForm};
                    this.$api.specialSave(para).then(() => {
                        this.$message.success(`新增特殊作业人员成功`);
                        this.specialAddDialog = false;
                        this.$refs.special.getData();
                    })
                }
            });
        },
        specialEditSubmit() { // 专家编辑-编辑
            this.$refs.specialEditForm.$refs.queryForm.validate((valid) => {
                if (valid) {
                    let para = {...this.$refs.specialEditForm.queryForm};
                    this.$api.specialUpdate(para).then(() => {
                        this.$message.success(`编辑特殊作业人员成功`);
                        this.specialEditDialog = false;
                        this.$refs.special.getData();
                    })
                }
            });
        },
        specialDelete(scope) { // 专家删除
            this.$api.specialDelete({idxs: scope.row.idx}).then(() => {
                this.$message.success('删除成功');
                this.$refs.special.getData();
            })
        },
        specialImport() { // 专家导入
            this.specialImportDialog = false; this.$nextTick(()=>{ this.specialImportDialog = true; })
            if(this.$refs.specialImportForm){ this.$refs.specialImportForm.$refs.queryForm.resetFields(); }
        },
        specialImportSubmit() { // 专家导入-保存
            this.$refs.specialImportForm.$refs.queryForm.validate((valid) => {
                if (valid) {
                    let para = new FormData();
                    for(let key in this.$refs.specialImportForm.queryForm){
                        para.append(key, this.$refs.specialImportForm.queryForm[key]);
                    }
                    this.$api.specialImport(para).then(() => {
                        this.$message.success(`批量导入特殊作业人员成功`);
                        this.specialImportDialog = false;
                        this.$refs.special.getData();
                    })
                }
            });
        },
        specialDownload() { window.open(this.$api.specialDownload); },
    }
}
</script>