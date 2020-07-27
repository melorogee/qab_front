<template>
    <div class="submitForm">
        <h3 class="submitForm__title">平台数据导出</h3>
        <p class="submitForm__msg">安企邦平台企业使用情况</p>
        <div class="settingForm">
            <div class="settingForm-item">
                <div class="settingForm-buttons"><el-button @click="download">点击下载安企邦平台企业使用情况</el-button></div>
            </div>

        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    created() {

    },
    methods: {
        download(){
            window.open("/manage/statistics/exportExcel");
        }
    },
}
</script>
