<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'planList'">
            <el-button type="success" slot="mainButtons--left" icon="el-icon-add"  @click="addData" >新增</el-button>
            <template slot="typeSlot" slot-scope="scope">{{map[scope.row.type]}}</template>
            <template slot="operat" slot-scope="scope">
                <i class="el-icon-view" @click="viewData(scope)"></i>
                <i class="el-icon-delete" @click="delData(scope)"></i>
            </template>
        </SearchPage>
    </div>
</template>
<script>
export default {
    name: 'Plan',
    data() {
        return {
            searchForm: [],
            map: {
                1:'年度培训计划',
                2:'日常培训计划'
            },
            table: [
                {  label: '序号' , width: 130,type:'index' },
                { prop: 'title', label: '标题', width: 170 },
                { slot: 'typeSlot', label: '类型', width: 130  },
                // { prop: 'content', label: '详情', width: 200 },
                { slot: 'createTime', label: '发布时间' , width: 130 },
                { slot: 'operat', label: '操作', width: 130 }

            ]
        }
    },
    created() { },
    methods: {
        addData() {
            this.$router.push({name: 'PlanAdd'});

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