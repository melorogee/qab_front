<template>
    <div class="submitForm">
        <h3 class="submitForm__title">账户安全</h3>
        <p class="submitForm__msg">完善账户安全信息，保护数据安全</p>
        <div class="settingForm">
            <div class="settingForm-item">
                <div class="settingForm-label">用户名</div>
                <div class="settingForm-value">{{userName}}</div>
                <div class="settingForm-buttons"><el-button @click="userUpdateUserName">修改</el-button></div>
            </div>
            <div class="settingForm-item">
                <div class="settingForm-label">手机号码</div>
                <div class="settingForm-value">{{phone}}</div>
                <!-- <div class="settingForm-buttons"><el-button>更换</el-button></div> -->
            </div>
            <div class="settingForm-item">
                <div class="settingForm-label">登录密码</div>
                <div class="settingForm-value"><span class="settingForm-ok">已设置</span></div>
                <div class="settingForm-buttons"><el-button @click="userUpdatePwd">修改</el-button></div>
            </div>
        </div>

        <el-dialog title="修改用户名" :visible.sync="userNameDialog" width="30%">
            <el-form :model="ruleForm" :rules="rules" ref="userName" label-width="100px" class="hiddenBorder">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="ruleForm.userName" placeholder="请输入用户名"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="userNameDialog = false">取消</el-button>
                <el-button type="primary" @click="saveUserName">保存</el-button>
            </span>
        </el-dialog>

        <el-dialog title="修改密码" :visible.sync="userUpdatePwdDialog" width="30%">
            <el-form :model="pwForm" :rules="pwRules" ref="pwForm" label-width="100px" class="hiddenBorder">
                <el-form-item label="原密码" prop="oldPwd">
                    <el-input v-model="pwForm.oldPwd" placeholder="请输入原密码"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPwd">
                    <el-input v-model="pwForm.newPwd" placeholder="请输入新密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="newPwd2">
                    <el-input v-model="pwForm.newPwd2" placeholder="请输入确认密码"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="userUpdatePwdDialog = false">取消</el-button>
                <el-button type="primary" @click="savePw">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userName: '',
            phone: '',
            userNameDialog: false,
            userUpdatePwdDialog: false,
            ruleForm: {
                userName: '', 
            },
            pwForm: {
                oldPwd: '',
                newPwd: '',
                newPwd2: '',
            },
            rules: {
                userName: [{ required: true, message: '请输入用户名', trigger: 'change' }]
            },
            pwRules: {
                oldPwd: [{ required: true, message: '请输入原密码', trigger: 'change' }],
                newPwd: [{ required: true, message: '请输入新密码', trigger: 'change' }],
                newPwd2: [
                    {
                        required: true,  trigger: 'change', validator: (rule, value, callback) => {
                            if(value == ''){
                                callback(new Error('请输入确认密码'))
                            }else if( this.pwForm.newPwd != this.pwForm.newPwd2) {
                                callback(new Error('确认密码有误'))
                            }else {
                                callback()

                            }
                        }
                    }
                ]
            }
        }
    },
    created() {
        this.userName = sessionStorage.getItem('userName');
        this.ruleForm.userName = sessionStorage.getItem('userName');
        this.phone = sessionStorage.getItem('phone');
        this.ruleForm.phone = sessionStorage.getItem('phone');
    },
    methods: {
        userUpdateUserName() {
            this.userNameDialog = true;
        },
        saveUserName() {
            this.$refs.userName.validate((valid) => {
                if (valid) {
                    this.$api.userUpdateUserName({userName: this.ruleForm.userName}).then(() => {
                        this.$message.success('修改成功');
                        this.userNameDialog = false;
                        this.userName = this.ruleForm.userName;
                        sessionStorage.setItem('userName', this.ruleForm.userName);
                        window.setUserName();
                    })
                }
            });
            
        },
        userUpdatePwd(){
            this.userUpdatePwdDialog = true;
        },
        savePw(){
            this.$refs.pwForm.validate((valid) => {
                if (valid) {
                    this.$api.userUpdatePwd({oldPwd: this.pwForm.oldPwd, newPwd: this.pwForm.newPwd}).then(() => {
                        this.$message.success('修改成功');
                        this.userUpdatePwdDialog = false;
                       
                    })
                }
            });
        },
    },
}
</script>