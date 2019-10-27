<template>
<div class="user">
  <!-- 面包屑 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
<!-- 搜索框 -->
<div style="margin-top: 15px;" class="search">
  <el-input placeholder="请输入内容" v-model="query" class="searchUser">
       <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
  </el-input>

  <el-button type="success" plain @click="dialogFormVisible = true">添加用户</el-button>
</div>
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
      <template v-slot:default="obj">
      <el-switch
       v-model="obj.row.mg_state"
       active-color="#13ce66"
       inactive-color="#ff4949"
       @change="changestatus(obj.row.id,obj.row.mg_state)"
       >
     </el-switch>
      </template>
    </el-table-column>
    <el-table-column
      prop="id"
      label="操作">
    <template v-slot:default="obj">
    <el-button plain type="primary" icon="el-icon-edit" @click="showEditDialog(obj.row)"></el-button>
    <el-button plain type="danger" icon="el-icon-delete" @click="del(obj.row.id)"></el-button>
     <el-button plain type="success" icon="el-icon-check" >分配角色</el-button>
    </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      background
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :current-page="pagenum"
      :page-sizes="[2,4,6]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalsize"
>
    </el-pagination>
  </div>
   <!-- 嵌套表单的Dialog -->
  <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="40%" label-width="100px"  @close="resetform">
    <el-form ref="form" :rules="rules" :model="form" status-icon>
    <el-form-item label="用户名"  required  prop="username" >
    <el-input  v-model="form.username" ></el-input>
    </el-form-item>
   <el-form-item label="密码"   required prop="password">
    <el-input v-model="form.password" type="password"></el-input>
    </el-form-item>
   <el-form-item label="邮箱"   prop="email">
    <el-input v-model="form.email" ></el-input>
   </el-form-item>
   <el-form-item label="手机"   prop="mobile">
    <el-input  v-model="form.mobile"></el-input>
   </el-form-item>
   </el-form>
   <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser" >确 定</el-button>
   </div>
</el-dialog>
<!-- 修改表单的Dialog -->
<el-dialog title="添加用户" :visible.sync="dialogEditVisible" width="40%">
    <el-form ref="editForm" :rules="rules" :model="editForm" status-icon label-width="80px">
     <el-form-item label="用户名">
      <el-tag type="info">{{editForm.username}}</el-tag>
    </el-form-item>
   <el-form-item label="邮箱"   prop="email">
    <el-input v-model="editForm.email" ></el-input>
   </el-form-item>
   <el-form-item label="手机" prop="mobile">
    <el-input  v-model="editForm.mobile"></el-input>
   </el-form-item>
   </el-form>
   <div slot="footer" class="dialog-footer">
    <el-button @click="dialogEditVisible=false">取 消</el-button>
    <el-button type="primary" @click="editUser" >确 定</el-button>
   </div>
</el-dialog>
</div>
</template>

<script>
export default {
  created () {
    this.getUserList()
  },
  data: function () {
    return {
      userList: [],
      query: '',
      pagenum: 1,
      pagesize: 2,
      totalsize: 1,
      dialogFormVisible: false,
      dialogEditVisible: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editForm: {
        username: '',
        email: '',
        mobile: '',
        id: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
          { min: 3, max: 12, message: '用户名长度必须是3-12位', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { min: 3, max: 12, message: '密码长度必须是3-12位', trigger: ['blur', 'change'] }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    async getUserList () {
      const { data, meta } = await this.$axios.get('/users', {
        params: {
          query: this.query,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      if (meta.status === 200) {
        // console.log(data.users)
        this.userList = data.users
        this.totalsize = data.total
      } else {
        this.$message.error(meta.msg)
      }
    },
    handleSizeChange (val) {
      // console.log(`每页${val}条`)
      this.pagesize = val
      this.pagenum = 1
      this.getUserList()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getUserList()
    },
    async del (id) {
      try {
        await this.$confirm('亲, 你确认要进行删除吗?', '温馨提示', {
          type: 'warning'
        })
        const { meta } = await this.$axios.delete(`/users/${id}`)
        // console.log(res)
        if (meta.status === 200) {
          this.$message.success('删除成功！')
          if (this.userList.length === 1 && this.pagenum > 1) {
            this.pagenum--
          }
          this.getUserList()
        } else {
          this.$message.error(meta.msg)
        }
      } catch (err) {
        console.log(err)
      }
    },
    searchUser () {
      this.getUserList()
    },
    async  changestatus (id, type) {
      // console.log(id, type)
      const res = await this.$axios.put(`users/${id}/state/${type}`)
      console.log(res)
      const meta = res.meta
      if (meta.status === 200) {
        this.$message.success(meta.msg)
      } else {
        this.$message.error(meta.msg)
      }
    },
    // 添加用户
    async addUser () {
      try {
        await this.$refs.form.validate()
        const { meta } = await this.$axios.post('/users', this.form)
        if (meta.status === 201) {
          this.$message.success('添加成功')
          this.dialogFormVisible = false
          // 跳转到最后一页
          this.totalsize++
          this.pagenum = Math.ceil(this.totalsize / this.pagesize)
          this.getUserList()
        } else {
          this.$message.error('添加失败')
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 重置表单
    resetform () {
      // 重置表单内容
      this.$refs.form.resetFields()
    },
    // 重现数据
    showEditDialog (row) {
      this.dialogEditVisible = true
      this.editForm.username = row.username
      this.editForm.email = row.email
      this.editForm.mobile = row.mobile
      this.editForm.id = row.id
    },
    // 编辑用户
    async  editUser () {
      try {
        await this.$refs.editForm.validate()
        const { meta } = await this.$axios.put(`users/${this.editForm.id}`, {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        })
        if (meta.status === 200) {
          this.$message.success(meta.msg)
          this.dialogEditVisible = false
          this.getUserList()
        } else {
          this.$message.error(meta.msg)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.searchUser{
  width: 300px;
  margin-right: 20px;
}
.search{
  margin-bottom: 10px;
}
</style>
