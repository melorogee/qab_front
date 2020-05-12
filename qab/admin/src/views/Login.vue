<template>
    <div class="login">
        <div class="login__top">
            <h1 class="login__title">安企帮</h1>
            <p class="login__msg">安全生产一站式服务平台</p>
        </div>
        <div class="login__form">
            <el-input v-model.trim="loginForm.loginName" class="login__id" :maxlength="11" placeholder="手机号码" size="middle"></el-input>
            <el-input v-model.trim="loginForm.password" class="login__pw" :maxlength="30" type="password" placeholder="密码" size="middle"></el-input>
            <el-button class="login__loginBtn" type="primary" size="middle" @click="login">登录</el-button>
            <!-- <el-button class="login__getPw" type="text" @click="getPw">忘记密码</el-button> -->
        </div>
    </div>
</template>
<style src="@/assets/scss/Login.scss" lang="scss"></style>
<script>
export default {
    name: 'Login',
    data() {
        return {
            loginForm: {
                loginName: '',
                password: ''
            }
        }
    },
    created() {
        
    },
    methods: {
        login() {
            let para = { ...this.loginForm };
            if(para.loginName == '' || para.password == ''){
                this.$message.warning('请输入手机号和密码')
                return false;
            }
            this.$api.login(para).then(res => {
                sessionStorage.setItem('userName', res.userName)
                sessionStorage.setItem('phone', res.phone)
                sessionStorage.setItem('right', res.type)
                sessionStorage.setItem('userId', res.idx)

                // this.$router.addRoutes()
                if(res.type == 100){
                    this.$router.push({ name: 'Plan' });
                }else if(res.type == 200){
                    this.$router.push({ name: 'Insurebx' });
                }else if(res.type == 300){
                    this.$router.push({ name: 'Call' });
                }else if(res.type == 400){
                    this.$router.push({ name: 'Threepic' });
                }else{
                    this.$router.push({ name: 'Template' });
                }
            })
        },
        getPw() {
            this.$router.push({ name: 'GetPw' });
        }
    }
}
</script>