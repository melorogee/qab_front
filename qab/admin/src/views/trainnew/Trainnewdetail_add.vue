<template>
    <div>
        <el-form ref="dialog" label-width="100px" >

            <el-form-item label="培训主题"  class="submitForm__item">
                <el-input  placeholder="请输入岗位名称" v-model="param.subject"></el-input>
            </el-form-item>



            <el-form-item label="教育类型" class="submitForm__item">
                <el-select  v-model="param.educationType"  :maxlength="60" :placeholder="`请选择`"  >
                    <el-option v-for="(option, index) in educationTypeList"
                               :key="index"
                               :label="option.name"
                               :value="option.idx">

                    </el-option>
                </el-select>
            </el-form-item>


            <el-form-item label="培训方式" class="submitForm__item">
                <el-select  v-model="param.trainingType"  :maxlength="60" :placeholder="`请选择`"  >
                    <el-option v-for="(option, index) in trainingTypeList"
                               :key="index"
                               :label="option.name"
                               :value="option.idx">

                    </el-option>
                </el-select>
            </el-form-item>



            <el-form-item label="培训内容"  class="submitForm__item" style="width: 800px">
                <el-input type="textarea"  v-model="param.content" >
                </el-input>
            </el-form-item>


            <el-form-item label="效果检验方式" class="submitForm__item">
                <el-select  v-model="param.effectInspectionMethod"  :maxlength="60" :placeholder="`请选择`"  >
                    <el-option v-for="(option, index) in effectInspectionMethodList"
                               :key="index"
                               :label="option.name"
                               :value="option.idx">

                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="培训课程" class="submitForm__item" style="width: 500px">
                <el-select  v-model="param.courseIdList"  :maxlength="60" :placeholder="`请选择`" multiple  @change="caculateHours">
                    <el-option v-for="(option, index) in courseList"
                               :key="index"
                               :label="option.name"
                               :value="option.idx">

                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="学时"  class="submitForm__item">
                <el-input   v-model="param.classHour" disabled></el-input>
            </el-form-item>


            <el-form-item label="培训对象" class="submitForm__item" style="width: 800px">
                <el-select  v-model="param.employeeIdList"  :maxlength="60" :placeholder="`请选择`" multiple  >
                    <el-option v-for="(option, index) in employeeList"
                               :key="index"
                               :label="option.name"
                               :value="option.idx">

                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item  class="submitForm__item" style="width: 800px">
                <el-button  type="primary" @click="saveTrainNew" plain>保存</el-button>

            </el-form-item>


            <!--            <el-form-item label="考试截止时间：" prop="date" class="submitForm__item" >-->
<!--                <el-date-picker-->
<!--                        v-model="param.date"-->
<!--                        type="date"-->
<!--                        placeholder="请选择截止日期"-->
<!--                        value-format="yyyy-MM-dd"-->
<!--                        format="yyyy-MM-dd"-->
<!--                        :picker-options="pickerBeginDateBefore"-->
<!--                >-->
<!--                </el-date-picker>-->
<!--            </el-form-item>-->

        </el-form>
    </div>
</template>
<script>
    import axios from 'axios'  //引入axios

    export default {
    name: 'Trainnewdetail_add',
    data() {
        return {
            param:{},
            educationTypeList:[{idx:1,name:"公司级"},{idx:2,name:"车间级教育"},{idx:3,name:"班组级教育"}],
            trainingTypeList:[{idx:1,name:"线上"},{idx:2,name:"线下"}],
            effectInspectionMethodList:[{idx:1,name:"考核"},{idx:2,name:"考试"}],
            courseList:[],
            employeeList:[]
        }
    },
    created() {
        this.getCourseList();
        this.getEmployeeList();
    },
    
    methods: {
        getCourseList:function () {
            let this_ =this;
            axios.get(`/manage/enterprise/year/plan/course/list?educationType=1`).then(function(res){
                this_.courseList = res.data.data;
            });
        },

        getEmployeeList:function () {
            let this_ =this;
            axios.get(`/manage/enterprise/year/plan/employee/list?type=1`).then(function(res){
                this_.employeeList = res.data.data;
            });
        },

        caculateHours:function () {
            let tempCount = 0

            for (let i = 0; i < this.courseList.length; i++) {
                if(this.courseList[i] != null && this.courseList[i] != undefined){
                    for (let j = 0; j < this.param.courseIdList.length; j++) {

                        if( this.courseList[i].idx == this.param.courseIdList[j]){
                            tempCount += this.courseList[i].classHour
                        }
                    }
                }
            }
           this.param.classHour = tempCount
        },

        saveTrainNew:function () {
           if(this.param.subject == null){
               this.$message.warning(`请输入主题`);
           }else if(this.param.educationType == null){
               this.$message.warning(`请选择教育类型`);
           }else if(this.param.trainingType == null){
               this.$message.warning(`请选择培训方式`);
           }else if(this.param.content == null){
               this.$message.warning(`请输入培训内容`);
           }else if(this.param.effectInspectionMethod == null){
               this.$message.warning(`请选择效果检验方式`);
           }else if(this.param.courseIdList == null){
               this.$message.warning(`请选择培训课程`);
           }else if(this.param.classHour == null){
               this.$message.warning(`学时为空`);
           }else if(this.param.employeeIdList == null || this.param.employeeIdList.length == 0){
               this.$message.warning(`请选择培训对象`);
           }else{
               this.param.courseIds = this.param.courseIdList.toString()
               this.param.employeeIds = this.param.employeeIdList.toString()

               this.$api.saveTrainNew(this.param).then(() => {
                   this.$message.success(`保存成功`);
                   this.$router.push({name: 'Trainnewdetail'})
               })
           }
        }
    }
}
</script>