<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :setValue="{ libraryId: $route.query.libraryId }" :api="'examDetailList'">
            <el-button type="primary" slot="mainButtons--left" icon="el-icon-plus" @click="addData">添加</el-button>
            <el-button type="success" slot="mainButtons--left" icon="el-icon-upload" @click="importData">批量导入</el-button>
            <el-button type="text" slot="mainButtons--left" class="searchPage__download" @click="download"><strong>导入前请确认是否符合模板要求，</strong>点击下载模板</el-button>
            <template slot="options" slot-scope="scope">
                <div>
                    <div><span>A.{{scope.row.atitle}}</span><span> | B.{{scope.row.btitle}}</span></div>
                    <div><span v-if="scope.row.ctitle">C.{{scope.row.ctitle}}</span><span v-if="scope.row.dtitle"> | D.{{scope.row.dtitle}}</span></div>
                </div>
            </template>
            <template slot="operat" slot-scope="scope">
                <i class="el-icon-edit" @click="editData(scope)"></i>
                <i class="el-icon-delete" @click="delData(scope)"></i>
            </template>
        </SearchPage>

        <el-dialog title="批量导入" :visible.sync="importDialog" width="30%">
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
    name: 'Materials',
    data() {
        return {
            searchForm: ['questionType'],
            table: ['questionType', 'questionTitle', 'options', 'rightAnswer', 'tips', 'operat'],
            importDialog: false,
        }
    },
    created() {
    },
    methods: {
        addData() {
            let obj = {}
            for(let key in this.$route.query){
                if(key != 'VNK'){
                    obj[key] = this.$route.query[key]
                }
            }
            this.$router.push({name: 'ExamDetailAdd', query: {setValue: JSON.stringify(obj)} });
        },
        editData(item) {
            let obj = {
                "idx": item.row.idx,
                "questionTitle": item.row.questionTitle,
                "questionType": item.row.questionType,
                "atitle": item.row.atitle,
                "btitle": item.row.btitle,
                "ctitle": item.row.ctitle,
                "dtitle": item.row.dtitle,
                "rightAnswer": item.row.rightAnswer,
                "tips": item.row.tips
            }
            for(let key in this.$route.query){
                if(key != 'VNK'){
                    obj[key] = this.$route.query[key]
                }
            }
            this.$router.push({name: 'ExamDetailEdit', query: {setValue: JSON.stringify(obj)} });
        },
        importData() { // 专家导入
            this.importDialog = true;
            if(this.$refs.importForm){ this.$refs.importForm.$refs.queryForm.resetFields(); }
        },
        importSubmit() { // 专家导入-保存
            this.$refs.importForm.$refs.queryForm.validate((valid) => {
                if (valid) {
                    let para = new FormData();
                    for(let key in this.$refs.importForm.queryForm){
                        para.append(key, this.$refs.importForm.queryForm[key]);
                    }
                    para.append('libraryId', this.$route.query.libraryId);
                    this.$api.examDetailImport(para).then(() => {
                        this.$message.success(`批量导入成功`);
                        this.importDialog = false;
                        this.$refs.SearchPage.getData();
                    })
                }
            });
        },
        delData(scope) {
            this.$api.examDetailDelete({idxs: scope.row.idx}).then(() => {
                this.$message.success('删除成功');
                this.SearchPageInit();
            })
        },
        download() { window.open(this.$api.examDownload); },
    }
}
</script>