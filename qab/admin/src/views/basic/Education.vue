<template>
    <div>
        <el-tabs>
            <el-tab-pane label="行业类型配置">
                <SearchPage ref="industry" :searchForm="industrySearchForm" :table="industryTable" :api="'industryList'">
                    <el-button type="primary" slot="mainButtons--left" icon="el-icon-plus" @click="industryAdd">添加</el-button>
                    <el-button type="success" slot="mainButtons--left" icon="el-icon-upload" @click="industryImport">批量导入</el-button>
                    <el-button type="text" slot="mainButtons--left" class="searchPage__download" @click="industryDownload"><strong>点击下载：</strong><i class="el-icon-document-delete"></i>行业类型模板</el-button>
                    <template slot="operat" slot-scope="scope">
                        <i class="el-icon-edit" @click="industryEdit(scope)"></i>
                        <i class="el-icon-delete" @click="industryDelete(scope)"></i>
                    </template>
                </SearchPage>
            </el-tab-pane>
            <el-tab-pane label="岗位类型配置">
                <SearchPage ref="position" :searchForm="positionSearchForm" :table="positionTable" :api="'positionList'">
                    <el-button type="primary" slot="mainButtons--left" icon="el-icon-plus" @click="positionAdd">添加</el-button>
                    <el-button type="success" slot="mainButtons--left" icon="el-icon-upload" @click="positionImport">批量导入</el-button>
                    <el-button type="text" slot="mainButtons--left" class="searchPage__download" @click="positionDownload"><strong>点击下载：</strong><i class="el-icon-document-delete"></i>岗位类型模板</el-button>
                    <template slot="operat" slot-scope="scope">
                        <i class="el-icon-edit" @click="positionEdit(scope)"></i>
                        <i class="el-icon-delete" @click="positionDelete(scope)"></i>
                    </template>
                </SearchPage>
            </el-tab-pane>
        </el-tabs><!-- // tabs end -->

        <el-dialog title="新增行业" :visible.sync="industryAddDialog" width="30%">
            <Form v-if="industryAddDialog" ref="industryAddForm" :form="['industry']" :isRequired="'all'" :labelWidth="'100px'" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="industryAddDialog = false">取消</el-button>
                <el-button type="primary" @click="industryAddSubmit">保存</el-button>
            </span>
        </el-dialog>

        <el-dialog title="编辑行业" :visible.sync="industryEditDialog" width="30%">
            <Form v-if="industryEditDialog" ref="industryEditForm" :form="['industry']" :setValue="industryValue" :isRequired="'all'" :labelWidth="'100px'" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="industryEditDialog = false">取消</el-button>
                <el-button type="primary" @click="industryEditSubmit">保存</el-button>
            </span>
        </el-dialog>

        <el-dialog title="批量导入行业" :visible.sync="industryImportDialog" width="30%">
            <Form v-if="industryImportDialog" ref="industryImportForm" :form="['file']" :isRequired="'all'" :labelWidth="'100px'" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="industryImportDialog = false">取消</el-button>
                <el-button type="primary" @click="industryImportSubmit">保存</el-button>
            </span>
        </el-dialog>

        <!-- // 行业类型配置 -->

        <el-dialog title="新增岗位" :visible.sync="positionAddDialog" width="30%">
            <Form v-if="positionAddDialog" ref="positionAddForm" :form="['position', 'industryId']" :isRequired="'all'" :labelWidth="'100px'" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="positionAddDialog = false">取消</el-button>
                <el-button type="primary" @click="positionAddSubmit">保存</el-button>
            </span>
        </el-dialog>

        <el-dialog title="编辑岗位" :visible.sync="positionEditDialog" width="30%">
            <Form v-if="positionEditDialog" ref="positionEditForm" :form="['position', 'industryId']" :setValue="positionValue" :isRequired="'all'" :labelWidth="'100px'" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="positionEditDialog = false">取消</el-button>
                <el-button type="primary" @click="positionEditSubmit">保存</el-button>
            </span>
        </el-dialog>

        <el-dialog title="批量导入岗位" :visible.sync="positionImportDialog" width="30%">
            <Form v-if="positionImportDialog" ref="positionImportForm" :form="['industryId', 'file']" :isRequired="'all'" :labelWidth="'100px'" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="positionImportDialog = false">取消</el-button>
                <el-button type="primary" @click="positionImportSubmit">保存</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
export default {
    name: 'Education',
    data() {
        return {
            industrySearchForm: [],
            industryTable: ['industry', 'operat'],
            positionSearchForm: ['industryId'],
            positionTable: ['industry', 'industryName', 'operat'],
            industryAddDialog: false,
            industryEditDialog: false,
            industryValue: {},
            industryImportDialog: false,
            positionAddDialog: false,
            positionEditDialog: false,
            positionValue: {},
            positionImportDialog: false,
        }
    },
    created() {

    },
    
    methods: {
        industryAdd() { // 行业新增
            this.industryAddDialog = false; this.$nextTick(()=>{ this.industryAddDialog = true; })
            if(this.$refs.industryAddForm){ this.$refs.industryAddForm.$refs.queryForm.resetFields(); }
        },
        industryEdit(scope) { // 行业编辑
            this.industryEditDialog = false; this.$nextTick(()=>{ this.industryEditDialog = true; })
            this.industryValue = {
                'provinceCode,cityCode,districtCode': [ scope.row.provinceCode, scope.row.cityCode, scope.row.districtCode],
                idx: scope.row.idx,
                name: scope.row.name,
                provinceCode: scope.row.provinceCode,
                cityCode: scope.row.cityCode,
                districtCode: scope.row.districtCode
            }
            if(this.$refs.industryEditDialog){ this.$refs.industryEditDialog.$refs.queryForm.resetFields(); }
        },
        industryAddSubmit() { // 行业新增-保存
            this.$refs.industryAddForm.$refs.queryForm.validate((valid) => {
                if (valid) {
                    let para = {...this.$refs.industryAddForm.queryForm};
                    this.$api.industrySave(para).then(() => {
                        this.$message.success(`新增行业成功`);
                        this.industryAddDialog = false;
                        this.$refs.industry.getData();
                    })
                }
            });
        },
        industryEditSubmit() { // 行业编辑-编辑
            this.$refs.industryEditForm.$refs.queryForm.validate((valid) => {
                if (valid) {
                    let para = {...this.$refs.industryEditForm.queryForm};
                    this.$api.industryUpdate(para).then(() => {
                        this.$message.success(`编辑行业成功`);
                        this.industryEditDialog = false;
                        this.$refs.industry.getData();
                    })
                }
            });
        },
        industryDelete(scope) { // 行业删除
            this.$api.industryDelete({idxs: scope.row.idx}).then(() => {
                this.$message.success('删除成功');
                this.$refs.industry.getData();
            })
        },
        industryImport() { // 行业导入
            this.industryImportDialog = false; this.$nextTick(()=>{ this.industryImportDialog = true; })
            if(this.$refs.industryImportForm){ this.$refs.industryImportForm.$refs.queryForm.resetFields(); }
        },
        industryImportSubmit() { // 行业导入-保存
            this.$refs.industryImportForm.$refs.queryForm.validate((valid) => {
                if (valid) {
                    let para = new FormData();
                    for(let key in this.$refs.industryImportForm.queryForm){
                        para.append(key, this.$refs.industryImportForm.queryForm[key]);
                    }
                    this.$api.industryImport(para).then(() => {
                        this.$message.success(`批量导入行业成功`);
                        this.industryImportDialog = false;
                        this.$refs.industry.getData();
                    })
                }
            });
        },
        industryDownload() { window.open(this.$api.industryDownload); },
        positionAdd() { // 行业新增
            this.positionAddDialog = false; this.$nextTick(()=>{ this.positionAddDialog = true; })
            if(this.$refs.positionAddForm){ this.$refs.positionAddForm.$refs.queryForm.resetFields(); }
        },
        positionEdit(scope) { // 行业编辑
            this.positionEditDialog = false; this.$nextTick(()=>{ this.positionEditDialog = true; })
            this.positionValue = {
                idx: scope.row.idx,
                name: scope.row.name,
                industryId: scope.row.industryId,
                educationTypes: scope.row.educationTypes ? (scope.row.educationTypes.indexOf(',') != -1 ? scope.row.educationTypes.split(',').map(v => v*1 ) : [...scope.row.educationTypes]) : [],
                classHour: scope.row.classHour,
                provinceCode: scope.row.provinceCode,
                cityCode: scope.row.cityCode,
                districtCode: scope.row.districtCode,
                'provinceCode,cityCode,districtCode': [ scope.row.provinceCode, scope.row.cityCode, scope.row.districtCode ] 
            }
            if(this.$refs.positionEditDialog){ this.$refs.positionEditDialog.$refs.queryForm.resetFields(); }
        },
        positionAddSubmit() { // 岗位新增-保存
            this.$refs.positionAddForm.$refs.queryForm.validate((valid) => {
                if (valid) {
                    let para = {...this.$refs.positionAddForm.queryForm};
                    // para.educationTypes = para.educationTypes.join(',')
                    this.$api.positionSave(para).then(() => {
                        this.$message.success(`新增岗位成功`);
                        this.positionAddDialog = false;
                        this.$refs.position.getData();
                    })
                }
            });
        },
        positionEditSubmit() { // 岗位编辑-编辑
            this.$refs.positionEditForm.$refs.queryForm.validate((valid) => {
                if (valid) {
                    let para = {...this.$refs.positionEditForm.queryForm};
                    // para.educationTypes = para.educationTypes.join(',')
                    this.$api.positionUpdate(para).then(() => {
                        this.$message.success(`编辑岗位成功`);
                        this.positionEditDialog = false;
                        this.$refs.position.getData();
                    })
                }
            });
        },
        positionDelete(scope) { // 岗位删除
            this.$api.positionDelete({idxs: scope.row.idx}).then(() => {
                this.$message.success('删除成功');
                this.$refs.position.getData();
            })
        },
        positionImport() { // 岗位导入
            this.positionImportDialog = false; this.$nextTick(()=>{ this.positionImportDialog = true; })
            if(this.$refs.positionImportForm){ this.$refs.positionImportForm.$refs.queryForm.resetFields(); }
        },
        positionImportSubmit() { // 岗位导入-保存
            this.$refs.positionImportForm.$refs.queryForm.validate((valid) => {
                if (valid) {
                    let para = new FormData();
                    for(let key in this.$refs.positionImportForm.queryForm){
                        para.append(key, this.$refs.positionImportForm.queryForm[key]);
                    }
                    this.$api.positionImport(para).then(() => {
                        this.$message.success(`批量导入岗位成功`);
                        this.positionImportDialog = false;
                        this.$refs.position.getData();
                    })
                }
            });
        },
        positionDownload() { window.open(this.$api.positionDownload); }
    }
}
</script>