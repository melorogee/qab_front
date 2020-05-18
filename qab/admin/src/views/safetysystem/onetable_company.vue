<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'troubleshootList'" >

            <template slot="operat" slot-scope="scope">
                <i v-if="scope.row.hazardLevel == '0'"  @click="processStatus(scope,'1')">正常</i>
                 <el-divider direction="vertical" v-if="scope.row.hazardLevel == '0'"></el-divider>
                <i v-if="scope.row.hazardLevel == '0'"  @click="processStatus(scope,'2')">异常</i>

            </template>
        </SearchPage>

    </div>
</template>
<script>
    export default {
        name: 'Onetable_company',
        data() {
            return {

                searchForm: [],
                importDialog:false,
                table: [
                    { prop: 'riskName', label: '风险名称' },
                    { prop: 'riskLevel', label: '风险等级'  },
                    { prop: 'type', label: '管控措施类型'  },
                    { prop: 'content', label: '管控内容'  },


                    // { slot: 'htmlContent', label: '详情', width: 380 },
                    // { prop: 'createTime', label: '发布时间' },
                    { slot: 'operat', label: '问题描述', width: 130 }
                ],
                deleteMap: [],
                userId:""
            }
        },

        created() {
            this.userId = sessionStorage.getItem('userId')

        },

        methods: {
            // importData() {
            //     this.$router.push({name: 'Onecase_companyImport'});
            // },

            processStatus(scope,status) {
                this.$api.processStatus({status: status,riskId:scope.row.riskId}).then(() => {
                    this.$message.success('设置成功');
                    this.SearchPageInit();
                })
            },


        }
    }
</script>