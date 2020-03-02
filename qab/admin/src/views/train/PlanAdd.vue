<template>
    <div class="submitForm">
        <div class="applyParent">
            <div class="LineFeedScroll">
            <div class="customForm">
                <h3 class="submitForm__title">培训计划</h3>
                <p class="submitForm__msg" style="margin-bottom: 20px;">填写表单后选择要上传的文件，保存即可</p>
                <div class="LineFeedForm">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="标题：" prop="title">
                            <el-input v-model="ruleForm.title" placeholder="请输入培训计划标题" class="login__id"></el-input>
                        </el-form-item>
                        <el-form-item label="类型：" prop="type">
                            <el-select v-model="ruleForm.type" placeholder="请选择类型">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div id="websiteEditorElem" style="padding-right:10px;margin-top: 10px;height:330px;background: #ffffff;"></div>
                    <el-button type="primary" size="large" style="margin-top:30px;width:100px" @click="addData">发布</el-button>
                </div>              
            </div>
        </div>
        </div>
    </div>
</template>
<script>
    import E from 'wangeditor'

    export default {
        name: 'PlanAdd',
        data() {
            return {
                editor: null,
                editorContent: '',
                options: [{
                    value: '1',
                    label: '年度培训计划'
                }, {
                    value: '2',
                    label: '日常培训计划'
                }],
                ruleForm: {
                    title: '',
                    type: '',
                },
                rules: {
                    title: [
                        { required: true, message: '请输入人数', trigger: 'blur' },
                    ],
                    type: [
                        { required: true, message: '请选择培训类型', trigger: 'change' }
                    ],
                },
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
                // let oDiv = document.createElement('div');
                // oDiv.innerHTML = this.phoneEditor.txt.html();
                // alert( this.phoneEditor.txt.html())
                // let text = oDiv.innerText;
                let para = { content:this.phoneEditor.txt.html(), title:this.ruleForm.title,type:this.ruleForm.type};
                this.$api.planAdd(para).then(() => {
                    this.$message.success('添加成功');
                    this.$router.push({name: 'Plan'});
                },)
            }

    }
    }
</script>