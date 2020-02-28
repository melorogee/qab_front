
<template>
    <div>
        <el-steps :active="active" finish-status="success">
            <el-step title="提交报名信息"></el-step>
            <el-step title="订单支付"></el-step>
            <el-step title="报名完成"></el-step>
        </el-steps>

        <!-- step 1 -->
        <el-input v-model="applyNum" placeholder="报名人数"></el-input>
        <el-select v-model="type" placeholder="培训类型"  style="margin-top: 30px" >
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>

        <el-date-picker
                v-model="date"
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"

        >
        </el-date-picker>

        <input type="file" @change="getFile($event)">

        <!-- step 1 -->

        <el-button style="margin-top: 12px;" @click="addData">下一步</el-button>
    </div>
</template>
<script>
    import axios from 'axios'  //引入axios

    export default {
        name: 'ExamApply',
        data() {
            return {

                type:'',
                date:'',
                dateTime:'',
                active: 0,
                applyNum:'',
                options: [{
                    value: '1',
                    label: '新员工三级培训'
                }, {
                    value: '2',
                    label: '继续教育'
                }, {
                    value: '3',
                    label: '取证教育'
                }],
                formData: new FormData(),


            }
        },
        created() {
        },
        mounted() {

        },
        methods: {
            addData() {
                alert(this.date)
                this.formData.append('deadline', this.date);
                this.formData.append('educationType', this.type);
                this.formData.append('enrollNumber', this.applyNum);
                let config = {
                    headers: {'Content-Type': 'multipart/form-data'}
                }
                axios.post(`/manage/examination/enroll/import`,this.formData,config).then(function(res){
                    console.log('post请求...');
                    console.log(res.data);
                });


            },

            onChangeDate(date, dateString) {
                alert(date);
                this.dateTime = dateString;

            },
            getFile(event) {
                let file = event.target.files[0]
                this.formData.append('file', file, file.name) // 通过append向form对象添加数据
            },

    }
    }
</script>