<template>
<div class="roles">
 <!-- 面包屑 -->
  <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>权限管理</el-breadcrumb-item>
  <el-breadcrumb-item>角色列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-button type="success" plain class="addUserBtn" @click="showAddRoleDialog">添加角色</el-button>
   <!-- 表格 -->
    <el-table
   :data="rolesList"
    style="width: 100%">
    <el-table-column type="index"></el-table-column>
    <el-table-column type="expand">
    <template slot-scope="obj">
     <el-row v-for="l1 in obj.row.children" :key="l1.id" class="l1" >
         <el-col :span="4"> <el-tag  closable @close="delTag(obj.row,l1.id)">{{l1.authName}}</el-tag> <i class="el-icon-arrow-right"></i> </el-col>
         <el-col :span="20">
             <el-row v-for="l2 in l1.children" :key="l2.id">
               <el-col :span="4"><el-tag type="success" class="l2"  closable  @close="delTag(obj.row,l2.id)">{{l2.authName}}</el-tag> <i class="el-icon-arrow-right"></i></el-col>
               <el-col :span="20">
                       <el-tag v-for="l3 in l2.children" :key="l3.id" type="warning" class="l3"  closable  @close="delTag(obj.row,l3.id)">
                    {{l3.authName}}
                </el-tag>
               </el-col>
             </el-row>
         </el-col>
     </el-row>
    </template>

    </el-table-column>
    <el-table-column
      prop="roleName"
      label="角色名称" >
    </el-table-column>
    <el-table-column
      prop="roleDesc"
      label="描述" >
    </el-table-column>
    <el-table-column
      prop="level"
      label="操作">
      <template v-slot:default="{row}">
    <el-button type="primiary" plain icon="el-icon-edit" @click="showRole(row)"></el-button>
    <el-button type="danger" plain icon="el-icon-delete" @click="showdeldialog(row.id)"></el-button>
    <el-button type="success" plain icon="el-icon-check" @click="showAssignVisible(row)">分配权限</el-button>
    </template>
    </el-table-column>
  </el-table>
  <!-- 弹出分配权限框 -->
<el-dialog title="分配权限" :visible.sync="AssignVisible">
  <!-- 树形控件 -->
<el-tree
  :data="data"
  show-checkbox
  default-expand-all
  node-key="id"
  ref="tree"
  :props="defaultprops"
>
</el-tree>
  <div slot="footer" class="dialog-footer">
    <el-button @click="AssignVisible = false">取 消</el-button>
    <el-button type="primary" @click="assignRights">确 定</el-button>
  </div>
</el-dialog>
 <!-- 弹出添加角色框 -->
<el-dialog title="添加角色" :visible.sync="AddRoleVisible" width="600px"  @close="resetform">
    <el-form ref="addroleform" :rules="rules" :model="addroleform" status-icon label-width="100px">
      <el-form-item label="角色名称" prop="roleName">
         <el-input v-model="addroleform.roleName" ></el-input>
         </el-form-item>
         <el-form-item label="角色描述" >
         <el-input v-model="addroleform.roleDesc"></el-input>
         </el-form-item>
   </el-form>
   <div slot="footer" class="dialog-footer">
    <el-button @click="AddRoleVisible = false">取 消</el-button>
    <el-button type="primary" @click="addRole" >确 定</el-button>
   </div>
</el-dialog>
<!-- 弹出修改角色框 -->
<el-dialog title="修改角色" :visible.sync="editRoleVisible" width="600px" >
    <el-form ref="editroleform" :rules="rules" :model="editroleform" status-icon label-width="100px">
      <el-form-item label="角色名称" prop="editroleName">
         <el-input v-model="editroleform.editroleName" ></el-input>
         </el-form-item>
         <el-form-item label="角色描述" >
         <el-input v-model="editroleform.editroleDesc"></el-input>
         </el-form-item>
   </el-form>
   <div slot="footer" class="dialog-footer">
    <el-button @click="editRoleVisible = false">取 消</el-button>
    <el-button type="primary" @click="editRole" >确 定</el-button>
   </div>
</el-dialog>
</div>
</template>

<script>
export default {
  data () {
    return {
      rolesList: [],
      AssignVisible: false,
      AddRoleVisible: false,
      editRoleVisible: false,
      addroleform: {
        roleName: '',
        roleDesc: ''
      },
      editroleform: {
        editroleName: '',
        editroleDesc: '',
        id: ''
      },
      delroleform: {
        id: ''
      },
      data: [],
      defaultprops: {
        children: 'children',
        label: 'authName'
      },
      // 角色id
      roleId: '',
      rules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: ['blur', 'change'] }
        ],
        editroleName: [{
          required: true, message: '角色名称不能为空', trigger: ['blur', 'change']
        }]
      }
    }
  },
  created () {
    this.getRolesList()
  },
  methods: {
    async  getRolesList () {
      const { data, meta } = await this.$axios.get('roles')
      console.log(data)
      if (meta.status === 200) {
        this.rolesList = data
      } else {
        this.$message.error(meta.msg)
      }
    },
    // 删除tag
    async  delTag (row, roleId) {
      const { id } = row
      const { meta, data } = await this.$axios.delete(`roles/${id}/rights/${roleId}`)
      // console.log(res)
      if (meta.status === 200) {
        this.$message.success(meta.msg)
        // 改变数据 更新视图 不刷新
        row.children = data
      } else {
        this.$message.error(meta.msg)
      }
    },
    // 展示分配权限提示框
    async showAssignVisible (row) {
      // 确定角色id
      this.roleId = row.id
      this.AssignVisible = true
      const { data, meta } = await this.$axios.get('rights/tree')
      // console.log(res)
      if (meta.status === 200) {
        this.data = data
        const nodeid = []
        row.children.forEach(l1 => {
          l1.children.forEach(l2 => {
            l2.children.forEach(l3 => {
              nodeid.push(l3.id)
            })
          })
        })
        this.$refs.tree.setCheckedKeys(nodeid)
      } else {
        this.$message.error(meta.msg)
      }
    },
    // 分配权限
    async  assignRights () {
      this.AssignVisible = true
      const checkedkeys = this.$refs.tree.getCheckedKeys()
      const halfcheckedkeys = this.$refs.tree.getHalfCheckedKeys()
      const rids = [...checkedkeys, ...halfcheckedkeys].join(',')
      const { meta } = await this.$axios.post(`roles/${this.roleId}/rights`, {
        rids
      })
      // console.log(res)
      if (meta.status === 200) {
        this.$message.success(meta.msg)
        this.AssignVisible = false
        // 重新渲染
        this.getRolesList()
      } else {
        this.$message.error(meta.msg)
      }
    },
    // 展示添加角色提示框
    showAddRoleDialog () {
      this.AddRoleVisible = true
    },
    // 展示删除提示框
    async   showdeldialog (id) {
      try {
        this.delroleform.id = id
        await this.$confirm('你确定要删除该文件吗', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const { meta } = await this.$axios.delete(`roles/${this.delroleform.id}`)
        // console.log(res)
        if (meta.status === 200) {
          this.$message.success(meta.msg)
          this.deldialogVisible = false
          this.getRolesList()
        } else {
          this.$message.error(meta.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 添加角色
    async  addRole () {
      try {
        await this.$refs.addroleform.validate()
        const { meta } = await this.$axios.post('roles', this.addroleform)
        // console.log(res)
        if (meta.status === 201) {
          this.$message.success(meta.msg)
          this.AddRoleVisible = false
        } else {
          this.message.error(meta.msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 重置表单
    resetform () {
      // 重置表单内容
      this.$refs.addroleform.resetFields()
    },
    // 数据回显
    showRole (row) {
      this.editRoleVisible = true
      this.editroleform.editroleName = row.roleName
      this.editroleform.editroleDesc = row.roleDesc
      this.editroleform.id = row.id
    },
    // 编辑角色
    async  editRole () {
      try {
        await this.$refs.editroleform.validate()
        const { meta } = await this.$axios.put(`roles/${this.editroleform.id}`, {
          roleName: this.editroleform.editroleName,
          roleDesc: this.editroleform.editroleDesc
        })
        // console.log(res)
        if (meta.status === 200) {
          this.$message.success(meta.msg)
          this.editRoleVisible = false
          // 重新渲染
          this.getRolesList()
        } else {
          this.$message.errot(meta.msg)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.addUserBtn{
    margin-bottom: 10px;
}
.l1{
    border-bottom: 1px dotted #ccc;
    padding: 10px 0;
    &:last-child{
border-bottom: none;
    }
    .l2{
        margin:0 10px 10px 0;
    }
    .l3{
          margin:0 10px 10px 0;
    }
}
</style>
