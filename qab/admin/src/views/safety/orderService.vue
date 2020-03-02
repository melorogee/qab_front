<template>
    <div>
        <SearchPage ref="SearchPage" :table="table" :api="'orderService'">
            <el-button type="success" slot="mainButtons--left" icon="el-icon-download" @click="importData">导出EXCEL</el-button>

        </SearchPage>
    </div>
</template>
<script>
export default {
    name: 'OrderService',
    data() {
        return {

            table: [
                { type: 'index', label: '序号'   },
                { prop: 'orderNo', label: '服务编号'  },
                { prop: 'bigClass', label: '隐患大类', },
                { prop: 'classz', label: '隐患分类'},
                { prop: 'smallClass', label: '隐患小类'  },
                { prop: 'level', label: '隐患级别'  },
                { prop: 'accidentType', label: '可能造成的事故类型'},
                { prop: 'location', label: '地点'  },
                { prop: 'createTime', label: '发现时间'  },
                { prop: 'createByName', label: '录入人' },
                { prop: 'imgCount', label: '隐患图片'  },
                { prop: 'suggest', label: '整改建议' },
                { prop: 'status', label: '隐患状态'  },
                { prop: 'responsible', label: '责任人' },

            ]
        }
    },
    created() {},
    
    methods: {
        // inquiryReminder(scope) {
        //     this.$api.inquiryDunning({id: scope.row.idx}).then(() => {
        //         this.$message.success('催款通知成功');
        //         this.SearchPageInit();
        //     })
        // },
        // inquiryClosed(scope) {
        //     this.$api.inquiryClose({id: scope.row.idx}).then(() => {
        //         this.$message.success('关闭成功');
        //         this.SearchPageInit();
        //     })
        // }
        employeeAdd() { // 行业新增
            this.$router.push({name: 'employeeAdd'});
        },

        importData() { window.open(this.$api.orderServiceExport); }

    }
}
</script>