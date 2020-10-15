<template>
  <el-table :data="list" style="width: 100%;padding-top: 10px;" height="250">
    <el-table-column label="名称" min-width="20">
      <template slot-scope="scope">
        <span>{{ scope.row.project_name }}</span>

      </template>
    </el-table-column>
    <el-table-column label="所属单位"  align="left">
      <template slot-scope="scope">
        {{ scope.row.unit_name }}
      </template>
    </el-table-column>
	<el-table-column label="使用单位"  align="left">
	  <template slot-scope="scope">
	    {{ scope.row.used_uint_name }}
	  </template>
	</el-table-column>
  <el-table-column label="项目金额" min-width="50" align="left">
    <template slot-scope="scope">
      {{ scope.row.sum_money }}
    </template>
  </el-table-column>

    <el-table-column label="签约时间" width="100" align="center">
      <template slot-scope="{row}">
        {{ row.sign_time }}
      </template>
    </el-table-column>
    <el-table-column label="到期时间" width="100" align="center">
      <template slot-scope="{row}">
        {{ row.end_time }}
      </template>
    </el-table-column>
    <el-table-column label="状态" width="100" align="center">
      <template slot-scope="{row}">
        <span v-if="row.range== 1" style="color: #35D120">{{ row.status }}</span>
        <span v-else-if="row.range== 2" style="color: orange">{{ row.status }}</span>
        <span v-else-if="row.range== 3" style="color: #FA0446">{{ row.status }}</span>
        <span v-else-if="row.range== 4" style="color: #840688">{{ row.status }}</span>

      </template>
    </el-table-column>
    <el-table-column label="操作" width="100" align="center">
      <template slot-scope="scope">
        <router-link :to="scope.row.link" style="color: #3d92f1;">
          查看
        </router-link>
        <el-button type="text" style="color:red" v-if="type == 'project'" @click="overProject(scope.row.id,scope.$index)">完结</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { transactionList } from '@/api/remote-search'
import { overProject } from '@/api/project.js'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }
      return statusMap[status]
    },
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },
  props : {
    list :{
      type:Array,
      default() {
        return []
      }
    },
    type :{
      type:String,
      default() {
        return ''
      }
    }
  },
  created() {
    
  },
  methods: {
    overProject(id,index) {
       this.$confirm('此操作将完结项目,一旦完结无论完全付款都将不再在此处提示, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$prompt('', '请输入完结备注', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          var data = {
            id:id,
            end_remark:value
          }
          overProject(data).then(response => {
            this.list.splice(index,1)
            this.$message({
              type: 'success',
              message: '操作成功: '
            });
          })


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消'
        });
      });
    }
  }
}
</script>
