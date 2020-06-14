<template>
    <div class="user">
      <el-button
          @click="add()">新增</el-button>
        <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column label="头像" prop="userIcon">
    </el-table-column>
    <el-table-column label="用户名" prop="userName">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
    background
    layout="prev, pager, next"
    :total="1000">
  </el-pagination>
  <userForm :visible.sync="visible"></userForm>
    </div>
</template>
<script>
import request from '@/utils/request'
import userForm from './form'
export default {
  data () {
    return {
      tableData: [],
      visible: false
    }
  },
  components: {
    userForm
  },
  methods: {
    handleEdit: function (item) {

    },
    handleDelete: function (item) {

    },
    add: function () {
      this.visible = true
    },
    queryUserList: function () {
      var that = this
      request.get('/user/list').then((res) => {
        if (res.data.success) {
          that.tableData = res.data.data
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  created () {
    this.queryUserList()
  }
}
</script>
