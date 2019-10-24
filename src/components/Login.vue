<template>
<div class="login">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px"  status-icon>
         <img src="../assets/avatar.jpg" alt="" class="logo">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="form.username" ></el-input>
  </el-form-item>
    <el-form-item label="密码" prop="password">
    <el-input v-model="form.password" type="password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" class="loginBtn" @click="submitForm">登录</el-button>
    <el-button @click="resetForm">重置</el-button>
  </el-form-item>
</el-form>
</div>

</template>

<script>
import axios from 'axios'
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
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (!valid) return

        axios.post('http://localhost:8888/api/private/v1/login', this.form).then(res => {
          // let meta = res.data.meta
          // if (meta.status === 200) {
          //   // console.log(meta.msg)
          //   // 跳转首页
          //   this.$router.push('/index')
          // } else {
          //   console.log(meta.msg)
          // }
          console.log(res)
          // axios优化
          // 对象结构
          const { meta, data } = res.data

          if (meta.status === 200) {
            console.log(data.token)

            // 跳转首页
            localStorage.setItem('token', data.token)
            this.$message({
              message: '登录成功,跳转首页!',
              type: 'success',
              center: 'true'
            })
            this.$router.push('/index')
            // this.$router.push('/index')
            // router.beforEach((to, from, next) => {
            //   const token = window.localStorage.setItem('token', data.token)
            //   if (to.path === '/login' || token) {
            //     next()
            //   } else {
            //     next('/login')
            //   }
            // })
          } else {
            console.log(meta.msg)
            this.$message({
              message: '登录失败',
              center: true,
              type: 'error',
              duration: 1000
            })
          }
        })
      })
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
    background-color: pink;
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
    }
    .loginBtn{
        margin-right: 70px;
    }
}
</style>
