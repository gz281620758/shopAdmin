<template>
<div class="login">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px"  status-icon>
         <img src="../assets/ligan.jpg" alt="" class="logo">
  <el-form-item label="用户名" prop="username">
    <el-input @keyup.enter.native="submitForm" v-model="form.username" ></el-input>
  </el-form-item>
    <el-form-item label="密码" prop="password">
    <el-input  @keyup.enter.native="submitForm" v-model="form.password" type="password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" class="loginBtn" @click="submitForm">登录</el-button>
    <el-button @click="resetForm">重置</el-button>
  </el-form-item>
</el-form>
</div>

</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
          { min: 3, max: 12, message: '用户名长度必须是3-12位', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { min: 3, max: 12, message: '密码长度必须是3-12位', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    async submitForm () {
      try {
        await this.$refs.form.validate()
        const { meta, data } = await this.$axios.post('/login', this.form)
        if (meta.status === 200) {
          // 跳转首页
          localStorage.setItem('token', data.token)
          this.$message.success(meta.msg)
          this.$router.push('/index')
        } else {
          // console.log(meta.msg)
          this.$message.error(meta.msg)
        }
      } catch (error) {
        console.log(error)
      }
    },
    resetForm () {
      this.$refs.form.resetFields()
    }
  }
}

</script>
<style lang='scss' scoped>
.login{
    width:100%;
    height:100%;
    background-color:#fa5a5a;
    //  #82c8a0
    overflow: hidden;
    .el-form{
       width:400px;
       padding: 20px;
       padding-top: 70px;
       margin: 0 auto;
       margin-top: 200px;
       border-radius: 20px;
       background-color: #fff;
       position: relative;
    }
    .logo{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top:-70px;
        border-radius: 50%;
        border: 10px solid #fff;
        width:130px;
        height:130px;
    }
    .loginBtn{
        margin-right: 70px;
    }
}
</style>
