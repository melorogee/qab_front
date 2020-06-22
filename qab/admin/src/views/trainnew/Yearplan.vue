<template>
    <div>
        <el-tabs>
            <el-tab-pane label="本年度计划">
                <SearchPage ref="thisplan" :searchForm="thisplanSearchForm" :table="thisplanTable" :setValue="{sp: 1}"  :api="'thisplanList'">
                    <el-button type="primary" slot="mainButtons--left" icon="el-icon-plus" @click="goAdd()" >新增</el-button>
                    <template slot="operat" slot-scope="scope">
                        <el-button size="mini" type="primary" @click="goEdit(scope)" plain>编辑</el-button>
                        <el-button size="mini" type="danger" @click="delYearPlan(scope)" plain>删除</el-button>
                    </template>
                    <template slot="effectInspectionMethod" slot-scope="scope">
                            {{effectInspectionMethodMap[scope.row.effectInspectionMethod]}}
                    </template>
                </SearchPage>
            </el-tab-pane>
            <el-tab-pane label="历年计划">
                <SearchPage ref="hisplan" :searchForm="hisplanSearchForm" :table="hisplanTable"  :api="'hisplanList'">
                    <template slot="effectInspectionMethod" slot-scope="scope">
                        {{effectInspectionMethodMap[scope.row.effectInspectionMethod]}}
                    </template>
                </SearchPage>
            </el-tab-pane>

        </el-tabs>

        <el-dialog title="编辑" :visible.sync="editDialog" width="30%">
            <Form v-if="editDialog" ref="userEditForm"
                  :form="['trainnewMonth','trainnewResult','trainnewTitle','trainnewContent']"
                  :setValue="userValue" :isRequired="'all'" :labelWidth="'100px'" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialog = false">取消</el-button>
                <el-button type="primary" @click="confirmEdit">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'Yearplan',
    data() {
        return {
            editDialog:false,
            userValue:{},
            thisplanSearchForm:[],
            thisplanTable: [
                { prop: 'title', label: '培训主题' },
                { prop: 'month', label: '月份' },
                { prop: 'content', label: '培训内容' },
                { slot: 'effectInspectionMethod', label: '效果检验方式' },
                {slot:'operat',label:'操作'}
            ],

            hisplanSearchForm:[],
            hisplanTable: [
                { prop: 'title', label: '培训主题' },
                { prop: 'year', label: '年' },
                { prop: 'month', label: '月份' },
                { prop: 'content', label: '培训内容' },
                { slot: 'effectInspectionMethod', label: '效果检验方式' }
            ],
            effectInspectionMethodMap:{1:"考核",2:"考试"}


        }
    },
    created() { },
    
    methods: {
        goAdd: function () {
            this.$router.push({name: 'YearplanAdd'});
        },

        delYearPlan:function (scope) {
            //封装参数
            this.$api.delYearPlan({idxs:scope.row.idx}).then(() => {
                this.$message.success('删除成功');
                this.$refs.thisplan.getData();
            })
        },

        goEdit(scope) {
            this.userValue = scope.row
           this.editDialog=true;
        },

        confirmEdit(){
            this.$refs.userEditForm.$refs.queryForm.validate((valid) => {
                if (valid) {
                    let para = {...this.$refs.userEditForm.queryForm};
                    this.$api.updateYearPlan(para).then(() => {
                        this.$message.success(`更新成功`);
                        this.editDialog=false;

                        this.$refs.thisplan.getData();
                    })
                }
            });
        }
    }
}
</script>