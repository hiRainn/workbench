<template>
	<div class="app-container">

		<el-button type="primary" @click="dialogFormVisible = true" style="float:right;margin-bottom: 10px;">添加运营商</el-button>
		<br>
		<el-dialog title="添加运营商" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
		  <el-form :model="form" label-width="80px">
			<el-form-item label="运营商名称">
			  <el-input v-model="form.operator_name" autocomplete="off" ></el-input>
			</el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisible = false">取 消</el-button>
			<el-button type="primary" :disabled="addDsiabled" @click="addcus()">确 定</el-button>
		  </div>
		</el-dialog>
		<el-table
			:data="list"
			border
			v-loading="loading">
			<el-table-column
				prop="id"
				label="编号"
				>
			</el-table-column>
			<el-table-column
				label="运营商名称"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.operator_name }}</span>
					<el-input size="small" v-if="scope.row.edit"  v-model="scope.row.operator_name" :value="scope.row.operator_name"/>
				</template>
			</el-table-column>

			<el-table-column
				label="操作"
				width="200px"
				>
			<template slot-scope="scope">
				<el-button v-if="!scope.row.edit" type="primary" size="small" icon="el-icon-edit" @click="scope.row.edit = true">编辑</el-button>
				<el-button v-if="scope.row.edit" type="success" disabled="true" :disabled="scope.row.disabled" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">确定</el-button>
				<el-button v-if="scope.row.edit" type="danger" size="small" icon="el-icon-circle-check-outline" @click="scope.row.edit = false">取消</el-button>
				<el-button v-if="!scope.row.edit" type="danger" size="small" icon="el-icon-delete" @click="delcus(scope.row.id)">删除</el-button>
			</template>
			</el-table-column>
		</el-table>

	</div>
</template>

<script>
  import { getSimOperatorList, addSimOperator, editSimOperator, delSimOperator } from '@/api/sim_operator'
  import { MessageBox } from 'element-ui'
  export default {
    data() {
      return {
		customer_list:[],
		area:[],
        list: [],
		loading:false,
		addDsiabled:false,
		dialogFormVisible: false,
		edit:false,
		form:{
			operator_name:'',

			token:''
		},
      }
    },

	methods:{
		refreshView() {
		  // In order to make the cached page re-rendered
		  this.$store.dispatch('delAllCachedViews', this.$route)

		  const { fullPath } = this.$route

		  this.$nextTick(() => {
		    this.$router.replace({
		      path: '/redirect' + fullPath
		    })
		  })
		},
		addcus(){
			this.addDsiabled = true;
			if(this.form.operator_name == false) {
				this.$alert('名称不能为空','提示');
				this.addDsiabled = false;
				return false
			}
			addSimOperator(this.form).then( response => {
				this.dialogFormVisible = false;
				this.$message({
					message:'新增成功',
					type:'success'
				});
				this.refreshView();
			}).catch( error => {
				this.$alert(error,'提示')
				this.addDsiabled = true;
			})
		},
		confirmEdit(data){
			data.disabled = true;
			if(data.operator_name == false) {
				this.$alert('名称不能为空','提示');
				data.disabled = false;
				return false
			}
			editSimOperator(data).then( response => {
				data.edit=false;
				this.$message({
					message:'操作成功',
					type:'success'
				});
				this.refreshView();
			}).catch( error => {
				this.$alert(error,'提示')
				data.disabled = false;
			})

		},
		delcus(id) {
			this.$confirm('是否确定删除该类型？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				delSimOperator({id:id}).then( response => {
					this.$message({
						message:'操作成功',
						type:'success'
					});
					this.refreshView();
				}).catch( error => {
					this.$alert(error,'提示')
				})
			}).catch(() => {
				this.$message({
				type: 'info',
				message: '已取消删除'
				});
			});
        },

		getList(data){
			this.loading = true
			getSimOperatorList(data).then( response => {
				let data = response.data.list;
				for (let i in data){
					data[i].edit = false;
					data[i].disabled = false;
				}
				this.list = data
				this.loading = false
			}).catch(error => {
				this.loading = false
				this.$alert(error,'提示')
			})
		},
	},
	mounted(){
		this.getList({})
    this.$notify({
      title: '提示',
      message: '运营商，例中国移动、中国联通、中国电信'
    });
	}
  }
</script>
