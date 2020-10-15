<template>
	<div class="app-container">

		<el-button type="primary" @click="dialogFormVisible = true" style="float:right;margin-bottom: 10px;">添加功能</el-button>
		<br>
		<br>
		
		<el-dialog title="添加功能" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
		  <el-form :model="form" label-width="80px">
			<el-form-item label="功能名称">
			  <el-input v-model="form.label" autocomplete="off" ></el-input>
			</el-form-item>
			<el-form-item label="所属分类">
			  <el-select v-model="form.parent_id" filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="选择上级功能">
			  	<el-option class="option"
			  		v-for="item in select_function_list"
			  		:key="item.id"
			  		:label="item.label"
			  		:value="item.id">
			  	</el-option>
			  </el-select>
			</el-form-item>
			<!-- <el-form-item label="功能值">
			  <el-input v-model="form.function_value" autocomplete="off" placeholder="若有多个请以|隔开,若无请留空" ></el-input>
			</el-form-item> -->
		  </el-form>
		  <div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisible = false">取 消</el-button>
			<el-button type="primary" :disabled="addDsiabled" @click="addcus()">确 定</el-button>
		  </div>
		</el-dialog>
		<el-tree
		  :data="list"
		  node-key="id"
		  default-expand-all
		  :expand-on-click-node="false">
		  <span class="custom-tree-node" slot-scope="{ node, data }">
			<span v-if="!data.edit">{{ node.label }}</span>
			<el-input size="mini" v-if="data.edit" v-model="data.label" style="width:120px;height: 20px;"></el-input>
			<!-- <el-input size="mini" v-if="data.edit" v-model="data.function_value" placeholder="有值则以 | 隔开,无值请留空"></el-input> -->
			<span>
			  <el-button v-if="!data.edit" type="text" size="mini" icon="el-icon-edit" @click="data.edit = true">编辑</el-button>
			  <el-button v-if="data.edit" type="text" :disabled="data.disabled" size="mini" icon="el-icon-circle-check-outline" @click="confirmEdit(data)">确定</el-button>
			  <el-button v-if="data.edit" type="text" size="mini" icon="el-icon-circle-check-outline" @click="data.edit = false">取消</el-button>
			  <el-button v-if="!data.edit" type="text" size="mini" icon="el-icon-delete" @click="delcus(data.id)">删除</el-button>
			</span>
		  </span>
		</el-tree>
		
	</div>
</template>

<script>
  import { getFunctionsList, addFunctions, editFunctions, delFunctions,selectFunctions } from '@/api/function.js'
  import { MessageBox } from 'element-ui'
  export default {
    data() {
      return {
		select_function_list:[],
		customer_list:[],
		area:[],
        list: [],
		loading:false,
		addDsiabled:false,
		dialogFormVisible: false,
		edit:false,
		form:{
			label:'',
			parent_id:'',
			function_value:'',
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
			if(this.form.label == false) {
				this.$alert('名称不能为空','提示');
				this.addDsiabled = false;
				return false
			}
			addFunctions(this.form).then( response => {
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
			if(data.label == false) {
				this.$alert('名称不能为空','提示');
				data.disabled = false;
				return false
			}
			editFunctions(data).then( response => {
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
				delFunctions({id:id}).then( response => {	
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
			getFunctionsList(data).then( response => {
				let data = response.data.list;
				// for (let i in data){
				// 	data[i].edit = false;
				// 	data[i].disabled = false;
				// }
				this.list = data
				this.loading = false
			}).catch(error => {
				this.loading = false
				this.$alert(error,'提示')
			})
		},
		getSelectFunction(){
			selectFunctions({}).then( response => {
				let data = response.data.list;
				// for (let i in data){
				// 	data[i].edit = false;
				// 	data[i].disabled = false;
				// }
				this.select_function_list = data
				this.loading = false
			}).catch(error => {
				this.loading = false
				this.$alert(error,'提示')
			})
		}
	},
	mounted(){
		this.getList({})
		this.getSelectFunction();
	}
  }
</script>