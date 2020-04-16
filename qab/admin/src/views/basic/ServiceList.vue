<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'queryServiceList'" @multSelection="getMsg">
            <el-button type="primary" slot="mainButtons--left" icon="el-icon-edit-outline"  @click="addData" >新增</el-button>
            <template slot="typeSlot" slot-scope="scope">
                {{map[scope.row.type]}}
            </template>

            <template slot="operat" slot-scope="scope">

<!--                <a href="" @click="delData(scope)">详情</a>-->
                <i class="el-icon-delete" @click="delData(scope)"></i>
            </template>
        </SearchPage>
    </div>
</template>
<script>
    export default {
        name: 'ServiceList',
        data() {
            return {
                searchForm: [
                    {
                        type: 'input', label: '关键字', prop: 'keyword',
                    }
                ],

                table: [
                    { prop: 'name', label: '服务名称' },

                    { slot: 'operat', label: '操作', width: 130 }
                ],
                deleteMap: []
            }
        },
        created() { },
        methods: {
            addData() {
                this.$router.push({name: 'ServiceAdd'});

            },
            delData(data) {
                let para = { idList: [data.row.idx] };
                this.$api.serviceDelete(para).then(() => {
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