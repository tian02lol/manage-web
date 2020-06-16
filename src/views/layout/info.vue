<template>
    <div class="userinfo">
      <el-dialog title="个人信息" :visible.sync="editFormVisible" :close-on-click-modal="false">
        <el-form :inline="true" :model="editForm" label-width="80px" :rules="addFormRules" ref="editForm">
            <el-form-item prop="userIcon">
                <el-upload
                    class="avatar-uploader"
                    action="/file/upload"
                    :http-request="upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <el-avatar v-if="imageUrl" :src="imageUrl"></el-avatar>
                    <el-avatar v-else icon="el-icon-user-solid"></el-avatar>
                </el-upload>
            </el-form-item>
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="editForm.userName" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="userPassword">
                <el-input v-model="editForm.userPassword" auto-complete="off" show-password></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click="editSubmit" :loading="editLoading">保存</el-button>
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
      editForm: this.info,
      editLoading: false,
      editFormVisible: this.visible,
      addFormRules: {
        userName: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        userPassword: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
      },
      imageUrl: ''
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
    },
    info: function (n) {
      this.editForm = n
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: function () {
        return {
          userName: '',
          userIcon: '',
          userPassword: ''
        }
      }
    }
  },
  methods: {
    upload (uploadFile) {
      var that = this
      var param = new FormData()
      param.append('file', uploadFile.file)
      request.post(uploadFile.action, param, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        if (res.data.success) {
          uploadFile.onSuccess(res, uploadFile.file)
          that.$notify({
            title: '成功',
            message: '上传成功',
            type: 'success'
          })
          that.editForm.userIcon = res.data.data.url
        } else {
          uploadFile.onError(res.errMsg)
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    editSubmit: function () {
      var that = this
      that.$refs.editForm.validate(valid => {
        if (valid) {
          this.editLoading = true
          request.post('/user/update', that.editForm).then((res) => {
            if (res.data.success) {
              that.$notify({
                title: '成功',
                message: '添加成功',
                type: 'success'
              })
              that.editFormVisible = false
              that.$parent.userInfo()
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
