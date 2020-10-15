<template>
	<div class="app-container">

		<el-button v-if="checkPermission(['admin'])" type="primary" @click="dialogFormVisible = true" style="float:right;margin-bottom: 10px;">添加用户</el-button>
		<br>
		<el-dialog title="添加用户" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
		  <el-form :model="form" ref="form" label-width="80px">
			<el-form-item label="用户姓名" prop="name" :rules="[
				  { required: true, message: '姓名不能为空'}
				]">
			  <el-input v-model="form.name" autocomplete="off" ></el-input>
			</el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.mobile" autocomplete="off" placeholder="手机号"></el-input>
      </el-form-item>
			<el-form-item label="登录账号" prop="username" :rules="[
				  { required: true, message: '登录名不能为空'}
				]">
			  <el-input v-model="form.username" autocomplete="off" placeholder="登录账号名称"></el-input>
			</el-form-item>
			<el-form-item label="角色" prop="role" :rules="[
				  { required: true, message: '请选择地区'}
				]">
				<el-select v-model="form.role" multiple placeholder="选择角色">
					<el-option class="option"
						v-for="item in role"
						:key="item.id"
						:label="item.name"
						:value="item.develop_mark">
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
				label="用户姓名"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.name }}</span>
					<el-input size="small" v-if="scope.row.edit"  v-model="scope.row.name" :value="scope.row.name"/>
				</template>
			</el-table-column>
      <el-table-column
      	label="手机号"
      	>
      	<template slot-scope="scope">
      		<span v-if="!scope.row.edit">{{ scope.row.mobile }}</span>
      		<el-input size="small" v-if="scope.row.edit"  v-model="scope.row.mobile" :value="scope.row.mobile"/>
      	</template>
      </el-table-column>
			<el-table-column
				label="登录名"
				>
				<template slot-scope="scope">
					<span>{{ scope.row.username }}</span>
				</template>
			</el-table-column>
			<el-table-column
				label="角色"
				>
				<template slot-scope="scope">
					<span v-if="!scope.row.edit">{{ scope.row.role_name.join(',') }}</span>
					<el-select v-if="scope.row.edit" multiple="" v-model="scope.row.role" filterable clearable class="filter-item" loading-text="正在加载数据" placeholder="输入行业名称">
						<el-option class="option"
							v-for="item in role"
							:key="item.id"
							:label="item.name"
							:value="item.develop_mark">
						</el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column
				label="操作"
				width="200px"
        v-if="checkPermission(['admin'])"
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
  import checkPermission from '@/utils/permission' // 权限判断函数
  import { getUserList, addUser, editUser, delUser } from '@/api/user.js'
  import { getSelectRoles } from '@/api/role.js'
  import { getArea } from '@/api/area.js'
  import { MessageBox } from 'element-ui'
  export default {
    data() {
      return {
        role:[],
        list: [],
        addDsiabled:false,
        loading:false,
        dialogFormVisible: false,
        edit:false,
        p:0,
        max:20,//每页显示数量
        count:0,
        form:{
          name:'',
          mobile:'',
          username:'',
          role:[],
          token:''
        },
      }
    },
	methods:{
    checkPermission,
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
			if(data.name == false) {
				this.$alert('名称不能为空','提示');
				data.disabled = false;
				return false
			}
      if(data.role == false) {
      	this.$alert('角色不能为空','提示');
      	data.disabled = false;
      	return false
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

		getList(data){
			this.loading = true
			getUserList(data).then( response => {
				let data = response.data.user;
				for (let i in data){
					data[i].edit = false;
					data[i].disabled = false;
				}
				this.list = data
				this.p = parseInt(response.data.p);
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
		getSelectRoles(){
			getSelectRoles({}).then( response => {
				this.role = response.data.list;
				this.role.unshift({id:0,name:'请选择'})
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
    this.getSelectRoles()
		this.getList({})
	}
  }
</script>
