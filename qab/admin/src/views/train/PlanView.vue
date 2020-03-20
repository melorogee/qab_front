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

<style>
    .planBody table {
        border-top: 1px solid #ccc;
        border-left: 1px solid #ccc;
    }
    .planBody  table td,
    .planBody table th {
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;
        padding: 3px 5px;
    }
    .planBody table th {
        border-bottom: 2px solid #ccc;
        text-align: center;
    }

    /* blockquote 样式 */
    .planBody blockquote {
        display: block;
        border-left: 8px solid #d0e5f2;
        padding: 5px 10px;
        margin: 10px 0;
        line-height: 1.4;
        font-size: 100%;
        background-color: #f1f1f1;
    }

    /* code 样式 */
    .planBody code {
        display: inline-block;
        *display: inline;
        *zoom: 1;
        background-color: #f1f1f1;
        border-radius: 3px;
        padding: 3px 5px;
        margin: 0 3px;
    }
    .planBody pre code {
        display: block;
    }

    /* ul ol 样式 */
    .planBody ul, ol {
        margin: 10px 0 10px 20px;
    }
</style>