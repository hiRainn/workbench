<template>
	<div class="app-container" v-loading="loading">

		<el-button type="primary" v-if="(op_type == 2) && (edit == false)" style="right:70px;position: fixed;z-index: 9999;" @click="edit = true">编辑</el-button>
		<el-button type="danger" v-if="(op_type == 2) && edit" style="right:70px;position: fixed;z-index: 9999;" @click="cancleEdit">取消</el-button>
		<el-button type="success"  v-if="edit" :disable="disable" style="right:150px;position: fixed;z-index: 9999;" @click="confirm('data')">确定</el-button>
		<br>
		<h2>详情:</h2>
		<el-form label-width="120px" style="width=800px;" :model="data" :rules="rules" ref="data">

			<el-form-item label="授权名称">
				<span v-if="!edit">{{ data.auth_name }}</span>
				<el-input v-else v-model.number="data.auth_name" ></el-input>
			</el-form-item>
			<el-form-item label="授权编号">
				<span v-if="!edit">{{ data.auth_code }}</span>
				<el-input v-else v-model.number="data.auth_code" ></el-input>
			</el-form-item>
			<el-form-item label="授权类型">
				<span v-if="!edit">{{ data.type_name }}</span>
			  <el-select v-else v-model="data.auth_type" allow-create filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="选择授权类型">
			  	<el-option class="option"
			  		v-for="item in auth_type"
			  		:key="item.id"
			  		:label="item.type_name"
			  		:value="item.id">
			  	</el-option>
			  </el-select>
        <el-popover
          v-if="edit"
          placement="top-start"
          width="200"
          style="padding-top: -14px;"
          trigger="hover"
          content="可以在此直接输入后快捷添加授权类型,输入后一定要点击选择框下面的内容,否则添加授权类型失败!">
          <svg-icon icon-class="help" slot="reference"/>
        </el-popover>
			</el-form-item>
      <el-form-item label="授权类别">
      	<span v-if="!edit">{{ data.cate_name }}</span>
        <el-select v-else v-model="data.auth_cate" allow-create filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="选择授权类型">
        	<el-option class="option"
        		v-for="item in auth_cate"
        		:key="item.id"
        		:label="item.cate_name"
        		:value="item.id">
        	</el-option>
        </el-select>
        <el-popover
          v-if="edit"
          placement="top-start"
          width="200"
          style="padding-top: -14px;"
          trigger="hover"
          content="可以在此直接输入后快捷添加授权类别,输入后一定要点击选择框下面的内容,否则添加授权类别失败!">
          <svg-icon icon-class="help" slot="reference"/>
        </el-popover>
      </el-form-item>

			<el-form-item label="优先级">
			<span v-if="!edit">{{ data.level }}</span>
			  <el-select v-else v-model="data.level" filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="选择优先级">
			  	<el-option class="option"
			  		v-for="item in level"
			  		:key="item.id"
			  		:label="item.name"
			  		:value="item.id">
			  	</el-option>
			  </el-select>
			</el-form-item>
      <el-form-item label="状态">
      	<span v-if="!edit">{{ data.status_name }}</span>
        <el-select v-else v-model="data.status" allow-create filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="选择授权类型">
        	<el-option class="option"
        		v-for="item in status"
        		:key="item.id"
        		:label="item.status_name"
        		:value="item.id">
        	</el-option>
        </el-select>
        <el-popover
          v-if="edit"
          placement="top-start"
          width="200"
          style="padding-top: -14px;"
          trigger="hover"
          content="可以在此直接输入后快捷添加状态,输入后一定要点击选择框下面的内容,否则添加状态失败!">
          <svg-icon icon-class="help" slot="reference"/>
        </el-popover>
      </el-form-item>
			<el-form-item label="操纵号">
				<span v-if="!edit">{{ data.control_number }}</span>
				<el-input v-else type="textarea" v-model="data.control_number" autocomplete="off" placeholder='以英文逗号隔开' ></el-input>
			</el-form-item>
			<el-form-item label="被操纵号">
				<span v-if="!edit">{{ data.controled_number }}</span>
				<el-input v-else type="textarea" v-model="data.controled_number" autocomplete="off" placeholder='以英文逗号隔开' ></el-input>
			</el-form-item>
			<el-form-item label="配置参数">
				<span v-for="item in conf_list">
					<span>{{ item.conf_name }}:</span>
					<span v-if="!edit"> {{ data.conf_value[item.id] }} </span>
					<el-select v-else v-model="data.conf_value[item.id]" filterable clearable class="filter-item" loading-text="正在加载数据" :placeholder="'选择'+ item.conf_name">
						<el-option class="option"
							v-for="(u,i) in item.conf_value"
							:key="i"
							:label="u"
							:value="u">
						</el-option>
					</el-select>
					<br>
					<br>
				</span>
			</el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="data.remark"></el-input>
      </el-form-item>
			<el-form-item label="功能模板">
				<el-radio-group :disabled="!edit" v-model="data.template_id" @change="changeTemplate">
					<el-radio v-for='i in template_list' :label="i.id">{{ i.template_name }}</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="功能选择">
				<el-tree
					ref="tree1"
				  :data="functions_list"
					@check-change="handleCheckChange"
					v-model="data.functions"
					node-key="id"
					show-checkbox
					default-expand-all
				  :expand-on-click-node="false">
				  <span class="custom-tree-node" slot-scope="{ node, data }">
					<span v-if="!data.edit">{{ node.label }}</span>
					<el-input size="mini" v-if="data.edit" v-model="data.label" style="width:120px;height: 20px;"></el-input>
					<el-input size="mini" v-if="data.edit" v-model="data.function_value" placeholder="有值则以 | 隔开,无值请留空"></el-input>
					<!-- <span v-if="(data.function_value.length > 1)" >
					  <el-select v-if="data.functions[data.id]" v-model="data.select_value[data.id]" type="mini"  filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="选择功能值">
					  	<el-option class="option"
					  		v-for="(u,i) in data.function_value"
					  		:key="i"
					  		:label="u"
					  		:value="u">
					  	</el-option>
					  </el-select>
					</span> -->
					</span>
				</el-tree>
			</el-form-item>

		</el-form>

	</div>
</template>

<script>

  import { getAuthTypeList } from '@/api/auth_type.js'
  import { getAuthCateList } from '@/api/auth_cate.js'
  import { getAuthStatusList } from '@/api/auth_status.js'
  import { getConfList } from '@/api/conf.js'
  import { addAuthcode,getAuthcodeInfo,editAuthcode } from '@/api/authcode.js'
  import { getFunctionList,getRadioTemplate } from '@/api/template.js'
  import { MessageBox } from 'element-ui'
  export default {
    data() {
      return {
		    baseUrl:process.env.BASE_API,
			certificate_type:[{id:1,name:'身份证'},{id:2,name:'护照'}],
			params:'',//表单要提交的参数
			auth_type:[

			],
			auth_cate:[

			],
      status:[

      ],
			level:[
				{id:1,name:'1'},
				{id:2,name:'2'},
				{id:3,name:'3'},
				{id:4,name:'4'},
				{id:5,name:'5'},
				{id:6,name:'6'},
				{id:7,name:'7'},
			],

			template_list:[

			],
			error:{

			},

			pay_disabled:true,
			data:{
				id:0,
				auth_name:'',
				auth_code:'',
				type_name:'',
				auth_type:'',
				sim_number:'',
        sim_id:'',
        auth_cate:'',
        cate_name:'',
				auth_user_type_name:'',
				auth_user_type:'',
				level:'',
				control_number:'',
				controled_number:'',
				conf_value:{},
				template_id:'',
        remark:'',
				functions:[],
			},
			rules:{
				server_name:[{required: false, message: '项目名不能为空', trigger: 'blur'}],
				// certificate_number:[{required: true, message: '证件号码不能为空', trigger: 'blur'}],
				// customer_id:[{required: true, message: '上级客户不能为空', trigger: 'blur'}],
				// project_id:[{required: true, message: '项目不能为空', trigger: 'blur'}],
			},
			functions_list:[],
			conf_list:[],
			disable:false,
			loading:false,
			edit:true,
			op_type:1,

		}
	},
	methods:{
		handleCheckChange(data, checked, indeterminate) {
			if(checked) {
				// this.form.functions[data.id] = true;
				//判断是否已在数组中
				var add = true;
				for(var t in this.data.functions) {
					if(data.id ==  this.data.functions[t]) {
						add = false;
					}
				}
				if(add) {
					this.data.functions.push(data.id);
				}

				// this.$set(this.form.functions,data.id,true)
			}
			else{
				for(var p in this.data.functions) {
					if(data.id == this.data.functions[p]) {
						this.data.functions.splice(p,1)
						break;
					}
				}
				// this.$delete(this.form.functions,data.id)
			}
			for(var i in this.data.functions) {
				if( (this.data.functions[i] == false) || (typeof this.data.functions[i] == 'object') ) {
					this.data.functions.splice(p,1)
				}
			}
		},
		changeTemplate(value){
			this.$nextTick(() => {
				this.$refs.tree1.setCheckedKeys([])
			});
			for(var p in this.template_list) {
				if(this.template_list[p]['id'] == value) {
					this.data.functions = this.template_list[p]['functions'];
					// this.$set(this.data.select_value,p,this.list[i]['list'][0]['functions'][p])
					// this.$set(this.data.functions,p,true)
				}
			}
			this.$nextTick(() => {
				this.$refs.tree1.setCheckedKeys(this.data.functions)
			});
		},
    getAuthTypeList(data) {
    	getAuthTypeList(data).then( response => {
    		let data = response.data.list;
    		this.auth_type = data;
    	})
    },
    getAuthCateList(data) {
    	getAuthCateList(data).then( response => {
    		let data = response.data.list;
    		this.auth_cate = data;
    	})
    },
    getAuthStatusList(data) {
    	getAuthStatusList(data).then( response => {
    		let data = response.data.list;
    		this.status = data;
    	})
    },
		getRadioTemplateList(data) {
			getRadioTemplate(data).then( response => {
				let data = response.data.list;
				this.template_list = data;
			})
		},
		getFunctionListList(data) {
			getFunctionList(data).then( response => {
				let data = response.data.list;
				this.functions_list = data;
			})
		},
		getConfList(data) {
			getConfList(data).then( response => {
				let data = response.data.list;
				for(var p in data) {
					data[p]['conf_value'] = data[p]['conf_value'].split('|');
				}
				this.conf_list = data;
			})
		},
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
		getInfo(data){
			this.loading = true
			getAuthcodeInfo(data).then( (response) => {
				let data = response.data;

				//处理数据
				for(var i in data){
					data['O_' + i] = data[i]
          if(data[i] == 0) {
            data[i] = '';
          }
          if(data.functions == false) {
            data.functions = [];
          }
				}
				this.data = data;
				this.$nextTick(() => {
					this.$refs.tree1.setCheckedKeys(this.data.functions)
				});
				this.loading = false
			}).catch(error => {
				this.loading = false
				this.disable = true;
				this.$alert(error,'提示')
			})
		},
		//取消编辑
		cancleEdit(){
			for(var i in this.data){
				if(typeof this.data['O_'+i] != 'undefined'){
					this.data[i] = this.data['O_'+i];
				}
			}
			this.edit = false;
		},
		//确认
		confirm(data){
			this.$refs[data].validate(valid => {
				if(valid) {
					//新增
					if(this.op_type == 1) {
						addAuthcode(this.data).then( response => {
							let id =response.data.id;
							this.$alert('操作成功','提示')
							this.edit = false;
							this.disable = true;
						}).catch(error => {
							// this.disable = true;
							// this.edit = false;
							if( typeof error == 'object') {
								error = '操作成功'
							}
							this.$alert(error,'提示')
						})
						this.$nextTick(() => {
						  this.$router.replace({
						    path: '/redirect' + '/resource/authcode'
						  })
						})

					}
					else if(this.op_type == 2) {
						editAuthcode(this.data).then( response => {
							let id =response.data.id;
							this.$message({
								message:'操作成功',
								type:'success'
							});
							this.refreshView('')
						}).catch(error => {
							// this.disable = true;
							if( typeof error == 'object') {
								error = '操作成功'
							}
							this.$alert(error,'提示')
							this.edit = false;
						})
					}
				}
				else {
					return false;
				}
			})
		},

	},
	mounted(){
		this.select_loading = true;
		switch(this.$route.name) {
			case '新增授权码':this.op_type = 1;break;
			case '授权码详情':this.op_type = 2;break;
		}
		//新增
		if(this.op_type == 1) {
			this.edit=true
		}
		//详情
		else if(this.op_type == 2) {
			this.data.id = this.$route.query.id
			this.getInfo({id:this.data.id});
			this.edit=false;
		}
		this.getRadioTemplateList({});
		this.getFunctionListList({});
		this.getConfList({});
    this.getAuthTypeList({});
    this.getAuthCateList({});
    this.getAuthStatusList({});

	}
 }
</script>
