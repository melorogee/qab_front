<template>
    <div>
        <SearchPage ref="SearchPage" :searchForm="searchForm" :table="table" :api="'userList'">
            <el-button type="primary" slot="mainButtons--left" icon="el-icon-plus" @click="addData">添加</el-button>
            <template slot="btn" slot-scope="scope">
                <el-button type="text" @click="getmenuList(scope)">点击查看</el-button>
            </template>
            <template slot="operat" slot-scope="scope">
                <!-- <i class="el-icon-edit" @click="editData(scope)"></i> -->
                <i class="el-icon-delete" @click="delData(scope)"></i>
            </template>
        </SearchPage>
        <el-dialog title="菜单权限" :visible.sync="qxDialog" width="30%">
            <div class="menu-wrap">
                <div class="menu-item" v-for="(item, index) in menuIdList" :key="index">{{item.label}}</div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'Account',
    data() {
        return {
            searchForm: [],
            table: [
                { prop: 'userName', label: '用户名' },
                { prop: 'loginName', label: '手机号码' },
                { slot: 'btn', label: '菜单权限' },
                { prop: 'createTime', label: '注册时间', width: 130 },
                { slot: 'operat', label: '操作', width: 70 }
            ],
            menuIdList: [],
            qxDialog: false
        }
    },
    created() {},
    
    methods: {
        addData() {
            this.$router.push({name: 'AccountAdd'});
        },
        editData() {
            this.SearchPageInit();
        },
        delData(scope) {
            let para = { idList: [scope.row.idx] };
            this.$api.userDelete(para).then(() => {
                this.$message.success('删除成功');
                this.SearchPageInit();
            })  
        },
        getmenuList(scope) {
             this.$api.menuList({userId: scope.row.idx}).then(res => {
                for(let main of res){
                    this.menuIdList.push({
                        key: `${main.idx}`,
                        label: main.name
                    })
                    if(main.childList && main.childList.length > 0){
                        for(let sub of main.childList){
                            this.menuIdList.push({
                                key: `${sub.idx}`,
                                label: `${main.name}-${sub.name}`
                            })
                        }
                    }
                }
                this.qxDialog = true;
            })
        }
    }
}
</script>