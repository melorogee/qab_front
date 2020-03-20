<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'empUserList'">
            <el-button type="primary" slot="mainButtons--left" icon="el-icon-plus" @click="employeeAdd">新增</el-button>
            <template slot="operat" slot-scope="scope">
                <i class="el-icon-delete" @click="delData(scope)"></i>
            </template>
        </SearchPage>
    </div>
</template>
<script>
export default {
    name: 'EmployeeMgn',
    data() {
        return {
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

                { slot: 'operat', label: '操作' }
            ]
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
        }

    }
}
</script>