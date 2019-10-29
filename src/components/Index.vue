<template>
<div class="index">
 <el-container style="height:100%">
  <el-header>
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>
    <div class="title">
      <h1>电商后台管理系统</h1>
    </div>
    <div class="exit">
      欢迎光临~<a href="javascript:void(0)" @click="exit">退出</a>
    </div>
  </el-header>
  <el-container>
    <el-aside width="200px">
<el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      router
      >

      <el-submenu :index="menu.path" v-for="menu in menuList" :key="menu.id" >
        <template v-slot:title>
          <i class="el-icon-location"></i>
          <span>{{menu.authName}}</span>
        </template>
          <el-menu-item :index="item.path" v-for="item in menu.children" :key="item.id">
            <i class="el-icon-menu"></i>
            {{item.authName}}</el-menu-item>
      </el-submenu>

    </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</div>
</template>

<script>
export default {
  data () {
    return {
      menuList: ''
    }
  },
  async created () {
    const { meta, data } = await this.$axios.get('menus')
    // console.log(data)
    if (meta.status === 200) {
      this.menuList = data
    } else {
      this.$message.error(meta.msg)
    }
  },
  methods: {
    exit () {
    // 删除token,弹出回话框,跳转登录页
      this.$confirm('确定要退出系统吗?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 跳转至登录页
        this.$router.push('/login')
        // 删除token
        localStorage.removeItem('token')
        this.$message({
          type: 'success',
          message: '成功退出'
        })
      })
    }
  }
}
</script>
<style lang='scss' >
.index{
    width: 100%;
    height: 100%;
.el-header {
    background-color: #d8d8d8;
    color: #333;
    text-align: center;
    line-height: 60px;
    display: flex;
    .logo{
      width:180px;
      padding: 10px;
      img{
         height: 40px;
         display: block;
      }
    }
    .title{
      flex:1;
      h1{
        color:#545c64;
      }
    }
    .exit{
      width:200px;
      text-align: right;
      font-weight: 700;
a{
color:orange;
}
    }
  }
  .el-aside {
     background-color: #545c64;
    .el-menu {
      border: none;
    }
  }
   .el-main {
    background-color: #ecf0f1;
  }
}

</style>
