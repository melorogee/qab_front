<template>
    <div>
        <div >新员工入职培训</div>
        <div style="margin-bottom: 20px;font-size: 9px" >编辑时间：{{params.updateTime}}</div>
        <table class="defaultTable" >
            <tr><th>培训主题</th><td>{{params.title}}</td><th>教育类型</th><td>{{educationTypeMap[params.educationType]}}</td></tr>
            <tr><th>培训方式</th><td>{{trainingTypeMap[params.trainingType]}}</td><th>培训内容</th><td>{{params.content}}</td></tr>
            <tr><th>效果检验方式</th><td>{{effectInspectionMethodMap[params.effectInspectionMethod]}}</td><th>总计时常</th><td>{{params.totalClassMinute}}</td></tr>
        </table>
        <div style="display:flex;margin-top: 20px">
            <div style="margin-bottom: 20px;width: 50%;" v-if="params.courseList != null">实施培训</div>
            <div style="margin-bottom: 20px;width: 50%" v-if="params.trainingUserList != null">落实情况</div>
        </div>

        <div style="display:flex">
            <div style="width: 50%" v-if="params.courseList != null">
                <table class="defaultTable" style="width: 80%" >
                    <tr><th>培训课程</th><th>学时</th></tr>
                    <tr  v-for="(item, index) in params.courseList" :key="index">
                        <td>{{item.name}}</td><td>{{item.classHour}}</td>
                    </tr>
                </table>
            </div>

            <div style="width: 50%" v-if="params.trainingUserList != null">
                <table class="defaultTable"  style="width: 80%">
                    <tr><th>培训对象</th><th>学时或培训照片</th></tr>
                    <tr  v-for="(item, index) in params.courseList" :key="index">
                        <td>{{item.name}}</td><td>{{item.classHour}}</td></tr>
                </table>
            </div>
        </div>


    </div>
</template>
<script>
export default {
    name: 'Trainnewdetail_sub',
    data() {
        return {
            params:{},
            educationTypeMap:{1:"公司级",2:"车间级教育",3:"班组级教育"},
            trainingTypeMap:{1:"线上",2:"线下"},
            effectInspectionMethodMap:{1:"考核",2:"考试"}
        }
    },
    created() {
        this.params = this.$route.query;
    },
    
    methods: {

    }
}
</script>