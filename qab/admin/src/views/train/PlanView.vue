<template>

    <div>

    </div>
</template>
<script>

    export default {
        name: 'PlanAdd',
        data() {
            return {
                idxs:'',
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
                   alert(res.content)
                })
            }

    }
    }
</script>