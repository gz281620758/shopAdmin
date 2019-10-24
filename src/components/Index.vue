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
      欢迎光临~<a href="javascript:void(0)">退出</a>
    </div>
  </el-header>
  <el-container>
    <el-aside width="200px">
<el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      router
      >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="user">
            <i class="el-icon-menu"></i>
            用户列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">
             <i class="el-icon-menu"></i>
            角色列表
            </el-menu-item>
        </el-menu-item-group>
         <el-menu-item-group>
          <el-menu-item index="2-2">
             <i class="el-icon-menu"></i>
            权限列表
            </el-menu-item>
        </el-menu-item-group>
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
