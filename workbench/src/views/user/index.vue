<template>
	<div class="app-container">
		<div class="filter-container">
			<el-select v-model="search1.use_customer_id" filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入使用搜索客户名称">

				<el-option class="option"
					v-for="item in customer_list"
					:key="item.id"
					:label="item.name"
					:value="item.id">
				</el-option>
			</el-select>
			<el-input placeholder="联系人名称" v-model="search1.user" style="width: 200px;" class="filter-item" />
			<el-input placeholder="联系电话" v-model="search1.mobile" style="width: 200px;" class="filter-item" />

			<el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
		</div>
		<el-button type="primary" @click="dialogFormVisible = true" style="float:right;margin-bottom: 10px;">添加用户</el-button>
		<br>
		<el-dialog title="添加用户" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
		  <el-form :model="form" ref="form" label-width="80px">
			<el-form-item label="使用人" prop="user" :rules="[
				  { required: true, message: '姓名不能为空'}
				]">
			  <el-input v-model="form.user" autocomplete="off" ></el-input>
			</el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.mobile" autocomplete="off" placeholder=""></el-input>
      </el-form-item>

			<el-form-item label="使用单位"  required>
				<el-select v-model="form.use_customer_id" filterable placeholder="选择上级单位">
					<el-option class="option"
						v-for="item in customer_list"
						:key="item.id"
						:label="item.name"
						:value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
      <el-form-item label="所属项目"  required>
      	<el-select v-model="form.project_id" filterable placeholder="选择上级单位">
      		<el-option class="option"
      			v-for="item in project_list"
      			:key="item.id"
      			:label="item.name"
      			:value="item.id">
      		</el-option>
      	</el-select>
      </el-form-item>
      <el-form-item label="设备">
      	<el-select v-model="form.device_id"  filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入机身码">
      		<el-option class="option"
            v-if="item.project_id == form.project_id"
      			v-for="(item,index) in device_list"
      			:key="index"
      			:label="item.name"
      			:value="item.id">
      		</el-option>
      	</el-select>
      </el-form-item>
      <el-form-item label="授权">
      	<el-select v-model="form.auth_id"  filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入授权码">
      		<el-option class="option"
            v-if="item.project_id == form.project_id"
      			v-for="item in auth_list"
      			:label="item.name"
      			:value="item.id">
      		</el-option>
      	</el-select>

      </el-form-item>
      <el-form-item label="sim卡号">
      	<el-select v-model="form.sim_id" filterable  clearable class="filter-item" loading-text="正在加载数据" placeholder="输入iccid">
      		<el-option class="option"
            v-if="item.project_id == form.project_id"
      			v-for="item in sim_list"
      			:key="item.id"
      			:label="item.name"
      			:value="item.id">
      		</el-option>
      	</el-select>
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
				label="使用人姓名"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.user }}</span>
					<el-input size="small" v-if="scope.row.edit"  v-model="scope.row.user" :value="scope.row.user"/>
				</template>
			</el-table-column>
      <el-table-column
      	label="联系电话"
      	>
      	<template slot-scope="scope">
      		<span v-if="!scope.row.edit">{{ scope.row.mobile }}</span>
      		<el-input size="small" v-if="scope.row.edit"  v-model="scope.row.mobile" :value="scope.row.mobile"/>
      	</template>
      </el-table-column>
      <el-table-column
      	label="所属项目"
      	>
      	<template slot-scope="scope">
      		<span v-if="!scope.row.edit">{{ scope.row.project_name }}</span>
      		<el-select v-model="scope.row.project_id" v-if="scope.row.edit" filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="上级单位">
      			 </el-option>
      			<el-option class="option"
      				v-for="item in project_list"
      				:key="item.id"
      				:label="item.name"
      				:value="item.id">
      			</el-option>
      		</el-select>
      	</template>
      </el-table-column>

			<el-table-column
				label="使用单位"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.unit_name }}</span>
					<el-select v-model="scope.row.use_customer_id" v-if="scope.row.edit" filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="上级单位">
						 </el-option>
						<el-option class="option"
							v-for="item in customer_list"
							:key="item.id"
							:label="item.name"
							:value="item.id">
						</el-option>
					</el-select>
				</template>
			</el-table-column>
      <el-table-column
      	label="设备"
      	>
      	<template slot-scope="scope">
      		<span v-if="!scope.row.edit">{{ scope.row.device_name }}</span>
      		<el-select v-model="scope.row.device_id" v-if="scope.row.edit" filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="上级单位">
      			 </el-option>
      			<el-option class="option"
      				v-for="item in device_list"
      				:key="item.id"
      				:label="item.name"
      				:value="item.id">
      			</el-option>
      		</el-select>
      	</template>
      </el-table-column>
      <el-table-column
      	label="授权"
      	>
      	<template slot-scope="scope">
      		<span v-if="!scope.row.edit">{{ scope.row.auth_name }}</span>
      		<el-select v-model="scope.row.auth_id" v-if="scope.row.edit" filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="上级单位">
      			 </el-option>
      			<el-option class="option"
      				v-for="item in auth_list"
      				:key="item.id"
      				:label="item.name"
      				:value="item.id">
      			</el-option>
      		</el-select>
      	</template>
      </el-table-column>
      <el-table-column
      	label="号码"
      	>
      	<template slot-scope="scope">
      		<span v-if="!scope.row.edit">{{ scope.row.sim_number }}</span>
      		<el-select v-model="scope.row.sim_id" v-if="scope.row.edit" filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="上级单位">
      			 </el-option>
      			<el-option class="option"
      				v-for="item in sim_list"
      				:key="item.id"
      				:label="item.name"
      				:value="item.id">
      			</el-option>
      		</el-select>
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
		<el-pagination
		  background
		  @current-change="changePage(p)"
		  :current-page.sync="p"
		  :page-size="max"
		  layout="total, prev, pager, next"
		  :total="count">
		</el-pagination>

	</div>
</template>

<script>
  import { getSelectCustomer } from '@/api/customer.js'
  import { getUserList, addUser, editUser, delUser } from '@/api/project_user.js'
  import { MessageBox } from 'element-ui'
  import { getSimList, getAuthList, getDeviceList } from '@/api/open_service.js'
  import { getSelectProject } from '@/api/project.js'
  export default {
     name: 'user_list',
    data() {
      return {
		customer_list:[],
    project_list:[],
    device_list:[],
    sim_list:[],
    auth_list:[],
		area:[],
        list: [],

		addDsiabled:false,
		loading:false,
		dialogFormVisible: false,
		edit:false,
		p:0,
		max:20,//每页显示数量
		count:0,
		form:{
			user:'',
			mobile:'',
      use_customer_id:'',
			project_id:'',
			sim_id:'',
			device_id:'',
			auth_id:'',
			token:''
		},
		search1:{
			use_customer_id:'',
			user:'',
			mobile:'',

		},
		search:{
			use_customer_id:'',
			user:'',
			nobile:'',

		}
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
			if(!this.validateTel(this.form.mobile)){
				this.$alert('手机号码格式错误','提示');
				this.addDsiabled = false;
				return false;
			}
      this.$refs['form'].validate(valid => {
      	if(valid){
      		addUser(this.form).then( response => {
      			this.dialogFormVisible = false;
      			this.$message({
      				message:'新增成功',
      				type:'success'
      			});
      			this.refreshView();
      		}).catch( error => {
      			this.addDsiabled = false;
      			this.$alert(error,'提示')
      		})
      	}
      	else{
          this.addDsiabled = false;
      		return false;
      	}
      })

		},
		confirmEdit(data){
			data.disabled = true;
			if(data.user == false) {
				this.$alert('使用人姓名不能为空','提示');
				data.disabled = false;
				return false
			}
			if(!this.validateTel(data.mobile)){
				this.$alert('手机号码格式错误','提示');
				data.disabled = false;
				return false;
			}

			editUser(data).then( response => {
				data.edit=false;
				this.$message({
					message:'操作成功',
					type:'success'
				});
				this.refreshView();
			}).catch( error => {
				data.disabled = false;
				this.$alert(error,'提示')
			})

		},
		delcus(id) {
			this.$confirm('是否确定删除该客户', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				delUser({id:id}).then( response => {
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
		validateTel(number){
			if(!number) return true;
			if(number.match(/^1[3-9]\d{9}$/) || number.match(/^0\d{2,3}\-\d{7,8}$/)) {
				return true;
			}
			else {
				this.$alert('号码格式错误','提示')
				return false;
			}
		},
    getProject(){
    	getSelectProject({}).then(response =>{
    		this.project_list = response.data.list;
    	}).catch(error => {
    		this.disable = true;
    		this.$alert(error,'提示2')
    	})
    },
    getAuthList(){
    	getAuthList({}).then(response =>{
    		this.auth_list = response.data.list;
    	}).catch(error => {
    		this.disable = true;
    		this.$alert(error,'提示2')
    	})
    },
    getSimList(){
    	getSimList({}).then(response =>{
    		this.sim_list = response.data.list;
    	}).catch(error => {
    		this.disable = true;
    		this.$alert(error,'提示2')
    	})
    },
    getDeviceList(){
    	getDeviceList({}).then(response =>{
    		this.device_list = response.data.list;
    	}).catch(error => {
    		this.disable = true;
    		this.$alert(error,'提示2')
    	})
    },
		getList(data){
			this.loading = true
			getUserList(data).then( response => {
				let data = response.data.list.data;
				for (let i in data){
					data[i].edit = false;
					data[i].disabled = false;
				}
				this.list = data
				this.p = response.data.list.current_page;
				this.count = response.data.count;
				this.loading = false
			}).catch(error => {
				this.loading = false
				this.$alert(error,'提示')
			})
		},
		changePage(page){
			let data = this.search;
			for(let i in data){
				if(data[i] == false) {
					delete data[i]
				}
			}
			data.p = page;
			this.getList(data);
		},
		//获取搜索条件的客户
		getCustomer(){
			getSelectCustomer({}).then( response => {
				this.customer_list = response.data.list;
				this.customer_list.unshift({id:0,name:'无'})
			}).catch(error => {
				this.disable = true;
				this.$alert(error,'提示2')

			})
		},
		//获取地区
		getArea() {
			getArea({}).then( response => {
				this.area = response.data.list;
				this.area.unshift({id:0,area_name:'无'})
			}).catch(error => {
				this.disable = true;
				this.$alert(error,'提示2')

			})
		},
		searchList(){
		    let data = this.search1;
			for(let i in data){
				if(data[i] == false) {
					delete data[i]
				}
			}

			delete data.area;
			this.search = data;
			this.getList(data);
		}
	},
	mounted(){
		this.getList({})
		this.getCustomer();
    this.getSimList({});
    this.getAuthList({});
    this.getDeviceList({});
    this.getProject();
	}
  }
</script>
