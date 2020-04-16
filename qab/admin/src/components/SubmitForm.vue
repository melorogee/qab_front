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
                    // console.log(para.examinationPaperRulesPercentList)
                    let error = false;
                    let tempdata =para.examinationPaperRulesPercentList
                    if(tempdata){
                        let flag = false;
                        let flag2 = false;

                        let total = 0.0;
                        for(let item of tempdata){
                            // console.log(item)
                            // console.log(item.questionCount)
                            let tempId = item.libraryId.split('_')[0]
                            let tempCount = item.libraryId.split('_')[1]
                            let tempName = item.libraryId.split('_')[2]

                            item.libraryId = tempId;
                            item.libraryName = tempName;


                            if(item.percent>tempCount){
                                flag2 = true;
                                break;
                            }
                            if(item.libraryId == '' || item.percent == ''){
                                flag = true;
                                break;
                            }else{
                                total += Number(item.percent)
                            }
                        }
                        if(flag){
                            this.$message.warning('请设置题库提取占比')
                            error = true;
                        }else if
                        (flag2){
                            this.$message.warning('占比不可以题库总题数')
                            error = true;
                        }
                        if(total!=100){
                            this.$message.warning('题库提取占比不为100%')
                            error = true;
                        }
                    }
                    if(!error){
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

                }
            });
        },
    }
}
</script>