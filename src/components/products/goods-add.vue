<template>
<div class="goods-add">
<!-- 步骤 -->
<el-steps :active="active" finish-status="success">
  <el-step title="步骤 1" description="基本信息"></el-step>
  <el-step title="步骤 2" description="商品图片"></el-step>
  <el-step title="步骤 3" description="商品内容"></el-step>
</el-steps>
<el-tabs tab-position="left" :before-leave="next">
    <el-tab-pane label="基本信息">
     <el-form   label-width="80px" >
     <el-form-item label="商品名称">
        <el-input ></el-input>
     </el-form-item>
     <el-form-item label="商品价格">
        <el-input ></el-input>
     </el-form-item>
     <el-form-item label="商品重量">
        <el-input ></el-input>
     </el-form-item>
     <el-form-item label="商品数量">
        <el-input ></el-input>
      </el-form-item>
     <el-form-item label="商品分类">
      <el-select >
      <el-option>
      </el-option>
     </el-select>
      </el-form-item>
      </el-form>
      <el-button type="primary"  @click="next">下一步</el-button>
    </el-tab-pane>
    <el-tab-pane label="商品管理">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
               <img v-if="imageUrl" :src="imageUrl" class="avatar">
               <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
         <el-button type="primary"  @click="next">下一步</el-button>
    </el-tab-pane>
    <el-tab-pane label="商品内容">商品内容</el-tab-pane>
  </el-tabs>

</div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  },
  methods: {
    next () {
      if (this.active++ > 2) this.active = 0
    }

  }
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
