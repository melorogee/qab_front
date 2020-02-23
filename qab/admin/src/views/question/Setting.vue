<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'settingList'">
            <el-button type="primary" slot="mainButtons--left" icon="el-icon-plus" @click="addData">添加</el-button>
            <template slot="operat" slot-scope="scope">
                <i class="el-icon-edit" @click="editData(scope)"></i>
                <i class="el-icon-delete" @click="delData(scope)"></i>
            </template>
        </SearchPage>
    </div>
</template>
<script>
export default {
    name: 'QuestionSetting',
    data() {
        return {
            searchForm: ['industryId', 'positionTypeId'],
            table: ['industryName', 'positionTypeName', 'examinationPaperRulesPercentList', 'operat']
        }
    },
    created() { },
    methods: {
        addData() {
            this.$router.push({name: 'QuestionSettingAdd'});
        },
        editData(scope) {
            let setValue = {
                idx: scope.row.idx,
                provinceCode: scope.row.provinceCode,
                cityCode: scope.row.cityCode,
                districtCode: scope.row.districtCode,
                educationType: scope.row.educationType,
                industryId: scope.row.industryId,
                positionTypeId: scope.row.positionTypeId,
                examinationPaperRulesPercentList: scope.row.examinationPaperRulesPercentList
            }
            this.$router.push({name: 'QuestionSettingEdit', query: {setValue: JSON.stringify(setValue)}});
        },
        delData(scope) {
            this.$api.settingDelete({idxs: scope.row.idx}).then(() => {
                this.$message.success('删除成功');
                this.SearchPageInit();
            })
        }
    }
}
</script>