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
                { label: '序号' , width: 170 ,
                    type:"index",
                },
                { prop: 'name', label: '员工姓名', width: 200  },
                { prop: 'departmentName', label: '部门', width: 200 },
                { prop: 'positionName', label: '岗位/职位', width: 200 },
                { prop: 'hiredate', label: '入场时间' , width: 200 },
                { slot: 'operat', label: '操作', width: 130 }
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