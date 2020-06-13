<template>
  <div class="login_wrapper">
        <div class="login">
            <el-form :model="loginForm" ref="loginForm" :rules="loginRules">
                <el-form-item>
                    <h2 class="title">后台管理系统</h2>
                </el-form-item>
                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item prop="userPassword">
                    <el-input v-model="loginForm.userPassword" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login()">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

import request from '@/utils/request'
import store from '@/store'

export default {
  name: 'Login',
  data: function () {
    return {
      loginForm: {
        userName: '',
        userPassword: ''
      },
      loading: false,
      loginRules: {
        userName: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        userPassword: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      }
    }
  },
  methods: {
    login: function () {
      var that = this
      that.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          request.post('/login', that.loginForm).then((res) => {
            if (res.data.success) {
              that.$notify({
                title: '成功',
                message: '登录成功',
                type: 'success'
              })
              store.commit('changeLogin', res.data)
              that.$router.push('/home')
            } else {
              that.$notify.error({
                title: '失败',
                message: res.data.errDesc
              })
            }
            this.loading = false
          }).catch((err) => {
            this.loading = false
            console.log(err)
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
$input_width:300px;

.login_wrapper {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .login {
        width: 460px;
        margin-top: -150px;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .title {
            text-align: center;
            color: #505458;
        }
        .el-form-item__content {
            width: $input_width;
        }
        .el-button {
            width: $input_width;
        }
        .el-form {
            margin: 30px 80px auto 80px;
            .error {
                display: block;
                text-align: center;
                color: red;
            }
        }
    }
}
.recover{
    position:absolute;
    bottom:0px;
    cursor:pointer;
    color:#E6A23C;
    // display: none;
}
.bei{
    position:absolute;
    bottom:20px;
    cursor:pointer;
    color:#505458;
}
</style>
