<template>
  <div class="Login">
    <img alt="Vue logo" src="../assets/logo.png">
    <el-form :model="form">
      <el-form-item label="账号：">
        <el-input v-model="form.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input type="password" v-model="form.userPassword"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="warning" @click="login()">登录</el-button>
  </div>
</template>

<script>

import request from '@/utils/request'

export default {
  name: 'Login',
  data: function () {
    return {
      form: {
        userName: '',
        userPassword: ''
      }
    }
  },
  methods: {
    login: function () {
      var that = this
      request.post('/user/login', that.form).then((res) => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
