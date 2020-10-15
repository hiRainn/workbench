<template>
	<div class="app-container">

		<el-button type="primary" @click="dialogFormVisible = true" style="float:right;margin-bottom: 10px;">添加模板</el-button>
		<br>
		<br>
		
		<el-dialog title="添加模板" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
		  <el-form :model="form" label-width="80px" :rules="rules" ref="form"> 
			<el-form-item label="模板名称" prop="template_name">
			  <el-input v-model="form.template_name" autocomplete="off" ></el-input>
			</el-form-item>
			<el-form-item label="包含功能" prop="functions">
			  <el-tree
			    :data="functions_list"
				@check-change="handleCheckChange"
				v-model="form.functions"
				node-key="id"
				show-checkbox
				default-expand-all
			    :expand-on-click-node="false">
			    <span class="custom-tree-node" slot-scope="{ node, data }">
			  	<span v-if="!data.edit">{{ node.label }}</span>
			  	<el-input size="mini" v-if="data.edit" v-model="data.label" style="width:120px;height: 20px;"></el-input>
			  	<el-input size="mini" v-if="data.edit" v-model="data.function_value" placeholder="有值则以 | 隔开,无值请留空"></el-input>
			  	<span v-if="(data.function_value.length > 1)" >
			  	  <el-select v-if="form.functions[data.id]" v-model="form.select_value[data.id]" type="mini"  filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="选择功能值">
			  	  	<el-option class="option"
			  	  		v-for="(u,i) in data.function_value"
			  	  		:key="i"
			  	  		:label="u"
			  	  		:value="u">
			  	  	</el-option>
			  	  </el-select>
			  	</span>
				
			    </span>
			  </el-tree>
			</el-form-item>
		  </el-form>
		  
		  
		  <div slot="footer" class="dialog-footer">
			<el-button @click="dialogFormVisible = false">取 消</el-button>
			<el-button type="primary" :disabled="addDsiabled" @click="addcus()">确 定</el-button>
		  </div>
		</el-dialog>
		
		<el-dialog title="编辑模板" :visible.sync="dialogFormVisible1" :close-on-click-modal="false">
		  <el-form :model="edit_form" label-width="80px" :rules="edit_rules" ref="edit_form"> 
			<el-form-item label="模板名称" prop="template_name">
			  <el-input v-model="edit_form.template_name" autocomplete="off" ></el-input>
			</el-form-item>
			<el-form-item label="包含功能" prop="functions">
			  <el-tree
				ref="tree1"
			    :data="functions_list"
				@check-change="handleCheckChange1"
				v-model="edit_form.functions"
				node-key="id"
				show-checkbox
				default-expand-all
				v-bind:default-checked-keys="editSelect"
			    :expand-on-click-node="false">
			    <span class="custom-tree-node" slot-scope="{ node, data }">
			  	<span v-if="!data.edit">{{ node.label }}</span>
			  	<el-input size="mini" v-if="data.edit" v-model="data.label" style="width:120px;height: 20px;"></el-input>
			  	<!-- <el-input size="mini" v-if="data.edit" v-model="data.function_value" placeholder="有值则以 | 隔开,无值请留空"></el-input> -->
			  	<span v-if="(data.function_value.length > 1)" >
			  	  <el-select v-if="edit_form.functions[data.id]" v-model="edit_form.select_value[data.id]" type="mini"  filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="选择功能值">
			  	  	<el-option class="option"
			  	  		v-for="(u,i) in data.function_value"
			  	  		:key="i"
			  	  		:label="u"
			  	  		:value="u">
			  	  	</el-option>
			  	  </el-select>
			  	</span>
				
			    </span>
			  </el-tree>
			</el-form-item>
		  </el-form>
		  
		  <div slot="footer" class="dialog-footer">
			<el-button @click="cancleEdit">取 消</el-button>
			<el-button type="primary" :disabled="editDisabled" @click="editcus()">确 定</el-button>
		  </div>
		</el-dialog>
		
		
		<span v-for="(u,i) in list">
			<el-tree
			  :data="u.list"
			  @check-change="handleCheckChange1"
			  node-key="id"
			  show-checkbox
			  v-bind:default-checked-keys="u.select"
			  :expand-on-click-node="false">
			  <span class="custom-tree-node" slot-scope="{ node, data }">
				<span v-if="!data.edit">{{ node.label }}</span>
				<el-input size="mini" v-if="data.edit" v-model="data.label" style="width:120px;height: 20px;"></el-input>
				<el-input size="mini" v-if="data.edit" v-model="data.function_value" placeholder="有值则以 | 隔开,无值请留空"></el-input>
				<span v-if="data.id > 10000" style="margin-left: 30px;">
					<el-button type="danger" size="mini" icon="el-icon-edit" @click="showEdit(i)">编辑</el-button>
				</span>
				<!-- <span>
				  <el-button v-if="!data.edit" type="text" size="mini" icon="el-icon-edit" @click="data.edit = true">编辑</el-button>
				  <el-button v-if="data.edit" type="text" :disabled="data.disabled" size="mini" icon="el-icon-circle-check-outline" @click="confirmEdit(data)">确定</el-button>
				  <el-button v-if="data.edit" type="text" size="mini" icon="el-icon-circle-check-outline" @click="data.edit = false">取消</el-button>
				  <el-button v-if="!data.edit" type="text" size="mini" icon="el-icon-delete" @click="delcus(data.id)">删除</el-button>
				</span> -->
			  </span>
			</el-tree>
			<hr>
		</span>
		
		
	</div>
</template>

<script>
  import { getTemplateList, addTemplate, editTemplate, delTemplate,selectTemplate,getFunctionList } from '@/api/template.js'
  import { MessageBox } from 'element-ui'
  export default {
    data() {
		var checkFunctions = (rule, value, callback) => {
			let must_select = [];
			//找出已选择必选
			for(var q in this.form.functions) {
				for(var t in this.must_select_id) {
					if(q == this.must_select_id[t]) {
						must_select.push(q);
					}
				}
			}
			for(var p in must_select) {
				if(typeof this.form.select_value[must_select[p]] == 'undefined' || this.form.select_value[must_select[p]] == false) {
					callback(new Error('有选择的功能必须选择默认值'));
				}
			}
			callback();
			
		};
      return {
		must_select_id:[],//有select框的选择项id，必须进行选择
		customer_list:[],
        functions_list: [],
		editSelect:[],
		list:[],
		loading:false,
		addDsiabled:false,
		editDisabled:false,
		dialogFormVisible: false,
		dialogFormVisible1: false,
		edit:false,
		form:{
			template_name:'',
			functions:{},
			select_value:{},
			token:''
		},
		edit_form:{
			id:0,
			template_name:'',
			functions:{},
			select_value:{},
			token:''
		},
		rules:{
			functions:[
				{required: true, message: '功能不能为空', trigger: 'blur'},
				{validator: checkFunctions}
			],
			template_name:[
				{required: true, message: '模板名不能为空', trigger: 'blur'},
			]
			
		},
		edit_rules:{
			functions:[
				{required: true, message: '功能不能为空', trigger: 'blur'},
				{validator: checkFunctions}
			],
			template_name:[
				{required: true, message: '模板名不能为空', trigger: 'blur'},
			]
			
		},
      }
    },
	
	
	methods:{
		showEdit(i) {
			this.edit_form.id = parseInt(this.list[i]['list'][0].id) - 10000;
			this.edit_form.template_name = this.list[i]['list'][0].label;
			// this.$set(this.editSelect,this.list[i]['select'])
			this.editSelect = this.list[i]['select'];
			for(var p in this.list[i]['list'][0]['functions']) {
				this.$set(this.edit_form.select_value,p,this.list[i]['list'][0]['functions'][p])
				this.$set(this.edit_form.functions,p,true)
			}
			
			this.$nextTick(() => {
				this.$refs.tree1.setCheckedKeys(this.editSelect)
			});
			
			this.dialogFormVisible1 = true;
			console.log(this.edit_form)
		},
		cancleEdit(){
			this.edit_form.id = 0;
			this.edit_form.template_name = '';
			// this.$set(this.editSelect,[])
			this.editSelect = [];
			this.$nextTick(() => {
				this.$refs.tree1.setCheckedKeys(this.editSelect)
			});
			this.dialogFormVisible1 = false;
		},
		handleCheckChange(data, checked, indeterminate) {
			if(checked) {
				// this.form.functions[data.id] = true;
				this.$set(this.form.functions,data.id,true)
			}
			else{
				this.$delete(this.form.functions,data.id)
			}
		},
		handleCheckChange1(data, checked, indeterminate) {
			if(checked) {
				// this.form.functions[data.id] = true;
				this.$set(this.edit_form.functions,data.id,true)
			}
			else{
				this.$delete(this.edit_form.functions,data.id)
			}
		},
		// selectChange(value,id){
		// 	this.form.select_value[id] = value;
		// },
		refreshView() {
		  this.$store.dispatch('delAllCachedViews', this.$route)
		
		  const { fullPath } = this.$route
		
		  this.$nextTick(() => {
		    this.$router.replace({
		      path: '/redirect' + fullPath
		    })
		  })
		},
		addcus(){
			this.$refs['form'].validate(valid => {
				if(valid) {
					this.addDsiabled = true;
					//讲select_value 与 functions 里面结合起来
					for (let p in this.form.functions) {
						for(let q in this.form.select_value) {
							if(p == q) {
								this.form.functions[p] = this.form.select_value[q]
							}
						}
					}
					addTemplate(this.form).then( response => {
						this.dialogFormVisible = false;
						this.$message({
							message:'新增成功',
							type:'success'
						});
						this.refreshView();
					}).catch( error => {
						this.$alert(error,'提示')
						this.addDsiabled = false;
					})
				}
				else {
					this.addDsiabled = false;
					return false;
				}
			})
			
		},
		editcus(){
			this.$refs['edit_form'].validate(valid => {
				if(valid) {
					this.addDsiabled = true;
					//讲select_value 与 functions 里面结合起来
					for (let p in this.edit_form.functions) {
						for(let q in this.edit_form.select_value) {
							if(p == q) {
								this.edit_form.functions[p] = this.edit_form.select_value[q]
							}
						}
					}
					editTemplate(this.edit_form).then( response => {
						this.dialogFormVisible = false;
						this.$message({
							message:'编辑成功',
							type:'success'
						});
						this.refreshView();
					}).catch( error => {
						this.$alert(error,'提示')
						this.addDsiabled = false;
					})
				}
				else {
					this.addDsiabled = false;
					return false;
				}
			})
			
		},
		// confirmEdit(data){
		// 	this.$refs[data].validate(valid => {
		// 		if(valid) {
		// 			data.disabled = true;
		// 			if(data.label == false) {
		// 				this.$alert('名称不能为空','提示');
		// 				data.disabled = false;
		// 				return false
		// 			}
		// 			editTemplate(data).then( response => {
		// 				data.edit=false;
		// 				this.$message({
		// 					message:'操作成功',
		// 					type:'success'
		// 				});
		// 				this.refreshView();
		// 			}).catch( error => {
		// 				this.$alert(error,'提示')
		// 				data.disabled = false;
		// 			})
		// 		}
		// 		else {
		// 			return false;
		// 		}
		// 	})
		// 	
		// 	
		// },
		delcus(id) {
			this.$confirm('是否确定删除该功能', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				delTemplate({id:id}).then( response => {	
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
			getTemplateList(data).then( response => {
				let data = response.data.list;
				
				this.list = data
				this.loading = false
			}).catch(error => {
				this.loading = false
				this.$alert(error,'提示')
			})
		},
		getFunctionsList(data){
			this.loading = true
			getFunctionList(data).then( response => {
				let data = response.data.list;
				this.must_select_id = response.data.must_select_id
				this.functions_list = data
				this.loading = false
			}).catch(error => {
				this.loading = false
				this.$alert(error,'提示')
			})
		},
	},
	mounted(){
		this.getList({})
		this.getFunctionsList({});
	}
  }
</script>