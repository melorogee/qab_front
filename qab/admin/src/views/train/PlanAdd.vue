<template>

    <div>
        <el-container>
            <el-main>

                <el-input v-model="title" width="30%" placeholder="请输入培训计划标题" class="login__id"></el-input>
                <el-select v-model="type" placeholder="请选择"  style="margin-top: 30px" >
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <div id="websiteEditorElem"
                     style="margin-top: 70px;height:300px;background: #ffffff;"></div>
                <el-button type="success"  icon="el-icon-add"  @click="addData" style="margin-top: 30px"  >发布</el-button>

            </el-main>
        </el-container>
    </div>
</template>
<script>
    import E from 'wangeditor'

    export default {
        name: 'PlanAdd',
        data() {
            return {
                title: '',
                type: '',
                editor: null,
                editorContent: '',
                options: [{
                    value: '1',
                    label: '年度培训计划'
                }, {
                    value: '2',
                    label: '日常培训计划'
                }],
            }
        },
        created() {
        },
        mounted() {
            // wangeditor
            this.phoneEditor = new E('#websiteEditorElem')
            // this.phoneEditor.onchange = function () {
            //   this.formData.phone = this.$txt.html()
            // }
            // 上传图片到服务器，base64形式
            this.phoneEditor.customConfig.uploadImgShowBase64 = true
            // 隐藏网络图片
            this.phoneEditor.customConfig.showLinkImg = false
            // 创建一个富文本编辑器
            this.phoneEditor.create()
            // 富文本内容
            this.phoneEditor.txt.html()
        },
        methods: {
            addData() {

                let para = { content:this.phoneEditor.txt.html(), title:this.title,type:this.type};
                this.$api.planAdd(para).then(() => {
                    this.$message.success('添加成功');
                    this.$router.push({name: 'Plan'});
                },)
            }

    }
    }
</script>