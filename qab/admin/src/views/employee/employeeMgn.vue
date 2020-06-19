<template>
    <div>
        <el-button type="text" slot="mainButtons--left" class="searchPage__download" @click="templateDownload"><strong>点击下载：</strong><i class="el-icon-document-delete"></i>员工导入模版</el-button>

        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'empUserList'">
            <el-button type="primary" slot="mainButtons--left" icon="el-icon-plus" @click="employeeAdd">新增</el-button>
            <el-button type="success" slot="mainButtons--left" icon="el-icon-upload" @click="employeeImport">导入</el-button>

            <template slot="operat" slot-scope="scope">
                <i class="el-icon-edit" @click="goEdit(scope)"></i>

                <i class="el-icon-delete" @click="delData(scope)"></i>
            </template>
        </SearchPage>

        <el-dialog title="导入" :visible.sync="expertDialog" width="30%">
            <Form v-if="expertDialog" ref="expertImportForm" :form="['file']" :isRequired="'all'" :labelWidth="'100px'" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="expertDialog = false">取消</el-button>
                <el-button type="primary" @click="employeeImportSubmit">保存</el-button>
            </span>
        </el-dialog>


        <el-dialog title="编辑" :visible.sync="editDialog" width="30%">
            <Form v-if="editDialog" ref="employEditForm" :form="['empolyeeName', 'dept', 'positionEmploy','districtCode_user']" :setValue="employeeValue" :isRequired="'all'" :labelWidth="'100px'" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialog = false">取消</el-button>
                <el-button type="primary" @click="employEditSubmit">保存</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
export default {
    name: 'EmployeeMgn',
    data() {
        return {
            employeeValue:{},
            searchForm: [
                {
                    type: 'input', label: '关键字', prop: 'nameOrPhone'
                }
            ],
            table: [
                { label: '序号' ,
                    type:"index",
                },
                { prop: 'name', label: '员工姓名'},
                { prop: 'departmentName', label: '部门'},
                { prop: 'positionName', label: '岗位/职位' },
                { prop: 'hiredate', label: '入职时间'  },
                { prop: 'phone', label: '手机号码' },
                { prop: 'addr', label: '区县' ,width:250},


                { slot: 'operat', label: '操作' }
            ],
            expertDialog:false,
            editDialog:false
        }
    },
    created() {},
    
    methods: {

        employeeAdd() { // 行业新增
            this.$router.push({name: 'employeeAdd'});
        },
        delData(scope) {
            this.$api.empUserDelete({idList: [scope.row.idx]}).then(() => {
                this.$message.success('删除成功');
                this.SearchPageInit();
            })
        },

        templateDownload(){
            window.open(this.$api.userTemplateExport);
        },

        employeeImport() { // 专家导入
            this.expertDialog = false; this.$nextTick(()=>{ this.expertDialog = true; })
            if(this.$refs.expertImportForm){ this.$refs.expertImportForm.$refs.queryForm.resetFields(); }
        },



        employeeImportSubmit() { // 专家导入-保存
            this.$refs.expertImportForm.$refs.queryForm.validate((valid) => {
                if (valid) {
                    let para = new FormData();
                    for(let key in this.$refs.expertImportForm.queryForm){
                        para.append(key, this.$refs.expertImportForm.queryForm[key]);
                    }
                    this.$api.employeeImport(para).then((data) => {
                        if(data == null){
                            this.$message.success(`批量导入成功`);
                            this.expertDialog = false;
                            this.SearchPageInit();
                        }else{
                            this.$message.warning(`部分员工导入重复：`+data.toString());
                            this.expertDialog = false;
                            this.SearchPageInit();
                        }

                    })
                }
            });
        },

        goEdit(scope){
            // console.log(scope)
            this.editDialog = true;
            this.employeeValue = scope.row;
        },

        employEditSubmit(){
            this.$refs.employEditForm.$refs.queryForm.validate((valid) => {
                if (valid) {
                    let para = {...this.$refs.employEditForm.queryForm};
                    this.$api.employUpdate(para).then(() => {
                        this.$message.success(`编辑员工成功`);
                        this.editDialog = false;
                        this.SearchPageInit();
                    })
                }
            });
        }

    }
}
</script>