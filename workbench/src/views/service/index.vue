<template>
	<div class="app-container">
		<div class="filter-container">
			<el-select v-model="search1.customer_id"  filterable clearable loading-text="正在加载数据" placeholder="输入搜索客户名称">
				<el-option class="option"
					v-for="item in customer_list"
					:key="item.id"
					:label="item.name"
					:value="item.id">
				</el-option>
			</el-select>
			<el-select v-model="search1.service_stage"  filterable clearable placeholder="输入付款状态">
				<el-option class="option"
					v-for="(item,id) in ['运行中','到期停止','欠费']"
					:key="id"
					:label="item"
					:value="item">
				</el-option>
			</el-select>


			<el-input placeholder="用户名称" v-model="search1.user_name" clearable style="width: 200px;" />
			<el-input placeholder="联系电话" v-model="search1.user_phone" clearable style="width: 200px;" />
			<el-input placeholder="证件号码" v-model="search1.certificate_number" clearable style="width: 200px;" />
			<el-input placeholder="授权码" v-model="search1.auth_code" clearable style="width: 200px;" />
			<el-button  type="primary" icon="el-icon-search" @click="searchList">搜索</el-button>
		</div>
		<el-button type="primary" style="float:right;margin-bottom: 10px;"><router-link to='/service/add'>新增服务</router-link></el-button>
		<br>
		<el-container style="width:100%;">
		<el-table
			:data="list"
			border
			v-loading="loading">
			<el-table-column
				prop="id"
				label="编号"
				width="45px"
				>
			</el-table-column>
      <el-table-column
        prop="service_name"
      	label="服务名称"
      	>
      </el-table-column>
			<el-table-column
			  prop="unit_name"
				label="客户名称"
				>
			</el-table-column>
			<el-table-column
			  prop="project_name"
				label="所属项目"
				>
			</el-table-column>

			</el-table-column>
			<el-table-column
			  prop="device_number"
				label="设备数量"
				>
			</el-table-column>
			<el-table-column
			  prop="auth_code_number"
				label="授权码数量"
				>
			</el-table-column>
      <el-table-column
        prop="sim_number"
      	label="号码数量"
      	>
      </el-table-column>

			  <el-table-column
			    prop="service_price"
			  	label="服务价格"
			  	>
			  </el-table-column>
			<el-table-column
			  prop="end_date"
				label="到期时间"
				>
			</el-table-column>

			<el-table-column
			  prop="status_name"
				label="状态"
				>
			</el-table-column>

			<el-table-column
				label="操作"
				width="200px"
				>
			<template slot-scope="scope">
				<el-button type="primary" style="margin-bottom: 3px;" size="mini"><router-link :to="{path:'/Service/detail',query:{id:scope.row.id}}">详情</router-link></el-button>
				<el-button type="danger" size="mini" icon="el-icon-delete" @click="delcus(scope.row.id)">删除</el-button>
			</template>
			</el-table-column>
		</el-table>
		</el-container>
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
  import { getServiceList, delService } from '@/api/service.js'
  import { MessageBox } from 'element-ui'
  export default {
     name: 'service_list',
    data() {
      return {
		baseUrl:process.env.BASE_API,

		list: [],
		customer_list:[],
		loading:false,
		select_loading:true,
		p:0,
		max:20,//每页显示数量
		count:0,
		status:[{id:0,name:'正常'},{id:1,name:'停用'}],
		search1:{
      service_stage:'',
			customer_id:'',
			user_name:'',
			user_phone:'',
			certificate_number:'',
			auth_code:'',

		},
		search:{
      service_stage:'',
			customer_id:'',
			user_name:'',
			user_phone:'',
			certificate_number:'',
			auth_code:'',
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
		getList(data){
			this.loading = true
			getServiceList(data).then( response => {
				let data = response.data.list.data;
				//处理数据
				for (let i in data){
					switch(data[i].status){
						case 0: data[i].status_name='使用中';break;
						case 1: data[i].status_name='停用';break;
					}
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
		searchList(){
		  let data = this.search1;
			for(let i in data){
				if(data[i] == false) {
					delete data[i]
				}
			}
			this.search = data;
			this.getList(data);
		},
		getCustomer(){
			getSelectCustomer({}).then(response =>{
				this.customer_list = response.data.list;
				this.select_loading=false;
			}).catch(error => {
				this.$alert(error,'提示')
			})
		},
		delcus(id) {
			this.$confirm('是否确定删除该用户', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				delService({id:id}).then( response => {
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
	},
	mounted(){
    if(typeof this.$route.query.service_stage  != 'undefined') {
      this.search1.service_stage = this.$route.query.service_stage
      let data = this.search1;
      for(let i in data){
      	if(data[i] == false) {
      		delete data[i]
      	}
      }
      this.search = data;
      this.getList(data);
    }else {
      this.getList({});
    }
		
		this.getCustomer();
	}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
