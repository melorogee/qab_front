<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'planList'" @multSelection="getMsg">
            <el-button type="primary" slot="mainButtons--left" icon="el-icon-edit-outline"  @click="addData" >发布计划</el-button>
            <el-button slot="mainButtons--left" icon="el-icon-delete"  @click="delData('select')" >删除</el-button>
            <template slot="typeSlot" slot-scope="scope">
               {{map[scope.row.type]}}
            </template>
            <template slot="htmlContent" slot-scope="scope">
                <span class="wrapText" v-if="convert(scope.row.content).length<35">{{convert(scope.row.content)}}<span @click="viewData(scope)">[查看详情]</span></span>
                <span class="wrapText" v-else>{{convert(scope.row.content).slice(0,35)}}...<span @click="viewData(scope)">[查看详情]</span></span>
            </template>
            <template slot="operat" slot-scope="scope">
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
                'selection',
                { prop: 'title', label: '标题' },
                { slot: 'typeSlot', label: '类型'  },
                { slot: 'htmlContent', label: '详情', width: 380 },
                { prop: 'createTime', label: '发布时间' },
                { slot: 'operat', label: '操作', width: 130 }
            ],
            deleteMap: []
        }
    },
    created() { },
    methods: {
        addData() {
            this.$router.push({name: 'PlanAdd'});

        },
        delData(data) {
            let idxStr = '';
            if (data == 'select') {
                if (this.deleteMap.length == 0) {
                    this.$message.error('至少选择一条培训计划');
                    return;
                }
                const idxArr = this.deleteMap.map(function(obj) {
                    return obj.idx
                });
                idxStr = idxArr.join(",");
            } else {
                idxStr = data.row.idx;
            }
            this.$api.planDelete({idxs: idxStr}).then(() => {
                this.$message.success('删除成功');
                this.SearchPageInit();
            })
        },
        viewData(scope){
            this.$router.push(
                {name:'PlanView',
                    query: {
                        idxs: scope.row.idx
                    }
                }
            );
        },
        convert(html){
            let oDiv = document.createElement('div');
            oDiv.innerHTML = html;
            return oDiv.innerText;
        },

        getMsg(data){
            this.deleteMap = data;
        },
    }
}
</script>