<template>
<div class="goods">
    <el-button plain type="success" @click="toAddGoods" class="addgoods">添加商品</el-button>
     <el-table
    style="width: 100%"
    :data="goodsList"
    class="goosdList">
    <el-table-column
      prop="goods_name"
      label="商品名称"
      >
    </el-table-column>
    <el-table-column
      prop="goods_price"
      label="商品价格"
    >
    </el-table-column>
    <el-table-column
      prop="goods_weight"
      label="商品重量">
    </el-table-column>
     <el-table-column
      prop="add_time"
      label="创建时间"
     >
    </el-table-column>
    <el-table-column
      prop="id"
      label="操作">
<el-button type="primary" plain icon="el-icon-edit"></el-button>
<el-button type="danger" plain icon="el-icon-delete"></el-button>
    </el-table-column>
  </el-table>
   <div class="block">

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 15, 20,25]"
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
  data () {
    return {
      goodsList: [],
      pagenum: 1,
      pagesize: 5,
      total: 1
    }
  },
  created () {
    this.getGoods()
  },
  methods: {
    async  getGoods () {
      // 获取所有商品
      const { meta, data } = await this.$axios.get('goods', {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      })
      if (meta.status === 200) {
        console.log(data)
        this.goodsList = data.goods
        this.total = data.total
      }
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.pagenum = 1
      this.getGoods()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.getGoods()
    },
    toAddGoods () {
      this.$router.push('/goods-add')
    }
  }
}
</script>

<style lang="scss" scoped>
.addgoods{
    margin-bottom: 10px;
}
.goosdList{
    margin-bottom: 10px;
}
</style>
