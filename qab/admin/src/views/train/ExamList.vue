<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'trainexamList'">
            <el-button type="success" slot="mainButtons--left" icon="el-icon-add"  @click="addData" >考试报名</el-button>
            <template slot="educationType" slot-scope="scope">{{map[scope.row.educationType]}}</template>
            <template slot="orderStatus" slot-scope="scope">{{map1[scope.row.orderStatus]}}</template>

            <template slot="operat" slot-scope="scope">
                <i class="el-icon-view" @click="viewData(scope)"></i>
                <i class="el-icon-delete" @click="delData(scope)"></i>
            </template>
        </SearchPage>
    </div>
</template>
<script>
export default {
    name: 'ExamList',
    data() {
        return {
            searchForm: [],
            map: {
                1:'新员工三级培训',
                2:'继续教育',
                3:'取证教育'

            },
            map1: {
                0:'未支付',
                1:'支付中',
                2:'支付完成',
                3:'支付失败',
                4:'已取消'
            },
            table: [
                {  label: '序号' , width: 130,type:'index' },
                { slot: 'educationType', label: '考试类型', width: 170 },
                { slot: 'enrollNumber', label: '人数', width: 130  },
                { slot: 'url', label: '考试名单' , width: 130 },
                { slot: 'deadline', label: '考试截止时间' , width: 130 },
                { slot: 'price', label: '报名费用（元）' , width: 130 },
                { slot: 'orderStatus', label: '状态' , width: 130 },

                { slot: 'operat', label: '操作', width: 130 }

            ]
        }
    },
    created() { },
    methods: {
        addData() {
            this.$router.push({name: 'ExamApply'});

        },



        delData(scope) {
            this.$api.planDelete({idxs: scope.row.idx}).then(() => {
                this.$message.success('删除成功');
                this.SearchPageInit();
            })
        },

        viewData(scope){
            this.$router.push(
                {name:'PlanView',
                    query: {
                        idxs: scope.row.idx
                    }}
            );
        }

    }
}
</script>