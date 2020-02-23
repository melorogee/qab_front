<template>
    <div class="searchPage">
        <div class="searchPage__mainButtons">
            <div class="searchPage__mainButtons--left">
                <el-button type="primary" slot="mainButtons--left" icon="el-icon-plus" @click="examAdd">添加</el-button>
            </div>  
        </div><!-- // main buttons -->
        <div class="cards">
            <div class="cards__item" v-for="(item, index) in dataList" :key="index">
                <div class="cards__name" @click="goDetail(item)">{{item.libraryName}}</div>
                <div class="cards__options">行业{{item.industryName}}</div>
                <div class="cards__options">共{{item.questionCount||0}}题 <i class="el-icon-edit" @click="examEdit(item)"></i></div>
                
            </div>
        </div>

        <el-dialog title="新增专家" :visible.sync="examAddDialog" width="30%">
            <Form v-if="examAddDialog" ref="examAddForm" :form="['libraryName', 'industryId']" :isRequired="'all'" :labelWidth="'100px'" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="examAddDialog = false">取消</el-button>
                <el-button type="primary" @click="examAddSubmit">保存</el-button>
            </span>
        </el-dialog>

        <el-dialog title="编辑专家" :visible.sync="examEditDialog" width="30%">
            <Form v-if="examEditDialog" ref="examEditForm" :form="['libraryName', 'industryId']" :setValue="examValue" :isRequired="'all'" :labelWidth="'100px'" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="examEditDialog = false">取消</el-button>
                <el-button type="primary" @click="examEditSubmit">保存</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
export default {
    name: 'Exam',
    data() {
        return {
            dataList: [],
            examAddDialog: false,
            examEditDialog: false,
            examValue: {},
            examImportDialog: false,
        }
    },
    created() {
        this.getData();
    },
    methods: {
        async getData() {
            this.dataList = await this.$api.examList();
            this.dataList = [...this.dataList]
        },
        examAdd() { // 专家新增
            this.examAddDialog = false; this.$nextTick(()=>{ this.examAddDialog = true; })
            if(this.$refs.examAddForm){ this.$refs.examAddForm.$refs.queryForm.resetFields(); }
        },
        examEdit(item) { // 专家编辑
            this.examEditDialog = false; this.$nextTick(()=>{ this.examEditDialog = true; })
            this.examValue = {
                idx: item.idx,
                libraryName: item.libraryName,
                industryId: item.industryId,
                provinceCode: item.provinceCode,
                cityCode: item.cityCode,
                districtCode: item.districtCode,
                'provinceCode,cityCode,districtCode': [ item.provinceCode, item.cityCode, item.districtCode]
            }
            if(this.$refs.examEditDialog){ this.$refs.examEditDialog.$refs.queryForm.resetFields(); }
        },
        examAddSubmit() { // 专家新增-保存
            this.$refs.examAddForm.$refs.queryForm.validate((valid) => {
                if (valid) {
                    let para = {...this.$refs.examAddForm.queryForm};
                    this.$api.examForm(para).then(() => {
                        this.$message.success(`新增题库成功`);
                        this.examAddDialog = false;
                        this.getData();
                    })
                }
            });
        },
        examEditSubmit() { // 专家编辑-编辑
            this.$refs.examEditForm.$refs.queryForm.validate((valid) => {
                if (valid) {
                    let para = {...this.$refs.examEditForm.queryForm};
                    this.$api.examForm(para).then(() => {
                        this.$message.success(`编辑题库成功`);
                        this.examEditDialog = false;
                        this.getData();
                    })
                }
            });
        },
        goDetail(item) {
            this.$router.push({name: 'ExamDetail', query: { libraryId: item.idx, libraryName: item.libraryName }})
        },
        download() { window.open(this.$api.examDownload); }
    }
}
</script>