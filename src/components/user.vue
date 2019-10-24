<template>
<div class="user">
   <el-table
   :data="userList"
    border
    style="width: 100%">
    <el-table-column
      prop="username"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="180">
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话">
    </el-table-column>
     <el-table-column
      prop="name"
      label="用户状态"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="操作">
    <el-button plain type="primary" icon="el-icon-edit"></el-button>
    <el-button plain type="danger" icon="el-icon-delete"></el-button>
     <el-button plain type="success" icon="el-icon-check" >分配角色</el-button>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import axios from 'axios'
export default {
  created () {
    this.getUserList()
  },
  data: function () {
    return {
      userList: [],
      query: '',
      pagenum: 1,
      pagesize: 4
    }
  },
  methods: {
    getUserList () {
      axios.get('http://localhost:8888/api/private/v1/users', {
        headers: { 'Authorization': localStorage.getItem('token') },
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      }).then(res => {
        // console.log(res)
        const { data, meta } = res.data
        if (meta.status === 200) {
          console.log(data.users)
          this.userList = data.users
        } else {
          console.log('获取失败')
        }
      })
    }
  }
}
</script>
<style lang='scss'>

</style>
