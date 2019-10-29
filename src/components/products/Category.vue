<template>
<div class="categories">
   <el-button plain type="success" class="addcategory">添加分类</el-button>
    <el-table
    style="width: 100%"
    :data="categoriesList"
    class="goosdList"
    row-key="cat_id"
    :tree-props="{children: 'children'}"
    >

    <el-table-column
      prop="cat_name"
      label="分类名称"
      >
    </el-table-column>
    <el-table-column
      label="是否有效"
      >
      是
    </el-table-column>
    <el-table-column
      prop="cat_level"
      label="排序">
    </el-table-column>
    <el-table-column
      label="操作">

     <el-button type="primary" plain icon="el-icon-edit" ></el-button>
     <el-button type="danger" plain icon="el-icon-delete"></el-button>
    </el-table-column>
     </el-table>
      <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      :current-page="pagenum"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</div>
</template>

<script>
export default {
  created () {
    this.getcategoriesList()
  },
  data () {
    return {
      categoriesList: [],
      pagenum: 1,
      pagesize: 5,
      total: 1
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pagesize = val
      this.pagenum = 1
      this.getcategoriesList()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getcategoriesList()
    },
    async   getcategoriesList () {
      const { data, meta } = await this.$axios.get('categories', {
        params: {
          type: 3,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      // console.log(res
      if (meta.status === 200) {
        console.log(data.result)
        this.categoriesList = data.result
        this.total = data.total
      } else {
        this.$message.error(meta.msg)
      }
    }
  }
}
</script>

<style lang="scss">
.addcategory{
    margin-bottom: 10px;
}
</style>
