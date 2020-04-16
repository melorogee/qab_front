<template>
    <div>
        <SearchPage ref="unCaseSearchPage" :searchForm="caseSearchForm" :table="uncaseTable" :api="'unCaseList'">

            <el-button type="primary" slot="mainButtons--left" icon="el-icon-plus" @click="caseAddData">添加</el-button>
            <el-button type="success" slot="mainButtons--left" icon="el-icon-upload" @click="importData">批量导入</el-button>

            <template slot="operat" slot-scope="scope">
                <i class="el-icon-edit" @click="caseEditData(scope)"></i>
                <i class="el-icon-delete" @click="caseDelData(scope)"></i>
            </template>
        </SearchPage>
        <!-- <el-tabs>
            <el-tab-pane label="待发布">
                <SearchPage ref="unCaseSearchPage" :searchForm="caseSearchForm" :table="uncaseTable" :api="'unCaseList'">
                    <el-button type="primary" slot="mainButtons--left" icon="el-icon-plus" @click="caseAddData">添加</el-button>
                    <template slot="operat" slot-scope="scope">
                        <i class="el-icon-position" @click="caseFaData(scope)"></i>
                        <i class="el-icon-edit" @click="caseEditData(scope)"></i>
                        <i class="el-icon-delete" @click="caseDelData(scope)"></i>
                    </template>
                </SearchPage>
            </el-tab-pane>
            <el-tab-pane label="往期">
                <SearchPage ref="caseSearchPage" :searchForm="caseSearchForm" :table="caseTable" :api="'caseList'">
                    <template slot="operat" slot-scope="scope">
                        <i class="el-icon-delete" @click="caseDelData1(scope)"></i>
                    </template>
                </SearchPage>
            </el-tab-pane>
        </el-tabs>// tabs end -->
    </div>
</template>
<script>
export default {
    name: 'Legal',
    data() {
        return {
            caseSearchForm: [],
            uncaseTable: ['type', 'materials', 'educationTypenew', 'classHour', 'createTime', 'operat8'],

            // uncaseTable: ['name', 'educationType', 'createTime', 'operat8'],
            caseTable: ['name', 'industryName', 'createTime', 'operat']
        }
    },
    created() { },
    
    methods: {
        caseAddData() {
            this.$router.push({name: 'CaseAdd'});
        },
        caseEditData(scope) {
            this.$api.caseDetail({idx: scope.row.idx}).then(res => {
                let setValue = {
                    idx: res.idx,
                    industryId: res.industryId,
                    title: res.name,
                    icon: res.icon,
                    introduce: res.introduce,
                    educationType: res.educationType,
                    classHour: res.classHour,
                    content: res.content
                }
                this.$router.push({name: 'CaseEdit', query: {setValue: JSON.stringify(setValue)}});
            })

        },
        caseFaData(scope) {
            this.$api.casePublish({idxs: scope.row.idx}).then(() => {
                this.$message.success('发布成功');
                this.$refs.unCaseSearchPage.getData();
            })
        },
        caseDelData(scope) {
            this.$api.caseDelete({idxs: scope.row.idx}).then(() => {
                this.$message.success('删除成功');
                this.$refs.unCaseSearchPage.getData();
            })
        },
        caseDelData1(scope) {
            this.$api.caseDelete({idxs: scope.row.idx}).then(() => {
                this.$message.success('删除成功');
                this.$refs.caseSearchPage.getData();
            })
        },
        importData() {
            this.$router.push({name: 'ActivityImport'});
        },
    }
}
</script>