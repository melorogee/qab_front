<template>
    <div class="submitForm">
        <div class="applyParent">
            <div class="customForm">
                <h3 class="submitForm__title">{{planInfo.title}}</h3>
                <p class="submitForm__msg" style="margin-bottom: 20px;">{{map[planInfo.type]}}</p>
                <div class="planBody" v-html="planInfo.content"></div>
            </div>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'PlanView',
        data() {
            return {
                idxs:'',
                map: {
                    1:'年度培训计划',
                    2:'日常培训计划'
                },
                planInfo: {},
            }
        },
        created() {
            this.idxs = this.$route.query.idxs;
            this.viewData();
        },
        mounted() {

        },
        methods: {
            viewData() {
                let para = { idx:this.idxs.toFixed(0)};
                this.$api.viewData(para).then(res => {
                   this.planInfo = res;
                })
            }

    }
    }
</script>