<template>
    <div class="login-wrap">
        <div class="ms-title">心灵之家管理系统</div>
        <div class="ms-login">
            <el-form :model="admin" :rules="rules" ref="admin" label-width="0px" class="demo-admin">
                <el-form-item prop="account">
                    <el-input v-model="admin.account" placeholder="请输入账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="admin.password" @keyup.enter.native="submitForm"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm">登录</el-button>
                </div>
                <!--<p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>-->
            </el-form>
        </div>
        <img src="../../assets/foot.jpg" class="foot-img">
        <p class="foot-desc"> Copyright © 2018 心灵之家 版权所有</p>
    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                admin: {
                    account: '',
                    password: ''
                },
                rules: {
                    account: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm() {
                const vm = this;
                let isTep = false;

                vm.$refs.admin.validate((valid) => {
                    if(valid) {
                        // 发送验证用户请求
                        vm.$axios.post('/mapis/admin/login', vm.admin).then((res) => {
                            if(res.data.state) {
                                vm.$router.push('/user');
                            }
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped>
    @import "style.css";
</style>
