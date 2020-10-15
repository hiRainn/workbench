<template>
	<div class="app-container">

		<el-button type="primary" @click="dialogFormVisible = true" style="float:right;margin-bottom: 10px;">添加套餐</el-button>
		<br>
		<el-dialog title="添加套餐" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
		  <el-form :model="form" label-width="80px">
			<el-form-item label="套餐名称" required>
			  <el-input v-model="form.package_name" autocomplete="off" ></el-input>
			</el-form-item>
			<el-form-item label="套餐描述">
			  <el-input v-model="form.package_desc" autocomplete="off" ></el-input>
			</el-form-item>
			<el-form-item label="套餐价格">
			  <el-input v-model.number="form.package_price" autocomplete="off" ></el-input>
			</el-form-item>
			<el-form-item label="付费方式">
				<el-radio-group v-model="form.package_type">
					<el-radio :label="1">一次性</el-radio>
					<el-radio :label="2">按月</el-radio>
					<el-radio :label="3">按半年</el-radio>
					<el-radio :label="4">按年</el-radio>
				</el-radio-group>
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
				width="50px"
				>
			</el-table-column>
			<el-table-column
				label="套餐名称"
				width="200px"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.package_name }}</span>
					<el-input size="small" v-if="scope.row.edit"  v-model="scope.row.package_name" :value="scope.row.package_name"/>
				</template>
			</el-table-column>
			<el-table-column
				label="套餐说明"
				width="300px"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.package_desc }}</span>
					<el-input size="small" v-if="scope.row.edit"  v-model="scope.row.package_desc" :value="scope.row.package_desc"/>
				</template>
			</el-table-column>
			<el-table-column
				label="套餐价格"
				width="150px"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.package_price }}</span>
					<el-input size="small" v-if="scope.row.edit"  v-model="scope.row.package_price" :value="scope.row.package_price"/>
				</template>
			</el-table-column>
			<el-table-column
				label="套餐内容"
				>
				<template slot-scope="scope">
					<el-radio-group :disabled="!scope.row.edit" v-model="scope.row.package_type">
						<el-radio label="1">一次性</el-radio>
						<el-radio label="2">按月</el-radio>
						<el-radio label="3">按半年</el-radio>
						<el-radio label="4">按年</el-radio>
					</el-radio-group>
				</template>
			</el-table-column>
			
			<el-table-column
				label="操作"
				width="200px"
				>
			<template slot-scope="scope">
				<el-button v-if="!scope.row.edit" type="primary" size="small" icon="el-icon-edit" @click="scope.row.edit = true">编辑</el-button>
				<el-button v-if="scope.row.edit" type="success" :disabled="scope.row.disabled" size="small" icon="el-icon-circle-check-outline" @click="confirmEdit(scope.row)">确定</el-button>
				<el-button v-if="scope.row.edit" type="danger" size="small" icon="el-icon-circle-check-outline" @click="scope.row.edit = false">取消</el-button>
				<el-button v-if="!scope.row.edit" type="danger" size="small" icon="el-icon-delete" @click="delcus(scope.row.id)">删除</el-button>
			</template>
			</el-table-column>
		</el-table>
		
	</div>
</template>

<script>
  import { getFunctions } from '@/api/function.js'
  import { getPackageList, addPackage, editPackage, delPackage } from '@/api/package.js'
  import { MessageBox } from 'element-ui'
  export default {
    data() {
      return {
        list: [],
		loading:false,
		dialogFormVisible: false,
		addDsiabled:false,
		edit:false,
		form:{
			package_name:'',
			package_desc:'',
			package_price:'',
			package_type:'',
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
			if(this.form.package_name == false || this.form.package_type.length == false) {
				this.$alert('名称不能为空','提示');
				this.addDsiabled = false;
				return false
			}
			addPackage(this.form).then( response => {
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
			if(data.package_name == false) {
				this.$alert('名称不能为空','提示');
				data.disabled = false;
				return false
			}
			editPackage(data).then( response => {
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
			this.$confirm('是否确定删除该功能', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				delPackage({id:id}).then( response => {	
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
			getPackageList(data).then( response => {
				let data = response.data.list;
				for (let i in data){
					data[i].edit = false;
					data[i].package_type = data[i].package_type.toString();
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
	}
  }
</script>