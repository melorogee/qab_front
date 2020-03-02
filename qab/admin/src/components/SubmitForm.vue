<template>
    <div class="submitForm">
        <h3 class="submitForm__title">{{$route.meta.title + (Object.prototype.toString.call($route.meta.parentTitle) == '[object String]' ? $route.meta.parentTitle : setValue[$route.meta.parentTitle[0]])}}</h3>
        <p class="submitForm__msg">{{$map.msg[$route.meta.msg]}}</p>
        <Form ref="form" :form="this.$route.meta.form || this.form" :isRequired="this.$route.meta.isRequired || this.isRequired" :setValue="setValue" />
        <div class="submitForm__buttons">
            <el-button type="primary" @click="submitForm">保存</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'MaterialsForm',
    props: {
        form: { type: Array, default: () => [] },
        isRequired: [String, Array],
        api: { type: String, default: () => '' },
    },
    data() {
        return {
            setValue: {}
        }
    },
    created() {
        this.setValue = this.$route.query.setValue ? JSON.parse(this.$route.query.setValue) : {};
    },
    methods: {
        submitForm() { // 提交
            this.$refs.form.$refs.queryForm.validate((valid) => {
                if (valid) {
                    let para = {...this.$refs.form.queryForm};
                    if(para.examinationPaperRulesPercentList){
                        let flag = false;
                        for(let item of para.examinationPaperRulesPercentList){
                            if(item.libraryId == '' || item.percent == ''){
                                flag = true;
                                break;
                            }
                        }
                        if(flag){
                            this.$message.warning('请设置题库提取占比')
                            return false;
                        }
                    }
                    this.$api[this.$route.meta.api || this.api](para).then(() => {
                        this.$message.success(`${this.$route.meta.title + (Object.prototype.toString.call(this.$route.meta.parentTitle) == '[object String]' ? this.$route.meta.parentTitle : this.setValue[this.$route.meta.parentTitle[0]])}成功`);
                        let obj = {}
                        if(this.$route.meta.backPara){
                            for(let key of this.$route.meta.backPara){
                                obj[key] = this.setValue[key];
                            }
                        }
                        this.$router.push({ name: this.$route.meta.backName, query: {...obj}})
                    })
                }
            });
        },
    }
}
</script>