<template>
  <div class="Login">
    <div style="display: flex;justify-content: center;margin-top: 150px">
      <el-card style="width: 400px">
        <div slot="header" class="clearfix">
          <span>登录</span>
        </div>
        <table>
          <tr>
            <td>用户名</td>
            <td>
              <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
            </td>
          </tr>
          <tr>
            <td>密码</td>
            <td>
              <el-input type="password" v-model="form.userPassword" placeholder="请输入密码" @keydown.enter.native="login"></el-input>
              <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
            </td>
          </tr>
          <tr>
            <!-- 占两行-->
            <td colspan="2">
              <!-- 点击事件的两种不同的写法v-on:click和 @click-->
              <!--<el-button style="width: 300px" type="primary" v-on:click="doLogin">登录</el-button>-->
              <el-button style="width: 300px" type="primary" @click="login">登录</el-button>
            </td>
          </tr>
        </table>
      </el-card>
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
      form: {
        userName: '',
        userPassword: ''
      }
    }
  },
  methods: {
    login: function () {
      var that = this
      request.post('/login', that.form).then((res) => {
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
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>
