<template>
    <div class="userform">
      <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :inline="true" :model="editForm" label-width="80px" :rules="addFormRules" ref="editForm">
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="editForm.userName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="userPassword">
                <el-input v-model="editForm.userPassword" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click="editSubmit" :loading="editLoading">提交</el-button>
        </div>
    </el-dialog>
    </div>
</template>
<script>
import request from '@/utils/request'
export default {
  data () {
    return {
      tableData: [],
      editForm: {
        userName: '',
        userPassword: ''
      },
      editLoading: false,
      editFormVisible: this.visible,
      addFormRules: {
        userName: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        userPassword: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      }
    }
  },
  watch: {
    visible: function (n) {
      this.editFormVisible = n
    },
    // 关闭弹窗
    editFormVisible: function (n) {
      if (!n) {
        this.$refs.editForm.resetFields()
      }
      this.$emit('update:visible', n)
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    editSubmit: function () {
      var that = this
      that.$refs.editForm.validate(valid => {
        if (valid) {
          this.editLoading = true
          request.post('/user/save', that.editForm).then((res) => {
            if (res.data.success) {
              that.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success'
              })
              that.editFormVisible = false
              that.$parent.queryUserList()
            } else {
              that.$notify.error({
                title: '失败',
                message: res.data.errDesc
              })
            }
            this.editLoading = false
          }).catch((err) => {
            this.editLoading = false
            console.log(err)
          })
        }
      })
    }
  },
  created () {
  }
}
</script>
